import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
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
  const cacheDirectory = join(temporaryRoot, 'cache');
  mkdirSync(packDirectory);
  mkdirSync(consumerDirectory);
  mkdirSync(cacheDirectory);
  const tarballPath = createPackageTarball(packageDirectory, packDirectory, cacheDirectory);

  writeFileSync(
    join(consumerDirectory, 'package.json'),
    JSON.stringify({ name: 'reader-template-consumer', private: true, version: '0.0.0' }),
  );
  run('bun', ['install', '--ignore-scripts', tarballPath], consumerDirectory, cacheDirectory);
  return { temporaryRoot, consumerDirectory, cacheDirectory };
}

function assertReaderManifestIsExposed(consumer: ReturnType<typeof createPackedConsumer>): void {
  const listOutput = run(
    'bun',
    ['node_modules/@ankhorage/templates/dist/cli/standalone.js', 'list'],
    consumer.consumerDirectory,
    consumer.cacheDirectory,
  );
  expect(listOutput).toContain('books_reading/reader - Reeda');

  const inspectOutput = run(
    'bun',
    ['node_modules/@ankhorage/templates/dist/cli/standalone.js', 'inspect', 'books_reading/reader'],
    consumer.consumerDirectory,
    consumer.cacheDirectory,
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
    consumer.cacheDirectory,
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

function createPackageTarball(
  packageDirectory: string,
  packDirectory: string,
  cacheDirectory: string,
): string {
  const output = run(
    'npm',
    ['pack', '--ignore-scripts', '--json', '--silent', '--pack-destination', packDirectory],
    packageDirectory,
    cacheDirectory,
  );
  const [packed] = JSON.parse(output) as readonly { readonly filename: string }[];
  if (packed === undefined) throw new Error('npm pack did not produce a package tarball.');
  return join(packDirectory, basename(packed.filename));
}

function run(
  command: string,
  arguments_: readonly string[],
  cwd: string,
  cacheDirectory: string,
): string {
  return execFileSync(command, arguments_, {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      BUN_INSTALL_CACHE_DIR: cacheDirectory,
      NPM_CONFIG_CACHE: cacheDirectory,
      TMPDIR: cacheDirectory,
    },
  });
}
