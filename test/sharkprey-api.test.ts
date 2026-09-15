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

test('SharkPrey declares the complete production poker training API', () => {
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
  expect(endpoint?.operations.listPokerTrainingTasks?.request?.parameters).toEqual([
    { name: 'gameCategory', location: 'query', schema: { type: 'string' } },
    { name: 'tableSize', location: 'query', schema: { type: 'string' } },
    { name: 'street', location: 'query', schema: { type: 'string' } },
    { name: 'difficulty', location: 'query', schema: { type: 'integer' } },
    { name: 'tags', location: 'query', schema: { type: 'string' } },
    { name: 'limit', location: 'query', schema: { type: 'integer' } },
  ]);
  expect(endpoint?.operations).toMatchObject({
    listPokerTrainingTasks: { method: 'GET', path: '/training/tasks' },
    getPokerTrainingTaskById: { method: 'GET', path: '/training/tasks/{taskId}' },
    getPokerTrainingTaskBySlug: { method: 'GET', path: '/training/tasks/by-slug/{slug}' },
    checkPokerTrainingTaskAnswer: { method: 'POST', path: '/training/tasks/{taskId}/answer' },
  });
});

test('SharkPrey exposes every production game category, table size and street', () => {
  const manifest = createAppManifest();

  expect(findNode(requireScreen(manifest, 'training-setup').root, 'setup-game').props.options).toEqual([
    { value: 'mtt', label: 'MTT' },
    { value: 'sng', label: 'Sit & Go' },
    { value: 'cash', label: 'Cash Game' },
  ]);
  expect(
    findNode(requireScreen(manifest, 'training-table-size').root, 'setup-table').props.options,
  ).toEqual([
    { value: '6max', label: '6-max' },
    { value: '9max', label: '9-max' },
  ]);
  expect(findNode(requireScreen(manifest, 'training-street').root, 'setup-street').props.options).toEqual([
    { value: 'preflop', label: 'Preflop' },
    { value: 'flop', label: 'Flop' },
    { value: 'turn', label: 'Turn' },
    { value: 'river', label: 'River' },
  ]);
  for (const difficulty of [1, 2, 3, 4, 5]) {
    expect(
      findNode(requireScreen(manifest, 'training-difficulty').root, `setup-difficulty-${difficulty}`)
        .type,
    ).toBe('Button');
  }
});

test('SharkPrey carries setup selections through route params', () => {
  const manifest = createAppManifest();
  const gameEvent = requireEvents(requireBinding(manifest, 'setup-game'), 'valueChange')[0];
  const tableEvent = requireEvents(requireBinding(manifest, 'setup-table'), 'valueChange')[0];
  const streetEvent = requireEvents(requireBinding(manifest, 'setup-street'), 'valueChange')[0];

  expect(gameEvent?.input).toEqual({
    route: { kind: 'literal', value: '/training-setup/table' },
    params: {
      kind: 'object',
      fields: {
        gameCategory: { kind: 'source', source: { kind: 'event', path: 'payload.value' } },
      },
    },
  });
  expect(tableEvent?.input).toEqual({
    route: { kind: 'literal', value: '/training-setup/street' },
    params: {
      kind: 'object',
      fields: {
        gameCategory: {
          kind: 'source',
          source: { kind: 'context', path: 'route.params.gameCategory' },
        },
        tableSize: { kind: 'source', source: { kind: 'event', path: 'payload.value' } },
      },
    },
  });
  expect(streetEvent?.input).toEqual({
    route: { kind: 'literal', value: '/training-setup/difficulty' },
    params: {
      kind: 'object',
      fields: {
        gameCategory: {
          kind: 'source',
          source: { kind: 'context', path: 'route.params.gameCategory' },
        },
        tableSize: {
          kind: 'source',
          source: { kind: 'context', path: 'route.params.tableSize' },
        },
        street: { kind: 'source', source: { kind: 'event', path: 'payload.value' } },
      },
    },
  });
});

test('SharkPrey queries one matching live task after choosing difficulty', () => {
  const manifest = createAppManifest();
  const events = requireEvents(requireBinding(manifest, 'setup-difficulty-4'), 'press');

  expect(events[0]).toEqual({
    target: { kind: 'operation', operation: listOperation },
    input: {
      gameCategory: {
        kind: 'source',
        source: { kind: 'context', path: 'route.params.gameCategory' },
      },
      tableSize: {
        kind: 'source',
        source: { kind: 'context', path: 'route.params.tableSize' },
      },
      street: {
        kind: 'source',
        source: { kind: 'context', path: 'route.params.street' },
      },
      difficulty: { kind: 'literal', value: 4 },
      limit: { kind: 'literal', value: 1 },
    },
  });
  expect(events[1]).toEqual({
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
  });
});

test('SharkPrey loads task detail and binds the complete hand to PokerTrainingTable', () => {
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
    path: 'task.historyText',
  });
});

test('SharkPrey repeats live answer options and evaluates the selected answer', () => {
  const manifest = createAppManifest();
  const screen = requireScreen(manifest, 'decision-table');
  const answers = findNode(screen.root, 'decision-answers');
  const bindings = requireBinding(manifest, 'decision-answer-button');
  const events = requireEvents(bindings, 'press');

  expect(answers.repeat).toEqual({
    source: { kind: 'operation', operation: detailOperation, path: 'options' },
    itemAlias: 'option',
    keyPath: 'id',
  });
  expect(bindings.props?.children?.source).toEqual({ kind: 'context', path: 'option.label' });
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

test('SharkPrey renders review state from API-backed route data', () => {
  const manifest = createAppManifest();
  const screen = requireScreen(manifest, 'answer-explanation');

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
  expect(requireBinding(manifest, 'review-why-copy').props?.text?.source).toEqual({
    kind: 'context',
    path: 'route.params.explanation',
  });
});

test('SharkPrey keeps live task loading states and contains no sample hand data', () => {
  const manifest = createAppManifest();
  const taskBinding = requireBinding(manifest, 'decision-poker-table').props?.task;
  const serialized = JSON.stringify(manifest);

  expect(taskBinding?.loading).toMatchObject({ state: 'loading', fallback: { value: {} } });
  expect(taskBinding?.empty).toMatchObject({ state: 'empty', fallback: { value: {} } });
  expect(taskBinding?.error).toMatchObject({ state: 'error', fallback: { value: {} } });
  expect(serialized).not.toContain('Bet ~33% pot');
  expect(serialized).not.toContain('You raised from CO. BB called.');
  expect(serialized).not.toContain('A small continuation bet gains value');
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
    expect(binding.input?.route).toEqual({ kind: 'literal', value: '/answer-explanation' });
  }
}

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
