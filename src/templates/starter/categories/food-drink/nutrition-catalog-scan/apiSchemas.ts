import type { DataSchema, DataSchemaRegistry } from '@ankhorage/contracts/data';

const nutritionFactsSchema: DataSchema = {
  type: 'object',
  required: ['basis'],
  properties: {
    basis: { type: 'string', enum: ['per_100g', 'per_100ml', 'per_serving'] },
    energyKj: { type: 'number', nullable: true },
    energyKcal: { type: 'number', nullable: true },
    fatG: { type: 'number', nullable: true },
    saturatedFatG: { type: 'number', nullable: true },
    carbohydratesG: { type: 'number', nullable: true },
    sugarsG: { type: 'number', nullable: true },
    fiberG: { type: 'number', nullable: true },
    proteinG: { type: 'number', nullable: true },
    saltG: { type: 'number', nullable: true },
  },
};

const imageProperties = {
  bucket: { type: 'string' },
  path: { type: 'string' },
  kind: {
    type: 'string',
    enum: ['front', 'nutrition_label', 'ingredients', 'barcode', 'other'],
  },
  publicUrl: { type: 'string', format: 'uri', nullable: true },
  width: { type: 'number', nullable: true },
  height: { type: 'number', nullable: true },
  uploadedAt: { type: 'string', format: 'date-time' },
  uploadedByUserId: { type: 'string', nullable: true },
} as const;

const imageRefSchema: DataSchema = {
  type: 'object',
  required: ['id', 'bucket', 'path'],
  properties: { id: { type: 'string' }, ...imageProperties },
};

const imageInputSchema: DataSchema = {
  type: 'object',
  required: ['bucket', 'path'],
  properties: imageProperties,
};

const productSchema: DataSchema = {
  type: 'object',
  required: ['id', 'barcode', 'normalizedBarcode', 'name', 'createdAt', 'updatedAt'],
  properties: {
    id: { type: 'string' },
    barcode: { type: 'string' },
    normalizedBarcode: { type: 'string' },
    barcodeType: {
      type: 'string',
      enum: ['ean_8', 'ean_13', 'upc_a', 'upc_e', 'gtin_14', 'unknown'],
    },
    name: { type: 'string' },
    brand: { type: 'string', nullable: true },
    packageLabel: { type: 'string', nullable: true },
    nutritionFacts: { ref: { id: 'NutritionFacts' }, nullable: true },
    imageRefs: { type: 'array', items: { ref: { id: 'StorageImageRef' } } },
    createdByUserId: { type: 'string', nullable: true },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
    deletedAt: { type: 'string', format: 'date-time', nullable: true },
  },
};

export const nutritionApiSchemas = {
  NutritionFacts: nutritionFactsSchema,
  NutritionProductImageInput: imageInputSchema,
  StorageImageRef: imageRefSchema,
  NutritionProduct: productSchema,
  NutritionProductListResponse: {
    type: 'object',
    required: ['products'],
    properties: {
      products: { type: 'array', items: { ref: { id: 'NutritionProduct' } } },
    },
  },
  NutritionProductResponse: {
    type: 'object',
    required: ['product'],
    properties: { product: { ref: { id: 'NutritionProduct' } } },
  },
} as const satisfies DataSchemaRegistry;
