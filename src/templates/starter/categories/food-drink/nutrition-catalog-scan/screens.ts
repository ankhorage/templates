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

function createContentScreen(args: {
  readonly idPrefix: string;
  readonly screenId: string;
  readonly name: string;
  readonly content: ScreenContent;
  readonly body?: readonly ZoraNode[];
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

function createProductsBody(idPrefix: string): ZoraNode[] {
  return [
    createZoraNode(`${idPrefix}-products-search-field`, 'FormField', {
      label: 'Search products',
      description: 'Search by product name, brand, barcode, or package label.',
    }),
    createZoraNode(`${idPrefix}-products-search-input`, 'Input', {
      placeholder: 'Search Migros, Coop, barcode...',
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
                dataSourceId: 'nutrition-api',
                endpointId: 'products',
                operationId: 'products.list',
              },
            },
            itemAlias: 'item',
            keyPath: 'id',
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
  ];
}

function createCaptureFormPreview(idPrefix: string): ZoraNode {
  return createZoraNode(
    `${idPrefix}-capture-form-panel`,
    'Panel',
    {
      title: 'Direct product create form',
      description: 'Create a product directly when barcode lookup does not find a match.',
      tone: 'subtle',
    },
    [
      createZoraNode(`${idPrefix}-capture-barcode-field`, 'FormField', {
        label: 'Barcode',
        description: 'Prefilled from scan or manual entry; normalized before API calls.',
        required: true,
      }),
      createZoraNode(`${idPrefix}-capture-barcode-input`, 'Input', {
        placeholder: '7612345678901',
        keyboardType: 'number-pad',
        size: 'm',
      }),
      createZoraNode(`${idPrefix}-capture-name-field`, 'FormField', {
        label: 'Product name',
        description: 'Required by the minimal request.',
        required: true,
      }),
      createZoraNode(`${idPrefix}-capture-name-input`, 'Input', {
        placeholder: 'Product name',
        size: 'm',
      }),
      createZoraNode(`${idPrefix}-capture-brand-field`, 'FormField', {
        label: 'Brand',
        description: 'Optional product brand.',
      }),
      createZoraNode(`${idPrefix}-capture-brand-input`, 'Input', {
        placeholder: 'Brand',
        size: 'm',
      }),
      createZoraNode(`${idPrefix}-capture-package-label-field`, 'FormField', {
        label: 'Package label',
        description: 'Optional package text such as 500ml or 6 x 33cl.',
      }),
      createZoraNode(`${idPrefix}-capture-package-label-input`, 'Input', {
        placeholder: '500ml',
        size: 'm',
      }),
      createZoraNode(`${idPrefix}-capture-submit-button`, 'Button', {
        children: 'Create product',
        color: 'primary',
        size: 'm',
        fullWidth: true,
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
    [screenIds.leaderboard]: createContentScreen({
      idPrefix,
      screenId: screenIds.leaderboard,
      name: 'Stats',
      content: nutritionCatalogScanContent.leaderboard,
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
    }),
    [screenIds.capture]: createContentScreen({
      idPrefix,
      screenId: screenIds.capture,
      name: 'Create',
      content: nutritionCatalogScanContent.capture,
      body: [createCaptureFormPreview(idPrefix)],
    }),
    [screenIds.success]: createContentScreen({
      idPrefix,
      screenId: screenIds.success,
      name: 'Capture Success',
      content: nutritionCatalogScanContent.success,
    }),
    [screenIds.queue]: createContentScreen({
      idPrefix,
      screenId: screenIds.queue,
      name: 'Queue',
      content: nutritionCatalogScanContent.queue,
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
          'API Gateway',
          'Runtime nutrition product lookup and CRUD should go through the API Gateway.',
          [
            {
              id: 'base-url-row',
              title: 'API base URL',
              description: 'Defaults to https://api.ankhorage.com/v1/nutrition.',
              meta: 'runtime',
            },
            {
              id: 'product-create-row',
              title: 'Product create endpoint',
              description: 'POST /v1/nutrition/products creates a product directly from the app.',
              meta: 'auth',
            },
            {
              id: 'client-row',
              title: 'Client defaults',
              description: `${seed.appName} uses de-CH locale and normalizes barcode input before gateway lookup.`,
              meta: 'de-CH',
            },
          ],
        ),
      ]),
    }),
  };
}
