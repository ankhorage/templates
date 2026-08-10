import type { AppManifest, BindingOperationRef, EventBinding } from '@ankhorage/contracts';

const productLookupOperation = {
  dataSourceId: 'nutrition-api',
  endpointId: 'products',
  operationId: 'nutrition.products.getByBarcode',
} as const satisfies BindingOperationRef;

const productCreateOperation = {
  dataSourceId: 'nutrition-products',
  endpointId: 'products',
  operationId: 'products.create',
} as const satisfies BindingOperationRef;

const productDetailOperation = {
  dataSourceId: 'nutrition-products',
  endpointId: 'products',
  operationId: 'products.read',
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

function createDetailTextBinding(args: {
  readonly componentId: string;
  readonly path: string;
}): NonNullable<AppManifest['dataBindings']>[string] {
  return {
    componentId: args.componentId,
    componentType: 'Card',
    props: {
      title: {
        source: {
          kind: 'operation',
          operation: productDetailOperation,
          path: args.path,
        },
      },
    },
  };
}

function createImageRefTextBinding(args: {
  readonly componentId: string;
  readonly path: string;
}): NonNullable<AppManifest['dataBindings']>[string] {
  return {
    componentId: args.componentId,
    componentType: 'Card',
    props: {
      title: {
        source: {
          kind: 'context',
          path: `imageRef.${args.path}`,
        },
      },
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
    [`${idPrefix}-detail-name-value`]: createDetailTextBinding({
      componentId: `${idPrefix}-detail-name-value`,
      path: 'product.name',
    }),
    [`${idPrefix}-detail-brand-value`]: createDetailTextBinding({
      componentId: `${idPrefix}-detail-brand-value`,
      path: 'product.brand',
    }),
    [`${idPrefix}-detail-package-label-value`]: createDetailTextBinding({
      componentId: `${idPrefix}-detail-package-label-value`,
      path: 'product.packageLabel',
    }),
    [`${idPrefix}-detail-barcode-value`]: createDetailTextBinding({
      componentId: `${idPrefix}-detail-barcode-value`,
      path: 'product.barcode',
    }),
    [`${idPrefix}-detail-barcode-type-value`]: createDetailTextBinding({
      componentId: `${idPrefix}-detail-barcode-type-value`,
      path: 'product.barcodeType',
    }),
    [`${idPrefix}-detail-created-at-value`]: createDetailTextBinding({
      componentId: `${idPrefix}-detail-created-at-value`,
      path: 'product.createdAt',
    }),
    [`${idPrefix}-detail-updated-at-value`]: createDetailTextBinding({
      componentId: `${idPrefix}-detail-updated-at-value`,
      path: 'product.updatedAt',
    }),
    [`${idPrefix}-detail-nutrition-basis-value`]: createDetailTextBinding({
      componentId: `${idPrefix}-detail-nutrition-basis-value`,
      path: 'product.nutritionFacts.basis',
    }),
    [`${idPrefix}-detail-energy-kj-value`]: createDetailTextBinding({
      componentId: `${idPrefix}-detail-energy-kj-value`,
      path: 'product.nutritionFacts.energyKj',
    }),
    [`${idPrefix}-detail-energy-kcal-value`]: createDetailTextBinding({
      componentId: `${idPrefix}-detail-energy-kcal-value`,
      path: 'product.nutritionFacts.energyKcal',
    }),
    [`${idPrefix}-detail-fat-g-value`]: createDetailTextBinding({
      componentId: `${idPrefix}-detail-fat-g-value`,
      path: 'product.nutritionFacts.fatG',
    }),
    [`${idPrefix}-detail-saturated-fat-g-value`]: createDetailTextBinding({
      componentId: `${idPrefix}-detail-saturated-fat-g-value`,
      path: 'product.nutritionFacts.saturatedFatG',
    }),
    [`${idPrefix}-detail-carbohydrates-g-value`]: createDetailTextBinding({
      componentId: `${idPrefix}-detail-carbohydrates-g-value`,
      path: 'product.nutritionFacts.carbohydratesG',
    }),
    [`${idPrefix}-detail-sugars-g-value`]: createDetailTextBinding({
      componentId: `${idPrefix}-detail-sugars-g-value`,
      path: 'product.nutritionFacts.sugarsG',
    }),
    [`${idPrefix}-detail-fiber-g-value`]: createDetailTextBinding({
      componentId: `${idPrefix}-detail-fiber-g-value`,
      path: 'product.nutritionFacts.fiberG',
    }),
    [`${idPrefix}-detail-protein-g-value`]: createDetailTextBinding({
      componentId: `${idPrefix}-detail-protein-g-value`,
      path: 'product.nutritionFacts.proteinG',
    }),
    [`${idPrefix}-detail-salt-g-value`]: createDetailTextBinding({
      componentId: `${idPrefix}-detail-salt-g-value`,
      path: 'product.nutritionFacts.saltG',
    }),
    [`${idPrefix}-detail-image-ref-kind-value`]: createImageRefTextBinding({
      componentId: `${idPrefix}-detail-image-ref-kind-value`,
      path: 'kind',
    }),
    [`${idPrefix}-detail-image-ref-bucket-value`]: createImageRefTextBinding({
      componentId: `${idPrefix}-detail-image-ref-bucket-value`,
      path: 'bucket',
    }),
    [`${idPrefix}-detail-image-ref-path-value`]: createImageRefTextBinding({
      componentId: `${idPrefix}-detail-image-ref-path-value`,
      path: 'path',
    }),
    [`${idPrefix}-detail-image-ref-public-url-value`]: createImageRefTextBinding({
      componentId: `${idPrefix}-detail-image-ref-public-url-value`,
      path: 'publicUrl',
    }),
  };
}
