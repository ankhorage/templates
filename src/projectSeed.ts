import { lstat, mkdir, readFile, realpath, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { AppCategory, AppManifest } from '@ankhorage/contracts';
import { statPathExistsAsync } from '@ankhorage/utility/node/fs';
import { isPathInsideResolved } from '@ankhorage/utility/node/path';

import { TEMPLATES_PACKAGE_NAME, TEMPLATES_PACKAGE_VERSION } from './packageMetadata.js';
import { createTemplateArtifact, type TemplateImageAsset } from './templates/catalog.js';
import { parseProjectSlug } from './templateSelector.js';

const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PACKAGED_TEMPLATE_ROOT = path.join(PACKAGE_ROOT, 'src', 'templates', 'categories');

interface TemplateSeedMetadata {
  readonly package: string;
  readonly version: string;
  readonly projectSlug: string;
  readonly displayName: string;
  readonly category: AppCategory;
  readonly templateSlug: string;
  readonly selector: string;
}

interface MaterializedTemplateAsset {
  readonly asset: TemplateImageAsset;
  readonly contents: Uint8Array;
}

export interface CreateProjectSeedRequest {
  readonly cwd: string;
  readonly projectSlug: string;
  readonly readmeText: string;
  readonly metadata: TemplateSeedMetadata;
  readonly manifest: AppManifest;
  readonly assets: readonly TemplateImageAsset[];
}

export interface CreateProjectSeedResult {
  readonly projectPath: string;
  readonly createdFiles: readonly string[];
}

/** Materialize one approved manifest revision with assets from its selected published template. */
export interface MaterializeTemplateRevisionRequest {
  readonly cwd: string;
  readonly projectSlug: string;
  readonly template: {
    readonly category: AppCategory;
    readonly slug: string;
  };
  readonly manifest: AppManifest;
}

export interface ProjectSeedDependencies {
  readonly mkdir: typeof mkdir;
  readonly pathExists: (targetPath: string) => Promise<boolean>;
  readonly readTemplateAsset: (asset: TemplateImageAsset) => Promise<Uint8Array>;
  readonly writeFile: typeof writeFile;
}

/*** Materialize an approved manifest revision without regenerating it or accepting caller-supplied asset paths. */
export async function materializeTemplateRevision(
  request: MaterializeTemplateRevisionRequest,
): Promise<CreateProjectSeedResult> {
  const projectSlug = parseProjectSlug(request.projectSlug);
  const artifact = createTemplateArtifact({
    category: request.template.category,
    slug: request.template.slug,
  });

  return createProjectSeed({
    cwd: request.cwd,
    projectSlug,
    readmeText: createMaterializedRevisionReadme(request.manifest.metadata.name, request.template),
    metadata: {
      package: TEMPLATES_PACKAGE_NAME,
      version: TEMPLATES_PACKAGE_VERSION,
      projectSlug,
      displayName: request.manifest.metadata.name,
      category: request.template.category,
      templateSlug: request.template.slug,
      selector: `${request.template.category}/${request.template.slug}`,
    },
    manifest: request.manifest,
    assets: artifact.assets,
  });
}

export async function createProjectSeed(
  request: CreateProjectSeedRequest,
  dependencies: Partial<ProjectSeedDependencies> = {},
): Promise<CreateProjectSeedResult> {
  const resolvedDependencies = createProjectSeedDependencies(dependencies);
  const projectPath = path.resolve(request.cwd, request.projectSlug);

  assertProjectPath(request.cwd, request.projectSlug, projectPath);
  assertUniqueAssetTargets(request.assets);

  if (await resolvedDependencies.pathExists(projectPath)) {
    throw new Error(`Project path already exists: ${projectPath}`);
  }

  const materializedAssets = await Promise.all(
    request.assets.map(async (asset) => ({
      asset,
      contents: await resolvedDependencies.readTemplateAsset(asset),
    })),
  );

  await resolvedDependencies.mkdir(projectPath, { recursive: false });
  await writeProjectMetadata(projectPath, request, resolvedDependencies.writeFile);
  await writeMaterializedAssets(projectPath, materializedAssets, resolvedDependencies);

  return {
    projectPath,
    createdFiles: [
      'ankh.config.json',
      'ankh.template.json',
      'README.md',
      ...request.assets.map((asset) => asset.targetPath),
    ],
  };
}

async function writeProjectMetadata(
  projectPath: string,
  request: CreateProjectSeedRequest,
  writeProjectFile: typeof writeFile,
): Promise<void> {
  await writeProjectFile(
    path.join(projectPath, 'ankh.config.json'),
    `${JSON.stringify(request.manifest, null, 2)}\n`,
    { encoding: 'utf8', flag: 'wx' },
  );
  await writeProjectFile(
    path.join(projectPath, 'ankh.template.json'),
    `${JSON.stringify(
      {
        ...request.metadata,
        assets: request.assets.map((asset) => ({
          mediaId: asset.mediaId,
          targetPath: asset.targetPath,
          ...(asset.contentType === undefined ? {} : { contentType: asset.contentType }),
        })),
      },
      null,
      2,
    )}\n`,
    { encoding: 'utf8', flag: 'wx' },
  );
  await writeProjectFile(path.join(projectPath, 'README.md'), request.readmeText, {
    encoding: 'utf8',
    flag: 'wx',
  });
}

async function writeMaterializedAssets(
  projectPath: string,
  materializedAssets: readonly MaterializedTemplateAsset[],
  dependencies: ProjectSeedDependencies,
): Promise<void> {
  for (const materialized of materializedAssets) {
    const targetPath = path.resolve(projectPath, materialized.asset.targetPath);
    assertInside(projectPath, targetPath, 'Template asset target');
    await dependencies.mkdir(path.dirname(targetPath), { recursive: true });
    await dependencies.writeFile(targetPath, materialized.contents, { flag: 'wx' });
  }
}

function createMaterializedRevisionReadme(
  displayName: string,
  template: MaterializeTemplateRevisionRequest['template'],
): string {
  return [
    `# ${displayName}`,
    '',
    `Materialized from the published template \`${template.category}/${template.slug}\`.`,
    '',
  ].join('\n');
}

function assertProjectPath(cwd: string, projectSlug: string, projectPath: string): void {
  if (
    path.basename(projectPath) !== projectSlug ||
    !isPathInsideResolved(path.resolve(cwd), projectPath)
  ) {
    throw new Error(`Project path escapes its owner directory: ${projectPath}`);
  }
}

function assertUniqueAssetTargets(assets: readonly TemplateImageAsset[]): void {
  const targets = new Set<string>();
  for (const asset of assets) {
    if (targets.has(asset.targetPath)) {
      throw new Error(`Template assets contain a duplicate target path: ${asset.targetPath}`);
    }
    targets.add(asset.targetPath);
  }
}

function createProjectSeedDependencies(
  overrides: Partial<ProjectSeedDependencies>,
): ProjectSeedDependencies {
  return {
    mkdir: overrides.mkdir ?? mkdir,
    pathExists: overrides.pathExists ?? statPathExistsAsync,
    readTemplateAsset: overrides.readTemplateAsset ?? readPackagedTemplateAsset,
    writeFile: overrides.writeFile ?? writeFile,
  };
}

async function readPackagedTemplateAsset(asset: TemplateImageAsset): Promise<Uint8Array> {
  const sourcePath = path.resolve(PACKAGE_ROOT, asset.sourcePath);
  assertInside(PACKAGED_TEMPLATE_ROOT, sourcePath, 'Template asset source');
  const sourceStats = await lstat(sourcePath);
  if (!sourceStats.isFile() || sourceStats.isSymbolicLink()) {
    throw new Error(`Template asset source must be a regular file: ${asset.sourcePath}`);
  }
  const canonicalSourcePath = await realpath(sourcePath);
  assertInside(PACKAGED_TEMPLATE_ROOT, canonicalSourcePath, 'Template asset source');
  return readFile(canonicalSourcePath);
}

function assertInside(parentPath: string, childPath: string, label: string): void {
  if (!isPathInsideResolved(parentPath, childPath)) {
    throw new Error(`${label} escapes its owner directory: ${childPath}`);
  }
}
