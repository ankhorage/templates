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
          { title: section.title, description: section.description, tone: 'subtle' },
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
      label: 'Search challenge products',
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
      size: 'm',
      fullWidth: true,
    }),
  ];
}

function createScannerNotice(idPrefix: string): ZoraNode {
  return createZoraNode(`${idPrefix}-scan-zora-notice`, 'Notice', {
    title: 'Scanner implementation note',
    description:
      'Use ZORA scanner components with an app camera adapter. Native camera dependencies stay outside templates.',
    color: 'primary',
  });
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
    [screenIds.challenge]: createContentScreen({
      idPrefix,
      screenId: screenIds.challenge,
      name: 'Challenge',
      content: nutritionCatalogScanContent.challenge,
    }),
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
      headerActions: [createScannerNotice(idPrefix)],
    }),
    [screenIds.capture]: createContentScreen({
      idPrefix,
      screenId: screenIds.capture,
      name: 'Capture',
      content: nutritionCatalogScanContent.capture,
      headerActions: [createCaptureFormPreview(idPrefix)],
    }),
    [screenIds.leaderboard]: createContentScreen({
      idPrefix,
      screenId: screenIds.leaderboard,
      name: 'Leaderboard',
      content: nutritionCatalogScanContent.leaderboard,
    }),
    [screenIds.profile]: createContentScreen({
      idPrefix,
      screenId: screenIds.profile,
      name: 'Profile',
      content: nutritionCatalogScanContent.profile,
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
          `${idPrefix}-settings-auth`,
          'Restricted challenge auth',
          'The whole app is protected with global Supabase auth and native RBAC.',
          [
            {
              id: 'auth-scope-row',
              title: 'Auth scope',
              description: 'Global auth means friends sign in before entering the app.',
              meta: 'global',
            },
            {
              id: 'profile-table-row',
              title: 'Profile table',
              description: 'Use an app-facing profiles table linked to Supabase Auth users.',
              meta: 'profiles',
            },
            {
              id: 'challenge-row',
              title: 'Challenge participation',
              description: 'Scan events, captures, and leaderboard rows belong to signed-in scanners.',
              meta: 'scanner',
            },
          ],
        ),
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
              id: 'leaderboard-row',
              title: 'Leaderboard endpoint',
              description: 'GET /v1/nutrition/challenges/current/leaderboard ranks scanners.',
              meta: 'ranking',
            },
          ],
        ),
        createSettingsSection(
          `${idPrefix}-settings-client`,
          'Client defaults',
          `${seed.appName} should send appVersion, platform, locale, user id, and clientCapturedAt with challenge actions.`,
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
              description:
                'Use ZORA scanner UI with an app camera adapter such as expo-camera.',
              meta: 'ZORA-first',
            },
          ],
        ),
      ]),
    }),
  };
}
