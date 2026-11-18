/** Public Runtime Flow diagnostic codes that are safe to expose to generated-app UI. */
export type SocialFlowBindingErrorCode =
  | 'cancelled'
  | 'flow-request-failed'
  | 'not-found'
  | 'offline'
  | 'permission-denied'
  | 'rate-limited'
  | 'timeout'
  | 'unauthenticated';

/*** Return a released Runtime Flow diagnostic only when an untrusted value is explicitly allowed. */
export function socialFlowBindingErrorCode(value: unknown): SocialFlowBindingErrorCode | undefined {
  if (
    value === 'cancelled' ||
    value === 'flow-request-failed' ||
    value === 'not-found' ||
    value === 'offline' ||
    value === 'permission-denied' ||
    value === 'rate-limited' ||
    value === 'timeout' ||
    value === 'unauthenticated'
  )
    return value;
  return undefined;
}
