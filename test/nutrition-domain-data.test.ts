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
    primaryColor: preset.recommendedPrimaryColors[0],
    harmony: preset.recommendedHarmonies[0],
  };
}

function createNutritionApi() {
  const { manifest } = createStarterTemplate(createSeed(), {
    templateId: 'nutrition-catalog-scan',
  });
  const api = manifest.infra.apis?.find((candidate) => candidate.id === 'nutrition');
  if (api?.origin !== 'external' || api.protocol !== 'rest') {
    throw new Error('Expected external Nutrition REST API.');
  }
  return api;
}

describe('nutrition domain API manifest', () => {
  test('declares one canonical remote nutrition domain', () => {
    const api = createNutritionApi();

    expect(api.baseUrl).toBe('https://api.ankhorage.com/v1/nutrition');
    expect(api.schemas?.NutritionProduct).toMatchObject({
      type: 'object',
      required: ['id', 'barcode', 'normalizedBarcode', 'name', 'createdAt', 'updatedAt'],
    });
    expect(api.schemas?.NutritionProduct?.properties).toHaveProperty('packageLabel');
    expect(api.schemas?.NutritionProduct?.properties).toHaveProperty('nutritionFacts');
    expect(api.schemas?.NutritionProduct?.properties).toHaveProperty('imageRefs');
  });

  test('models response and create-image schemas separately', () => {
    const api = createNutritionApi();
    const imageRef = api.schemas?.StorageImageRef;
    const imageInput = api.schemas?.NutritionProductImageInput;

    expect(imageRef?.required).toEqual(['id', 'bucket', 'path']);
    expect(imageInput?.required).toEqual(['bucket', 'path']);
    expect(imageInput?.properties).not.toHaveProperty('id');
    expect(api.schemas?.NutritionProductListResponse?.properties?.products).toEqual({
      type: 'array',
      items: { ref: { id: 'NutritionProduct' } },
    });
    expect(api.schemas?.NutritionProductResponse?.properties?.product).toEqual({
      ref: { id: 'NutritionProduct' },
    });
  });

  test('declares the complete HTTP product operation set', () => {
    const operations = createNutritionApi().endpoints.products?.operations;

    expect(Object.keys(operations ?? {})).toEqual([
      'products.list',
      'products.read',
      'products.getByBarcode',
      'products.create',
      'products.update',
      'products.delete',
    ]);
    expect(
      Object.values(operations ?? {}).every((operation) => operation.protocol === 'http'),
    ).toBe(true);
    expect(
      operations?.['products.create']?.request?.parameters?.map(({ name }) => name),
    ).not.toContain('normalizedBarcode');
  });
});
