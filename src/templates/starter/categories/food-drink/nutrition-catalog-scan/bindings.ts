import type { AppManifest, BindingOperationRef } from '@ankhorage/contracts';

const productLookupOperation = {
  dataSourceId: 'nutrition-api',
  endpointId: 'products',
  operationId: 'products.lookupByBarcode',
} as const satisfies BindingOperationRef;

interface ProductPreview {
  readonly productId: string;
  readonly title: string;
  readonly brand: string;
  readonly description: string;
}

const yogurtPreview: ProductPreview = {
  productId: 'bio-greek-yogurt-250g',
  title: 'Bio Greek Yogurt 250 g',
  brand: 'Migros',
  description: '7612345678901 · confidence 92%',
};

const oatDrinkPreview: ProductPreview = {
  productId: 'haferdrink-barista-1l',
  title: 'Haferdrink Barista 1 l',
  brand: 'Coop',
  description: '7612345678918 · confidence 88%',
};

const missingProductPreview: ProductPreview = {
  productId: 'missing-supermarket-product',
  title: 'Missing supermarket product',
  brand: 'Contribution target',
  description: 'Scan a missing barcode to add a product proposal and earn points.',
};

function createProductCardBinding(args: {
  readonly componentId: string;
  readonly fallback: ProductPreview;
}): NonNullable<AppManifest['dataBindings']>[string] {
  return {
    componentId: args.componentId,
    componentType: 'ProductCard',
    events: {
      press: [
        {
          target: {
            kind: 'action',
            type: 'navigate',
          },
          input: {
            route: {
              kind: 'literal',
              value: '/products/[id]',
            },
            params: {
              kind: 'object',
              fields: {
                id: {
                  kind: 'literal',
                  value: args.fallback.productId,
                },
              },
            },
          },
        },
      ],
    },
  };
}

export function createNutritionCatalogScanBindings(
  idPrefix: string,
): NonNullable<AppManifest['dataBindings']> {
  return {
    [`${idPrefix}-scan-scanner`]: {
      componentId: `${idPrefix}-scan-scanner`,
      componentType: 'BarcodeScannerView',
      events: {
        barcodeScanned: [
          {
            target: {
              kind: 'operation',
              operation: productLookupOperation,
            },
            input: {
              barcode: {
                kind: 'source',
                source: {
                  kind: 'event',
                  path: 'payload.value',
                },
                transforms: ['trim'],
              },
            },
            when: {
              source: {
                kind: 'event',
                path: 'payload.value',
              },
              operator: 'exists',
            },
          },
          {
            target: {
              kind: 'action',
              type: 'navigate',
            },
            when: {
              source: {
                kind: 'operation',
                operation: productLookupOperation,
                path: 'product.id',
              },
              operator: 'exists',
            },
            input: {
              route: {
                kind: 'literal',
                value: '/products/[id]',
              },
              params: {
                kind: 'object',
                fields: {
                  id: {
                    kind: 'source',
                    source: {
                      kind: 'operation',
                      operation: productLookupOperation,
                      path: 'product.id',
                    },
                  },
                },
              },
            },
          },
          {
            target: {
              kind: 'action',
              type: 'navigate',
            },
            when: {
              source: {
                kind: 'operation',
                operation: productLookupOperation,
                path: 'product.id',
              },
              operator: 'notExists',
            },
            input: {
              route: {
                kind: 'literal',
                value: '/products/create',
              },
              params: {
                kind: 'object',
                fields: {
                  barcode: {
                    kind: 'source',
                    source: {
                      kind: 'event',
                      path: 'payload.value',
                    },
                    transforms: ['trim'],
                  },
                },
              },
            },
          },
        ],
        manualEntry: [
          {
            target: {
              kind: 'action',
              type: 'navigate',
            },
            input: {
              route: {
                kind: 'literal',
                value: '/products/create',
              },
              params: {
                kind: 'object',
                fields: {
                  barcode: {
                    kind: 'source',
                    source: {
                      kind: 'event',
                      path: 'payload.value',
                    },
                    transforms: ['trim'],
                  },
                },
              },
            },
          },
        ],
      },
    },
    [`${idPrefix}-product-card-yogurt`]: createProductCardBinding({
      componentId: `${idPrefix}-product-card-yogurt`,
      fallback: yogurtPreview,
    }),
    [`${idPrefix}-product-card-oat-drink`]: createProductCardBinding({
      componentId: `${idPrefix}-product-card-oat-drink`,
      fallback: oatDrinkPreview,
    }),
    [`${idPrefix}-product-card-missing`]: createProductCardBinding({
      componentId: `${idPrefix}-product-card-missing`,
      fallback: missingProductPreview,
    }),
  };
}
