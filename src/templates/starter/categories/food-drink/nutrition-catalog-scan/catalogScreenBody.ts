import { createSection, createZoraNode, type ZoraNode } from '../../../../shared';

export function createNutritionCatalogBody(idPrefix: string): ZoraNode[] {
  return [
    createZoraNode(`${idPrefix}-products-search-field`, 'FormField', {
      label: 'Search products',
      description: 'Search by product name, brand, barcode, or package label.',
    }),
    createZoraNode(`${idPrefix}-products-search-input`, 'Input', {
      placeholder: 'Search product name, brand, or barcode...',
      autoCapitalize: 'none',
      size: 'm',
    }),
    createSection(
      `${idPrefix}-products-grid-section`,
      {
        title: 'Products',
        description: 'Available products in the shared nutrition catalog.',
      },
      [
        {
          id: `${idPrefix}-products-grid`,
          type: 'Grid',
          repeat: {
            source: {
              kind: 'operation',
              operation: {
                apiId: 'nutrition',
                endpointId: 'products',
                operationId: 'products.list',
              },
              path: 'products',
            },
            itemAlias: 'item',
            keyPath: 'id',
            empty: [
              createZoraNode(`${idPrefix}-products-empty-state`, 'Notice', {
                title: 'No products found',
                description: 'Scan a barcode or create a product to start building the catalog.',
              }),
            ],
          },
          children: [createZoraNode(`${idPrefix}-product-card-template`, 'ProductCard')],
        },
      ],
    ),
  ];
}
