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
      'business_productivity/urban-water-monitor - Urban Water Monitor: An event-based urban water quality monitoring and field-campaign concept starter.',
    );
    expect(output).toContain(
      'business_productivity/urban-water-monitor - Urban Water Monitor: An event-based urban water quality monitoring and field-campaign concept starter.',
    );
    expect(output).toContain(
      'finance_money/ebanking-mobile - E-banking mobile: A five-tab mobile e-banking starter with balances, assets, payments, investing, and secure account settings.',
    );
  });

  test('lists templates by category', async () => {
    const capture = createCapturedContext();

    const result = await runCommand('list', ['--category', 'business_productivity'], capture.context);
    const output = capture.readStdout();

    expect(result.exitCode).toBe(0);
    expect(output).toContain(
      'business_productivity/urban-water-monitor - Urban Water Monitor: An event-based urban water quality monitoring and field-campaign concept starter.',
    );
    expect(output).not.toContain('finance_money/ebanking-mobile');
  });

  test('inspects one canonical selector', async () => {
    const capture = createCapturedContext();

    const result = await runCommand('inspect', ['business_productivity/urban-water-monitor'], capture.context);

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

    expect(inspection.selector).toBe('business_productivity/urban-water-monitor');
    expect(inspection.category).toBe('business_productivity');
    expect(inspection.templateId).toBe('urban-water-monitor');
    expect(inspection.manifest.metadata.category).toBe('business_productivity');
    expect(typeof inspection.manifest.metadata.version).toBe('string');
  });

  test('creates a manifest-first project seed', async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), 'templates-create-'));

    try {
      const capture = createCapturedContext({ cwd });
      const result = await runCommand(
        'create',
        ['my-app', '--template', 'business_productivity/urban-water-monitor'],
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
      expect(manifest.metadata.category).toBe('business_productivity');
      expect(typeof manifest.metadata.version).toBe('string');
      expect(typeof metadata.version).toBe('string');
      expect({
        package: '@ankhorage/templates',
        projectSlug: 'my-app',
        displayName: 'My App',
        category: 'business_productivity',
        templateId: 'urban-water-monitor',
        selector: 'business_productivity/urban-water-monitor',
      }).toEqual({
        package: metadata.package,
        projectSlug: metadata.projectSlug,
        displayName: metadata.displayName,
        category: metadata.category,
        templateId: metadata.templateId,
        selector: metadata.selector,
      });
      expect(readme).toContain('# My App');
      expect(readme).toContain('`business_productivity/urban-water-monitor`');
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

    const result = await runCommand('inspect', ['business_productivity/unknown'], capture.context);

    expect(result.exitCode).toBe(1);
    expect(capture.readStderr()).toContain('Unknown template selector "business_productivity/unknown"');
    expect(capture.readStderr()).toContain('business_productivity/urban-water-monitor');
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
          [invalidValue, '--template', 'business_productivity/urban-water-monitor'],
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
        ['my-app', '--template', 'business_productivity/urban-water-monitor'],
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
