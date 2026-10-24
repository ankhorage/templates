import { existsSync } from 'node:fs';

import { createNavigatorPlan } from '@ankhorage/navigator';
import { ZORA_COMPONENT_META } from '@ankhorage/zora/metadata';
import { expect, test } from 'bun:test';

import { createTemplateArtifact, resolveTemplate, validateTemplateManifest } from '../src/index';

const TEMPLATE_CATEGORY = 'business_productivity';
const TEMPLATE_SLUG = 'urban-water-monitor';

function urbanWaterMonitor() {
  return resolveTemplate(TEMPLATE_CATEGORY, TEMPLATE_SLUG).createAppManifest();
}

test('Urban Water Monitor is discovered through the filesystem catalog', () => {
  expect(resolveTemplate(TEMPLATE_CATEGORY, TEMPLATE_SLUG)).toMatchObject({
    name: 'Urban Water Monitor',
    selector: 'business_productivity/urban-water-monitor',
    sourceRoot: 'src/templates/categories/business-productivity/urban-water-monitor',
  });
});

test('Urban Water Monitor keeps seven product screens and five primary destinations', () => {
  const manifest = urbanWaterMonitor();
  const primaryRoutes = manifest.navigator.routes[0]?.navigator?.routes ?? [];

  for (const screenId of [
    'dashboard',
    'map',
    'events',
    'campaigns',
    'field-capture',
    'results',
    'profile',
  ]) {
    expect(Object.hasOwn(manifest.screens, screenId)).toBe(true);
  }
  expect(primaryRoutes.map((route) => route.name)).toEqual([
    'dashboard',
    'map',
    'capture',
    'campaigns',
    'profile',
  ]);
  const detailRouteNames = manifest.navigator.routes.slice(1).map((route) => route.name);
  expect(detailRouteNames.includes('events')).toBe(true);
  expect(detailRouteNames.includes('results')).toBe(true);
  expect(validateTemplateManifest(manifest, 'release')).toMatchObject({
    status: 'ready',
    diagnostics: [],
  });
});

test('Urban Water Monitor renders its static map as portable media, not a Map implementation', () => {
  const manifest = urbanWaterMonitor();
  const mapNode = manifest.screens.map?.root.children?.find(({ id }) => id === 'map-image');
  const mapAsset = manifest.media?.assets['urban-water-map'];

  expect(ZORA_COMPONENT_META.Image).toBeDefined();
  expect(mapNode).toMatchObject({
    type: 'Image',
    props: { source: { mediaId: 'urban-water-map' } },
  });
  expect(mapAsset).toMatchObject({
    kind: 'image',
    source: { kind: 'bundled', path: 'assets/images/urban-water-map.png' },
    contentType: 'image/png',
  });
  expect(
    existsSync(
      'src/templates/categories/business-productivity/urban-water-monitor/assets/images/urban-water-map.png',
    ),
  ).toBe(true);
  expect(JSON.stringify(manifest)).not.toContain('"type":"Map"');
  expect(JSON.stringify(manifest)).not.toContain('@ankhorage/maps');
  expect(
    existsSync(
      'src/templates/categories/business-productivity/urban-water-monitor/assets/screens/design.png',
    ),
  ).toBe(true);
});

test('Urban Water Monitor retains provenance and does not pass modelled context off as verified evidence', () => {
  const manifest = urbanWaterMonitor();
  const results = manifest.screens.results?.root.children ?? [];
  const modelled = results.find(({ id }) => id === 'results-modelled');
  const capture = manifest.screens['field-capture']?.root.children ?? [];

  expect(JSON.stringify(modelled)).toContain('not a verified pollution measurement');
  expect(JSON.stringify(capture)).toContain('field observation');
  expect(JSON.stringify(capture)).toContain('sensor or laboratory measurement');
  expect(JSON.stringify(capture)).toContain('becomes a laboratory result only');
  expect(results.map(({ props }) => props?.description).join(' ')).toContain('laboratory result');
  expect(results.map(({ props }) => props?.description).join(' ')).toContain('sensor measurement');
});

test('Urban Water Monitor labels static claims, event dates and unsaved capture truthfully', () => {
  const manifest = urbanWaterMonitor();
  const dashboard = JSON.stringify(manifest.screens.dashboard);
  const events = JSON.stringify(manifest.screens.events);
  const eventDetail = JSON.stringify(manifest.screens['event-detail']);
  const capture = JSON.stringify(manifest.screens['field-capture']);
  const review = JSON.stringify(manifest.screens['capture-review']);
  const completed = JSON.stringify(manifest.screens['capture-confirmed']);

  expect(dashboard).toContain('No live water-quality assessment is calculated');
  expect(dashboard).toContain('Not calculated from demo records');
  expect(dashboard).not.toContain('96%');

  expect(events).toContain('NOV 07, 2026');
  expect(events).toContain('NOV 14, 2026');
  expect(events).toContain('NOV 21, 2026');
  expect(eventDetail).toContain('November 7, 2026');

  expect(capture).toContain('never submits or saves a report');
  expect(review).toContain('does not save or transmit a report');
  expect(completed).toContain('nothing saved');
  expect(completed).toContain('No data was stored or transmitted');
});

test('Urban Water Monitor binds each primary demo journey to a valid route', () => {
  const manifest = urbanWaterMonitor();
  const serializedBindings = JSON.stringify(manifest.dataBindings);
  for (const route of [
    '/map',
    '/capture',
    '/campaigns',
    '/results',
    '/events',
    '/capture/confirmed',
  ]) {
    expect(serializedBindings).toContain(`"value":"${route}"`);
  }

  expect(manifest.dataBindings?.['capture-confirm']).toMatchObject({
    componentType: 'Button',
    events: { press: [{ target: { input: { route: { value: '/capture/confirmed' } } } }] },
  });
  expect(
    createNavigatorPlan(manifest.navigator, {
      platform: 'web',
      responsiveSize: 'expanded',
      expoRouterVersion: '57.0.18',
    }).diagnostics.filter(({ severity }) => severity === 'error'),
  ).toEqual([]);
});

test('Urban Water Monitor creates a portable artifact with its map asset', () => {
  const artifact = createTemplateArtifact({ category: TEMPLATE_CATEGORY, slug: TEMPLATE_SLUG });

  expect(artifact.assets).toHaveLength(1);
  expect(artifact.assets[0]).toMatchObject({
    mediaId: 'urban-water-map',
    targetPath: 'assets/images/urban-water-map.png',
    contentType: 'image/png',
  });
  expect(existsSync(artifact.assets[0]?.sourcePath ?? '')).toBe(true);
});
