import { describe, expect, test } from 'bun:test';

import {
  APP_CATEGORIES,
  CATEGORY_PRESET_RECONCILIATION,
  CATEGORY_PRESETS,
  compileCategoryDesign,
  composeCategoryAppManifest,
  createCategoryAppManifest,
  createStarterTemplate,
  createStarterTemplateArtifact,
  listStarterTemplates,
  listStarterTemplatesByCategory,
  listStarterTemplateSummaries,
  resolveCategoryDesignPreset,
  resolveStarterTemplate,
  summarizeStarterTemplateAssets,
  TEMPLATE_KINDS,
  TONE_PAIR_CATALOG,
  validateStarterTemplateAssets,
} from '../src/index';

describe('root exports', () => {
  test('exposes the package API from the root entrypoint only', () => {
    expect(TEMPLATE_KINDS).toEqual(['starter']);
    expect(Object.keys(CATEGORY_PRESETS)).toHaveLength(APP_CATEGORIES.length);
    expect(CATEGORY_PRESET_RECONCILIATION).toHaveLength(APP_CATEGORIES.length);
    expect(TONE_PAIR_CATALOG).toHaveLength(70);
    expect(typeof compileCategoryDesign).toBe('function');
    expect(typeof composeCategoryAppManifest).toBe('function');
    expect(typeof resolveCategoryDesignPreset).toBe('function');
    expect(typeof createStarterTemplate).toBe('function');
    expect(typeof createStarterTemplateArtifact).toBe('function');
    expect(typeof validateStarterTemplateAssets).toBe('function');
    expect(typeof summarizeStarterTemplateAssets).toBe('function');
    expect(typeof createCategoryAppManifest).toBe('function');
    expect(typeof listStarterTemplates).toBe('function');
    expect(typeof listStarterTemplatesByCategory).toBe('function');
    expect(typeof listStarterTemplateSummaries).toBe('function');
    expect(typeof resolveStarterTemplate).toBe('function');

    const manifest = createCategoryAppManifest('business_productivity');
    expect(manifest.metadata.themeId).toBe(manifest.activeThemeId);

    const artifact = createStarterTemplate({
      category: 'business_productivity',
      categoryLabel: 'Business Productivity',
      appName: 'Urban Water Monitor',
      slug: 'urban-water-monitor',
      summary: 'event-based urban water quality monitoring',
      primaryColor: '#7C3AED',
      harmony: 'analogous',
    });
    expect(artifact.assets).toEqual([]);
    expect(artifact.manifest.metadata.category).toBe('business_productivity');
  });
});
