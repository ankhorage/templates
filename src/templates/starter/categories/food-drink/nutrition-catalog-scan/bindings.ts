import type { AppManifest, BindingOperationRef } from '@ankhorage/contracts';

const productLookupOperation = {
  dataSourceId: 'nutrition-api',
  endpointId: 'products',
  operationId: 'products.lookupByBarcode',
} as const satisfies BindingOperationRef;

function createProductCardBinding(args: {
  readonly componentId: string;
}): NonNullable<AppManifest['dataBindings']>[string] {
  return {
    componentId: args.componentId,
    componentType: 'ProductCard',
    props: {
      title: {
        source: {
          kind: 'context',
          path: 'item.name',
        },
      },
      brand: {
        source: {
          kind: 'context',
          path: 'item.brand',
        },
      },
      subtitle: {
        source: {
          kind: 'context',
          path: 'item.quantity',
        },
      },
      description: {
        source: {
          kind: 'context',
          path: 'item.barcode',
        },
      },
    },
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
                  kind: 'source',
                  source: {
                    kind: 'context',
                    path: 'item.id',
                  },
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
    [`${idPrefix}-product-card-template`]: createProductCardBinding({
      componentId: `${idPrefix}-product-card-template`,
    }),
  };
}
