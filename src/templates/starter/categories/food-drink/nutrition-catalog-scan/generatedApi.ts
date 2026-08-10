import type { GeneratedApiDefinition } from '@ankhorage/contracts';

export function createNutritionCatalogScanGeneratedApi(): GeneratedApiDefinition {
  return {
    id: 'nutrition-products',
    protocol: 'rest',
    name: 'Nutrition products',
    description: 'Generated CRUD data for the nutrition scanner product catalog.',
    basePath: '/v1/nutrition',
    database: {
      id: 'primary-db',
      kind: 'database',
    },
    auth: { required: true },
    resources: [
      {
        id: 'products',
        name: 'Products',
        path: '/products',
        collection: {
          name: 'nutrition_products',
          schema: 'public',
          primaryKey: 'id',
          fields: [
            { name: 'id', type: 'uuid', required: true, unique: true },
            { name: 'barcode', type: 'text', required: true, unique: true },
            { name: 'normalizedBarcode', type: 'text', required: true, unique: true },
            { name: 'barcodeType', type: 'text' },
            { name: 'name', type: 'text', required: true },
            { name: 'brand', type: 'text' },
            { name: 'packageLabel', type: 'text' },
            { name: 'nutritionFacts', type: 'json' },
            { name: 'imageRefs', type: 'json' },
            { name: 'createdByUserId', type: 'uuid' },
            { name: 'createdAt', type: 'datetime' },
            { name: 'updatedAt', type: 'datetime' },
            { name: 'deletedAt', type: 'datetime' },
          ],
        },
        operations: ['list', 'read', 'create', 'update', 'delete'],
      },
    ],
  };
}
