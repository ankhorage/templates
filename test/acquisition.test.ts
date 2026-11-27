import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { isAppManifest } from '@ankhorage/contracts';
import { createZefixPublicRestApi } from '@ankhorage/data-sources';
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

test('Acquisition consumes the published Zefix descriptor without Zefix result persistence or embedded secrets', () => {
  const manifest = resolveTemplate('business_productivity', 'acquisition').createAppManifest();
  const vendor = manifest.infra.apis?.zefix;

  expect(manifest.state).toEqual({ provider: 'legend', persistence: false });
  expect(manifest.infra.environments.local).toEqual({
    deployment: {
      compute: { provider: 'local' },
      runtime: { provider: 'minikube' },
    },
    database: { provider: 'supabase', tier: 'dev' },
    secretStore: { provider: 'supabase-vault' },
  });
  expect(manifest.infra.environments.local).not.toHaveProperty('graphDatabase');
  expect(manifest.infra.environments.local).not.toHaveProperty('objectStorage');
  expect(manifest.infra.environments.local).not.toHaveProperty('auth');
  expect(vendor).toEqual(createZefixPublicRestApi());
  const serialized = JSON.stringify(manifest);
  expect(serialized).not.toContain('ZEFIX_USERNAME');
  expect(serialized).not.toContain('ZEFIX_PASSWORD');
  expect(serialized).not.toContain('neo4j-password');
  expect(serialized).not.toContain('neo4j');
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

  expect(manifest.dataBindings).toMatchObject({
    'company-search': {
      props: {
        value: {
          value: {
            kind: 'fallback',
            value: { capability: 'state.acquisition', path: 'searchQuery' },
          },
        },
      },
      events: {
        valueChange: [
          {
            target: {
              capability: 'state.set',
              input: {
                path: { kind: 'literal', value: 'acquisition.searchQuery' },
                value: { capability: 'searchInput.valueChange', path: 'payload.value' },
              },
            },
          },
        ],
        submit: [
          {
            target: {
              capability: 'api.zefix.company.search',
              result: 'acquisition.zefix.search',
              input: {
                body: {
                  kind: 'object',
                  fields: { name: { capability: 'state.acquisition', path: 'searchQuery' } },
                },
              },
            },
            when: { operator: 'neq', value: { kind: 'literal', value: '' } },
          },
        ],
      },
    },
  });
});

test('Acquisition declares raw Zefix result-slot rows without mixing them with local demo data', () => {
  const manifest = resolveTemplate('business_productivity', 'acquisition').createAppManifest();
  const masterDetail = manifest.screens.acquisition?.root.children?.find(
    ({ id }) => id === 'acquisition-master-detail',
  );
  const zefixTable = masterDetail?.children?.[0]?.children?.find(
    ({ id }) => id === 'zefix-search-results',
  );
  if (zefixTable === undefined)
    throw new Error('Acquisition must include the Zefix results table.');

  const serializedTable = JSON.stringify(zefixTable);
  const zefixBinding = manifest.dataBindings?.['zefix-search-results'];

  expect(zefixTable.props?.rows).toEqual([]);
  expect(zefixBinding?.props?.rows).toEqual({
    value: {
      kind: 'fallback',
      value: { capability: 'api.zefix.company.search', result: 'acquisition.zefix.search' },
      fallback: { kind: 'literal', value: [] },
    },
  });
  expect(serializedTable).toContain('"rowKey":"uid"');
  expect(serializedTable).toContain('"value":"name"');
  expect(serializedTable).not.toContain('website');
  expect(serializedTable).not.toContain('contact');
  expect(serializedTable).not.toContain('route');
  expect(serializedTable).not.toContain('wire');
  expect(JSON.stringify(zefixBinding)).not.toContain('wire');
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

  const zefixBinding = JSON.stringify(manifest.dataBindings?.['zefix-search-results']);
  expect(zefixBinding).toContain('acquisition.zefix.search');
  expect(zefixBinding).toContain('acquisition.selectedZefixCompanyUids');
  expect(zefixBinding).toContain('acquisition.activeZefixCompanyUid');
  expect(zefixBinding).not.toContain('navigator.navigate');
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
