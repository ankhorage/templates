import { existsSync } from 'node:fs';

import { createNavigatorPlan } from '@ankhorage/navigator';
import { CAPABILITIES as RUNTIME_CAPABILITIES } from '@ankhorage/runtime/capabilities';
import { ZORA_COMPONENT_META } from '@ankhorage/zora/metadata';
import { expect, test } from 'bun:test';

import { createTemplateArtifact, resolveTemplate, validateTemplateManifest } from '../src/index';

test('NutriFlow is a release-valid, serializable food and drink template', () => {
  const template = resolveTemplate('food_drink', 'nutriflow');
  const manifest = template.createAppManifest();

  expect(template).toMatchObject({
    name: 'NutriFlow',
    selector: 'food_drink/nutriflow',
    sourceRoot: 'src/templates/categories/food-drink/nutriflow',
  });
  expect(Object.keys(manifest.screens)).toEqual([
    'home',
    'log-meal',
    'log-results',
    'log-berry-oats',
    'log-green-bowl',
    'log-lemon-salmon',
    'log-added-berry-oats',
    'log-added-green-bowl',
    'log-added-lemon-salmon',
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
  expect(validateTemplateManifest(manifest, 'release')).toMatchObject({
    status: 'ready',
    diagnostics: [],
  });
  expect(JSON.parse(JSON.stringify(manifest))).toEqual(manifest);
});

test('NutriFlow preserves honest local search and scanner fallback', () => {
  const manifest = resolveTemplate('food_drink', 'nutriflow').createAppManifest();
  const logModes = manifest.screens['log-meal']?.root.children?.find(
    ({ id }) => id === 'log-meal-modes',
  );
  const scanner = logModes?.children
    ?.find(({ id }) => id === 'log-scan-panel')
    ?.children?.find(({ id }) => id === 'log-scanner');

  expect(ZORA_COMPONENT_META.BarcodeScannerView).toBeDefined();
  expect(scanner).toMatchObject({
    type: 'BarcodeScannerView',
    props: { permissionStatus: 'unavailable' },
  });
  expect(manifest.dataBindings?.['log-search']).toMatchObject({
    componentType: 'SearchInput',
    events: { submit: [{ target: { input: { route: { value: '/log/results' } } } }] },
  });
  expect(RUNTIME_CAPABILITIES.find(({ id }) => id === 'state.update')).toMatchObject({
    owner: '@ankhorage/runtime',
    binding: { kind: 'state', bindableAs: ['target'] },
  });
});

test('NutriFlow exposes standalone assets and responsive navigation', () => {
  const manifest = resolveTemplate('food_drink', 'nutriflow').createAppManifest();
  const artifact = createTemplateArtifact({ category: 'food_drink', slug: 'nutriflow' });

  expect(
    createNavigatorPlan(manifest.navigator, {
      platform: 'web',
      responsiveSize: 'compact',
      expoRouterVersion: '57.0.18',
    }).diagnostics.filter(({ severity }) => severity === 'error'),
  ).toEqual([]);
  expect(artifact.assets).toHaveLength(8);
  for (const asset of artifact.assets) expect(existsSync(asset.sourcePath)).toBe(true);
});
