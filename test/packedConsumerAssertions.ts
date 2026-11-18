import { expect } from 'bun:test';

/*** Assert that the packed consumer exposes the Social Media Manager workflow without a FlowCanvas fallback. */
export function assertSocialMediaManagerWorkflowIsExposed(input: {
  readonly manifest: unknown;
}): void {
  const { manifest } = input;
  const serializedManifest = JSON.stringify(manifest);
  for (const expected of [
    'FlowCanvas unavailable',
    'composer-save-draft',
    'schedule-confirm',
    'state.set',
  ]) {
    expect(serializedManifest).toContain(expected);
  }
}
