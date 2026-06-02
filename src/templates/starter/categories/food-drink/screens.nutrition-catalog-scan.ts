import type { AppManifest } from '@ankhorage/contracts';

import {
  createScreen,
  createScreenRoot,
  createSection,
  createSettingsSection,
  createZoraNode,
  type ZoraNode,
} from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { nutritionCatalogScanContent } from './content.nutrition-catalog-scan';
import type { NutritionCatalogScanScreenIds } from './routes.nutrition-catalog-scan';

interface NutritionCatalogCardContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

interface NutritionCatalogSectionContent {
  readonly title: string;
  readonly description: string;
  readonly cards: readonly NutritionCatalogCardContent[];
}

interface NutritionCatalogScreenContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly sections: readonly NutritionCatalogSectionContent[];
}

function createContentScreen(args: {
  readonly idPrefix: string;
  readonly screenId: string;
  readonly name: string;
  readonly content: NutritionCatalogScreenContent;
  readonly headerActions?: readonly ZoraNode[];
}): AppManifest['screens'][string] {
  const idSegment = args.name.toLowerCase().replaceAll(' ', '-');
  const sectionNodes: ZoraNode[] = args.content.sections.map((section, sectionIndex) =>
    createSection(
      `${args.idPrefix}-${idSegment}-section-${sectionIndex + 1}`,
      { title: section.title, description: section.description },
      [
        createZoraNode(
          `${args.idPrefix}-${idSegment}-panel-${sectionIndex + 1}`,
          'Panel',
          {
            title: section.title,
            description: section.description,
            tone: 'subtle',
          },
          section.cards.map((card, cardIndex) =>
            createZoraNode(
              `${args.idPrefix}-${idSegment}-card-${sectionIndex + 1}-${cardIndex + 1}`,
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
      ...(args.headerActions ?? []),
      ...sectionNodes,
    ]),
  });
}

function createCatalogActions(idPrefix: string): ZoraNode[] {
  return [
    createZoraNode(`${idPrefix}-catalog-search-field`, 'FormField', {
      label: 'Search products',
      description: 'Search by product name, brand, barcode, or store chain.',
    }),
    createZoraNode(`${idPrefix}-catalog-search-input`, 'Input', {
      placeholder: 'Search Migros, Coop, barcode...',
      autoCapitalize: 'none',
      size: 'm',
    }),
    createZoraNode(`${idPrefix}-catalog-scan-button`, 'Button', {
      children: 'Scan barcode',
      color: 'primary',
      size: 'l',
      variant: 'solid',
    }),
  ];
}

function createScanAdapterNotice(idPrefix: string): ZoraNode {
  return createZoraNode(`${idPrefix}-scan-zora-notice`, 'Notice', {
    title: 'Scanner implementation note',
    description:
      'Use expo-camera behind a local adapter for now. Promote reusable permission, overlay, and scanner UI into ZORA once the API stabilizes.',
    tone: 'info',
  });
}

function createCaptureFormPreview(idPrefix: string): ZoraNode {
  return createZoraNode(
    `${idPrefix}-capture-form-panel`,
    'Panel',
    {
      title: 'Minimal capture form',
      description:
        'The first implementation should prioritize fast in-store entry over OCR or review workflow complexity.',
      tone: 'subtle',
    },
    [
      createZoraNode(`${idPrefix}-capture-barcode-field`, 'FormField', {
        label: 'Barcode',
        description: 'Prefilled from scan or manual entry; normalized to digits before API calls.',
        required: true,
      }),
      createZoraNode(`${idPrefix}-capture-barcode-input`, 'Input', {
        placeholder: '7612345678901',
        keyboardType: 'number-pad',
        size: 'm',
      }),
      createZoraNode(`${idPrefix}-capture-name-field`, 'FormField', {
        label: 'Product name',
        description: 'Required by the minimal capture request.',
        required: true,
      }),
      createZoraNode(`${idPrefix}-capture-name-input`, 'Input', {
        placeholder: 'Product name',
        size: 'm',
      }),
      createZoraNode(`${idPrefix}-capture-submit-button`, 'Button', {
        children: 'Submit queued capture',
        color: 'primary',
        size: 'l',
        variant: 'solid',
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
      headerActions: createCatalogActions(idPrefix),
    }),
    [screenIds.detail]: createContentScreen({
      idPrefix,
      screenId: screenIds.detail,
      name: 'Product Detail',
      content: nutritionCatalogScanContent.detail,
    }),
    [screenIds.scan]: createContentScreen({
      idPrefix,
      screenId: screenIds.scan,
      name: 'Scan',
      content: nutritionCatalogScanContent.scan,
      headerActions: [createScanAdapterNotice(idPrefix)],
    }),
    [screenIds.capture]: createContentScreen({
      idPrefix,
      screenId: screenIds.capture,
      name: 'Capture',
      content: nutritionCatalogScanContent.capture,
      headerActions: [createCaptureFormPreview(idPrefix)],
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
          'Keep runtime clients API-only and never connect this template directly to Supabase.',
          [
            {
              id: 'base-url-row',
              title: 'API base URL',
              description: 'Defaults to https://api-gateway.fabio-gartenmann.workers.dev.',
              meta: 'runtime',
            },
            {
              id: 'product-list-row',
              title: 'Product list endpoint',
              description: 'Requires GET /v1/nutrition/products for the catalog-first home screen.',
              meta: 'backend gap',
            },
            {
              id: 'capture-row',
              title: 'Capture endpoint',
              description: 'POST /v1/nutrition/products/capture queues submissions for later review.',
              meta: 'live',
            },
          ],
        ),
        createSettingsSection(
          `${idPrefix}-settings-client`,
          'Client defaults',
          `${seed.appName} should persist anonymousDeviceId and send appVersion, platform, locale, and clientCapturedAt with captures.`,
          [
            {
              id: 'locale-row',
              title: 'Default locale',
              description: 'de-CH for the Swiss retail MVP.',
              meta: 'de-CH',
            },
            {
              id: 'country-row',
              title: 'Default country',
              description: 'Store observations default to CH.',
              meta: 'CH',
            },
            {
              id: 'camera-row',
              title: 'Camera dependency',
              description: 'Isolate expo-camera behind a scanner adapter and compose visible UI from ZORA.',
              meta: 'ZORA-first',
            },
          ],
        ),
      ]),
    }),
  };
}
