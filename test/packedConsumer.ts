import { execFileSync } from 'node:child_process';
import {
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';

import { expect, test } from 'bun:test';

const packageRoot = process.cwd();

test('a fresh packed consumer materializes the Reader template and its bundled Library cover', () => {
  const consumer = createPackedConsumer(packageRoot);

  try {
    assertReaderManifestIsExposed(consumer);
    assertReaderCoverIsMaterialized(consumer);
  } finally {
    rmSync(consumer.temporaryRoot, { force: true, recursive: true });
  }
}, 120_000);

function createPackedConsumer(packageDirectory: string) {
  const temporaryRoot = mkdtempSync(join(tmpdir(), 'templates-packed-reader-'));
  const packDirectory = join(temporaryRoot, 'pack');
  const consumerDirectory = join(temporaryRoot, 'consumer');
  mkdirSync(packDirectory);
  mkdirSync(consumerDirectory);
  const tarballPath = createPackageTarball(packageDirectory, packDirectory);

  writeFileSync(
    join(consumerDirectory, 'package.json'),
    JSON.stringify({ name: 'reader-template-consumer', private: true, version: '0.0.0' }),
  );
  materializePackedConsumer(packageDirectory, consumerDirectory, tarballPath);
  return { temporaryRoot, consumerDirectory };
}

function assertReaderManifestIsExposed(consumer: ReturnType<typeof createPackedConsumer>): void {
  const listOutput = run(
    'bun',
    ['node_modules/@ankhorage/templates/dist/cli/standalone.js', 'list'],
    consumer.consumerDirectory,
  );
  expect(listOutput).toContain('books_reading/reader - Reeda');

  const inspectOutput = run(
    'bun',
    ['node_modules/@ankhorage/templates/dist/cli/standalone.js', 'inspect', 'books_reading/reader'],
    consumer.consumerDirectory,
  );
  const inspected = JSON.parse(inspectOutput) as { readonly manifest: unknown };
  expect(inspected.manifest).toMatchObject({
    media: {
      assets: {
        'the-jungle-book-cover': {
          source: { kind: 'bundled', path: 'assets/images/the-jungle-book.png' },
        },
      },
    },
    screens: {
      reader: {
        requires: { capabilities: { ebookReader: true } },
        root: {
          children: [
            {
              type: 'Reader',
              props: { format: 'epub', source: { mediaId: 'the-jungle-book-epub' } },
            },
          ],
        },
      },
    },
  });
  assertBookDetailNavigatorBindings(inspected.manifest);
}

function assertBookDetailNavigatorBindings(manifest: unknown): void {
  expect(manifest).toMatchObject({
    dataBindings: {
      'book-continue': {
        events: {
          press: [
            {
              target: { capability: 'navigator.navigate', input: { route: { value: '/reader' } } },
            },
          ],
        },
      },
      'book-back': {
        events: {
          press: [
            { target: { capability: 'navigator.navigate', input: { route: { value: '/' } } } },
          ],
        },
      },
    },
  });
}

function assertReaderCoverIsMaterialized(consumer: ReturnType<typeof createPackedConsumer>): void {
  run(
    'bun',
    [
      'node_modules/@ankhorage/templates/dist/cli/standalone.js',
      'create',
      'reader-proof',
      '--template',
      'books_reading/reader',
    ],
    consumer.consumerDirectory,
  );
  const generatedCover = join(
    consumer.consumerDirectory,
    'reader-proof',
    'assets/images/the-jungle-book.png',
  );
  const packagedCover = join(
    consumer.consumerDirectory,
    'node_modules/@ankhorage/templates/src/templates/categories/books-reading/reader/assets/images/the-jungle-book.png',
  );
  expect(statSync(generatedCover).size).toBeGreaterThan(0);
  expect(readFileSync(generatedCover)).toEqual(readFileSync(packagedCover));
}

function createPackageTarball(packageDirectory: string, packDirectory: string): string {
  const output = run(
    'npm',
    ['pack', '--ignore-scripts', '--json', '--silent', '--pack-destination', packDirectory],
    packageDirectory,
  );
  const [packed] = JSON.parse(output) as readonly { readonly filename: string }[];
  if (packed === undefined) throw new Error('npm pack did not produce a package tarball.');
  return join(packDirectory, basename(packed.filename));
}

function materializePackedConsumer(
  packageDirectory: string,
  consumerDirectory: string,
  tarballPath: string,
): void {
  const consumerNodeModules = join(consumerDirectory, 'node_modules');
  mkdirSync(consumerNodeModules);
  linkInstalledDependencies(packageDirectory, consumerNodeModules);
  run('tar', ['-xzf', tarballPath, '-C', consumerNodeModules], consumerDirectory);
  renameSync(
    join(consumerNodeModules, 'package'),
    join(consumerNodeModules, '@ankhorage', 'templates'),
  );
}

function linkInstalledDependencies(packageDirectory: string, consumerNodeModules: string): void {
  const sourceNodeModules = join(packageDirectory, 'node_modules');
  for (const entry of readdirSync(sourceNodeModules)) {
    if (entry === '@ankhorage') {
      linkAnkhorageDependencies(join(sourceNodeModules, entry), join(consumerNodeModules, entry));
      continue;
    }
    symlinkSync(join(sourceNodeModules, entry), join(consumerNodeModules, entry), 'dir');
  }
}

function linkAnkhorageDependencies(sourceDirectory: string, consumerDirectory: string): void {
  mkdirSync(consumerDirectory);
  for (const entry of readdirSync(sourceDirectory)) {
    if (entry === 'templates') continue;
    symlinkSync(join(sourceDirectory, entry), join(consumerDirectory, entry), 'dir');
  }
}

function run(command: string, arguments_: readonly string[], cwd: string): string {
  return execFileSync(command, arguments_, {
    cwd,
    encoding: 'utf8',
  });
}
