import { describe, expect, test } from 'bun:test';

import {
  APP_CATEGORIES,
  CATEGORY_PRESETS,
  createCategoryAppManifest,
  createStarterTemplate,
  TEMPLATE_KINDS,
} from '../src/index';

describe('root exports', () => {
  test('exposes the package API from the root entrypoint only', () => {
    expect(TEMPLATE_KINDS).toEqual(['starter']);
    expect(Object.keys(CATEGORY_PRESETS)).toHaveLength(APP_CATEGORIES.length);
    expect(typeof createStarterTemplate).toBe('function');
    expect(typeof createCategoryAppManifest).toBe('function');

    const manifest = createCategoryAppManifest('books_reading');
    expect(manifest.metadata.themeId).toBe(manifest.activeThemeId);
  });
});
