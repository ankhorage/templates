import type {
  FlowApprovalRequest,
  FlowDefinition,
  FlowRunSnapshot,
} from '@ankhorage/contracts/flow';
import { createNavigatorPlan, getNavigatorCatalog } from '@ankhorage/navigator';
import { expect, test } from 'bun:test';

import { createTemplateArtifact, resolveTemplate, validateTemplateManifest } from '../src/index';

const category = 'developer_tools';
const slug = 'flow';
const expoRouterVersion = getNavigatorCatalog()
  .capabilities.flatMap((capability) => capability.dependencies)
  .find((dependency) => dependency.packageName === 'expo-router')
  ?.versionRange.match(/\d+\.\d+\.\d+/u)?.[0];

if (!expoRouterVersion) throw new Error('Navigator must publish an Expo Router requirement.');

/*** Create one fake-API dataset using only the released serializable Flow contracts. */
function createFakeFlowApi(): {
  readonly approval: FlowApprovalRequest;
  readonly run: FlowRunSnapshot;
  readonly workflow: FlowDefinition;
} {
  const workflow: FlowDefinition = {
    id: 'order-intake',
    version: 3,
    title: 'Order intake',
    nodes: [],
    edges: [],
    triggers: [{ id: 'manual', kind: 'manual' }],
  };
  const run: FlowRunSnapshot = {
    id: 'run-20261116-01',
    flow: { id: workflow.id, version: workflow.version },
    status: 'waiting_for_approval',
    trigger: { triggerId: 'manual', kind: 'manual' },
    createdAt: '2026-11-16T09:14:02.000Z',
    steps: [],
  };
  return {
    workflow,
    run,
    approval: {
      id: 'apr-118',
      runId: run.id,
      status: 'pending',
      requestedAt: '2026-11-16T09:14:04.000Z',
    },
  };
}

test('Flow is discovered through the canonical filesystem catalog and has no runtime media', () => {
  const template = resolveTemplate(category, slug);
  const artifact = createTemplateArtifact({ category, slug });

  expect(template).toMatchObject({
    selector: 'developer_tools/flow',
    sourceRoot: 'src/templates/categories/developer-tools/flow',
    name: 'Ankhorage Flow',
  });
  expect(artifact.assets).toEqual([]);
});

test('Flow presents every independent authoring and monitoring screen through released owners', () => {
  const manifest = resolveTemplate(category, slug).createAppManifest();
  const serialized = JSON.stringify(manifest);

  for (const screen of [
    'workflows',
    'workflow-new',
    'workflow-editor',
    'versions',
    'runs',
    'run-detail',
    'approvals',
    'schedules',
    'credentials',
    'settings',
  ]) {
    expect(Object.hasOwn(manifest.screens, screen)).toBe(true);
  }
  expect(serialized).toContain('ZORA #1108 and #1109 pending');
  expect(serialized).toContain('Flow API #8');
  expect(serialized).toContain('Secret reference');
  expect(serialized).toContain('bunx @ankhorage/templates create flow-demo');
  expect(serialized).toContain('not an executable Expo app and no port is documented');
  expect(serialized).not.toContain('"type":"FlowCanvas"');
  expect(serialized).not.toContain('@ankhorage/flow');
  expect(validateTemplateManifest(manifest, 'release')).toMatchObject({
    status: 'ready',
    diagnostics: [],
  });
});

test('Flow fake-API acceptance retains contract identity and released host bindings without adding an executor', () => {
  const fakeApi = createFakeFlowApi();
  const manifest = resolveTemplate(category, slug).createAppManifest();

  expect(JSON.parse(JSON.stringify(fakeApi))).toEqual(fakeApi);
  expect(fakeApi.run.flow).toEqual({ id: 'order-intake', version: 3 });
  expect(fakeApi.run.status).toBe('waiting_for_approval');
  expect(fakeApi.approval).toMatchObject({ runId: fakeApi.run.id, status: 'pending' });
  expect(manifest.dataBindings?.['runs-detail']).toMatchObject({
    componentType: 'Button',
    events: { press: [{ target: { capability: 'navigator.navigate' } }] },
  });
  expect(manifest.dataBindings?.['runs-start']).toMatchObject({
    events: { press: [{ target: { capability: 'flow.start' } }] },
  });
  expect(manifest.dataBindings?.['approval-approve']).toMatchObject({
    events: { press: [{ target: { capability: 'flow.approval' } }] },
  });
  expect(manifest.dataBindings?.['approval-reject']).toMatchObject({
    events: { press: [{ target: { capability: 'flow.approval' } }] },
  });
  expect(manifest.dataBindings?.['run-events']).toMatchObject({
    events: { press: [{ target: { capability: 'flow.events' } }] },
  });
  expect(JSON.stringify(manifest.dataBindings)).not.toContain('flow.execute');
  expect(JSON.stringify(manifest.dataBindings)).not.toContain('flow.publish');
});

test('Flow navigation plans across web and native responsive targets', () => {
  const manifest = resolveTemplate(category, slug).createAppManifest();

  for (const platform of ['android', 'ios', 'web'] as const) {
    for (const responsiveSize of ['compact', 'medium', 'expanded'] as const) {
      expect(
        createNavigatorPlan(manifest.navigator, {
          expoRouterVersion,
          platform,
          responsiveSize,
        }).diagnostics.filter(({ severity }) => severity === 'error'),
      ).toEqual([]);
    }
  }
});
