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
  expect(Object.keys(manifest.screens)).toEqual([
    'acquisition',
    'company-detail-wetzikon-technik',
    'company-detail-alpenblick-digital',
    'company-detail-seeblick-architektur',
  ]);
  expect(artifact.assets).toEqual([
    expect.objectContaining({ mediaId: 'acquisition-target', contentType: 'image/svg+xml' }),
  ]);
  expect(existsSync(artifact.assets[0]?.sourcePath ?? '')).toBe(true);
  expect(JSON.parse(JSON.stringify(manifest))).toEqual(manifest);
});

test('Acquisition delegates each responsive pane scroll owner to published MasterDetail', () => {
  const manifest = resolveTemplate('business_productivity', 'acquisition').createAppManifest();
  const result = validateTemplateManifest(manifest, 'draft');
  const plan = createNavigatorPlan(manifest.navigator, {
    platform: 'android',
    responsiveSize: 'compact',
    expoRouterVersion: '57.0.18',
  });

  expect(plan.diagnostics.filter(({ severity }) => severity === 'error')).toEqual([]);
  expect(result.status).toBe('ready');
  expect(result.diagnostics.filter(({ code }) => code === 'missing-element')).toEqual([]);

  const masterDetail = manifest.screens.acquisition?.root.children?.find(
    ({ id }) => id === 'acquisition-master-detail',
  );

  expect(masterDetail).toMatchObject({
    type: 'MasterDetail',
    props: { activePane: 'master', desktopMode: 'split', masterWidth: 30 },
    children: [
      { type: 'View', props: { accessibilityLabel: 'Company list' } },
      { type: 'View', props: { accessibilityLabel: 'Selected company detail' } },
    ],
  });
  expect(masterDetail?.children?.every(({ type }) => type !== 'ScrollView')).toBe(true);
  expect(manifest.screens.acquisition?.root.props?.scroll).toBe(false);
});

test('Acquisition encodes rich DataTable cells with independent selection and activation events', () => {
  const manifest = resolveTemplate('business_productivity', 'acquisition').createAppManifest();
  const masterDetail = manifest.screens.acquisition?.root.children?.find(
    ({ id }) => id === 'acquisition-master-detail',
  );
  const table = masterDetail?.children?.[0]?.children?.find(
    ({ id }) => id === 'acquisition-data-table',
  );
  const serializedTable = JSON.stringify(table);
  const serializedBinding = JSON.stringify(manifest.dataBindings?.['acquisition-data-table']);

  expect(serializedTable).toContain('"type":"DataTable"');
  expect(serializedTable).toContain('"rowKey":"route"');
  expect(serializedTable).toContain('"kind":"image"');
  expect(serializedTable).toContain('"weight":"bold"');
  expect(serializedTable).toContain('"kind":"link"');
  expect(serializedTable).toContain('https://wetzikon-technik.ch');
  expect(serializedBinding).toContain('dataTable.selectionChange');
  expect(serializedBinding).toContain('acquisition.selectedCompanyRoutes');
  expect(serializedBinding).toContain('dataTable.rowActivate');
  expect(serializedBinding).toContain('navigator.navigate');
});

test('Acquisition serializes ordered Timeline media markers', () => {
  const manifest = resolveTemplate('business_productivity', 'acquisition').createAppManifest();
  const history = manifest.screens['company-detail-wetzikon-technik']?.root.children?.find(
    ({ id }) => id === 'company-history-wetzikon-technik',
  );
  const serializedHistory = JSON.stringify(history);

  expect(serializedHistory).toContain('"type":"Timeline"');
  expect(serializedHistory).toMatch(
    /added-to-acquisition[\s\S]*first-call-attempt[\s\S]*follow-up-scheduled[\s\S]*note-added/,
  );
  expect(serializedHistory.match(/"marker":\{"mediaId":"acquisition-target"\}/g)).toHaveLength(4);
});
