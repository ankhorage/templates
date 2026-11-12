import '@ankhorage/contracts/flow';

import type { FlowDefinition, FlowRunSnapshot } from '@ankhorage/contracts/flow';
import { expect, test } from 'bun:test';

const workflow: FlowDefinition = {
  id: 'template-publication',
  version: 1,
  title: 'Template publication',
  nodes: [
    {
      id: 'publish',
      capability: { providerId: 'templates', capabilityId: 'template.publish' },
      config: {
        template: { kind: 'inline', value: { category: 'food_drink', slug: 'nutriflow' } },
        credential: { kind: 'secret', ref: 'template-publisher-token' },
      },
      ports: [{ id: 'published', direction: 'output' }],
    },
  ],
  edges: [],
  triggers: [{ id: 'publish-manually', kind: 'manual' }],
};

const run: FlowRunSnapshot = {
  id: 'template-publication-run',
  flow: { id: workflow.id, version: workflow.version },
  status: 'succeeded',
  trigger: { triggerId: 'publish-manually', kind: 'manual' },
  createdAt: '2026-11-12T08:00:00.000Z',
  steps: [
    {
      id: 'publish-step',
      nodeId: 'publish',
      status: 'succeeded',
      attempt: 1,
      output: { published: { kind: 'inline', value: { templateId: 'nutriflow' } } },
    },
  ],
};

test('accepts a serializable published Flow DTO at the template authoring boundary', () => {
  const restored = JSON.parse(JSON.stringify({ workflow, run })) as {
    readonly run: FlowRunSnapshot;
    readonly workflow: FlowDefinition;
  };

  expect(restored).toEqual({ workflow, run });
  expect(restored.workflow.nodes[0]?.config?.credential).toEqual({
    kind: 'secret',
    ref: 'template-publisher-token',
  });
  expect(restored.run.steps[0]?.output?.published).toEqual({
    kind: 'inline',
    value: { templateId: 'nutriflow' },
  });
});

const invalidWorkflow: FlowDefinition = {
  ...workflow,
  edges: [
    {
      id: 'invalid-edge',
      // @ts-expect-error A source must identify its port.
      source: { nodeId: 'publish' },
      target: { nodeId: 'publish', portId: 'published' },
    },
  ],
};

void invalidWorkflow;
