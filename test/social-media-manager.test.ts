import type { AppManifest, StateAdapter, UiNode } from '@ankhorage/contracts';
import { createNavigatorPlan } from '@ankhorage/navigator';
import { expect, mock, test } from 'bun:test';

import { resolveTemplate, validateTemplateManifest } from '../src/index';

await mock.module('react-native', () => ({
  StyleSheet: { create: <T>(styles: T) => styles },
  Text: () => null,
  View: () => null,
}));

const runtime = await import('@ankhorage/runtime');

/*** Find one semantic node without coupling acceptance to the authoring layout. */
function findNode(node: UiNode, id: string): UiNode | undefined {
  if (node.id === id) return node;
  for (const child of node.children ?? []) {
    const match = findNode(child, id);
    if (match !== undefined) return match;
  }
  return undefined;
}

/*** Dispatch one supported workflow action through the released Runtime state boundary. */
async function dispatchWorkflowAction(
  manifest: AppManifest,
  stateAdapter: StateAdapter,
  screenId: string,
  nodeId: string,
): Promise<void> {
  const screen = Object.values(manifest.screens).find(({ id }) => id === screenId);
  if (screen === undefined) throw new Error(`Missing Social Media Manager screen ${screenId}.`);
  const node = findNode(screen.root, nodeId);
  if (node === undefined || manifest.dataBindings === undefined) {
    throw new Error(`Missing Social Media Manager workflow action ${nodeId}.`);
  }
  await runtime.dispatchRuntimeComponentEvent({
    dataBindings: manifest.dataBindings,
    event: { payload: {}, sourceNodeId: nodeId, type: 'button.press' },
    eventName: 'press',
    executeCapability: runtime.composeRuntimeCapabilityExecutor({
      apiCapabilityExecutor: () => Promise.resolve({ diagnostics: [], ok: false as const }),
      stateAdapter,
    }),
    node,
  });
}

test('Social Media Manager is a release-valid portable social community template', () => {
  const manifest = resolveTemplate('social_community', 'social-media-manager').createAppManifest();

  expect(validateTemplateManifest(manifest, 'release')).toMatchObject({
    status: 'ready',
    diagnostics: [],
  });
  expect(Object.keys(manifest.screens)).toEqual([
    'onboarding',
    'calendar',
    'campaigns',
    'library',
    'composer',
    'preview',
    'approvals',
    'approval-detail',
    'schedule',
    'queue',
    'notifications',
    'analytics',
    'audit',
    'automation',
  ]);
  expect(JSON.parse(JSON.stringify(manifest))).toEqual(manifest);
  expect(
    createNavigatorPlan(manifest.navigator, {
      platform: 'ios',
      responsiveSize: 'compact',
      expoRouterVersion: '57.0.18',
    }).diagnostics.filter(({ severity }) => severity === 'error'),
  ).toEqual([]);
});

test('Social Media Manager advances the local draft to scheduled workflow without claiming publication', async () => {
  const manifest = resolveTemplate('social_community', 'social-media-manager').createAppManifest();
  const stateAdapter = runtime.createRuntimeMemoryStateAdapter();

  await dispatchWorkflowAction(manifest, stateAdapter, 'composer', 'composer-save-draft');
  expect(stateAdapter.get('social-media-manager.workflow')).toMatchObject({
    data: { stage: 'draft' },
  });
  await dispatchWorkflowAction(manifest, stateAdapter, 'preview', 'preview-request-approval');
  expect(stateAdapter.get('social-media-manager.workflow')).toMatchObject({
    data: { stage: 'approval' },
  });
  await dispatchWorkflowAction(
    manifest,
    stateAdapter,
    'approval-detail',
    'approval-approve-design',
  );
  await dispatchWorkflowAction(manifest, stateAdapter, 'schedule', 'schedule-confirm');
  expect(stateAdapter.get('social-media-manager.workflow')).toMatchObject({
    data: { stage: 'scheduled' },
  });
  expect(JSON.stringify(manifest)).toContain('delivery unconfirmed');
  expect(JSON.stringify(manifest)).toContain('No provider data configured');
});

test('Social Media Manager keeps advanced automation explicitly blocked on the published Flow owner API', () => {
  const manifest = resolveTemplate('social_community', 'social-media-manager').createAppManifest();
  const { automation } = manifest.screens;
  if (automation === undefined) throw new Error('Missing Social Media Manager automation screen.');

  expect(findNode(automation.root, 'automation-unavailable')?.props?.disabled).toBe(true);
  expect(JSON.stringify(automation)).toContain('@ankhorage/zora/flow');
  expect(JSON.stringify(manifest)).not.toContain('published successfully');
});
