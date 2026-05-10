import type { AppManifest } from '@ankhorage/contracts';

type OverrideShape<T> = T extends readonly unknown[]
  ? T
  : T extends object
    ? {
        [K in keyof T]?: OverrideShape<T[K]>;
      }
    : T;

export type AppManifestOverrides = OverrideShape<AppManifest>;
