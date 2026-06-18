import type { AppManifest } from '@ankhorage/contracts';

export function createNutritionCatalogScanDataSources(): NonNullable<AppManifest['dataSources']> {
  return {
    'nutrition-api': {
      id: 'nutrition-api',
      kind: 'rest',
      name: 'Nutrition API',
      description: 'Runtime data-source bindings for nutrition product browsing, lookup, and CRUD.',
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
              name: 'Create nutrition product',
              description: 'Creates a product directly from the create screen.',
              protocol: 'http',
              intent: 'create',
              method: 'POST',
              path: '/',
            },
            'products.update': {
              id: 'products.update',
              endpointId: 'products',
              name: 'Update nutrition product',
              description: 'Updates an existing product by ID.',
              protocol: 'http',
              intent: 'update',
              method: 'PATCH',
              path: '/:id',
            },
            'products.delete': {
              id: 'products.delete',
              endpointId: 'products',
              name: 'Delete nutrition product',
              description: 'Soft deletes a product by ID.',
              protocol: 'http',
              intent: 'delete',
              method: 'DELETE',
              path: '/:id',
            },
          },
        },
      },
    },
  };
}
