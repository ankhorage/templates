import { existsSync } from 'node:fs';

import { createNavigatorPlan } from '@ankhorage/navigator';
import { ZORA_COMPONENT_META } from '@ankhorage/zora/metadata';
import { expect, test } from 'bun:test';

import { createTemplateArtifact, resolveTemplate, validateTemplateManifest } from '../src/index';

function assertLocalMealLogFlow() {
  const manifest = resolveTemplate('food_drink', 'nutriflow').createAppManifest();
  const logChildren = manifest.screens['log-meal']?.root.children ?? [];
  const logModes = logChildren.find(({ id }) => id === 'log-meal-modes');
  const scannerPanel = logModes?.children?.find(({ id }) => id === 'log-scan-panel');
  const scanner = scannerPanel?.children?.find(({ id }) => id === 'log-scanner');
  const searchPanel = logModes?.children?.find(({ id }) => id === 'log-search-panel');
  const search = searchPanel?.children?.find(({ id }) => id === 'log-search');

  expect(ZORA_COMPONENT_META.BarcodeScannerView).toBeDefined();
  expect(search).toMatchObject({ type: 'SearchInput' });
  expect(search?.props?.disabled).toBeUndefined();
  expect(manifest.dataBindings?.['log-search']).toMatchObject({
    componentType: 'SearchInput',
    events: { submit: [{ target: { input: { route: { value: '/log/results' } } } }] },
  });
  expect(scanner).toMatchObject({
    type: 'BarcodeScannerView',
    props: { permissionStatus: 'unavailable' },
  });
  assertLocalFoodResults();
}

function assertLocalFoodResults() {
  const manifest = resolveTemplate('food_drink', 'nutriflow').createAppManifest();
  const results = manifest.screens['log-results']?.root.children ?? [];

  expect(
    results.filter(({ type }) => type === 'Card').map(({ props }) => props?.description),
  ).toEqual(['1 bowl · 320 kcal', '1 bowl · 480 kcal', '1 plate · 540 kcal']);
  expect(manifest.dataBindings?.['log-add-berry-oats']).toMatchObject({
    events: { press: [{ target: { input: { route: { value: '/log/added' } } } }] },
  });
}

test('NutriFlow is discovered as the portable food and drink template', () => {
  const template = resolveTemplate('food_drink', 'nutriflow');

  expect(template).toMatchObject({
    name: 'NutriFlow',
    selector: 'food_drink/nutriflow',
    sourceRoot: 'src/templates/categories/food-drink/nutriflow',
  });
});

test('NutriFlow keeps its complete local nutrition flow release-valid', () => {
  const manifest = resolveTemplate('food_drink', 'nutriflow').createAppManifest();

  expect(Object.keys(manifest.screens)).toEqual([
    'home',
    'log-meal',
    'log-results',
    'log-berry-oats',
    'log-green-bowl',
    'log-lemon-salmon',
    'log-added',
    'recipes',
    'plan',
    'progress',
    'community',
    'profile',
    'recipe-details-green-bowl',
    'recipe-details-lemon-salmon',
    'recipe-details-berry-oats',
    'settings',
  ]);
  expect(manifest.navigator.routes[0]?.navigator?.routes.map((route) => route.name)).toEqual([
    'home',
    'log',
    'recipes',
    'progress',
    'profile',
  ]);
  expect(manifest.navigator.routes.slice(1).map((route) => route.name)).toContain('plan');
  expect(manifest.navigator.routes.slice(1).map((route) => route.name)).toContain('community');
  expect(validateTemplateManifest(manifest, 'release')).toMatchObject({
    status: 'ready',
    diagnostics: [],
  });
});

test('NutriFlow uses release-backed navigation for its primary local actions', () => {
  const manifest = resolveTemplate('food_drink', 'nutriflow').createAppManifest();
  const bindings = manifest.dataBindings;

  expect(bindings?.['home-log-meal']).toMatchObject({
    componentType: 'Button',
    events: { press: [{ target: { capability: 'navigator.navigate' } }] },
  });
  expect(bindings?.['recipes-green-bowl']).toMatchObject({
    componentType: 'MediaCard',
    events: {
      press: [
        {
          target: {
            capability: 'navigator.navigate',
            input: { route: { value: '/recipes/green-bowl' } },
          },
        },
      ],
    },
  });
  expect(bindings?.['profile-community']).toMatchObject({
    events: { press: [{ target: { input: { route: { value: '/community' } } } }] },
  });
  expect(
    createNavigatorPlan(manifest.navigator, {
      platform: 'web',
      responsiveSize: 'compact',
      expoRouterVersion: '57.0.18',
    }).diagnostics.filter(({ severity }) => severity === 'error'),
  ).toEqual([]);
});

test('NutriFlow provides a deterministic local meal-log flow and media-backed recipe tiles', () => {
  const manifest = resolveTemplate('food_drink', 'nutriflow').createAppManifest();
  const progress = manifest.screens.progress?.root.children?.find(
    ({ id }) => id === 'progress-range',
  );
  const imageAssets = Object.values(manifest.media?.assets ?? {}).filter(
    (asset) => asset.kind === 'image' && asset.source.kind === 'bundled',
  );

  expect(ZORA_COMPONENT_META.ProgressRing).toBeDefined();
  assertLocalMealLogFlow();
  expect(progress).toMatchObject({ type: 'Tabs' });
  expect(imageAssets.map((asset) => asset.id)).toEqual([
    'green-bowl',
    'lemon-salmon',
    'berry-oats',
    'nav-home',
    'nav-log',
    'nav-recipes',
    'nav-progress',
    'nav-profile',
  ]);

  const artifact = createTemplateArtifact({ category: 'food_drink', slug: 'nutriflow' });
  expect(artifact.assets).toHaveLength(8);
  for (const asset of artifact.assets) {
    expect(existsSync(asset.sourcePath)).toBe(true);
  }
});

test('NutriFlow maps each media-backed recipe tile to its own detail route', () => {
  const manifest = resolveTemplate('food_drink', 'nutriflow').createAppManifest();
  const recipeCards = (manifest.screens.recipes?.root.children ?? []).filter(
    ({ type }) => type === 'MediaCard',
  );

  expect(ZORA_COMPONENT_META.MediaCard).toBeDefined();
  expect(recipeCards.map(({ id, props }) => [id, props?.imageSource])).toEqual([
    ['recipes-green-bowl', { mediaId: 'green-bowl' }],
    ['recipes-lemon-salmon', { mediaId: 'lemon-salmon' }],
    ['recipes-berry-oats', { mediaId: 'berry-oats' }],
  ]);
  expect(manifest.dataBindings?.['recipes-green-bowl']).toMatchObject({
    events: { press: [{ target: { input: { route: { value: '/recipes/green-bowl' } } } }] },
  });
  expect(manifest.dataBindings?.['recipes-lemon-salmon']).toMatchObject({
    events: { press: [{ target: { input: { route: { value: '/recipes/lemon-salmon' } } } }] },
  });
  expect(manifest.dataBindings?.['recipes-berry-oats']).toMatchObject({
    events: { press: [{ target: { input: { route: { value: '/recipes/berry-oats' } } } }] },
  });
});
