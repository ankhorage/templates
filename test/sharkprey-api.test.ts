import type {
  AppManifest,
  ComponentDataBinding,
  EventBinding,
  ScreenSpec,
  UiNode,
} from '@ankhorage/contracts';
import { ZORA_COMPONENT_META } from '@ankhorage/zora/metadata';
import { expect, test } from 'bun:test';

import createAppManifest from '../src/templates/categories/education-learning/sharkprey/createAppManifest';

test('SharkPrey invokes Navigator through its canonical capability', () => {
  const manifest = createAppManifest();
  const [event] = requireEvents(requireBinding(manifest, 'setup-game'), 'valueChange');

  expect(event?.target).toEqual({
    capability: 'navigator.navigate',
    input: {
      route: { kind: 'literal', value: '/training-setup/table' },
      params: {
        kind: 'object',
        fields: { gameCategory: { capability: 'radioGroup.valueChange', path: 'payload.value' } },
      },
    },
  });
});

test('SharkPrey binds every Button navigation action through button.press', () => {
  const manifest = createAppManifest();
  const expectedRoutes = {
    'onboarding-start': '/training-setup',
    'review-next': '/training-setup',
  } as const;
  const routes = new Set(collectNavigatorPaths(manifest.navigator));
  const button = ZORA_COMPONENT_META.Button;
  if (button === undefined) throw new Error('ZORA does not expose Button metadata.');
  const buttonEvent = button.events?.press;

  expect(buttonEvent?.eventType).toBe('button.press');
  for (const [componentId, route] of Object.entries(expectedRoutes)) {
    const binding = requireBinding(manifest, componentId);
    const node = findManifestNode(manifest, componentId);
    const [event] = requireEvents(binding, 'press');

    expect(binding.componentType).toBe('Button');
    expect(node.type).toBe('Button');
    expect(node.props?.onPress).toBeUndefined();
    expect(routes.has(route)).toBe(true);
    expect(event?.target).toEqual({
      capability: 'navigator.navigate',
      input: { route: { kind: 'literal', value: route } },
    });
  }

  for (const node of Object.values(manifest.screens).flatMap((screen) =>
    collectNodes(screen.root),
  )) {
    if (node.type === 'Button') expect(node.props?.onPress).toBeUndefined();
  }
});

test('SharkPrey defers interactions without an application state owner', () => {
  const manifest = createAppManifest();
  const routes = new Set(collectNavigatorPaths(manifest.navigator));
  const nodeIds = new Set(
    Object.values(manifest.screens).flatMap((screen) =>
      collectNodes(screen.root).map((node) => node.id),
    ),
  );

  expect(routes.has('/session-summary')).toBe(false);
  expect(manifest.screens['session-summary']).toBeUndefined();
  expect(Object.keys(manifest.dataBindings ?? {})).not.toContain('summary-practice');
  expect(Object.keys(manifest.dataBindings ?? {})).not.toContain('stats-practice');
  expect(nodeIds).not.toContain('onboarding-level');
  expect(nodeIds).not.toContain('history-filter');
  expect(nodeIds).not.toContain('learn-explore');
  expect(nodeIds).not.toContain('learn-continue');
  expect([...nodeIds].some((id) => id.includes('chevron'))).toBe(false);
});

test('SharkPrey loads API data through a capability invocation and named result slot', () => {
  const manifest = createAppManifest();
  const screen = requireScreen(manifest, 'decision-table');

  expect(screen.dataLoaders?.[0]).toEqual({
    capability: 'api.poker-training.getPokerTrainingTaskById',
    result: 'task',
    input: { taskId: { capability: 'context.route', path: 'params.taskId' } },
  });
  expect(findNode(screen.root, 'decision-answers').repeat).toEqual({
    source: {
      capability: 'api.poker-training.getPokerTrainingTaskById',
      result: 'task',
      path: 'options',
    },
    itemAlias: 'option',
    keyPath: 'id',
  });
});

test('SharkPrey reports an empty training-task result without treating failed operations as empty', () => {
  const manifest = createAppManifest();
  const events = requireEvents(requireBinding(manifest, 'setup-difficulty-4'), 'press');

  expect(events).toHaveLength(3);
  expect(events[2]).toEqual(emptyTrainingTaskAlertEvent());
});

function emptyTrainingTaskAlertEvent(): EventBinding {
  return {
    target: {
      capability: 'expo.alert',
      input: {
        message: {
          kind: 'literal',
          value: 'Action unavailable\n\nNo matching training task was found.',
        },
      },
    },
    when: {
      source: {
        kind: 'transform',
        value: {
          capability: 'api.poker-training.listPokerTrainingTasks',
          result: 'listedTask',
        },
        transforms: ['length'],
      },
      operator: 'eq',
      value: { kind: 'literal', value: 0 },
    },
  };
}

test('SharkPrey evaluates result conditions through Contracts 26 expressions', () => {
  const manifest = createAppManifest();
  const events = requireEvents(requireBinding(manifest, 'decision-answer-button'), 'press');

  expect(events[0]?.target).toEqual({
    capability: 'api.poker-training.checkPokerTrainingTaskAnswer',
    result: 'answer',
    input: {
      taskId: {
        capability: 'api.poker-training.getPokerTrainingTaskById',
        result: 'task',
        path: 'task.id',
      },
      selectedOptionValue: { capability: 'context.route', path: 'option.value' },
    },
  });
  expect(events.slice(1).map((event) => event.when)).toEqual([
    {
      source: {
        capability: 'api.poker-training.checkPokerTrainingTaskAnswer',
        result: 'answer',
        path: 'correct',
      },
      operator: 'eq',
      value: { kind: 'literal', value: true },
    },
    {
      source: {
        capability: 'api.poker-training.checkPokerTrainingTaskAnswer',
        result: 'answer',
        path: 'correct',
      },
      operator: 'eq',
      value: { kind: 'literal', value: false },
    },
  ]);
});

test('SharkPrey uses ZORA emitted event IDs and canonical context route references', () => {
  const manifest = createAppManifest();
  const [event] = requireEvents(requireBinding(manifest, 'setup-street'), 'valueChange');

  expect(event?.target.input).toMatchObject({
    params: {
      kind: 'object',
      fields: {
        gameCategory: { capability: 'context.route', path: 'params.gameCategory' },
        tableSize: { capability: 'context.route', path: 'params.tableSize' },
        street: { capability: 'radioGroup.valueChange', path: 'payload.value' },
      },
    },
  });
});

test('SharkPrey manifests contain no legacy binding shapes', () => {
  const manifest = createAppManifest();
  const serialized = JSON.stringify({
    bindings: manifest.dataBindings,
    loaders: Object.values(manifest.screens).flatMap((screen) => screen.dataLoaders ?? []),
  });

  expect(serialized).not.toContain('"kind":"action"');
  expect(serialized).not.toContain('"kind":"operation"');
  expect(serialized).not.toContain('"kind":"source"');
  expect(serialized).not.toContain('"kind":"context"');
  expect(serialized).not.toContain('"kind":"event"');
  expect(serialized).not.toContain('"operation"');
});

function findNode(root: UiNode, id: string): UiNode {
  const nodes = [root];
  for (const node of nodes) {
    if (node.id === id) return node;
    nodes.push(...(node.children ?? []));
  }
  throw new Error(`Missing node ${id}.`);
}

function findManifestNode(manifest: AppManifest, id: string): UiNode {
  for (const screen of Object.values(manifest.screens)) {
    const node = collectNodes(screen.root).find((candidate) => candidate.id === id);
    if (node) return node;
  }
  throw new Error(`Missing node ${id}.`);
}

function collectNodes(root: UiNode): readonly UiNode[] {
  const nodes = [root];
  for (const node of nodes) nodes.push(...(node.children ?? []));
  return nodes;
}

function collectNavigatorPaths(navigator: AppManifest['navigator']): readonly string[] {
  return navigator.routes.flatMap(({ path, navigator: nestedNavigator }) => [
    ...(path === undefined ? [] : [path]),
    ...(nestedNavigator === undefined ? [] : collectNavigatorPaths(nestedNavigator)),
  ]);
}

function requireScreen(manifest: AppManifest, id: string): ScreenSpec {
  const screen = Object.values(manifest.screens).find((candidate) => candidate.id === id);
  if (!screen) throw new Error(`Missing screen ${id}.`);
  return screen;
}

function requireBinding(manifest: AppManifest, id: string): ComponentDataBinding {
  const binding = Object.values(manifest.dataBindings ?? {}).find(
    (candidate) => candidate.componentId === id,
  );
  if (!binding) throw new Error(`Missing binding ${id}.`);
  return binding;
}

function requireEvents(binding: ComponentDataBinding, event: string): readonly EventBinding[] {
  const events = Object.entries(binding.events ?? {}).find(([name]) => name === event)?.[1];
  if (!events) throw new Error(`Missing ${event} events for binding ${binding.componentId}.`);
  return events;
}
