import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { expect, test } from 'bun:test';

const packageRoot = process.cwd();

test('a fresh packed consumer imports root materialization APIs through native Node ESM', () => {
  const consumerRoot = mkdtempSync(join(tmpdir(), 'templates-node-esm-'));
  const packDirectory = join(consumerRoot, 'pack');

  try {
    mkdirSync(packDirectory);
    const tarball = execFileSync(
      'npm',
      ['pack', '--ignore-scripts', '--pack-destination', packDirectory],
      {
        cwd: packageRoot,
        encoding: 'utf8',
      },
    ).trim();
    writeFileSync(
      join(consumerRoot, 'package.json'),
      JSON.stringify({ name: 'templates-node-esm-consumer', private: true, version: '0.0.0' }),
    );
    execFileSync('npm', ['install', '--ignore-scripts', join(packDirectory, tarball)], {
      cwd: consumerRoot,
      stdio: 'pipe',
    });
    const output = execFileSync(
      'node',
      [
        '--input-type=module',
        '--eval',
        "import { materializeTemplateRevision, resolveTemplate } from '@ankhorage/templates'; if (typeof materializeTemplateRevision !== 'function' || typeof resolveTemplate !== 'function') throw new Error('Missing root materialization API'); console.log('ok');",
      ],
      { cwd: consumerRoot, encoding: 'utf8' },
    );
    expect(output.trim()).toBe('ok');
  } finally {
    rmSync(consumerRoot, { force: true, recursive: true });
  }
}, 120_000);
