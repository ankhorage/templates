import type {
  NavigatorResponsiveSize,
  NavigatorRuntimePlatform,
} from '@ankhorage/contracts/navigator';
import { createNavigatorPlan, getNavigatorCatalog } from '@ankhorage/navigator';
import { expect, test } from 'bun:test';

import { listTemplates } from '../src/index';

const expoRouterRange = getNavigatorCatalog()
  .capabilities.flatMap((capability) => capability.dependencies)
  .find((dependency) => dependency.packageName === 'expo-router')?.versionRange;
const expoRouterVersion = expoRouterRange?.match(/\d+\.\d+\.\d+/u)?.[0];
if (!expoRouterVersion)
  throw new Error('Navigator must declare an Expo Router version requirement.');

const platforms: readonly NavigatorRuntimePlatform[] = ['android', 'ios', 'web'];
const responsiveSizes: readonly NavigatorResponsiveSize[] = ['compact', 'medium', 'expanded'];

test('every published template plans navigation at every supported responsive size', () => {
  for (const template of listTemplates()) {
    const manifest = template.createAppManifest();
    for (const platform of platforms) {
      for (const responsiveSize of responsiveSizes) {
        const plan = createNavigatorPlan(manifest.navigator, {
          expoRouterVersion,
          platform,
          responsiveSize,
        });
        expect(plan.diagnostics.filter(({ severity }) => severity === 'error')).toEqual([]);
      }
    }
  }
});

const expectedWidths = {
  'business_productivity/urban-water-monitor': {
    dashboard: 'default',
    map: 'wide',
    events: 'default',
    campaigns: 'default',
    'field-capture': 'default',
    results: 'default',
    profile: 'default',
    'site-detail': 'default',
    'event-detail': 'default',
    'campaign-detail': 'default',
    'capture-review': 'default',
    'capture-confirmed': 'default',
  },
  'education_learning/sharkprey': {
    onboarding: 'narrow',
    'training-setup': 'narrow',
    'training-table-size': 'narrow',
    'training-street': 'narrow',
    'training-difficulty': 'narrow',
    'decision-table': 'wide',
    'answer-explanation': 'wide',
    'hand-history': 'default',
    stats: 'default',
    learn: 'default',
    settings: 'narrow',
  },
  'food_drink/nutriflow': {
    home: 'default',
    'log-meal': 'default',
    'log-results': 'default',
    'log-berry-oats': 'default',
    'log-green-bowl': 'default',
    'log-lemon-salmon': 'default',
    'log-added': 'narrow',
    recipes: 'default',
    plan: 'default',
    progress: 'default',
    community: 'default',
    profile: 'default',
    'recipe-details-green-bowl': 'default',
    'recipe-details-lemon-salmon': 'default',
    'recipe-details-berry-oats': 'default',
    settings: 'narrow',
  },
  'lifestyle/stillpath': {
    'stillpath-home': 'default',
    'stillpath-journal': 'default',
    'stillpath-rituals': 'default',
    'stillpath-profile': 'default',
  },
  'social_community/chat': {
    friends: 'default',
    chats: 'default',
    direct: 'default',
  },
  'books_reading/reader': {
    home: 'default',
    library: 'default',
    discover: 'default',
    profile: 'default',
    'book-details': 'default',
    reader: 'wide',
    settings: 'narrow',
  },
};

test('every published screen declares its deliberate content width', () => {
  const widths = Object.fromEntries(
    listTemplates().map((template) => [
      template.selector,
      Object.fromEntries(
        Object.entries(template.createAppManifest().screens).map(([screenId, screen]) => [
          screenId,
          screen.root.props?.width,
        ]),
      ),
    ]),
  );

  expect(widths).toEqual(expectedWidths);
});
