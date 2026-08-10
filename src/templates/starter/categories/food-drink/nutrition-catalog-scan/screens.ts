import type { AppManifest } from '@ankhorage/contracts';

import {
  createScreen,
  createScreenRoot,
  createSection,
  createSettingsSection,
  createZoraNode,
  type ZoraNode,
} from '../../../../shared';
import type { TemplateSeed } from '../../../starter.types';
import { nutritionCatalogScanContent } from './content';
import type { NutritionCatalogScanScreenIds } from './routes';

interface CardContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

interface SectionContent {
  readonly title: string;
  readonly description: string;
  readonly cards: readonly CardContent[];
}

interface ScreenContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly sections: readonly SectionContent[];
}

const productDetailLoaderOperation = {
  dataSourceId: 'nutrition-products',
  endpointId: 'products',
  operationId: 'products.read',
} as const;

function createContentScreen(args: {
  readonly idPrefix: string;
  readonly screenId: string;
  readonly name: string;
  readonly content: ScreenContent;
  readonly body?: readonly ZoraNode[];
  readonly dataLoaders?: AppManifest['screens'][string]['dataLoaders'];
  readonly requires?: AppManifest['screens'][string]['requires'];
}): AppManifest['screens'][string] {
  const idSegment = args.name.toLowerCase().replaceAll(' ', '-');
  const body = args.body ?? createSectionCards(args.idPrefix, idSegment, args.content.sections);

  return createScreen({
    id: args.screenId,
    name: args.name,
    title: args.content.title,
    description: args.content.description,
    root: createScreenRoot(`${args.idPrefix}-${idSegment}-screen`, { width: 'wide' }, [
      createZoraNode(`${args.idPrefix}-${idSegment}-header`, 'SectionHeader', {
        eyebrow: args.content.eyebrow,
        title: args.content.title,
        description: args.content.description,
      }),
      ...body,
    ]),
    dataLoaders: args.dataLoaders,
    requires: args.requires,
  });
}

function createSectionCards(
  idPrefix: string,
  idSegment: string,
  sections: readonly SectionContent[],
): ZoraNode[] {
  return sections.map((section, sectionIndex) =>
    createSection(
      `${idPrefix}-${idSegment}-section-${sectionIndex + 1}`,
      { title: section.title, description: section.description },
      [
        createZoraNode(
          `${idPrefix}-${idSegment}-panel-${sectionIndex + 1}`,
          'Panel',
          { title: section.title, description: section.description, tone: 'subtle' },
          section.cards.map((card, cardIndex) =>
            createZoraNode(
              `${idPrefix}-${idSegment}-card-${sectionIndex + 1}-${cardIndex + 1}`,
              'Card',
              {
                eyebrow: card.eyebrow,
                title: card.title,
                description: card.description,
                tone: 'outline',
              },
            ),
          ),
        ),
      ],
    ),
  );
}

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

function createProductsBody(idPrefix: string): ZoraNode[] {
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
                dataSourceId: 'nutrition-products',
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

function createScanBody(idPrefix: string): ZoraNode[] {
  return [
    createZoraNode(`${idPrefix}-scan-scanner`, 'BarcodeScannerView', {
      permissionStatus: 'unknown',
      title: 'Scan product barcode',
      description: 'Point the camera at a barcode to look up or add a product.',
      overlayTitle: 'Align barcode',
      overlayDescription: 'Hold the barcode inside the frame. Scanning starts automatically.',
      cornerLabel: 'EAN',
      requestPermissionLabel: 'Allow camera access',
      manualEntryLabel: 'Enter barcode manually',
    }),
    createZoraNode(`${idPrefix}-scan-lookup-notice`, 'Notice', {
      title: 'Lookup behavior',
      description:
        'GET /products/by-barcode/:barcode opens product detail on 200, opens create with a prefilled barcode on 404, and should surface retry messaging for 400 or 503 responses.',
    }),
  ];
}

function createProductDetailBody(idPrefix: string): ZoraNode[] {
  return [
    createSection(
      `${idPrefix}-detail-summary-section`,
      {
        title: 'Product details',
        description: 'Loaded from the nutrition API using the current route param product ID.',
      },
      [
        createDetailValueCard({
          id: `${idPrefix}-detail-name-value`,
          label: 'Name',
          placeholder: 'Loading name...',
        }),
        createDetailValueCard({
          id: `${idPrefix}-detail-brand-value`,
          label: 'Brand',
          placeholder: 'Loading brand...',
        }),
        createDetailValueCard({
          id: `${idPrefix}-detail-package-label-value`,
          label: 'Package label',
          placeholder: 'Loading package label...',
        }),
        createDetailValueCard({
          id: `${idPrefix}-detail-barcode-value`,
          label: 'Barcode',
          placeholder: 'Loading barcode...',
        }),
        createDetailValueCard({
          id: `${idPrefix}-detail-barcode-type-value`,
          label: 'Barcode type',
          placeholder: 'Loading barcode type...',
        }),
        createDetailValueCard({
          id: `${idPrefix}-detail-created-at-value`,
          label: 'Created at',
          placeholder: 'Loading created timestamp...',
        }),
        createDetailValueCard({
          id: `${idPrefix}-detail-updated-at-value`,
          label: 'Updated at',
          placeholder: 'Loading updated timestamp...',
        }),
      ],
    ),
    createSection(
      `${idPrefix}-detail-nutrition-section`,
      {
        title: 'Nutrition facts',
        description: 'Synchronous bindings read the cached product nutrition facts fields.',
      },
      [
        createDetailValueCard({
          id: `${idPrefix}-detail-nutrition-basis-value`,
          label: 'Basis',
          placeholder: 'Loading basis...',
        }),
        createDetailValueCard({
          id: `${idPrefix}-detail-energy-kj-value`,
          label: 'Energy (kJ)',
          placeholder: 'Loading energy...',
        }),
        createDetailValueCard({
          id: `${idPrefix}-detail-energy-kcal-value`,
          label: 'Energy (kcal)',
          placeholder: 'Loading energy...',
        }),
        createDetailValueCard({
          id: `${idPrefix}-detail-fat-g-value`,
          label: 'Fat (g)',
          placeholder: 'Loading fat...',
        }),
        createDetailValueCard({
          id: `${idPrefix}-detail-saturated-fat-g-value`,
          label: 'Saturated fat (g)',
          placeholder: 'Loading saturated fat...',
        }),
        createDetailValueCard({
          id: `${idPrefix}-detail-carbohydrates-g-value`,
          label: 'Carbohydrates (g)',
          placeholder: 'Loading carbohydrates...',
        }),
        createDetailValueCard({
          id: `${idPrefix}-detail-sugars-g-value`,
          label: 'Sugars (g)',
          placeholder: 'Loading sugars...',
        }),
        createDetailValueCard({
          id: `${idPrefix}-detail-fiber-g-value`,
          label: 'Fiber (g)',
          placeholder: 'Loading fiber...',
        }),
        createDetailValueCard({
          id: `${idPrefix}-detail-protein-g-value`,
          label: 'Protein (g)',
          placeholder: 'Loading protein...',
        }),
        createDetailValueCard({
          id: `${idPrefix}-detail-salt-g-value`,
          label: 'Salt (g)',
          placeholder: 'Loading salt...',
        }),
      ],
    ),
    createSection(
      `${idPrefix}-detail-images-section`,
      {
        title: 'Image refs',
        description: 'Cached product image refs render synchronously from the loader result.',
      },
      [
        {
          id: `${idPrefix}-detail-image-ref-list`,
          type: 'Panel',
          props: {
            title: 'Product images',
            description: 'Each block reflects one image ref from product.imageRefs.',
            tone: 'subtle',
          },
          repeat: {
            source: {
              kind: 'operation',
              operation: productDetailLoaderOperation,
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
        },
      ],
    ),
  ];
}

function createProductFormPreview(idPrefix: string): ZoraNode {
  return createZoraNode(
    `${idPrefix}-create-form-panel`,
    'Panel',
    {
      title: 'Direct product create form',
      description: 'Create a product directly when barcode lookup does not find a match.',
      tone: 'subtle',
    },
    [
      createZoraNode(`${idPrefix}-create-barcode-field`, 'FormField', {
        label: 'Barcode',
        description: 'Prefilled from scan or manual entry; normalized before API calls.',
        required: true,
      }),
      createZoraNode(`${idPrefix}-create-barcode-input`, 'Input', {
        placeholder: '7612345678901',
        keyboardType: 'number-pad',
        size: 'm',
      }),
      createZoraNode(`${idPrefix}-create-name-field`, 'FormField', {
        label: 'Product name',
        description: 'Required by the minimal request.',
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
        placeholder: '{"energyKcal": 42, "proteinG": 3.4}',
        autoCapitalize: 'none',
        size: 'm',
      }),
      createZoraNode(`${idPrefix}-create-image-refs-field`, 'FormField', {
        label: 'imageRefs',
        description:
          'Structured storage refs with bucket, path, kind, publicUrl, width, and height.',
      }),
      createZoraNode(`${idPrefix}-create-image-refs-input`, 'Input', {
        placeholder: '[{"bucket":"nutrition","path":"products/front.jpg"}]',
        autoCapitalize: 'none',
        size: 'm',
      }),
      createZoraNode(`${idPrefix}-create-duplicate-notice`, 'Notice', {
        title: 'Duplicate barcode handling',
        description:
          'If POST /products returns 409 with product.id, the generated binding opens the existing product instead of treating the conflict as fatal.',
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
          'The generated app should show inline validation for 400 responses and retry messaging when the backend is unavailable with 503.',
      }),
    ],
  );
}

export function createNutritionCatalogScanScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: NutritionCatalogScanScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.catalog]: createContentScreen({
      idPrefix,
      screenId: screenIds.catalog,
      name: 'Products',
      content: nutritionCatalogScanContent.catalog,
      body: createProductsBody(idPrefix),
    }),
    [screenIds.scan]: createContentScreen({
      idPrefix,
      screenId: screenIds.scan,
      name: 'Scan',
      content: nutritionCatalogScanContent.scan,
      body: createScanBody(idPrefix),
      requires: {
        permissions: [{ permission: 'camera' }],
        capabilities: [{ capability: 'barcodeScanner' }],
      },
    }),
    [screenIds.stats]: createContentScreen({
      idPrefix,
      screenId: screenIds.stats,
      name: 'Stats',
      content: nutritionCatalogScanContent.stats,
    }),
    [screenIds.profile]: createContentScreen({
      idPrefix,
      screenId: screenIds.profile,
      name: 'Profile',
      content: nutritionCatalogScanContent.profile,
    }),
    [screenIds.detail]: createContentScreen({
      idPrefix,
      screenId: screenIds.detail,
      name: 'Product Detail',
      content: nutritionCatalogScanContent.detail,
      body: createProductDetailBody(idPrefix),
      dataLoaders: [
        {
          kind: 'operation',
          id: 'product-detail',
          operation: productDetailLoaderOperation,
          input: {
            id: {
              kind: 'source',
              source: {
                kind: 'context',
                path: 'route.params.id',
              },
            },
          },
        },
      ],
    }),
    [screenIds.create]: createContentScreen({
      idPrefix,
      screenId: screenIds.create,
      name: 'Create',
      content: nutritionCatalogScanContent.create,
      body: [createProductFormPreview(idPrefix)],
    }),
    [screenIds.signIn]: createContentScreen({
      idPrefix,
      screenId: screenIds.signIn,
      name: 'Sign In',
      content: nutritionCatalogScanContent.signIn,
    }),
    [screenIds.signUp]: createContentScreen({
      idPrefix,
      screenId: screenIds.signUp,
      name: 'Sign Up',
      content: nutritionCatalogScanContent.signUp,
    }),
    [screenIds.settings]: createScreen({
      id: screenIds.settings,
      name: 'Settings',
      title: nutritionCatalogScanContent.settings.title,
      description: nutritionCatalogScanContent.settings.description,
      root: createScreenRoot(`${idPrefix}-settings-screen`, { width: 'default' }, [
        createZoraNode(`${idPrefix}-settings-header`, 'SectionHeader', {
          eyebrow: nutritionCatalogScanContent.settings.eyebrow,
          title: nutritionCatalogScanContent.settings.title,
          description: nutritionCatalogScanContent.settings.description,
        }),
        createSettingsSection(
          `${idPrefix}-settings-api`,
          'Nutrition API',
          'Runtime nutrition product lookup and CRUD should go through the nutrition API.',
          [
            {
              id: 'base-url-row',
              title: 'API base URL',
              description: 'Defaults to https://api.ankhorage.com/v1/nutrition.',
              meta: 'runtime',
            },
            {
              id: 'health-row',
              title: 'Health check',
              description: 'GET /health verifies that the nutrition backend is reachable.',
              meta: 'health',
            },
            {
              id: 'product-create-row',
              title: 'Product create endpoint',
              description: 'POST /products creates a product directly from the app.',
              meta: 'create',
            },
            {
              id: 'client-row',
              title: 'Client defaults',
              description: `${seed.appName} uses de-CH locale and normalizes barcode input before nutrition API lookup.`,
              meta: 'de-CH',
            },
          ],
        ),
      ]),
    }),
  };
}
