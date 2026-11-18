import type { FlowApprovalRequest, FlowRunSnapshot } from '@ankhorage/contracts/flow';
import type { RuntimeFlowPort, RuntimeFlowStartRequest } from '@ankhorage/runtime';
import { expect, test } from 'bun:test';

import { createSocialFlowBindings, type SocialFlowBindingState } from '../src/socialFlowBindings';

const publishRequest: RuntimeFlowStartRequest = {
  flow: { id: 'social-publish', version: 7 },
  idempotencyKey: 'scheduled-post-42',
  triggerId: 'publish-after-approval',
};

const analyticsRequest: RuntimeFlowStartRequest = {
  flow: { id: 'social-analytics', version: 3 },
  idempotencyKey: 'analytics-report-42',
  triggerId: 'report-manually',
};

const pendingApprovalRun: FlowRunSnapshot = {
  createdAt: '2026-11-16T10:00:00.000Z',
  flow: publishRequest.flow,
  id: 'publish-run-42',
  status: 'waiting_for_approval',
  steps: [],
  trigger: { kind: 'manual', triggerId: publishRequest.triggerId },
};

const publishedRun: FlowRunSnapshot = {
  ...pendingApprovalRun,
  completedAt: '2026-11-16T10:05:00.000Z',
  status: 'succeeded',
};

const approved: FlowApprovalRequest = {
  id: 'approval-42',
  requestedAt: '2026-11-16T10:00:00.000Z',
  runId: pendingApprovalRun.id,
  status: 'approved',
};

/*** Build an SDK-free planned-publishing and analytics host port for generated-app acceptance. */
function createMockSocialFlowPort(): RuntimeFlowPort {
  const runs = new Map([[pendingApprovalRun.id, pendingApprovalRun]]);
  return {
    cancelAsync: (runId) => Promise.resolve(runs.get(runId)),
    eventsAsync: () =>
      Promise.resolve([
        {
          id: 1,
          runId: pendingApprovalRun.id,
          timestamp: '2026-11-16T10:00:00.000Z',
          type: 'run_queued',
        },
      ]),
    resolveApprovalAsync: () => Promise.resolve(approved),
    startAsync: (request) => {
      const run =
        request.flow.id === analyticsRequest.flow.id
          ? {
              ...publishedRun,
              flow: analyticsRequest.flow,
              id: 'analytics-run-42',
            }
          : pendingApprovalRun;
      runs.set(run.id, run);
      return Promise.resolve(run);
    },
    statusAsync: (runId) => Promise.resolve(runs.get(runId)),
  };
}

test('accepts planned publishing, approval, event and analytics operations through the released port', async () => {
  const states: SocialFlowBindingState[] = [];
  const bindings = createSocialFlowBindings({
    flowPort: createMockSocialFlowPort(),
    writeState: (state) => states.push(state),
  });

  const publish = await bindings.startAsync(publishRequest);
  const approval = await bindings.approvalAsync({
    approvalId: approved.id,
    approved: true,
  });
  const eventLog = await bindings.eventsAsync({
    afterId: 0,
    runId: pendingApprovalRun.id,
  });
  const analytics = await bindings.startAsync(analyticsRequest);

  expect(publish).toMatchObject({
    ok: true,
    state: { phase: 'awaiting-approval', runId: pendingApprovalRun.id },
  });
  expect(approval).toMatchObject({ ok: true, value: approved });
  expect(eventLog).toMatchObject({ ok: true, value: [{ type: 'run_queued' }] });
  expect(analytics).toMatchObject({
    ok: true,
    state: { phase: 'succeeded', runId: 'analytics-run-42' },
  });
  expect(states).toContainEqual({
    phase: 'awaiting-approval',
    retryable: false,
    runId: pendingApprovalRun.id,
  });
});

test('denies unauthorized operations without surfacing the provider message', async () => {
  const bindings = createSocialFlowBindings({
    flowPort: {
      ...createMockSocialFlowPort(),
      startAsync: () => Promise.reject(codedError('unauthenticated', 'Bearer top-secret-token')),
    },
    writeState: () => undefined,
  });

  const result = await bindings.startAsync(publishRequest);

  expect(result).toEqual({
    ok: false,
    state: {
      code: 'unauthenticated',
      message: 'You are not authorized to perform this Flow action.',
      phase: 'failed',
      retryable: false,
    },
  });
  expect(JSON.stringify(result)).not.toContain('top-secret-token');
});

test('generalizes an unknown provider error code that contains a token', async () => {
  const token = 'Bearer provider-secret-token';
  const states: SocialFlowBindingState[] = [];
  const bindings = createSocialFlowBindings({
    flowPort: {
      ...createMockSocialFlowPort(),
      startAsync: () => Promise.reject(codedError(token, 'Provider rejected the request.')),
    },
    writeState: (state) => states.push(state),
  });

  const result = await bindings.startAsync(publishRequest);

  expect(result).toEqual({
    ok: false,
    state: {
      code: 'flow-request-failed',
      message: 'The Flow request could not be completed.',
      phase: 'failed',
      retryable: true,
    },
  });
  expect(JSON.stringify({ result, states })).not.toContain(token);
});

test('generalizes an unknown Flow run error code that contains a token', async () => {
  const token = 'Bearer run-secret-token';
  const states: SocialFlowBindingState[] = [];
  const bindings = createSocialFlowBindings({
    flowPort: {
      ...createMockSocialFlowPort(),
      statusAsync: () =>
        Promise.resolve({
          ...pendingApprovalRun,
          error: { code: token, message: token, retryable: false },
          status: 'failed',
        }),
    },
    writeState: (state) => states.push(state),
  });

  const result = await bindings.statusAsync(pendingApprovalRun.id);

  expect(result).toEqual({
    ok: true,
    state: {
      code: 'flow-request-failed',
      message: 'The Flow could not complete.',
      phase: 'failed',
      retryable: false,
      runId: pendingApprovalRun.id,
    },
    value: {
      createdAt: pendingApprovalRun.createdAt,
      flow: pendingApprovalRun.flow,
      id: pendingApprovalRun.id,
      status: 'failed',
    },
  });
  expect(JSON.stringify({ result, states })).not.toContain(token);
});

test('reports offline and timeout states without invoking a duplicate publication', async () => {
  let starts = 0;
  const offline = createSocialFlowBindings({
    flowPort: createMockSocialFlowPort(),
    isOnline: () => false,
    writeState: () => undefined,
  });
  const timedOut = createSocialFlowBindings({
    flowPort: {
      ...createMockSocialFlowPort(),
      startAsync: () => {
        starts += 1;
        return new Promise<FlowRunSnapshot>(() => undefined);
      },
    },
    timeoutMs: 1,
    writeState: () => undefined,
  });

  expect(await offline.startAsync(publishRequest)).toMatchObject({
    ok: false,
    state: { phase: 'offline', retryable: true },
  });
  expect(await timedOut.startAsync(publishRequest)).toMatchObject({
    ok: false,
    state: { phase: 'timed-out', retryable: true },
  });
  expect(starts).toBe(1);
});

test('retries safe status reads without starting the publication again', async () => {
  let statusReads = 0;
  let starts = 0;
  const bindings = createSocialFlowBindings({
    flowPort: {
      ...createMockSocialFlowPort(),
      startAsync: () => {
        starts += 1;
        return Promise.resolve(pendingApprovalRun);
      },
      statusAsync: () => {
        statusReads += 1;
        if (statusReads === 1)
          return Promise.reject(codedError('offline', 'private connection details'));
        return Promise.resolve(publishedRun);
      },
    },
    writeState: () => undefined,
  });

  const started = await bindings.startAsync(publishRequest);
  const firstRead = await bindings.statusAsync(pendingApprovalRun.id);
  const retriedRead = await bindings.statusAsync(pendingApprovalRun.id);

  expect(started).toMatchObject({
    ok: true,
    state: { phase: 'awaiting-approval' },
  });
  expect(firstRead).toMatchObject({
    ok: false,
    state: { phase: 'offline', retryable: true },
  });
  expect(retriedRead).toMatchObject({
    ok: true,
    state: { phase: 'succeeded' },
  });
  expect(starts).toBe(1);
});

test('does not turn a missing run or approval into a successful UI state', async () => {
  const bindings = createSocialFlowBindings({
    flowPort: {
      ...createMockSocialFlowPort(),
      resolveApprovalAsync: () => Promise.resolve(undefined),
      statusAsync: () => Promise.resolve(undefined),
    },
    writeState: () => undefined,
  });

  expect(await bindings.statusAsync('missing-run')).toMatchObject({
    ok: false,
    state: { message: 'The requested Flow record was not found.', phase: 'failed' },
  });
  expect(
    await bindings.approvalAsync({ approvalId: 'missing-approval', approved: true }),
  ).toMatchObject({
    ok: false,
    state: { message: 'The requested Flow record was not found.', phase: 'failed' },
  });
});

test('keeps a rejected approval distinct from a successful approval', async () => {
  const bindings = createSocialFlowBindings({
    flowPort: {
      ...createMockSocialFlowPort(),
      resolveApprovalAsync: () => Promise.resolve({ ...approved, status: 'rejected' }),
    },
    writeState: () => undefined,
  });

  expect(await bindings.approvalAsync({ approvalId: approved.id, approved: false })).toMatchObject({
    ok: true,
    state: { phase: 'cancelled' },
    value: { status: 'rejected' },
  });
});

/*** Build a deliberately secret-bearing host error for redaction acceptance without throwing a plain object. */
function codedError(code: string, message: string): Error & { readonly code: string } {
  return Object.assign(new Error(message), { code });
}
