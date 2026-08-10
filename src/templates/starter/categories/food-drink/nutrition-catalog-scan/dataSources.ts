import type { AppManifest, GeneratedApiDefinition } from '@ankhorage/contracts';
import { createGeneratedApiDataSource } from '@ankhorage/data-sources';

export function createNutritionCatalogScanDataSources(
  generatedApi: GeneratedApiDefinition,
): NonNullable<AppManifest['dataSources']> {
  const generated = createGeneratedApiDataSource(generatedApi);
  if (!generated.ok) {
    const message = generated.diagnostics.map((diagnostic) => diagnostic.message).join('; ');
    throw new Error(`Invalid nutrition generated API: ${message}`);
  }

  return {
    [generatedApi.id]: generated.data,
    'nutrition-api': {
      id: 'nutrition-api',
      kind: 'api',
      origin: 'external',
      protocol: 'rest',
      name: 'Nutrition lookup API',
      description: 'External health and barcode lookup operations not covered by generated CRUD.',
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
              description: 'Checks whether the nutrition lookup API is available.',
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
              description: 'Looks up a product by scanned barcode.',
              protocol: 'http',
              intent: 'read',
              method: 'GET',
              path: '/products/by-barcode/:barcode',
            },
          },
        },
      },
    },
  };
}
