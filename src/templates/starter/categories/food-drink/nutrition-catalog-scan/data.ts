import type { AppManifest } from '@ankhorage/contracts';

const authRequired = { required: true } as const;

export const nutritionCatalogScanData = {
  apis: {
    nutritionProducts: {
      id: 'nutritionProducts',
      kind: 'generated',
      preset: 'crud',
      label: 'Nutrition products',
      description: 'Nutrition product records available to the scanner app through the gateway.',
      basePath: '/v1/nutrition/products',
      auth: authRequired,
      resource: {
        kind: 'collection',
        collection: {
          name: 'nutrition_products',
          schema: 'public',
          primaryKey: 'id',
          fields: [
            { name: 'id', type: 'uuid', required: true },
            { name: 'barcode', type: 'text', required: true, unique: true },
            { name: 'normalizedBarcode', type: 'text', required: true, unique: true },
            { name: 'barcodeType', type: 'text' },
            { name: 'name', type: 'text', required: true },
            { name: 'brand', type: 'text' },
            { name: 'packageLabel', type: 'text' },
            { name: 'nutritionFacts', type: 'json' },
            { name: 'imageRefs', type: 'json' },
            { name: 'createdByUserId', type: 'uuid' },
            { name: 'createdAt', type: 'datetime', required: true },
            { name: 'updatedAt', type: 'datetime', required: true },
            { name: 'deletedAt', type: 'datetime' },
          ],
        },
      },
      endpoints: [
        {
          id: 'listNutritionProducts',
          label: 'List products',
          method: 'GET',
          path: '/',
          intent: 'list',
          auth: authRequired,
        },
        {
          id: 'getNutritionProductById',
          label: 'Get product',
          method: 'GET',
          path: '/:id',
          intent: 'read',
          auth: authRequired,
        },
        {
          id: 'getNutritionProductByBarcode',
          label: 'Get product by barcode',
          method: 'GET',
          path: '/by-barcode/:barcode',
          intent: 'read',
          auth: authRequired,
        },
        {
          id: 'createNutritionProduct',
          label: 'Create product',
          method: 'POST',
          path: '/',
          intent: 'create',
          auth: authRequired,
        },
        {
          id: 'updateNutritionProduct',
          label: 'Update product',
          method: 'PATCH',
          path: '/:id',
          intent: 'update',
          auth: authRequired,
        },
        {
          id: 'deleteNutritionProduct',
          label: 'Delete product',
          method: 'DELETE',
          path: '/:id',
          intent: 'delete',
          auth: authRequired,
        },
      ],
    },
  },
} satisfies AppManifest['data'];
