import type { AppCategory, AppManifest } from '@ankhorage/contracts';

import { TEMPLATE_DEFINITIONS } from './catalog.generated';

export interface TemplateDefinition {
  readonly category: AppCategory;
  readonly slug: string;
  readonly sourceRoot: string;
  readonly createAppManifest: () => AppManifest;
}

export interface TemplateCatalogEntry extends TemplateDefinition {
  readonly selector: string;
  readonly name: string;
}

export interface TemplateImageAsset {
  readonly mediaId: string;
  readonly sourcePath: string;
  readonly targetPath: string;
  readonly contentType?: string;
}

export interface TemplateArtifact {
  readonly manifest: AppManifest;
  readonly assets: readonly TemplateImageAsset[];
}

/*** List the standalone templates discovered from the canonical template directory tree. */
export function listTemplates(category?: AppCategory): readonly TemplateCatalogEntry[] {
  return TEMPLATE_DEFINITIONS.filter(
    (definition) => category === undefined || definition.category === category,
  ).map(createCatalogEntry);
}

/*** Resolve one standalone template by category and slug. */
export function resolveTemplate(category: AppCategory, slug: string): TemplateCatalogEntry {
  const template = listTemplates(category).find((entry) => entry.slug === slug);
  if (!template) {
    throw new Error(`Unknown template selector "${category}/${slug}".`);
  }
  return template;
}

/*** Create an isolated manifest and the local image files referenced by that template. */
export function createTemplateArtifact(args: {
  readonly category: AppCategory;
  readonly slug: string;
  readonly name?: string;
  readonly projectSlug?: string;
}): TemplateArtifact {
  const template = resolveTemplate(args.category, args.slug);
  const sourceManifest = template.createAppManifest();
  const manifest: AppManifest = {
    ...structuredClone(sourceManifest),
    metadata: {
      ...structuredClone(sourceManifest.metadata),
      ...(args.name === undefined ? {} : { name: args.name }),
      ...(args.projectSlug === undefined ? {} : { slug: args.projectSlug }),
    },
  };

  return {
    manifest,
    assets: collectTemplateImageAssets(template, manifest),
  };
}

function createCatalogEntry(definition: TemplateDefinition): TemplateCatalogEntry {
  const manifest = definition.createAppManifest();
  if (manifest.metadata.category !== definition.category) {
    throw new Error(
      `Template "${definition.category}/${definition.slug}" manifest category does not match its directory.`,
    );
  }
  if (manifest.metadata.slug !== definition.slug) {
    throw new Error(
      `Template "${definition.category}/${definition.slug}" manifest slug does not match its directory.`,
    );
  }

  return {
    ...definition,
    selector: `${definition.category}/${definition.slug}`,
    name: manifest.metadata.name,
  };
}

function collectTemplateImageAssets(
  template: TemplateCatalogEntry,
  manifest: AppManifest,
): readonly TemplateImageAsset[] {
  return Object.values(manifest.media?.assets ?? {}).flatMap((asset) => {
    if (asset.kind !== 'image' || asset.source.kind !== 'bundled') return [];
    assertTemplateImagePath(asset.source.path);
    return [
      {
        mediaId: asset.id,
        sourcePath: `${template.sourceRoot}/${asset.source.path}`,
        targetPath: asset.source.path,
        ...(asset.contentType === undefined ? {} : { contentType: asset.contentType }),
      },
    ];
  });
}

function assertTemplateImagePath(value: string): void {
  if (
    !value.startsWith('assets/images/') ||
    value.includes('..') ||
    value.includes('\\') ||
    value.startsWith('/')
  ) {
    throw new Error(`Bundled template image must live below assets/images/: ${value}`);
  }
}
