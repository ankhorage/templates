import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { isAppManifest } from '@ankhorage/contracts';
import { createNavigatorPlan } from '@ankhorage/navigator';
import { expect, test } from 'bun:test';

import {
  createTemplateArtifact,
  materializeTemplateRevision,
  resolveTemplate,
  validateTemplateManifest,
} from '../src/index';

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

test('Acquisition configures Zefix as a credential-referenced vendor API and uses project Vault', () => {
  const manifest = resolveTemplate('business_productivity', 'acquisition').createAppManifest();
  const vendor = manifest.infra.apis?.zefix;

  expect(manifest.state).toEqual({ provider: 'legend', persistence: false });
  expect(manifest.infra.environments.local.secretStore).toEqual({ provider: 'supabase-vault' });
  expect(vendor).toMatchObject({
    id: 'zefix',
    origin: 'external',
    protocol: 'rest',
    baseUrl: 'https://www.zefix.admin.ch/ZefixPublicREST',
    credential: { id: 'zefix-credentials', kind: 'basic' },
    endpoints: {
      'company-search': {
        path: '/api/v1/company/search',
        operations: { 'company.search': { intent: 'read', method: 'POST' } },
      },
      'company-by-uid': {
        path: '/api/v1/company/uid/{uid}',
        operations: {
          'company.by-uid': {
            intent: 'read',
            method: 'GET',
            request: {
              parameters: [
                { name: 'uid', location: 'path', required: true, schema: { type: 'string' } },
              ],
            },
          },
        },
      },
    },
  });
  const serialized = JSON.stringify(manifest);
  expect(serialized).not.toContain('ZEFIX_USERNAME');
  expect(serialized).not.toContain('ZEFIX_PASSWORD');
  expect(serialized).not.toContain('neo4j-password');
  expect(isAppManifest(JSON.parse(serialized))).toBe(true);
});

test('Acquisition materializes its canonical ankh.config.json and bundled SVG unchanged', async () => {
  const root = mkdtempSync(join(tmpdir(), 'acquisition-template-'));
  const manifest = resolveTemplate('business_productivity', 'acquisition').createAppManifest();

  try {
    const artifact = await materializeTemplateRevision({
      cwd: root,
      projectSlug: 'acquisition-preview',
      template: { category: 'business_productivity', slug: 'acquisition' },
      manifest,
    });
    const generated = JSON.parse(
      readFileSync(join(artifact.projectPath, 'ankh.config.json'), 'utf8'),
    ) as unknown;

    expect(isAppManifest(generated)).toBe(true);
    expect(generated).toEqual(manifest);
    expect(artifact.createdFiles).toContain('assets/images/svg/acquisition-target.svg');
    expect(existsSync(join(artifact.projectPath, 'assets/images/svg/acquisition-target.svg'))).toBe(
      true,
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('Acquisition wires ZORA search events to session state and the Zefix API result slot', () => {
  const manifest = resolveTemplate('business_productivity', 'acquisition').createAppManifest();
  const search = manifest.dataBindings?.['company-search'];

  expect(search?.props?.value).toMatchObject({
    value: {
      kind: 'fallback',
      value: { capability: 'state.acquisition', path: 'searchQuery' },
    },
  });
  expect(search?.events?.valueChange?.[0]?.target).toMatchObject({
    capability: 'state.set',
    input: {
      path: { kind: 'literal', value: 'acquisition.searchQuery' },
      value: { capability: 'searchInput.valueChange', path: 'payload.value' },
    },
  });
  expect(search?.events?.submit?.[0]?.target).toMatchObject({
    capability: 'api.zefix.company.search',
    result: 'acquisition.zefix.search',
    input: {
      body: {
        kind: 'object',
        fields: { name: { capability: 'state.acquisition', path: 'searchQuery' } },
      },
    },
  });
  expect(search?.events?.submit?.[0]?.when).toMatchObject({
    operator: 'neq',
    value: { kind: 'literal', value: '' },
  });
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
