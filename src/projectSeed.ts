import { createHash } from 'node:crypto';
import { lstat, mkdir, readFile, realpath, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { AppCategory, AppManifest } from '@ankhorage/contracts';

import {
  type StarterTemplateAsset,
  summarizeStarterTemplateAssets,
  validateStarterTemplateAssets,
} from './templates/starter/starter.assets';

const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PACKAGED_TEMPLATE_ASSET_ROOT = path.join(PACKAGE_ROOT, 'assets', 'templates');

interface TemplateSeedMetadata {
  readonly package: string;
  readonly version: string;
  readonly projectSlug: string;
  readonly displayName: string;
  readonly category: AppCategory;
  readonly templateId: string;
  readonly selector: string;
}

interface MaterializedTemplateAsset {
  readonly asset: StarterTemplateAsset;
  readonly contents: Uint8Array;
}

export interface CreateProjectSeedRequest {
  readonly cwd: string;
  readonly projectSlug: string;
  readonly readmeText: string;
  readonly metadata: TemplateSeedMetadata;
  readonly manifest: AppManifest;
  readonly assets: readonly StarterTemplateAsset[];
}

export interface CreateProjectSeedResult {
  readonly projectPath: string;
  readonly createdFiles: readonly string[];
}

export interface ProjectSeedDependencies {
  readonly mkdir: typeof mkdir;
  readonly pathExists: (targetPath: string) => Promise<boolean>;
  readonly readTemplateAsset: (asset: StarterTemplateAsset) => Promise<Uint8Array>;
  readonly writeFile: typeof writeFile;
}

export async function createProjectSeed(
  request: CreateProjectSeedRequest,
  dependencies: Partial<ProjectSeedDependencies> = {},
): Promise<CreateProjectSeedResult> {
  const resolvedDependencies = createProjectSeedDependencies(dependencies);
  const projectPath = path.resolve(request.cwd, request.projectSlug);

  if (await resolvedDependencies.pathExists(projectPath)) {
    throw new Error(`Project path already exists: ${projectPath}`);
  }

  const assets = validateStarterTemplateAssets(request.manifest, request.assets);
  const materializedAssets = await materializeTemplateAssets(
    assets,
    resolvedDependencies.readTemplateAsset,
  );

  await resolvedDependencies.mkdir(projectPath, { recursive: false });
  await writeProjectMetadata(projectPath, request, assets, resolvedDependencies.writeFile);
  await writeMaterializedAssets(projectPath, materializedAssets, resolvedDependencies);

  return {
    projectPath,
    createdFiles: [
      'ankh.config.json',
      'ankh.template.json',
      'README.md',
      ...assets.map((asset) => asset.targetPath),
    ],
  };
}

/*** Write the manifest, template provenance, and readme for one generated project seed. */
async function writeProjectMetadata(
  projectPath: string,
  request: CreateProjectSeedRequest,
  assets: readonly StarterTemplateAsset[],
  writeProjectFile: typeof writeFile,
): Promise<void> {
  await writeProjectFile(
    path.join(projectPath, 'ankh.config.json'),
    `${JSON.stringify(request.manifest, null, 2)}\n`,
    'utf8',
  );
  await writeProjectFile(
    path.join(projectPath, 'ankh.template.json'),
    `${JSON.stringify(
      {
        ...request.metadata,
        assets: summarizeStarterTemplateAssets(assets),
      },
      null,
      2,
    )}\n`,
    'utf8',
  );
  await writeProjectFile(path.join(projectPath, 'README.md'), request.readmeText, 'utf8');
}

/*** Write preverified template assets below their app-relative manifest paths. */
async function writeMaterializedAssets(
  projectPath: string,
  materializedAssets: readonly MaterializedTemplateAsset[],
  dependencies: ProjectSeedDependencies,
): Promise<void> {
  for (const materialized of materializedAssets) {
    const targetPath = path.resolve(projectPath, materialized.asset.targetPath);
    assertInside(projectPath, targetPath, 'Template asset target');
    await dependencies.mkdir(path.dirname(targetPath), { recursive: true });
    await dependencies.writeFile(targetPath, materialized.contents);
  }
}

/*** Resolve and byte-verify every asset before project creation starts. */
async function materializeTemplateAssets(
  assets: readonly StarterTemplateAsset[],
  readTemplateAsset: ProjectSeedDependencies['readTemplateAsset'],
): Promise<readonly MaterializedTemplateAsset[]> {
  return Promise.all(
    assets.map(async (asset) => ({
      asset,
      contents: await readTemplateAsset(asset),
    })),
  );
}

function createProjectSeedDependencies(
  overrides: Partial<ProjectSeedDependencies>,
): ProjectSeedDependencies {
  return {
    mkdir: overrides.mkdir ?? mkdir,
    pathExists: overrides.pathExists ?? pathExists,
    readTemplateAsset: overrides.readTemplateAsset ?? readPackagedTemplateAsset,
    writeFile: overrides.writeFile ?? writeFile,
  };
}

/*** Read and verify one immutable image from the published Templates asset inventory. */
async function readPackagedTemplateAsset(asset: StarterTemplateAsset): Promise<Uint8Array> {
  const sourcePath = path.resolve(PACKAGE_ROOT, asset.sourcePath);
  assertInside(PACKAGED_TEMPLATE_ASSET_ROOT, sourcePath, 'Template asset source');
  const sourceStats = await lstat(sourcePath);
  if (!sourceStats.isFile() || sourceStats.isSymbolicLink()) {
    throw new Error(`Template asset source must be a regular file: ${asset.sourcePath}`);
  }
  const canonicalSourcePath = await realpath(sourcePath);
  assertInside(PACKAGED_TEMPLATE_ASSET_ROOT, canonicalSourcePath, 'Template asset source');
  const contents = await readFile(canonicalSourcePath);
  if (contents.byteLength !== asset.sizeBytes) {
    throw new Error(`Template asset byte size does not match its descriptor: ${asset.sourcePath}`);
  }
  const sha256 = createHash('sha256').update(contents).digest('hex');
  if (sha256 !== asset.sha256) {
    throw new Error(`Template asset sha256 does not match its descriptor: ${asset.sourcePath}`);
  }
  return contents;
}

/*** Require a resolved path to remain strictly below its declared owner directory. */
function assertInside(parentPath: string, childPath: string, label: string): void {
  const relativePath = path.relative(parentPath, childPath);
  if (
    relativePath === '' ||
    relativePath === '..' ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error(`${label} escapes its owner directory: ${childPath}`);
  }
}

async function pathExists(targetPath: string): Promise<boolean> {
  try {
    await stat(targetPath);
    return true;
  } catch (error) {
    if (isNotFoundError(error)) {
      return false;
    }

    throw error;
  }
}

function isNotFoundError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error && error.code === 'ENOENT';
}
