import type {
  AppManifest,
  ComponentDataBinding,
  EventBinding,
  ScreenSpec,
  UiNode,
} from '@ankhorage/contracts';
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
