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
        health: {
          id: 'health',
          kind: 'http',
          path: '/health',
          operations: {
            'nutrition.health': {
              id: 'nutrition.health',
              endpointId: 'health',
              name: 'Nutrition health',
              description: 'Checks whether the nutrition API is available.',
              protocol: 'http',
              intent: 'read',
              method: 'GET',
              path: '/health',
            },
          },
        },
        products: {
          id: 'products',
          kind: 'http',
          path: '/products',
          operations: {
            'nutrition.products.list': {
              id: 'nutrition.products.list',
              endpointId: 'products',
              name: 'List products',
              description: 'Lists catalog products for the products grid.',
              protocol: 'http',
              intent: 'read',
              method: 'GET',
              path: '/products',
            },
            'nutrition.products.getById': {
              id: 'nutrition.products.getById',
              endpointId: 'products',
              name: 'Read product detail',
              description: 'Reads a single product detail entry by ID.',
              protocol: 'http',
              intent: 'read',
              method: 'GET',
              path: '/products/:id',
            },
            'nutrition.products.getByBarcode': {
              id: 'nutrition.products.getByBarcode',
              endpointId: 'products',
              name: 'Lookup product by barcode',
              description: 'Looks up a product by scanned barcode.',
              protocol: 'http',
              intent: 'read',
              method: 'GET',
              path: '/products/by-barcode/:barcode',
            },
            'nutrition.products.create': {
              id: 'nutrition.products.create',
              endpointId: 'products',
              name: 'Create nutrition product',
              description: 'Creates a product directly from the create screen.',
              protocol: 'http',
              intent: 'create',
              method: 'POST',
              path: '/products',
            },
            'nutrition.products.update': {
              id: 'nutrition.products.update',
              endpointId: 'products',
              name: 'Update nutrition product',
              description: 'Updates an existing product by ID.',
              protocol: 'http',
              intent: 'update',
              method: 'PATCH',
              path: '/products/:id',
            },
            'nutrition.products.delete': {
              id: 'nutrition.products.delete',
              endpointId: 'products',
              name: 'Delete nutrition product',
              description: 'Soft deletes a product by ID.',
              protocol: 'http',
              intent: 'delete',
              method: 'DELETE',
              path: '/products/:id',
            },
          },
        },
      },
    },
  };
}
