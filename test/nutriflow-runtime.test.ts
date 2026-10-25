import type { AppManifest, BindingValue, StateAdapter, UiNode } from '@ankhorage/contracts';
import { expect, mock, test } from 'bun:test';

import { resolveTemplate } from '../src/index';

await mock.module('react-native', () => ({
  StyleSheet: { create: <T>(styles: T) => styles },
  Text: () => null,
  View: () => null,
}));

const runtime = await import('@ankhorage/runtime');

/*** Locate one authored node for Runtime event dispatch acceptance. */
function findNode(node: UiNode, id: string): UiNode {
  if (node.id === id) return node;
  for (const child of node.children ?? []) {
    const found = findNodeOrUndefined(child, id);
    if (found !== undefined) return found;
  }
  throw new Error(`Missing NutriFlow node '${id}'.`);
}

/*** Find a descendant without turning an absent branch into a test failure yet. */
function findNodeOrUndefined(node: UiNode, id: string): UiNode | undefined {
  if (node.id === id) return node;
  for (const child of node.children ?? []) {
    const found = findNodeOrUndefined(child, id);
    if (found !== undefined) return found;
  }
  return undefined;
}

/*** Build the released Runtime executor with an observable Navigator edge. */
function createDispatcher(manifest: AppManifest, stateAdapter: StateAdapter) {
  const { dataBindings } = manifest;
  if (dataBindings === undefined) throw new Error('NutriFlow requires data bindings.');
  const routes: string[] = [];
  const executeCapability = runtime.composeRuntimeCapabilityExecutor({
    apiCapabilityExecutor: () => Promise.resolve({ diagnostics: [], ok: false as const }),
    capabilityExecutor: ({ capability, input }) => {
      const route = (input as { readonly route?: unknown } | undefined)?.route;
      if (capability !== 'navigator.navigate' || typeof route !== 'string') {
        return Promise.resolve({ diagnostics: [], ok: false as const });
      }
      routes.push(route);
      return Promise.resolve({ data: { route }, ok: true as const });
    },
    stateAdapter,
  });
  return { dataBindings, executeCapability, routes };
}

/*** Dispatch one real Runtime press and retain the released result slot across attempts. */
async function press(
  manifest: AppManifest,
  dispatcher: ReturnType<typeof createDispatcher>,
  actionId: string,
  slot: { value: BindingValue | undefined },
) {
  const screen =
    actionId === 'log-add-berry-oats'
      ? manifest.screens['log-berry-oats']
      : actionId === 'log-add-green-bowl'
        ? manifest.screens['log-green-bowl']
        : manifest.screens['log-lemon-salmon'];
  if (screen === undefined) throw new Error(`Missing NutriFlow action '${actionId}'.`);
  await runtime.dispatchRuntimeComponentEvent({
    dataBindings: dispatcher.dataBindings,
    event: { payload: {}, sourceNodeId: actionId, type: 'button.press' },
    eventName: 'press',
    executeCapability: dispatcher.executeCapability,
    node: findNode(screen.root, actionId),
    resultSlots: { 'meal-log-update': slot.value },
    writeResultSlot: (name, value) => {
      if (name === 'meal-log-update') slot.value = value;
    },
  });
}

test('NutriFlow appends repeatedly and exposes reactive state-backed Home bindings', async () => {
  const manifest = resolveTemplate('food_drink', 'nutriflow').createAppManifest();
  const stateAdapter = runtime.createRuntimeMemoryStateAdapter();
  const dispatcher = createDispatcher(manifest, stateAdapter);
  const slot = { value: undefined };
  const changes: unknown[] = [];
  const subscription = stateAdapter.subscribe('nutriflow.meals', ({ value }) =>
    changes.push(value),
  );
  const { home } = manifest.screens;
  if (home === undefined) throw new Error('Missing NutriFlow Home.');
  const list = findNode(home.root, 'home-meal-list');
  const progress = findNode(home.root, 'home-progress');

  const { repeat } = list;
  if (repeat === undefined) throw new Error('NutriFlow Home meal list must repeat.');
  expect(runtime.resolveRuntimeBindingExpressionSync(repeat.source, { stateAdapter })).toEqual([]);
  await press(manifest, dispatcher, 'log-add-berry-oats', slot);
  await press(manifest, dispatcher, 'log-add-green-bowl', slot);
  await press(manifest, dispatcher, 'log-add-berry-oats', slot);

  expect(stateAdapter.get('nutriflow.meals')).toEqual({
    ok: true,
    data: [
      { energy: '320 kcal', serving: '1 bowl', title: 'Berry overnight oats' },
      { energy: '480 kcal', serving: '1 bowl', title: 'Green grain bowl' },
      { energy: '320 kcal', serving: '1 bowl', title: 'Berry overnight oats' },
    ],
  });
  expect(changes).toHaveLength(3);
  expect(dispatcher.routes).toEqual([
    '/log/added/berry-oats',
    '/log/added/green-bowl',
    '/log/added/berry-oats',
  ]);
  expect(
    runtime.resolveRuntimeBindings({
      dataBindings: dispatcher.dataBindings,
      node: progress,
      props: progress.props ?? {},
      stateAdapter,
    }).props,
  ).toMatchObject({ centerValue: 3, value: 3, accessibilityLabel: 'Meals logged in this session' });
  if (subscription.ok) await subscription.data.unsubscribe();
});

test('NutriFlow clears a prior success slot and does not navigate on failed update', async () => {
  const manifest = resolveTemplate('food_drink', 'nutriflow').createAppManifest();
  const state = runtime.createRuntimeMemoryStateAdapter();
  const slot = { value: undefined };
  const success = createDispatcher(manifest, state);
  await press(manifest, success, 'log-add-berry-oats', slot);
  const readOnly: StateAdapter = {
    capabilities: state.capabilities,
    get: (path) => state.get(path),
    set: (path, value) => state.set(path, value),
    subscribe: (path, listener) => state.subscribe(path, listener),
  };
  const failure = createDispatcher(manifest, readOnly);
  await press(manifest, failure, 'log-add-green-bowl', slot);

  expect(success.routes).toEqual(['/log/added/berry-oats']);
  expect(failure.routes).toEqual([]);
  expect(slot.value).toBeUndefined();
});
