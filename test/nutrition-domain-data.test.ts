import { describe, expect, test } from 'bun:test';

import { CATEGORY_PRESETS, createStarterTemplate, type TemplateSeed } from '../src/index';

function createSeed(): TemplateSeed {
  const preset = CATEGORY_PRESETS.food_drink;

  return {
    category: 'food_drink',
    categoryLabel: preset.label,
    appName: 'Nutrition Scan',
    slug: 'nutrition-scan',
    summary: preset.summary,
    focusAreas: preset.focusAreas,
    primaryColor: preset.primaryColor,
    harmony: preset.harmony,
  };
}

describe('nutrition domain data manifest', () => {
  test('declares generated APIs for products, captures, challenges, and events', () => {
    const manifest = createStarterTemplate(createSeed(), { templateId: 'nutrition-catalog-scan' });
    const apis = manifest.data?.apis;

    expect(Object.keys(apis ?? {})).toEqual([
      'nutritionProducts',
      'nutritionProductCaptures',
      'nutritionScanChallenges',
      'nutritionScanEvents',
    ]);
    expect(apis?.nutritionProducts?.basePath).toBe('/v1/nutrition/products');
    expect(apis?.nutritionProductCaptures?.basePath).toBe('/v1/nutrition/products/captures');
    expect(apis?.nutritionScanChallenges?.basePath).toBe('/v1/nutrition/challenges');
    expect(apis?.nutritionScanEvents?.basePath).toBe('/v1/nutrition/scan-events');
    expect(apis?.nutritionProducts?.auth?.required).toBe(true);
    expect(apis?.nutritionScanEvents?.auth?.required).toBe(true);
  });

  test('declares collection fields for products and events', () => {
    const manifest = createStarterTemplate(createSeed(), { templateId: 'nutrition-catalog-scan' });
    const products = manifest.data?.apis?.nutritionProducts;
    const events = manifest.data?.apis?.nutritionScanEvents;

    const productCollection =
      products?.kind === 'generated' && products.resource?.kind === 'collection'
        ? products.resource.collection
        : undefined;
    const eventCollection =
      events?.kind === 'generated' && events.resource?.kind === 'collection'
        ? events.resource.collection
        : undefined;

    expect(productCollection?.name).toBe('nutrition_products');
    expect(productCollection?.fields.map((field) => field.name)).toContain('barcode');
    expect(productCollection?.fields.map((field) => field.name)).toContain('nutritionFacts');
    expect(eventCollection?.name).toBe('nutrition_scan_events');
    expect(eventCollection?.fields.map((field) => field.name)).toContain('challengeId');
    expect(eventCollection?.fields.map((field) => field.name)).toContain('points');
  });
});
