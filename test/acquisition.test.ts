import { existsSync } from 'node:fs';

import { createNavigatorPlan } from '@ankhorage/navigator';
import { expect, test } from 'bun:test';

import { createTemplateArtifact, resolveTemplate, validateTemplateManifest } from '../src/index';

test('Acquisition registers one portable draft manifest with its bundled design asset', () => {
  const template = resolveTemplate('business_productivity', 'acquisition');
  const manifest = template.createAppManifest();
  const artifact = createTemplateArtifact({
    category: 'business_productivity',
    slug: 'acquisition',
  });

  expect(template).toMatchObject({
    selector: 'business_productivity/acquisition',
    sourceRoot: 'src/templates/categories/business-productivity/acquisition',
  });
  expect(Object.keys(manifest.screens)).toEqual(['acquisition', 'company-detail']);
  expect(artifact.assets).toEqual([
    expect.objectContaining({ mediaId: 'acquisition-target', contentType: 'image/svg+xml' }),
  ]);
  expect(existsSync(artifact.assets[0]?.sourcePath ?? '')).toBe(true);
  expect(JSON.parse(JSON.stringify(manifest))).toEqual(manifest);
});

test('Acquisition preserves published mobile stack navigation and explicit owner gaps', () => {
  const manifest = resolveTemplate('business_productivity', 'acquisition').createAppManifest();
  const result = validateTemplateManifest(manifest, 'draft');
  const plan = createNavigatorPlan(manifest.navigator, {
    platform: 'android',
    responsiveSize: 'compact',
    expoRouterVersion: '57.0.18',
  });

  expect(plan.diagnostics.filter(({ severity }) => severity === 'error')).toEqual([]);
  expect(result.status).toBe('blocked');
  expect(
    result.diagnostics
      .filter(({ code }) => code === 'missing-element')
      .map(({ requestedCapability }) => requestedCapability),
  ).toEqual([
    'Rich selectable acquisition DataTable',
    'Serializable Timeline items and markers',
    'Responsive desktop master-detail projection',
  ]);
});
