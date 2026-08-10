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
  test('declares canonical generated API desired state and projection', () => {
    const manifest = createStarterTemplate(createSeed(), {
      templateId: 'nutrition-catalog-scan',
    });
    const generated = manifest.generatedApis?.['nutrition-products'];
    const projection = manifest.dataSources?.['nutrition-products'];

    expect(manifest).not.toHaveProperty('data');
    expect(generated?.basePath).toBe('/v1/nutrition');
    expect(generated?.auth?.required).toBe(true);
    expect(projection).toMatchObject({
      id: 'nutrition-products',
      kind: 'api',
      origin: 'generated',
      protocol: 'rest',
      generatedApiId: 'nutrition-products',
    });
  });

  test('declares the product collection and canonical CRUD operations', () => {
    const manifest = createStarterTemplate(createSeed(), {
      templateId: 'nutrition-catalog-scan',
    });
    const resource = manifest.generatedApis?.['nutrition-products']?.resources[0];
    const endpoint = manifest.dataSources?.['nutrition-products']?.endpoints.products;

    expect(resource?.collection.name).toBe('nutrition_products');
    expect(resource?.collection.fields.map((field) => field.name)).toContain('barcode');
    expect(resource?.collection.fields.map((field) => field.name)).toContain('packageLabel');
    expect(resource?.collection.fields.map((field) => field.name)).toContain('nutritionFacts');
    expect(resource?.collection.fields.map((field) => field.name)).toContain('imageRefs');
    expect(resource?.operations).toEqual(['list', 'read', 'create', 'update', 'delete']);
    expect(Object.keys(endpoint?.operations ?? {})).toEqual([
      'products.list',
      'products.read',
      'products.create',
      'products.update',
      'products.delete',
    ]);
  });

  test('keeps only custom health and barcode lookup on the external API', () => {
    const manifest = createStarterTemplate(createSeed(), {
      templateId: 'nutrition-catalog-scan',
    });
    const external = manifest.dataSources?.['nutrition-api'];

    expect(external).toMatchObject({ kind: 'api', origin: 'external', protocol: 'rest' });
    expect(Object.keys(external?.endpoints.health?.operations ?? {})).toEqual(['nutrition.health']);
    expect(Object.keys(external?.endpoints.products?.operations ?? {})).toEqual([
      'nutrition.products.getByBarcode',
    ]);
  });
});
