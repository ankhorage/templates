import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import { describe, expect, test } from 'bun:test';

import { APP_CATEGORIES, createCategoryAppManifest } from '../src/index';

async function listFiles(root: string): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(root, entry.name);
      return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
    }),
  );
  return files.flat();
}

describe('canonical auth flow contract', () => {
  test('generates first-party manifests with only infra.auth.flow', () => {
    for (const category of ['business_productivity', 'finance_money'] as const) {
      const manifest = createCategoryAppManifest(category);
      expect(manifest.infra.auth?.flow).toBeDefined();
      expect(manifest.infra.auth?.authorization).toBeUndefined();
      expect(manifest.settings).not.toHaveProperty('authFlow');
    }
  });

  test('does not reintroduce the removed settings auth-flow property', async () => {
    const removedPath = ['settings', 'authFlow'].join('.');
    const removedKey = ['auth', 'Flow'].join('');
    const files = [...(await listFiles('src')), ...(await listFiles('test')), 'README.md'].filter(
      (file) => !file.endsWith('canonical-auth-flow-contract.test.ts'),
    );

    for (const file of files) {
      const content = await readFile(file, 'utf8');
      expect(content, file).not.toContain(removedPath);
      expect(content.replaceAll(/\s/g, ''), file).not.toContain(`${removedKey}:`);
    }
  });
});
