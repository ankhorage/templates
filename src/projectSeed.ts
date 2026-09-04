import { lstat, mkdir, readFile, realpath, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { AppCategory, AppManifest } from '@ankhorage/contracts';

import type { TemplateImageAsset } from './templates/catalog.js';

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

export interface ProjectSeedDependencies {
  readonly mkdir: typeof mkdir;
  readonly pathExists: (targetPath: string) => Promise<boolean>;
  readonly readTemplateAsset: (asset: TemplateImageAsset) => Promise<Uint8Array>;
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
    'utf8',
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
    'utf8',
  );
  await writeProjectFile(path.join(projectPath, 'README.md'), request.readmeText, 'utf8');
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
    await dependencies.writeFile(targetPath, materialized.contents);
  }
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
