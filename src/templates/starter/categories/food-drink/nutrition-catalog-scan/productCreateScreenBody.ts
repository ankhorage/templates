import { createZoraNode, type ZoraNode } from '../../../../shared';

export function createNutritionProductCreateBody(idPrefix: string): ZoraNode[] {
  return [
    createZoraNode(
      `${idPrefix}-create-form-panel`,
      'Panel',
      {
        title: 'Direct product create form',
        description:
          'Create a product through the Nutrition API when barcode lookup finds no match.',
        tone: 'subtle',
      },
      [
        createZoraNode(`${idPrefix}-create-barcode-field`, 'FormField', {
          label: 'Barcode',
          description: 'Prefilled from scan or manual entry and normalized by the Nutrition API.',
          required: true,
        }),
        createZoraNode(`${idPrefix}-create-barcode-input`, 'Input', {
          placeholder: '7612345678901',
          keyboardType: 'number-pad',
          size: 'm',
        }),
        createZoraNode(`${idPrefix}-create-name-field`, 'FormField', {
          label: 'Product name',
          description: 'Required by the Nutrition API create request.',
          required: true,
        }),
        createZoraNode(`${idPrefix}-create-name-input`, 'Input', {
          placeholder: 'Product name',
          size: 'm',
        }),
        createZoraNode(`${idPrefix}-create-brand-field`, 'FormField', {
          label: 'Brand',
          description: 'Optional product brand.',
        }),
        createZoraNode(`${idPrefix}-create-brand-input`, 'Input', {
          placeholder: 'Brand',
          size: 'm',
        }),
        createZoraNode(`${idPrefix}-create-package-label-field`, 'FormField', {
          label: 'Package label',
          description: 'Optional package text such as 500ml or 6 x 33cl.',
        }),
        createZoraNode(`${idPrefix}-create-package-label-input`, 'Input', {
          placeholder: '500ml',
          size: 'm',
        }),
        createZoraNode(`${idPrefix}-create-nutrition-basis-field`, 'FormField', {
          label: 'nutritionFacts.basis',
          description: 'Use per_100g, per_100ml, or per_serving.',
        }),
        createZoraNode(`${idPrefix}-create-nutrition-basis-input`, 'Input', {
          placeholder: 'per_100g',
          autoCapitalize: 'none',
          size: 'm',
        }),
        createZoraNode(`${idPrefix}-create-nutrition-facts-field`, 'FormField', {
          label: 'nutritionFacts',
          description:
            'Structured numeric fields such as energyKcal, proteinG, carbohydratesG, sugarsG, fatG, and saltG.',
        }),
        createZoraNode(`${idPrefix}-create-nutrition-facts-input`, 'Input', {
          placeholder: '{"basis":"per_100g","energyKcal":42,"proteinG":3.4}',
          autoCapitalize: 'none',
          size: 'm',
        }),
        createZoraNode(`${idPrefix}-create-image-refs-field`, 'FormField', {
          label: 'imageRefs',
          description: 'Image inputs contain storage bucket/path plus optional image metadata.',
        }),
        createZoraNode(`${idPrefix}-create-image-refs-input`, 'Input', {
          placeholder: '[{"bucket":"nutrition","path":"products/front.jpg"}]',
          autoCapitalize: 'none',
          size: 'm',
        }),
        createZoraNode(`${idPrefix}-create-duplicate-notice`, 'Notice', {
          title: 'Duplicate barcode handling',
          description:
            'The Nutrition API enforces barcode uniqueness and reports duplicate products as an HTTP conflict.',
        }),
        createZoraNode(`${idPrefix}-create-submit-button`, 'Button', {
          children: 'Create product',
          color: 'primary',
          size: 'm',
          fullWidth: true,
        }),
        createZoraNode(`${idPrefix}-create-error-notice`, 'Notice', {
          title: 'Validation and availability',
          description:
            'The app surfaces canonical API-operation diagnostics for invalid input or backend availability failures.',
        }),
      ],
    ),
  ];
}
