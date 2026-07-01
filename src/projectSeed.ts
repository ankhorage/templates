import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

import type { AppManifest } from '@ankhorage/contracts';

import type { StarterTemplateCategory } from './templates/starter/index.js';

export interface TemplateSeedMetadata {
  readonly package: string;
  readonly version: string;
  readonly projectSlug: string;
  readonly displayName: string;
  readonly category: StarterTemplateCategory;
  readonly templateId: string;
  readonly selector: string;
}

export interface CreateProjectSeedRequest {
  readonly cwd: string;
  readonly projectSlug: string;
  readonly readmeText: string;
  readonly metadata: TemplateSeedMetadata;
  readonly manifest: AppManifest;
}

export interface CreateProjectSeedResult {
  readonly projectPath: string;
}

export interface ProjectSeedDependencies {
  readonly mkdir: typeof mkdir;
  readonly pathExists: (targetPath: string) => Promise<boolean>;
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

  await resolvedDependencies.mkdir(projectPath, { recursive: false });
  await resolvedDependencies.writeFile(
    path.join(projectPath, 'ankh.config.json'),
    `${JSON.stringify(request.manifest, null, 2)}\n`,
    'utf8',
  );
  await resolvedDependencies.writeFile(
    path.join(projectPath, 'ankh.template.json'),
    `${JSON.stringify(request.metadata, null, 2)}\n`,
    'utf8',
  );
  await resolvedDependencies.writeFile(
    path.join(projectPath, 'README.md'),
    request.readmeText,
    'utf8',
  );

  return { projectPath };
}

function createProjectSeedDependencies(
  overrides: Partial<ProjectSeedDependencies>,
): ProjectSeedDependencies {
  return {
    mkdir: overrides.mkdir ?? mkdir,
    pathExists: overrides.pathExists ?? pathExists,
    writeFile: overrides.writeFile ?? writeFile,
  };
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
