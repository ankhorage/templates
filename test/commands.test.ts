import { mkdir, mkdtemp, readdir, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { describe, expect, test } from 'bun:test';

import {
  findTemplatesCommandByStandaloneName,
  runTemplatesCommand,
  TEMPLATES_COMMANDS,
} from '../src/commands.js';
import { createCapturedContext } from './testSupport.js';

describe('templates commands', () => {
  test('shared command table exposes the shipped command surface', () => {
    expect(TEMPLATES_COMMANDS.map((command) => command.path.join(' '))).toEqual([
      'list',
      'inspect',
      'create',
    ]);
  });

  test('lists all canonical selectors', async () => {
    const capture = createCapturedContext();

    const result = await runCommand('list', [], capture.context);
    const output = capture.readStdout();

    expect(result.exitCode).toBe(0);
    expect(output).toContain('Available templates:');
    expect(output).not.toContain('fallback/default');
    expect(output).toContain(
      'games/default - Quest loop: A home, quests, inventory, friends, and profile starter for game experiences.',
    );
    expect(output).toContain(
      'games/chess - Chess: A two-tab chess starter with Home and Settings screens.',
    );
    expect(output).toContain(
      'social_community/creator - Creator social: A studio, posts, audience, insights, and settings starter for creator apps.',
    );
  });

  test('lists templates by category', async () => {
    const capture = createCapturedContext();

    const result = await runCommand('list', ['--category', 'games'], capture.context);
    const output = capture.readStdout();

    expect(result.exitCode).toBe(0);
    expect(output).toContain(
      'games/default - Quest loop: A home, quests, inventory, friends, and profile starter for game experiences.',
    );
    expect(output).toContain(
      'games/chess - Chess: A two-tab chess starter with Home and Settings screens.',
    );
    expect(output).toContain(
      'games/poker - Card trainer: A two-tab card-game trainer starter with a tabletop scenario view.',
    );
    expect(output).not.toContain('social_community/creator');
  });

  test('inspects one canonical selector', async () => {
    const capture = createCapturedContext();

    const result = await runCommand('inspect', ['games/chess'], capture.context);

    expect(result.exitCode).toBe(0);

    const inspection = JSON.parse(capture.readStdout()) as {
      readonly selector: string;
      readonly category: string;
      readonly templateId: string;
      readonly manifest: {
        readonly metadata: {
          readonly category: string;
          readonly version: string;
        };
      };
    };

    expect(inspection.selector).toBe('games/chess');
    expect(inspection.category).toBe('games');
    expect(inspection.templateId).toBe('chess');
    expect(inspection.manifest.metadata.category).toBe('games');
    expect(typeof inspection.manifest.metadata.version).toBe('string');
  });

  test('creates a manifest-first project seed', async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), 'templates-create-'));

    try {
      const capture = createCapturedContext({ cwd });
      const result = await runCommand(
        'create',
        ['my-app', '--template', 'games/chess'],
        capture.context,
      );

      expect(result.exitCode).toBe(0);

      const projectPath = path.join(cwd, 'my-app');
      expect((await readdir(projectPath)).sort()).toEqual([
        'README.md',
        'ankh.config.json',
        'ankh.template.json',
      ]);

      const manifest = JSON.parse(
        await readFile(path.join(projectPath, 'ankh.config.json'), 'utf8'),
      ) as {
        readonly metadata: {
          readonly name: string;
          readonly slug: string;
          readonly category: string;
          readonly version: string;
        };
      };
      const metadata = JSON.parse(
        await readFile(path.join(projectPath, 'ankh.template.json'), 'utf8'),
      ) as {
        readonly package: string;
        readonly version: string;
        readonly projectSlug: string;
        readonly displayName: string;
        readonly category: string;
        readonly templateId: string;
        readonly selector: string;
      };
      const readme = await readFile(path.join(projectPath, 'README.md'), 'utf8');

      expect(JSON.parse(JSON.stringify(manifest))).toEqual(manifest);
      expect(manifest.metadata.slug).toBe('my-app');
      expect(manifest.metadata.name).toBe('My App');
      expect(manifest.metadata.category).toBe('games');
      expect(typeof manifest.metadata.version).toBe('string');
      expect(typeof metadata.version).toBe('string');
      expect({
        package: '@ankhorage/templates',
        projectSlug: 'my-app',
        displayName: 'My App',
        category: 'games',
        templateId: 'chess',
        selector: 'games/chess',
      }).toEqual({
        package: metadata.package,
        projectSlug: metadata.projectSlug,
        displayName: metadata.displayName,
        category: metadata.category,
        templateId: metadata.templateId,
        selector: metadata.selector,
      });
      expect(readme).toContain('# My App');
      expect(readme).toContain('`games/chess`');
    } finally {
      await rm(cwd, { recursive: true, force: true });
    }
  });

  test('rejects fallback selectors because manifests require canonical app categories', async () => {
    const capture = createCapturedContext();

    const result = await runCommand(
      'create',
      ['my-app', '--template', 'fallback/default'],
      capture.context,
    );

    expect(result.exitCode).toBe(1);
    expect(capture.readStderr()).toContain('Unknown template category "fallback"');
  });

  test('rejects a bare template id', async () => {
    const capture = createCapturedContext();

    const result = await runCommand('inspect', ['chess'], capture.context);

    expect(result.exitCode).toBe(1);
    expect(capture.readStderr()).toContain('Invalid template selector "chess"');
  });

  test('rejects an unknown category', async () => {
    const capture = createCapturedContext();

    const result = await runCommand('inspect', ['unknown/default'], capture.context);

    expect(result.exitCode).toBe(1);
    expect(capture.readStderr()).toContain('Unknown template category "unknown"');
  });

  test('rejects an unknown template in a valid category', async () => {
    const capture = createCapturedContext();

    const result = await runCommand('inspect', ['games/unknown'], capture.context);

    expect(result.exitCode).toBe(1);
    expect(capture.readStderr()).toContain('Unknown template selector "games/unknown"');
    expect(capture.readStderr()).toContain('games/default');
    expect(capture.readStderr()).toContain('games/chess');
  });

  test('rejects invalid project slugs', async () => {
    const invalidValues = [
      'My App',
      'my_app',
      '../my-app',
      'apps/my-app',
      '.my-app',
      'my-app-',
      '-my-app',
    ];

    for (const invalidValue of invalidValues) {
      const cwd = await mkdtemp(path.join(os.tmpdir(), 'templates-create-invalid-'));

      try {
        const capture = createCapturedContext({ cwd });
        const result = await runCommand(
          'create',
          [invalidValue, '--template', 'games/chess'],
          capture.context,
        );

        expect(result.exitCode).toBe(1);
        expect(capture.readStderr()).toContain(`Invalid project slug "${invalidValue}"`);
      } finally {
        await rm(cwd, { recursive: true, force: true });
      }
    }
  });

  test('fails when the target directory already exists', async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), 'templates-create-existing-'));

    try {
      await mkdir(path.join(cwd, 'my-app'));
      const capture = createCapturedContext({ cwd });

      const result = await runCommand(
        'create',
        ['my-app', '--template', 'games/chess'],
        capture.context,
      );

      expect(result.exitCode).toBe(1);
      expect(capture.readStderr()).toContain('Project path already exists');
    } finally {
      await rm(cwd, { recursive: true, force: true });
    }
  });
});

async function runCommand(
  commandName: 'create' | 'inspect' | 'list',
  argv: readonly string[],
  context: Parameters<typeof runTemplatesCommand>[0]['context'],
) {
  const command = findTemplatesCommandByStandaloneName(commandName);

  if (command === null) {
    throw new Error(`Unknown command in test: ${commandName}`);
  }

  return runTemplatesCommand({
    argv,
    command,
    context,
  });
}
