import type { AppManifest, BindingOperationRef, EventBinding } from '@ankhorage/contracts';

const productLookupOperation = {
  dataSourceId: 'nutrition-api',
  endpointId: 'products',
  operationId: 'nutrition.products.getByBarcode',
} as const satisfies BindingOperationRef;

const productCreateOperation = {
  dataSourceId: 'nutrition-api',
  endpointId: 'products',
  operationId: 'nutrition.products.create',
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
          path: 'item.packageLabel',
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

function createLookupNavigationBindings(barcodeSourcePath: string): readonly EventBinding[] {
  return [
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
            path: barcodeSourcePath,
          },
          transforms: ['trim'],
        },
      },
      when: {
        source: {
          kind: 'event',
          path: barcodeSourcePath,
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
          path: 'id',
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
                path: 'id',
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
          path: 'id',
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
                path: barcodeSourcePath,
              },
              transforms: ['trim'],
            },
          },
        },
      },
    },
  ];
}

function createProductCreateBinding(
  componentId: string,
): NonNullable<AppManifest['dataBindings']>[string] {
  return {
    componentId,
    componentType: 'Button',
    events: {
      press: [
        {
          target: {
            kind: 'operation',
            operation: productCreateOperation,
          },
          input: {
            barcode: {
              kind: 'source',
              source: {
                kind: 'state',
                path: 'forms.products.create.barcode',
              },
              transforms: ['trim'],
            },
            name: {
              kind: 'source',
              source: {
                kind: 'state',
                path: 'forms.products.create.name',
              },
              transforms: ['trim'],
            },
            brand: {
              kind: 'source',
              source: {
                kind: 'state',
                path: 'forms.products.create.brand',
              },
              transforms: ['trim'],
            },
            packageLabel: {
              kind: 'source',
              source: {
                kind: 'state',
                path: 'forms.products.create.packageLabel',
              },
              transforms: ['trim'],
            },
            nutritionFacts: {
              kind: 'source',
              source: {
                kind: 'state',
                path: 'forms.products.create.nutritionFacts',
              },
            },
            imageRefs: {
              kind: 'source',
              source: {
                kind: 'state',
                path: 'forms.products.create.imageRefs',
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
              operation: productCreateOperation,
              path: 'id',
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
                    operation: productCreateOperation,
                    path: 'id',
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
              operation: productCreateOperation,
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
                    operation: productCreateOperation,
                    path: 'product.id',
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
        barcodeScanned: createLookupNavigationBindings('payload.value'),
        manualEntry: createLookupNavigationBindings('payload.value'),
      },
    },
    [`${idPrefix}-create-submit-button`]: createProductCreateBinding(
      `${idPrefix}-create-submit-button`,
    ),
    [`${idPrefix}-product-card-template`]: createProductCardBinding({
      componentId: `${idPrefix}-product-card-template`,
    }),
  };
}
