import type { RouteDefinition, UiNode } from '@ankhorage/contracts';
import { describe, expect, test } from 'bun:test';

import { CATEGORY_PRESETS, createStarterTemplate, type TemplateSeed } from '../src/index';

function createFoodDrinkSeed(): TemplateSeed {
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

function createManifest() {
  return createStarterTemplate(createFoodDrinkSeed(), {
    templateId: 'nutrition-catalog-scan',
  });
}

function findRoute(routes: readonly RouteDefinition[], name: string) {
  return routes.find((route) => route.name === name);
}

function findNodeById(node: UiNode, id: string): UiNode | undefined {
  if (node.id === id) return node;
  for (const child of node.children ?? []) {
    const match = findNodeById(child, id);
    if (match) return match;
  }
  return undefined;
}

function nutritionApi() {
  const api = createManifest().infra.apis?.find((candidate) => candidate.id === 'nutrition');
  if (!api || api.protocol !== 'rest' || api.origin !== 'external') {
    throw new Error('Expected canonical external Nutrition REST API.');
  }
  return api;
}

describe('nutrition catalog canonical API', () => {
  test('persists one external API in infra.apis with the real gateway contract', () => {
    const manifest = createManifest();
    const api = nutritionApi();
    const operations = api.endpoints.products?.operations;

    expect(manifest.infra.apis).toHaveLength(1);
    expect(api).toMatchObject({
      id: 'nutrition',
      origin: 'external',
      protocol: 'rest',
      baseUrl: 'https://api.ankhorage.com/v1/nutrition',
      openApi: { url: 'https://api.ankhorage.com/openapi.json' },
    });
    expect(api.endpoints.health?.operations['health.get']).toMatchObject({
      protocol: 'http',
      method: 'GET',
      path: '/health',
    });
    expect(operations?.['products.list']).toMatchObject({
      protocol: 'http',
      method: 'GET',
      path: '/products',
    });
    expect(operations?.['products.read']).toMatchObject({
      protocol: 'http',
      method: 'GET',
      path: '/products/:id',
    });
    expect(operations?.['products.getByBarcode']).toMatchObject({
      protocol: 'http',
      method: 'GET',
      path: '/products/by-barcode/:barcode',
    });
    expect(operations?.['products.create']).toMatchObject({
      protocol: 'http',
      method: 'POST',
      path: '/products',
    });
    expect(operations?.['products.update']).toMatchObject({
      protocol: 'http',
      method: 'PATCH',
      path: '/products/:id',
    });
    expect(operations?.['products.delete']).toMatchObject({
      protocol: 'http',
      method: 'DELETE',
      path: '/products/:id',
    });
  });

  test('does not project APIs into data sources or generated database fields', () => {
    const manifest = createManifest();
    const json = JSON.stringify(manifest);

    expect(Object.keys(manifest.dataSources ?? {})).toEqual([]);
    expect(json).not.toContain('dataSourceId');
    expect(json).not.toContain('nutrition-products');
    expect(json).not.toContain('nutrition_products');
    expect(json).not.toContain('/rest/v1/');
    expect(json).not.toContain('"protocol":"database"');
    expect(json).not.toContain('generatedApis');
  });

  test('binds catalog repeat and detail loader to the same API', () => {
    const manifest = createManifest();
    const productsRoute = findRoute(manifest.navigator.routes, 'products');
    const catalogRoute = productsRoute?.navigator?.routes.find((route) => route.name === 'index');
    const detailRoute = productsRoute?.navigator?.routes.find((route) => route.name === '[id]');
    const catalogScreen = catalogRoute?.screenId
      ? manifest.screens[catalogRoute.screenId]
      : undefined;
    const detailScreen = detailRoute?.screenId ? manifest.screens[detailRoute.screenId] : undefined;
    const productsGrid = catalogScreen
      ? findNodeById(catalogScreen.root, 'food_drink-nutrition-catalog-scan-products-grid')
      : undefined;
    const imageRefs = detailScreen
      ? findNodeById(detailScreen.root, 'food_drink-nutrition-catalog-scan-detail-image-ref-list')
      : undefined;

    expect(productsGrid?.repeat?.source).toEqual({
      kind: 'operation',
      operation: {
        apiId: 'nutrition',
        endpointId: 'products',
        operationId: 'products.list',
      },
      path: 'products',
    });
    expect(detailScreen?.dataLoaders).toEqual([
      {
        kind: 'operation',
        id: 'product-detail',
        operation: {
          apiId: 'nutrition',
          endpointId: 'products',
          operationId: 'products.read',
        },
        input: {
          id: {
            kind: 'source',
            source: { kind: 'context', path: 'route.params.id' },
          },
        },
      },
    ]);
    expect(imageRefs?.repeat?.source).toEqual({
      kind: 'operation',
      operation: {
        apiId: 'nutrition',
        endpointId: 'products',
        operationId: 'products.read',
      },
      path: 'product.imageRefs',
    });
  });

  test('uses the canonical API for barcode lookup and navigation', () => {
    const manifest = createManifest();
    const scanner =
      manifest.dataBindings?.['food_drink-nutrition-catalog-scan-scan-scanner']?.events;
    const scanned = scanner?.barcodeScanned;
    const manual = scanner?.manualEntry;

    expect(scanned).toHaveLength(3);
    expect(manual).toHaveLength(3);
    expect(scanned?.[0]?.target).toEqual({
      kind: 'operation',
      operation: {
        apiId: 'nutrition',
        endpointId: 'products',
        operationId: 'products.getByBarcode',
      },
    });
    expect(scanned?.[1]?.when?.source).toEqual({
      kind: 'operation',
      operation: {
        apiId: 'nutrition',
        endpointId: 'products',
        operationId: 'products.getByBarcode',
      },
      path: 'product.id',
    });
    expect(scanned?.[2]?.input?.route).toEqual({ kind: 'literal', value: '/products/create' });
    expect(manual?.[0]?.target).toEqual(scanned?.[0]?.target);
  });

  test('creates products over HTTP and reads wrapped response fields', () => {
    const manifest = createManifest();
    const createBindings =
      manifest.dataBindings?.['food_drink-nutrition-catalog-scan-create-submit-button'];
    const detailName =
      manifest.dataBindings?.['food_drink-nutrition-catalog-scan-detail-name-value'];
    const detailBasis =
      manifest.dataBindings?.['food_drink-nutrition-catalog-scan-detail-nutrition-basis-value'];
    const createEvents = createBindings?.events?.press;

    expect(createEvents?.[0]?.target).toEqual({
      kind: 'operation',
      operation: {
        apiId: 'nutrition',
        endpointId: 'products',
        operationId: 'products.create',
      },
    });
    expect(createEvents?.[0]?.input).not.toHaveProperty('normalizedBarcode');
    expect(createEvents?.[1]?.when?.source).toEqual({
      kind: 'operation',
      operation: {
        apiId: 'nutrition',
        endpointId: 'products',
        operationId: 'products.create',
      },
      path: 'product.id',
    });
    expect(detailName?.props?.title?.source).toEqual({
      kind: 'operation',
      operation: {
        apiId: 'nutrition',
        endpointId: 'products',
        operationId: 'products.read',
      },
      path: 'product.name',
    });
    expect(detailBasis?.props?.title?.source).toEqual({
      kind: 'operation',
      operation: {
        apiId: 'nutrition',
        endpointId: 'products',
        operationId: 'products.read',
      },
      path: 'product.nutritionFacts.basis',
    });
  });
});
