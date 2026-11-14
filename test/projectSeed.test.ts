import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { expect, test } from 'bun:test';

import { materializeTemplateRevision, resolveTemplate } from '../src/index.js';

const readerTemplate = { category: 'books_reading', slug: 'reader' } as const;

test('materializes an approved revision with only the selected template assets', async () => {
  const temporaryRoot = mkdtempSync(join(tmpdir(), 'templates-project-seed-'));
  const revision = resolveTemplate(
    readerTemplate.category,
    readerTemplate.slug,
  ).createAppManifest();
  revision.metadata.name = 'Approved Reader Revision';

  try {
    const result = await materializeTemplateRevision({
      cwd: temporaryRoot,
      projectSlug: 'approved-reader',
      template: readerTemplate,
      manifest: revision,
    });

    expect(result.createdFiles).toContain('assets/images/the-jungle-book.png');
    expect(JSON.parse(readFileSync(join(result.projectPath, 'ankh.config.json'), 'utf8'))).toEqual(
      revision,
    );
    expect(existsSync(join(result.projectPath, 'assets/images/the-jungle-book.png'))).toBe(true);
  } finally {
    rmSync(temporaryRoot, { force: true, recursive: true });
  }
});

test('does not overwrite an existing project directory', async () => {
  const temporaryRoot = mkdtempSync(join(tmpdir(), 'templates-project-seed-'));
  const projectPath = join(temporaryRoot, 'existing-project');
  const revision = resolveTemplate(
    readerTemplate.category,
    readerTemplate.slug,
  ).createAppManifest();

  try {
    await materializeTemplateRevision({
      cwd: temporaryRoot,
      projectSlug: 'existing-project',
      template: readerTemplate,
      manifest: revision,
    });
    writeFileSync(join(projectPath, 'retain.txt'), 'retain');

    const failure = await captureMaterializationFailure(
      materializeTemplateRevision({
        cwd: temporaryRoot,
        projectSlug: 'existing-project',
        template: readerTemplate,
        manifest: revision,
      }),
    );
    expect(failure.message).toContain(`Project path already exists: ${projectPath}`);
    expect(readFileSync(join(projectPath, 'retain.txt'), 'utf8')).toBe('retain');
  } finally {
    rmSync(temporaryRoot, { force: true, recursive: true });
  }
});

test('rejects a project slug that could escape its destination', async () => {
  const temporaryRoot = mkdtempSync(join(tmpdir(), 'templates-project-seed-'));
  const revision = resolveTemplate(
    readerTemplate.category,
    readerTemplate.slug,
  ).createAppManifest();

  try {
    const failure = await captureMaterializationFailure(
      materializeTemplateRevision({
        cwd: temporaryRoot,
        projectSlug: '../escaped',
        template: readerTemplate,
        manifest: revision,
      }),
    );
    expect(failure.message).toContain('Use a single lowercase slug');
    expect(existsSync(join(temporaryRoot, '..', 'escaped'))).toBe(false);
  } finally {
    rmSync(temporaryRoot, { force: true, recursive: true });
  }
});

async function captureMaterializationFailure(operation: Promise<unknown>): Promise<Error> {
  return operation.then(
    () => new Error('Expected project materialization to fail.'),
    (error: unknown) => (error instanceof Error ? error : new Error(String(error))),
  );
}
