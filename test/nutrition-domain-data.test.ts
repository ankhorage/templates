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
  test('declares the generated nutrition products API only', () => {
    const manifest = createStarterTemplate(createSeed(), { templateId: 'nutrition-catalog-scan' });
    const apis = manifest.data?.apis;

    expect(Object.keys(apis ?? {})).toEqual(['nutritionProducts']);
    expect(apis?.nutritionProducts?.basePath).toBe('/v1/nutrition/products');
    expect(apis?.nutritionProducts?.auth?.required).toBe(true);
  });

  test('declares collection fields and CRUD endpoints for products', () => {
    const manifest = createStarterTemplate(createSeed(), { templateId: 'nutrition-catalog-scan' });
    const products = manifest.data?.apis?.nutritionProducts;

    const productCollection =
      products?.kind === 'generated' && products.resource?.kind === 'collection'
        ? products.resource.collection
        : undefined;

    expect(productCollection?.name).toBe('nutrition_products');
    expect(productCollection?.fields.map((field) => field.name)).toContain('barcode');
    expect(productCollection?.fields.map((field) => field.name)).toContain('packageLabel');
    expect(productCollection?.fields.map((field) => field.name)).toContain('nutritionFacts');
    expect(productCollection?.fields.map((field) => field.name)).toContain('imageRefs');
    expect(productCollection?.fields.map((field) => field.name)).not.toContain('updatedByUserId');
    expect(products?.endpoints.map((endpoint) => endpoint.id)).toEqual([
      'listNutritionProducts',
      'getNutritionProductById',
      'getNutritionProductByBarcode',
      'createNutritionProduct',
      'updateNutritionProduct',
      'deleteNutritionProduct',
    ]);
    expect(products?.endpoints.map((endpoint) => endpoint.path)).toEqual([
      '/',
      '/:id',
      '/by-barcode/:barcode',
      '/',
      '/:id',
      '/:id',
    ]);
  });
});
