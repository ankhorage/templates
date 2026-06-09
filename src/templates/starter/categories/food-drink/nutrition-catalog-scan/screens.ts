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
      description: 'Search by product name, brand, barcode, or store chain.',
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
        description: 'Available products in the shared challenge catalog.',
      },
      [
        createZoraNode(`${idPrefix}-products-grid`, 'Grid', undefined, [
          createZoraNode(`${idPrefix}-product-card-yogurt`, 'Card', {
            eyebrow: 'Known product',
            title: 'Bio Greek Yogurt 250 g',
            description: 'Migros · 7612345678901 · confidence 92%',
            tone: 'outline',
          }),
          createZoraNode(`${idPrefix}-product-card-oat-drink`, 'Card', {
            eyebrow: 'Known product',
            title: 'Haferdrink Barista 1 l',
            description: 'Coop · 7612345678918 · confidence 88%',
            tone: 'outline',
          }),
          createZoraNode(`${idPrefix}-product-card-missing`, 'Card', {
            eyebrow: 'Contribution target',
            title: 'Missing supermarket product',
            description: 'Scan a missing barcode to add a capture and earn points.',
            tone: 'outline',
          }),
        ]),
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
      onBarcodeScanned: 'nutrition.scanBarcode',
      onManualEntry: 'nutrition.enterBarcodeManually',
      onRequestPermission: 'camera.requestPermission',
    }),
  ];
}

function createCaptureFormPreview(idPrefix: string): ZoraNode {
  return createZoraNode(
    `${idPrefix}-capture-form-panel`,
    'Panel',
    {
      title: 'Minimal capture form',
      description: 'Prioritize fast in-store entry and useful challenge contributions.',
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
      createZoraNode(`${idPrefix}-capture-submit-button`, 'Button', {
        children: 'Submit and earn points',
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
    [screenIds.challenge]: createContentScreen({
      idPrefix,
      screenId: screenIds.challenge,
      name: 'Challenge',
      content: nutritionCatalogScanContent.challenge,
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
      name: 'Capture',
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
          'Runtime product, scan, capture, challenge, and leaderboard data should go through the API Gateway.',
          [
            {
              id: 'base-url-row',
              title: 'API base URL',
              description: 'Defaults to https://api-gateway.fabio-gartenmann.workers.dev.',
              meta: 'runtime',
            },
            {
              id: 'scan-events-row',
              title: 'Scan events endpoint',
              description: 'POST /v1/nutrition/scan-events records scanner progress.',
              meta: 'auth',
            },
            {
              id: 'client-row',
              title: 'Client defaults',
              description: `${seed.appName} sends de-CH locale, CH country, platform, user id, and clientCapturedAt.`,
              meta: 'de-CH',
            },
          ],
        ),
      ]),
    }),
  };
}
