import type { AppManifest } from '@ankhorage/contracts';

export function createNutritionCatalogScanDataSources(): NonNullable<AppManifest['dataSources']> {
  return {
    'nutrition-api': {
      id: 'nutrition-api',
      kind: 'rest',
      name: 'Nutrition API',
      description: 'Runtime data-source bindings for product browsing, lookup, and creation.',
      baseUrl: 'https://api.ankhorage.com/v1/nutrition',
      endpoints: {
        products: {
          id: 'products',
          kind: 'http',
          path: '/products',
          operations: {
            'products.list': {
              id: 'products.list',
              endpointId: 'products',
              name: 'List products',
              description: 'Lists catalog products for the products grid.',
              protocol: 'http',
              intent: 'read',
              method: 'GET',
              path: '/',
            },
            'products.read': {
              id: 'products.read',
              endpointId: 'products',
              name: 'Read product detail',
              description: 'Reads a single product detail entry by ID.',
              protocol: 'http',
              intent: 'read',
              method: 'GET',
              path: '/:id',
            },
            'products.lookupByBarcode': {
              id: 'products.lookupByBarcode',
              endpointId: 'products',
              name: 'Lookup product by barcode',
              description: 'Looks up a product by scanned barcode.',
              protocol: 'http',
              intent: 'read',
              method: 'GET',
              path: '/by-barcode/:barcode',
            },
            'products.create': {
              id: 'products.create',
              endpointId: 'products',
              name: 'Create product capture',
              description: 'Creates a missing-product capture from the create screen.',
              protocol: 'http',
              intent: 'create',
              method: 'POST',
              path: '/captures',
            },
          },
        },
      },
    },
  };
}
