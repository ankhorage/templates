import type { AnkhPackageMetadata } from '@ankhorage/contracts/cli';
import { describe, expect, test } from 'bun:test';

import packageJson from '../package.json';

describe('package metadata', () => {
  test('publishes the expected Ankh metadata and bin entry', () => {
    const expectedAnkhMetadata = {
      category: 'templates',
      provider: './dist/cli/index.js',
      capabilities: ['templates.list', 'templates.inspect', 'templates.create'],
    } as const satisfies AnkhPackageMetadata;

    expect(packageJson.name).toBe('@ankhorage/templates');
    expect(packageJson.type).toBe('module');
    expect(packageJson.bin).toEqual({
      'ankhorage-templates': './dist/cli/standalone.js',
    });
    expect(packageJson.exports).toEqual({
      '.': {
        types: './dist/index.d.ts',
        import: './dist/index.js',
      },
      './cli': {
        types: './dist/cli/index.d.ts',
        import: './dist/cli/index.js',
      },
      './package.json': './package.json',
    });
    expect(packageJson.ankh).toEqual({
      category: expectedAnkhMetadata.category,
      provider: expectedAnkhMetadata.provider,
      capabilities: [...expectedAnkhMetadata.capabilities],
    });
    expect(JSON.parse(JSON.stringify(expectedAnkhMetadata))).toEqual(expectedAnkhMetadata);

    const capabilityText = JSON.stringify(packageJson.ankh.capabilities);
    expect(capabilityText).not.toContain('ankh create');
    expect(capabilityText).not.toContain('studio');
  });
});
