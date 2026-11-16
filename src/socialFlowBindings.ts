import type { FlowApprovalRequest, FlowRunSnapshot } from '@ankhorage/contracts/flow';
import type { RuntimeFlowPort, RuntimeFlowStartRequest } from '@ankhorage/runtime';

import {
  type SocialFlowBindingErrorCode,
  socialFlowBindingErrorCode,
} from './socialFlowBindingErrorCode';

export type SocialFlowBindingPhase =
  | 'awaiting-approval'
  | 'cancelled'
  | 'failed'
  | 'offline'
  | 'running'
  | 'succeeded'
  | 'timed-out'
  | 'unavailable';
export interface SocialFlowBindingState {
  readonly code?: SocialFlowBindingErrorCode;
  readonly message?: string;
  readonly phase: SocialFlowBindingPhase;
  readonly retryable: boolean;
  readonly runId?: string;
}
export type SocialFlowBindingResult<Value> =
  | { readonly ok: true; readonly state: SocialFlowBindingState; readonly value: Value }
  | { readonly ok: false; readonly state: SocialFlowBindingState };
/** A UI-safe run projection excluding Flow inputs, outputs, errors, steps, and traces. */
export type SocialFlowRun = Pick<
  FlowRunSnapshot,
  'completedAt' | 'createdAt' | 'flow' | 'id' | 'startedAt' | 'status'
>;
/** A UI-safe approval projection excluding its message, context, and actor identity. */
export type SocialFlowApproval = Pick<
  FlowApprovalRequest,
  'expiresAt' | 'id' | 'requestedAt' | 'resolvedAt' | 'runId' | 'status'
>;
type RuntimeFlowEvent = Awaited<ReturnType<RuntimeFlowPort['eventsAsync']>>[number];
/** A UI-safe event projection excluding the optional Flow trace. */
export type SocialFlowEvent = Pick<RuntimeFlowEvent, 'id' | 'runId' | 'timestamp' | 'type'>;

export interface SocialFlowBindings {
  readonly approvalAsync: (request: {
    readonly approvalId: string;
    readonly approved: boolean;
  }) => Promise<SocialFlowBindingResult<SocialFlowApproval>>;
  readonly cancelAsync: (runId: string) => Promise<SocialFlowBindingResult<SocialFlowRun>>;
  readonly eventsAsync: (request: {
    readonly afterId: number;
    readonly runId?: string;
  }) => Promise<SocialFlowBindingResult<readonly SocialFlowEvent[]>>;
  readonly startAsync: (
    request: RuntimeFlowStartRequest,
  ) => Promise<SocialFlowBindingResult<SocialFlowRun>>;
  readonly statusAsync: (runId: string) => Promise<SocialFlowBindingResult<SocialFlowRun>>;
}
export interface CreateSocialFlowBindingsInput {
  readonly flowPort?: RuntimeFlowPort;
  readonly isOnline?: () => boolean;
  readonly timeoutMs?: number;
  readonly writeState: (state: SocialFlowBindingState) => void;
}
const DEFAULT_TIMEOUT_MS = 10_000;

/*** Create host-owned, redaction-safe bindings for a published Runtime Flow port. */
export function createSocialFlowBindings(input: CreateSocialFlowBindingsInput): SocialFlowBindings {
  const timeoutMs = input.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0)
    throw new Error('Social Flow timeout must be a positive finite number.');
  return {
    approvalAsync: (request) =>
      executeSocialFlowBindingAsync(
        input,
        timeoutMs,
        () => input.flowPort?.resolveApprovalAsync(request),
        projectApproval,
      ),
    cancelAsync: (runId) =>
      executeSocialFlowBindingAsync(
        input,
        timeoutMs,
        () => input.flowPort?.cancelAsync(runId),
        projectRun,
      ),
    eventsAsync: (request) =>
      executeSocialFlowBindingAsync(
        input,
        timeoutMs,
        () => input.flowPort?.eventsAsync(request),
        projectEvents,
      ),
    startAsync: (request) =>
      executeSocialFlowBindingAsync(
        input,
        timeoutMs,
        () => input.flowPort?.startAsync(request),
        projectRun,
      ),
    statusAsync: (runId) =>
      executeSocialFlowBindingAsync(
        input,
        timeoutMs,
        () => input.flowPort?.statusAsync(runId),
        projectRun,
      ),
  };
}

/*** Execute one host-port operation without exposing transport or provider payloads to UI consumers. */
async function executeSocialFlowBindingAsync<Value, Projection>(
  input: CreateSocialFlowBindingsInput,
  timeoutMs: number,
  operation: () => Promise<Value> | undefined,
  project: (value: Value) => SocialFlowSuccess<Projection> | undefined,
): Promise<SocialFlowBindingResult<Projection>> {
  if (input.isOnline?.() === false) return writeFailure(input.writeState, offlineState());
  if (input.flowPort === undefined) return writeFailure(input.writeState, unavailableState());
  input.writeState({ phase: 'running', retryable: false });
  try {
    const success = project(await withTimeoutAsync(operation(), timeoutMs));
    if (success === undefined) return writeFailure(input.writeState, notFoundState());
    input.writeState(success.state);
    return { ok: true, state: success.state, value: success.value };
  } catch (error) {
    return writeFailure(input.writeState, stateForError(error));
  }
}
interface SocialFlowSuccess<Value> {
  readonly state: SocialFlowBindingState;
  readonly value: Value;
}

/*** Bound a host-port call so an unavailable transport cannot leave the UI indefinitely pending. */
function withTimeoutAsync<Value>(
  value: Promise<Value> | undefined,
  timeoutMs: number,
): Promise<Value> {
  if (value === undefined) return Promise.reject(new Error('Missing Runtime Flow port operation.'));
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new SocialFlowTimeoutError()), timeoutMs);
    void value.then(
      (result) => {
        clearTimeout(timeout);
        resolve(result);
      },
      (error: unknown) => {
        clearTimeout(timeout);
        reject(toSafeError(error));
      },
    );
  });
}

/*** Project a run into safe UI data without retaining its mutable or diagnostic payloads. */
function projectRun(
  value: FlowRunSnapshot | undefined,
): SocialFlowSuccess<SocialFlowRun> | undefined {
  if (value === undefined) return undefined;
  const run: SocialFlowRun = {
    ...(value.completedAt === undefined ? {} : { completedAt: value.completedAt }),
    createdAt: value.createdAt,
    flow: value.flow,
    id: value.id,
    ...(value.startedAt === undefined ? {} : { startedAt: value.startedAt }),
    status: value.status,
  };
  return { state: stateForRun(value), value: run };
}
/*** Project approval lifecycle data without exposing its message, context, or actor identity. */
function projectApproval(
  value: FlowApprovalRequest | undefined,
): SocialFlowSuccess<SocialFlowApproval> | undefined {
  if (value === undefined) return undefined;
  return {
    state: stateForApproval(value),
    value: {
      ...(value.expiresAt === undefined ? {} : { expiresAt: value.expiresAt }),
      id: value.id,
      requestedAt: value.requestedAt,
      ...(value.resolvedAt === undefined ? {} : { resolvedAt: value.resolvedAt }),
      runId: value.runId,
      status: value.status,
    },
  };
}

/*** Keep approval resolution distinct from the approval outcome that follows it. */
function stateForApproval(value: FlowApprovalRequest): SocialFlowBindingState {
  switch (value.status) {
    case 'approved':
      return { phase: 'succeeded', retryable: false, runId: value.runId };
    case 'pending':
      return { phase: 'awaiting-approval', retryable: false, runId: value.runId };
    case 'cancelled':
    case 'rejected':
      return { phase: 'cancelled', retryable: false, runId: value.runId };
    case 'expired':
      return {
        message: 'The approval request expired.',
        phase: 'failed',
        retryable: false,
        runId: value.runId,
      };
  }
}
/*** Project events without passing their optional Flow trace payload to generated-app UI. */
function projectEvents(
  value: readonly RuntimeFlowEvent[],
): SocialFlowSuccess<readonly SocialFlowEvent[]> {
  return {
    state: { phase: 'succeeded', retryable: false },
    value: value.map(({ id, runId, timestamp, type }) => ({ id, runId, timestamp, type })),
  };
}
/*** Translate a Flow run status into UI-safe state without retaining provider diagnostics. */
function stateForRun(value: FlowRunSnapshot): SocialFlowBindingState {
  switch (value.status) {
    case 'waiting_for_approval':
      return { phase: 'awaiting-approval', retryable: false, runId: value.id };
    case 'cancelled':
      return { phase: 'cancelled', retryable: false, runId: value.id };
    case 'failed':
      return failureState({
        code: readErrorCode(value.error) ?? 'flow-request-failed',
        message: 'The Flow could not complete.',
        retryable: value.error?.retryable ?? false,
        runId: value.id,
      });
    case 'timed_out':
      return {
        message: 'The Flow timed out.',
        phase: 'timed-out',
        retryable: true,
        runId: value.id,
      };
    case 'pending':
    case 'running':
      return { phase: 'running', retryable: false, runId: value.id };
    case 'succeeded':
      return { phase: 'succeeded', retryable: false, runId: value.id };
  }
}
/*** Classify only stable transport facts; raw exception messages are deliberately never rendered. */
function stateForError(error: unknown): SocialFlowBindingState {
  if (error instanceof SocialFlowTimeoutError)
    return {
      message: 'The Flow request timed out. Try again after checking its status.',
      phase: 'timed-out',
      retryable: true,
    };
  const code = readErrorCode(error);
  if (code === 'permission-denied' || code === 'unauthenticated')
    return {
      code,
      message: 'You are not authorized to perform this Flow action.',
      phase: 'failed',
      retryable: false,
    };
  if (code === 'offline') return offlineState();
  return failureState({
    code: code ?? 'flow-request-failed',
    message: 'The Flow request could not be completed.',
    retryable: true,
  });
}
/*** Read only Runtime's fixed public Flow diagnostics from an untrusted error payload. */
function readErrorCode(error: unknown): SocialFlowBindingErrorCode | undefined {
  if (typeof error !== 'object' || error === null || !('code' in error)) return undefined;
  const { code } = error;
  return socialFlowBindingErrorCode(code);
}
/*** Preserve only a released Runtime diagnostic while converting an arbitrary rejection into a safe Error. */
function toSafeError(error: unknown): Error {
  const code = readErrorCode(error);
  return Object.assign(
    new Error('Social Flow transport failed.'),
    code === undefined ? {} : { code },
  );
}
/*** Return the only offline message the UI may expose. */
function offlineState(): SocialFlowBindingState {
  return {
    message: 'You are offline. Reconnect before retrying this Flow action.',
    phase: 'offline',
    retryable: true,
  };
}
/*** Return the only missing-host message the UI may expose. */
function unavailableState(): SocialFlowBindingState {
  return {
    message: 'Flow actions are unavailable in this host.',
    phase: 'unavailable',
    retryable: false,
  };
}
/*** Report an absent optional Flow record instead of treating it as a completed operation. */
function notFoundState(): SocialFlowBindingState {
  return { message: 'The requested Flow record was not found.', phase: 'failed', retryable: false };
}
/*** Construct a failure state without materializing an undefined optional code. */
function failureState(input: {
  readonly code: SocialFlowBindingErrorCode | undefined;
  readonly message: string;
  readonly retryable: boolean;
  readonly runId?: string;
}): SocialFlowBindingState {
  return {
    ...(input.code === undefined ? {} : { code: input.code }),
    message: input.message,
    phase: 'failed',
    retryable: input.retryable,
    ...(input.runId === undefined ? {} : { runId: input.runId }),
  };
}
/*** Write a failed state at the host boundary and retain no provider exception object. */
function writeFailure(
  writeState: CreateSocialFlowBindingsInput['writeState'],
  state: SocialFlowBindingState,
): SocialFlowBindingResult<never> {
  writeState(state);
  return { ok: false, state };
}
class SocialFlowTimeoutError extends Error {
  public constructor() {
    super('Social Flow request timed out.');
  }
}
