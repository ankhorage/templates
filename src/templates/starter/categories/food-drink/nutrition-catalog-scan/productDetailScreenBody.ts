import type { BindingOperationRef } from '@ankhorage/contracts';

import { createSection, createZoraNode, type ZoraNode } from '../../../../shared';

export const nutritionProductDetailOperation = {
  apiId: 'nutrition',
  endpointId: 'products',
  operationId: 'products.read',
} as const satisfies BindingOperationRef;

function createDetailValueCard(args: {
  readonly id: string;
  readonly label: string;
  readonly placeholder: string;
}): ZoraNode {
  return createZoraNode(args.id, 'Card', {
    eyebrow: args.label,
    title: args.placeholder,
    tone: 'outline',
  });
}

const DETAIL_FIELDS = [
  ['name', 'Name', 'Loading name...'],
  ['brand', 'Brand', 'Loading brand...'],
  ['package-label', 'Package label', 'Loading package label...'],
  ['barcode', 'Barcode', 'Loading barcode...'],
  ['barcode-type', 'Barcode type', 'Loading barcode type...'],
  ['created-at', 'Created at', 'Loading created timestamp...'],
  ['updated-at', 'Updated at', 'Loading updated timestamp...'],
] as const;

const NUTRITION_FIELDS = [
  ['nutrition-basis', 'Basis', 'Loading basis...'],
  ['energy-kj', 'Energy (kJ)', 'Loading energy...'],
  ['energy-kcal', 'Energy (kcal)', 'Loading energy...'],
  ['fat-g', 'Fat (g)', 'Loading fat...'],
  ['saturated-fat-g', 'Saturated fat (g)', 'Loading saturated fat...'],
  ['carbohydrates-g', 'Carbohydrates (g)', 'Loading carbohydrates...'],
  ['sugars-g', 'Sugars (g)', 'Loading sugars...'],
  ['fiber-g', 'Fiber (g)', 'Loading fiber...'],
  ['protein-g', 'Protein (g)', 'Loading protein...'],
  ['salt-g', 'Salt (g)', 'Loading salt...'],
] as const;

function createValueCards(
  idPrefix: string,
  fields: readonly (readonly [string, string, string])[],
): ZoraNode[] {
  return fields.map(([id, label, placeholder]) =>
    createDetailValueCard({ id: `${idPrefix}-detail-${id}-value`, label, placeholder }),
  );
}

function createImageRefList(idPrefix: string): ZoraNode {
  return {
    id: `${idPrefix}-detail-image-ref-list`,
    type: 'Panel',
    props: {
      title: 'Product images',
      description: 'Each block reflects one image ref returned by the Nutrition API.',
      tone: 'subtle',
    },
    repeat: {
      source: {
        kind: 'operation',
        operation: nutritionProductDetailOperation,
        path: 'product.imageRefs',
      },
      itemAlias: 'imageRef',
      keyPath: 'path',
    },
    children: [
      createDetailValueCard({
        id: `${idPrefix}-detail-image-ref-kind-value`,
        label: 'Kind',
        placeholder: 'Loading image kind...',
      }),
      createDetailValueCard({
        id: `${idPrefix}-detail-image-ref-bucket-value`,
        label: 'Bucket',
        placeholder: 'Loading bucket...',
      }),
      createDetailValueCard({
        id: `${idPrefix}-detail-image-ref-path-value`,
        label: 'Path',
        placeholder: 'Loading path...',
      }),
      createDetailValueCard({
        id: `${idPrefix}-detail-image-ref-public-url-value`,
        label: 'Public URL',
        placeholder: 'Loading image URL...',
      }),
    ],
  };
}

export function createNutritionProductDetailBody(idPrefix: string): ZoraNode[] {
  return [
    createSection(
      `${idPrefix}-detail-summary-section`,
      {
        title: 'Product details',
        description: 'Loaded through the Nutrition API using the current route parameter ID.',
      },
      createValueCards(idPrefix, DETAIL_FIELDS),
    ),
    createSection(
      `${idPrefix}-detail-nutrition-section`,
      {
        title: 'Nutrition facts',
        description: 'Bindings read the cached Nutrition API product response.',
      },
      createValueCards(idPrefix, NUTRITION_FIELDS),
    ),
    createSection(
      `${idPrefix}-detail-images-section`,
      {
        title: 'Image refs',
        description: 'Product image refs render from the cached Nutrition API response.',
      },
      [createImageRefList(idPrefix)],
    ),
  ];
}
