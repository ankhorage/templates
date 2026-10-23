import type { AppManifest } from '@ankhorage/contracts';
import { validateNavigatorManifest } from '@ankhorage/navigator';

/*** Validate a template's mobile navigator before returning an isolated manifest copy. */
export function createValidatedManifest(manifest: AppManifest): AppManifest {
  const diagnostics = validateNavigatorManifest(manifest.navigator, {
    platform: 'ios',
    expoRouterVersion: '57.0.18',
  });
  if (diagnostics.some((diagnostic) => diagnostic.severity === 'error')) {
    throw new Error(diagnostics.map((diagnostic) => diagnostic.message).join(' '));
  }
  return structuredClone(manifest);
}
