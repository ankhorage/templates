import type { AppManifest } from '@ankhorage/contracts';

import type { AppManifestOverrides } from './overrides';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mergeValue<T>(
  base: T,
  override: AppManifestOverrides | Record<string, unknown> | undefined,
): T {
  if (override === undefined) {
    return base;
  }

  if (Array.isArray(override)) {
    return structuredClone(override) as T;
  }

  if (!isPlainObject(base) || !isPlainObject(override)) {
    return structuredClone(override) as T;
  }

  const result: Record<string, unknown> = { ...base };

  for (const [key, value] of Object.entries(override)) {
    const current = result[key];
    result[key] = mergeValue(
      current,
      value as Record<string, unknown> | AppManifestOverrides | undefined,
    );
  }

  return result as T;
}

export function mergeAppManifest(base: AppManifest, overrides?: AppManifestOverrides): AppManifest {
  return mergeValue(base, overrides);
}
