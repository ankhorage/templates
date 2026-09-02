import { posix } from 'node:path';

import type { AppManifest, MediaAsset } from '@ankhorage/contracts';

export const TEMPLATE_IMAGE_CONTENT_TYPES = [
  'image/avif',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
] as const;

export type TemplateImageContentType = (typeof TEMPLATE_IMAGE_CONTENT_TYPES)[number];

export interface StarterTemplateAsset {
  readonly sourcePath: string;
  readonly targetPath: string;
  readonly contentType: TemplateImageContentType;
  readonly sizeBytes: number;
  readonly sha256: string;
}

export type StarterTemplateAssetSummary = Omit<StarterTemplateAsset, 'sourcePath'>;

export interface StarterTemplateArtifact {
  readonly manifest: AppManifest;
  readonly assets: readonly StarterTemplateAsset[];
}

const CONTENT_TYPE_EXTENSIONS: Readonly<Record<TemplateImageContentType, readonly string[]>> = {
  'image/avif': ['.avif'],
  'image/gif': ['.gif'],
  'image/jpeg': ['.jpeg', '.jpg'],
  'image/png': ['.png'],
  'image/svg+xml': ['.svg'],
  'image/webp': ['.webp'],
};

/*** Compose one canonical starter artifact from a manifest and its distributable image files. */
export function createStarterTemplateArtifact(
  manifest: AppManifest,
  assets: readonly StarterTemplateAsset[] = [],
): StarterTemplateArtifact {
  return {
    manifest,
    assets: validateStarterTemplateAssets(manifest, assets),
  };
}

/*** Validate and deterministically order the bundled image files owned by one starter manifest. */
export function validateStarterTemplateAssets(
  manifest: AppManifest,
  assets: readonly StarterTemplateAsset[],
): readonly StarterTemplateAsset[] {
  const bundledMedia = collectBundledImageMedia(manifest);
  const assetsByTarget = new Map<string, StarterTemplateAsset>();
  const sourcePaths = new Set<string>();

  for (const asset of assets) {
    validateAssetDescriptor(asset);
    if (assetsByTarget.has(asset.targetPath)) {
      throw new Error(`Starter template asset target is duplicated: ${asset.targetPath}`);
    }
    if (sourcePaths.has(asset.sourcePath)) {
      throw new Error(`Starter template asset source is duplicated: ${asset.sourcePath}`);
    }
    assetsByTarget.set(asset.targetPath, asset);
    sourcePaths.add(asset.sourcePath);
  }

  for (const [targetPath, mediaAsset] of bundledMedia) {
    const asset = assetsByTarget.get(targetPath);
    if (asset === undefined) {
      throw new Error(`Bundled manifest image is missing its template asset: ${targetPath}`);
    }
    validateMediaMatchesAsset(mediaAsset, asset);
  }
  for (const targetPath of assetsByTarget.keys()) {
    if (!bundledMedia.has(targetPath)) {
      throw new Error(`Template asset is not referenced by bundled manifest media: ${targetPath}`);
    }
  }

  return [...assets].sort((left, right) => left.targetPath.localeCompare(right.targetPath));
}

/*** Describe distributable image assets without exposing their package-internal source paths. */
export function summarizeStarterTemplateAssets(
  assets: readonly StarterTemplateAsset[],
): readonly StarterTemplateAssetSummary[] {
  return assets.map((asset) => ({
    targetPath: asset.targetPath,
    contentType: asset.contentType,
    sizeBytes: asset.sizeBytes,
    sha256: asset.sha256,
  }));
}

/*** Collect unique bundled image media by app-relative target path. */
function collectBundledImageMedia(manifest: AppManifest): Map<string, MediaAsset> {
  const bundledMedia = new Map<string, MediaAsset>();
  for (const mediaAsset of Object.values(manifest.media?.assets ?? {})) {
    if (mediaAsset.source.kind !== 'bundled') continue;
    if (mediaAsset.kind !== 'image') {
      throw new Error(`Starter template bundled media must be an image: ${mediaAsset.id}`);
    }
    validateRelativePath(mediaAsset.source.path, 'assets/', 'Bundled manifest image path');
    if (bundledMedia.has(mediaAsset.source.path)) {
      throw new Error(`Bundled manifest image path is duplicated: ${mediaAsset.source.path}`);
    }
    bundledMedia.set(mediaAsset.source.path, mediaAsset);
  }
  return bundledMedia;
}

/*** Validate one immutable packaged-source to generated-target image descriptor. */
function validateAssetDescriptor(asset: StarterTemplateAsset): void {
  validateRelativePath(asset.sourcePath, 'assets/templates/', 'Template asset source path');
  validateRelativePath(asset.targetPath, 'assets/', 'Template asset target path');
  if (!isTemplateImageContentType(asset.contentType)) {
    throw new Error(`Unsupported template image content type: ${String(asset.contentType)}`);
  }
  const extension = posix.extname(asset.targetPath).toLowerCase();
  if (!CONTENT_TYPE_EXTENSIONS[asset.contentType].includes(extension)) {
    throw new Error(
      `Template asset extension ${extension || '(missing)'} does not match ${asset.contentType}.`,
    );
  }
  if (!Number.isSafeInteger(asset.sizeBytes) || asset.sizeBytes <= 0) {
    throw new Error(`Template asset size must be a positive safe integer: ${asset.targetPath}`);
  }
  if (!/^[0-9a-f]{64}$/u.test(asset.sha256)) {
    throw new Error(
      `Template asset sha256 must be 64 lowercase hex characters: ${asset.targetPath}`,
    );
  }
}

/*** Require manifest image metadata to describe the same immutable file as its bundle entry. */
function validateMediaMatchesAsset(mediaAsset: MediaAsset, asset: StarterTemplateAsset): void {
  if (mediaAsset.contentType !== asset.contentType) {
    throw new Error(
      `Bundled manifest image content type differs from its asset: ${asset.targetPath}`,
    );
  }
  if (mediaAsset.metadata?.sizeBytes !== asset.sizeBytes) {
    throw new Error(`Bundled manifest image size differs from its asset: ${asset.targetPath}`);
  }
}

/*** Require a normalized portable relative path below its canonical owned prefix. */
function validateRelativePath(value: string, prefix: string, label: string): void {
  const segments = value.split('/');
  if (
    value === '' ||
    value.startsWith('/') ||
    value.includes('\\') ||
    posix.normalize(value) !== value ||
    !value.startsWith(prefix) ||
    segments.some((segment) => segment === '' || segment === '.' || segment === '..')
  ) {
    throw new Error(`${label} must be a normalized relative path below ${prefix}: ${value}`);
  }
}

/*** Narrow an unknown content type to the canonical template-image inventory. */
function isTemplateImageContentType(value: unknown): value is TemplateImageContentType {
  return TEMPLATE_IMAGE_CONTENT_TYPES.some((contentType) => contentType === value);
}
