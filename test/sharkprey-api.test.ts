import type { UiNode } from '@ankhorage/contracts';
import { expect, test } from 'bun:test';

import createAppManifest from '../src/templates/categories/education-learning/sharkprey/createAppManifest';

test('SharkPrey declares and loads the canonical poker training task operation', () => {
  const manifest = createAppManifest();
  const api = manifest.infra.apis?.find(({ id }) => id === 'poker-training');
  const endpoint = api?.endpoints.tasks;
  const operation = endpoint?.operations.listPokerTrainingTasks;
  const loader = manifest.screens['decision-table']?.dataLoaders?.[0];

  expect(api).toMatchObject({
    baseUrl: 'https://api.ankhorage.com/v1/poker',
    origin: 'external',
    protocol: 'rest',
  });
  expect(endpoint).toMatchObject({ id: 'tasks', path: '/training/tasks' });
  expect(operation).toMatchObject({
    endpointId: 'tasks',
    intent: 'read',
    method: 'GET',
    path: '/training/tasks',
  });
  expect(loader).toEqual({
    kind: 'operation',
    operation: {
      apiId: 'poker-training',
      endpointId: 'tasks',
      operationId: 'listPokerTrainingTasks',
    },
    input: { limit: { kind: 'literal', value: 1 } },
  });
});

test('SharkPrey binds the first task to the released poker table pattern', () => {
  const manifest = createAppManifest();
  const screen = manifest.screens['decision-table'];
  if (!screen) throw new Error('Missing decision table screen.');
  const table = findNode(screen.root, 'decision-poker-table');
  const binding = manifest.dataBindings?.['decision-poker-table'];

  expect(table.type).toBe('PokerTrainingTable');
  expect(table.props).not.toHaveProperty('seats');
  expect(table.props).not.toHaveProperty('centerCards');
  expect(binding).toMatchObject({
    componentId: 'decision-poker-table',
    componentType: 'PokerTrainingTable',
    props: {
      task: {
        source: {
          kind: 'operation',
          operation: {
            apiId: 'poker-training',
            endpointId: 'tasks',
            operationId: 'listPokerTrainingTasks',
          },
          path: '0',
        },
        fallback: { value: {} },
      },
    },
  });
});

test('SharkPrey derives visible task copy from the same operation result', () => {
  const manifest = createAppManifest();
  const bindings = manifest.dataBindings;

  expect(bindings?.['decision-question']?.props?.text?.source).toMatchObject({
    kind: 'operation',
    path: '0.prompt',
  });
  expect(bindings?.['decision-action']?.props?.text?.source).toMatchObject({
    kind: 'operation',
    path: '0.previousAction',
  });
  expect(bindings?.['decision-category']?.props?.text).toMatchObject({
    source: { kind: 'operation', path: '0.street' },
    transforms: ['uppercase'],
  });
});

test('SharkPrey declares usable loading, empty, and error table states', () => {
  const manifest = createAppManifest();
  const taskBinding = manifest.dataBindings?.['decision-poker-table']?.props?.task;

  expect(taskBinding?.loading).toMatchObject({ state: 'loading', fallback: { value: {} } });
  expect(taskBinding?.empty).toMatchObject({ state: 'empty', fallback: { value: {} } });
  expect(taskBinding?.error).toMatchObject({ state: 'error', fallback: { value: {} } });
});

function findNode(root: UiNode, id: string): UiNode {
  const nodes = [root];
  for (const node of nodes) {
    if (node.id === id) return node;
    nodes.push(...(node.children ?? []));
  }
  throw new Error(`Missing node ${id}.`);
}
