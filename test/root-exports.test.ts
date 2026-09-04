import { describe, expect, test } from 'bun:test';

import {
  APP_CATEGORIES,
  CATEGORY_PRESET_RECONCILIATION,
  CATEGORY_PRESETS,
  compileCategoryDesign,
  composeCategoryAppManifest,
  createTemplateArtifact,
  listTemplates,
  resolveCategoryDesignPreset,
  resolveTemplate,
  TONE_PAIR_CATALOG,
} from '../src/index';

describe('root exports', () => {
  test('exposes authoring and standalone template APIs', () => {
    expect(Object.keys(CATEGORY_PRESETS)).toHaveLength(APP_CATEGORIES.length);
    expect(CATEGORY_PRESET_RECONCILIATION).toHaveLength(APP_CATEGORIES.length);
    expect(TONE_PAIR_CATALOG).toHaveLength(70);
    expect(typeof compileCategoryDesign).toBe('function');
    expect(typeof composeCategoryAppManifest).toBe('function');
    expect(typeof resolveCategoryDesignPreset).toBe('function');
    expect(typeof createTemplateArtifact).toBe('function');
    expect(typeof resolveTemplate).toBe('function');
    expect(listTemplates()).toEqual([]);
  });
});
