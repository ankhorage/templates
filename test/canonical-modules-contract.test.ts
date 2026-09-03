import { expect, test } from 'bun:test';

import { createCategoryAppManifest } from '../src/index';

test('generates only the canonical Ankhorage module manifest fields', () => {
  const manifest = createCategoryAppManifest('business_productivity');

  expect(manifest.infra.modules).toEqual([]);
  expect(manifest.infra.modulesConfig).toBeUndefined();
  expect('plugins' in manifest.infra).toBe(false);
  expect('pluginsConfig' in manifest.infra).toBe(false);
});
