import type { AnkhPackageMetadata } from '@ankhorage/contracts/cli';
import { describe, expect, test } from 'bun:test';

import packageJson from '../package.json';

const CARET_SEMVER_RANGE = /^\^\d+\.\d+\.\d+$/u;

describe('package metadata', () => {
  test('publishes the expected Ankh metadata and template assets', () => {
    const expectedAnkhMetadata = {
      category: 'templates',
      provider: './dist/cli/index.js',
      capabilities: ['templates.list', 'templates.inspect', 'templates.create'],
    } as const satisfies AnkhPackageMetadata;

    expect(packageJson.name).toBe('@ankhorage/templates');
    expect(packageJson.type).toBe('module');
    expect(packageJson.files).toEqual([
      'dist',
      'src/templates/categories/**/assets',
      'CHANGELOG.md',
    ]);
    expect(packageJson.bin).toEqual({
      'ankhorage-templates': './dist/cli/standalone.js',
    });
    expect(packageJson.ankh).toEqual({
      category: expectedAnkhMetadata.category,
      provider: expectedAnkhMetadata.provider,
      capabilities: [...expectedAnkhMetadata.capabilities],
    });
    expect(packageJson.dependencies['@ankhorage/contracts']).toMatch(CARET_SEMVER_RANGE);
    expect(packageJson.dependencies).not.toHaveProperty('@ankhorage/navigator');
  });
});
