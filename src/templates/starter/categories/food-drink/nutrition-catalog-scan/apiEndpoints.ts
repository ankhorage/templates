import type { DataEndpointRegistry, DataOperationParameter } from '@ankhorage/contracts/data';

const productBodyParameters: readonly DataOperationParameter[] = [
  { name: 'barcode', location: 'body', required: true, schema: { type: 'string' } },
  {
    name: 'barcodeType',
    location: 'body',
    schema: {
      type: 'string',
      enum: ['ean_8', 'ean_13', 'upc_a', 'upc_e', 'gtin_14', 'unknown'],
    },
  },
  { name: 'name', location: 'body', required: true, schema: { type: 'string' } },
  { name: 'brand', location: 'body', schema: { type: 'string', nullable: true } },
  { name: 'packageLabel', location: 'body', schema: { type: 'string', nullable: true } },
  { name: 'nutritionFacts', location: 'body', schemaRef: { id: 'NutritionFacts' } },
  {
    name: 'imageRefs',
    location: 'body',
    schema: { type: 'array', items: { ref: { id: 'NutritionProductImageInput' } } },
  },
];

const productIdParameter: DataOperationParameter = {
  name: 'id',
  location: 'path',
  required: true,
  schema: { type: 'string' },
};

export const nutritionApiEndpoints = {
  health: {
    id: 'health',
    kind: 'http',
    path: '/health',
    operations: {
      'health.get': {
        id: 'health.get',
        endpointId: 'health',
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
      'products.list': {
        id: 'products.list',
        endpointId: 'products',
        name: 'List nutrition products',
        protocol: 'http',
        intent: 'read',
        method: 'GET',
        path: '/products',
        request: {
          parameters: [
            { name: 'limit', location: 'query', schema: { type: 'integer' }, default: 50 },
            { name: 'offset', location: 'query', schema: { type: 'integer' }, default: 0 },
          ],
        },
        response: { schemaRef: { id: 'NutritionProductListResponse' } },
        pagination: { kind: 'limit-offset', limitParameter: 'limit', offsetParameter: 'offset' },
      },
      'products.read': {
        id: 'products.read',
        endpointId: 'products',
        name: 'Get nutrition product by ID',
        protocol: 'http',
        intent: 'read',
        method: 'GET',
        path: '/products/:id',
        request: { parameters: [productIdParameter] },
        response: { schemaRef: { id: 'NutritionProductResponse' } },
      },
      'products.getByBarcode': {
        id: 'products.getByBarcode',
        endpointId: 'products',
        name: 'Get nutrition product by barcode',
        protocol: 'http',
        intent: 'read',
        method: 'GET',
        path: '/products/by-barcode/:barcode',
        request: {
          parameters: [
            {
              name: 'barcode',
              location: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
        },
        response: { schemaRef: { id: 'NutritionProductResponse' } },
      },
      'products.create': {
        id: 'products.create',
        endpointId: 'products',
        name: 'Create nutrition product',
        protocol: 'http',
        intent: 'create',
        method: 'POST',
        path: '/products',
        request: { parameters: productBodyParameters, contentType: 'application/json' },
        response: { status: 201, schemaRef: { id: 'NutritionProductResponse' } },
      },
      'products.update': {
        id: 'products.update',
        endpointId: 'products',
        name: 'Update nutrition product',
        protocol: 'http',
        intent: 'update',
        method: 'PATCH',
        path: '/products/:id',
        request: {
          parameters: [
            productIdParameter,
            ...productBodyParameters.map((parameter) => ({ ...parameter, required: false })),
          ],
          contentType: 'application/json',
        },
        response: { schemaRef: { id: 'NutritionProductResponse' } },
      },
      'products.delete': {
        id: 'products.delete',
        endpointId: 'products',
        name: 'Delete nutrition product',
        protocol: 'http',
        intent: 'delete',
        method: 'DELETE',
        path: '/products/:id',
        request: { parameters: [productIdParameter] },
        response: { schemaRef: { id: 'NutritionProductResponse' } },
      },
    },
  },
} as const satisfies DataEndpointRegistry;
