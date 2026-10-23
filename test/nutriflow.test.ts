import { existsSync } from 'node:fs';

import { createNavigatorPlan } from '@ankhorage/navigator';
import { ZORA_COMPONENT_META } from '@ankhorage/zora/metadata';
import { expect, test } from 'bun:test';

import { createTemplateArtifact, resolveTemplate, validateTemplateManifest } from '../src/index';

test('NutriFlow is discovered as the portable food and drink template', () => {
  const template = resolveTemplate('food_drink', 'nutriflow');

  expect(template).toMatchObject({
    name: 'NutriFlow',
    selector: 'food_drink/nutriflow',
    sourceRoot: 'src/templates/categories/food-drink/nutriflow',
  });
});

test('NutriFlow keeps its complete seven-screen nutrition flow release-valid', () => {
  const manifest = resolveTemplate('food_drink', 'nutriflow').createAppManifest();

  expect(Object.keys(manifest.screens)).toEqual([
    'home',
    'log-meal',
    'recipes',
    'plan',
    'progress',
    'community',
    'profile',
    'recipe-details',
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
    componentType: 'MediaExplorer',
    events: { activate: [{ target: { capability: 'navigator.navigate' } }] },
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

test('NutriFlow uses owner scanner, explorer, progress, and bundled image contracts', () => {
  const manifest = resolveTemplate('food_drink', 'nutriflow').createAppManifest();
  const logChildren = manifest.screens['log-meal']?.root.children ?? [];
  const logModes = logChildren.find(({ id }) => id === 'log-meal-modes');
  const scannerPanel = logModes?.children?.find(({ id }) => id === 'log-scan-panel');
  const scanner = scannerPanel?.children?.find(({ id }) => id === 'log-scanner');
  const recipes = manifest.screens.recipes?.root.children?.find(
    ({ id }) => id === 'recipes-green-bowl',
  );
  const progress = manifest.screens.progress?.root.children?.find(
    ({ id }) => id === 'progress-range',
  );
  const imageAssets = Object.values(manifest.media?.assets ?? {}).filter(
    (asset) => asset.kind === 'image' && asset.source.kind === 'bundled',
  );

  expect(ZORA_COMPONENT_META.BarcodeScannerView).toBeDefined();
  expect(ZORA_COMPONENT_META.MediaExplorer).toBeDefined();
  expect(ZORA_COMPONENT_META.ProgressRing).toBeDefined();
  expect(scanner).toMatchObject({
    type: 'BarcodeScannerView',
    props: { permissionStatus: 'unavailable' },
  });
  expect(recipes).toMatchObject({ type: 'MediaExplorer' });
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
