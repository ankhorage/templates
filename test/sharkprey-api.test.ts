import type {
  AppManifest,
  ComponentDataBinding,
  EventBinding,
  ScreenSpec,
  UiNode,
} from '@ankhorage/contracts';
import { expect, test } from 'bun:test';

import createAppManifest from '../src/templates/categories/education-learning/sharkprey/createAppManifest';

const listOperation = {
  apiId: 'poker-training',
  endpointId: 'tasks',
  operationId: 'listPokerTrainingTasks',
} as const;
const detailOperation = {
  apiId: 'poker-training',
  endpointId: 'tasks',
  operationId: 'getPokerTrainingTaskById',
} as const;
const answerOperation = {
  apiId: 'poker-training',
  endpointId: 'tasks',
  operationId: 'checkPokerTrainingTaskAnswer',
} as const;

test('SharkPrey declares the complete canonical poker training API', () => {
  const manifest = createAppManifest();
  const api = manifest.infra.apis?.find(({ id }) => id === 'poker-training');
  const endpoint = api?.endpoints.tasks;

  expect(api).toMatchObject({
    baseUrl: 'https://api.ankhorage.com/v1/poker',
    openApi: { url: 'https://api.ankhorage.com/openapi.json' },
    origin: 'external',
    protocol: 'rest',
  });
  expect(endpoint).toMatchObject({ id: 'tasks', path: '/training/tasks' });
  expect(endpoint?.operations).toMatchObject({
    listPokerTrainingTasks: {
      endpointId: 'tasks',
      intent: 'read',
      method: 'GET',
      path: '/training/tasks',
    },
    getPokerTrainingTaskById: {
      endpointId: 'tasks',
      intent: 'read',
      method: 'GET',
      path: '/training/tasks/{taskId}',
    },
    getPokerTrainingTaskBySlug: {
      endpointId: 'tasks',
      intent: 'read',
      method: 'GET',
      path: '/training/tasks/by-slug/{slug}',
    },
    checkPokerTrainingTaskAnswer: {
      endpointId: 'tasks',
      intent: 'action',
      method: 'POST',
      path: '/training/tasks/{taskId}/answer',
    },
  });
});

test('SharkPrey resolves a listed task before entering the decision screen', () => {
  const manifest = createAppManifest();
  const loader = manifest.screens['training-setup']?.dataLoaders?.[0];
  const start = manifest.dataBindings?.['setup-start'];

  expect(loader).toEqual({
    kind: 'operation',
    operation: listOperation,
    input: { limit: { kind: 'literal', value: 1 } },
  });
  expect(start?.events?.press).toEqual([
    {
      target: { kind: 'action', type: 'navigate' },
      when: {
        source: { kind: 'operation', operation: listOperation, path: '0.id' },
        operator: 'exists',
      },
      input: {
        route: { kind: 'literal', value: '/decision-table' },
        params: {
          kind: 'object',
          fields: {
            taskId: {
              kind: 'source',
              source: { kind: 'operation', operation: listOperation, path: '0.id' },
            },
          },
        },
      },
    },
  ]);

  const screen = requireScreen(manifest, 'training-setup');
  expect(findNode(screen.root, 'setup-start').props).not.toHaveProperty('onPress');
});

test('SharkPrey loads task detail from the route and binds all decision content', () => {
  const manifest = createAppManifest();
  const screen = requireScreen(manifest, 'decision-table');

  expect(screen.dataLoaders?.[0]).toEqual({
    kind: 'operation',
    operation: detailOperation,
    input: {
      taskId: {
        kind: 'source',
        source: { kind: 'context', path: 'route.params.taskId' },
      },
    },
  });
  expect(findNode(screen.root, 'decision-poker-table').type).toBe('PokerTrainingTable');
  expect(requireBinding(manifest, 'decision-poker-table').props?.task?.source).toEqual({
    kind: 'operation',
    operation: detailOperation,
    path: 'task',
  });
  expect(requireBinding(manifest, 'decision-question').props?.text?.source).toEqual({
    kind: 'operation',
    operation: detailOperation,
    path: 'task.prompt',
  });
  expect(requireBinding(manifest, 'decision-action').props?.text?.source).toEqual({
    kind: 'operation',
    operation: detailOperation,
    path: 'task.previousAction',
  });
  expect(requireBinding(manifest, 'decision-category').props?.text).toMatchObject({
    source: { kind: 'operation', operation: detailOperation, path: 'task.street' },
    transforms: ['uppercase'],
  });
});

test('SharkPrey repeats discovered options and evaluates every answer before navigation', () => {
  const manifest = createAppManifest();
  const screen = requireScreen(manifest, 'decision-table');
  const answers = findNode(screen.root, 'decision-answers');
  const answerButton = findNode(screen.root, 'decision-answer-button');
  const bindings = requireBinding(manifest, 'decision-answer-button');
  const events = requireEvents(bindings, 'press');

  expect(answers.type).toBe('FlatList');
  expect(answers.repeat).toEqual({
    source: { kind: 'operation', operation: detailOperation, path: 'options' },
    itemAlias: 'option',
    keyPath: 'id',
  });
  expect(answerButton.props).not.toHaveProperty('onPress');
  expect(bindings.props?.children?.source).toEqual({
    kind: 'context',
    path: 'option.label',
  });
  expect(events[0]).toEqual({
    target: { kind: 'operation', operation: answerOperation },
    input: {
      taskId: {
        kind: 'source',
        source: { kind: 'operation', operation: detailOperation, path: 'task.id' },
      },
      selectedOptionValue: {
        kind: 'source',
        source: { kind: 'context', path: 'option.value' },
      },
    },
  });
  expectAnswerNavigationEvents(events.slice(1));
});

function expectAnswerNavigationEvents(events: readonly EventBinding[]): void {
  expect(events.map((binding) => binding.when)).toEqual([
    {
      source: { kind: 'operation', operation: answerOperation, path: 'correct' },
      operator: 'eq',
      value: true,
    },
    {
      source: { kind: 'operation', operation: answerOperation, path: 'correct' },
      operator: 'eq',
      value: false,
    },
  ]);
  for (const binding of events) {
    expect(binding.target).toEqual({ kind: 'action', type: 'navigate' });
    expect(binding.input?.route).toEqual({
      kind: 'literal',
      value: '/answer-explanation',
    });
  }
}

test('SharkPrey renders review task and outcome from API-backed route data', () => {
  const manifest = createAppManifest();
  const screen = requireScreen(manifest, 'answer-explanation');

  expect(screen.dataLoaders?.[0]).toEqual({
    kind: 'operation',
    operation: detailOperation,
    input: {
      taskId: {
        kind: 'source',
        source: { kind: 'context', path: 'route.params.taskId' },
      },
    },
  });
  expect(findNode(screen.root, 'review-poker-table').type).toBe('PokerTrainingTable');
  expect(requireBinding(manifest, 'review-poker-table').props?.task?.source).toEqual({
    kind: 'operation',
    operation: detailOperation,
    path: 'task',
  });
  expect(requireBinding(manifest, 'review-verdict').props?.text?.source).toEqual({
    kind: 'context',
    path: 'route.params.verdict',
  });
  expect(requireBinding(manifest, 'review-chosen-value').props?.text?.source).toEqual({
    kind: 'context',
    path: 'route.params.selectedOptionLabel',
  });
  expect(requireBinding(manifest, 'review-best-value').props?.text?.source).toEqual({
    kind: 'context',
    path: 'route.params.correctOptionValue',
  });
  expect(requireBinding(manifest, 'review-why-copy').props?.text?.source).toEqual({
    kind: 'context',
    path: 'route.params.explanation',
  });
});

test('SharkPrey keeps task loading states and removes the previous sample hand and answer data', () => {
  const manifest = createAppManifest();
  const taskBinding = requireBinding(manifest, 'decision-poker-table').props?.task;
  const serialized = JSON.stringify(manifest);

  expect(taskBinding?.loading).toMatchObject({ state: 'loading', fallback: { value: {} } });
  expect(taskBinding?.empty).toMatchObject({ state: 'empty', fallback: { value: {} } });
  expect(taskBinding?.error).toMatchObject({ state: 'error', fallback: { value: {} } });
  expect(serialized).not.toContain('Bet ~33% pot');
  expect(serialized).not.toContain('Bet ~75% pot');
  expect(serialized).not.toContain('You raised from CO. BB called.');
  expect(serialized).not.toContain('A\\n♠');
  expect(serialized).not.toContain('Q\\n♦');
  expect(serialized).not.toContain('A small continuation bet gains value');
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
