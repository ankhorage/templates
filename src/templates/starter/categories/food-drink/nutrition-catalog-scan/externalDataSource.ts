import type { ExternalRestApiDataSourceConfig } from '@ankhorage/contracts';

export function createNutritionCatalogScanExternalDataSource(): ExternalRestApiDataSourceConfig {
  return {
    id: 'nutrition-api',
    kind: 'api',
    origin: 'external',
    protocol: 'rest',
    name: 'Nutrition lookup API',
    description: 'External health and barcode lookup operations outside generated CRUD.',
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
          'nutrition.products.getByBarcode': {
            id: 'nutrition.products.getByBarcode',
            endpointId: 'products',
            name: 'Lookup product by barcode',
            protocol: 'http',
            intent: 'read',
            method: 'GET',
            path: '/products/by-barcode/:barcode',
          },
        },
      },
    },
  };
}
