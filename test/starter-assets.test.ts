import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import type { AppManifest } from '@ankhorage/contracts';
import { describe, expect, test } from 'bun:test';

import {
  createCategoryAppManifest,
  createStarterTemplateArtifact,
  type StarterTemplateAsset,
  summarizeStarterTemplateAssets,
  validateStarterTemplateAssets,
} from '../src/index';
import { createProjectSeed } from '../src/projectSeed';

const asset: StarterTemplateAsset = {
  sourcePath: 'assets/templates/capability-proof/checker.svg',
  targetPath: 'assets/visuals/checker.svg',
  contentType: 'image/svg+xml',
  sizeBytes: 135,
  sha256: 'a7ca7cc8721b38bbb035a8fb3c4aa4eb20e9b109cf1c3fc4c6e94e3f32750b21',
};

describe('starter template asset contracts', () => {
  test('composes a deterministic artifact from one bundled manifest image', () => {
    const manifest = createImageManifest();
    const artifact = createStarterTemplateArtifact(manifest, [asset]);

    expect(artifact.manifest).toBe(manifest);
    expect(artifact.assets).toEqual([asset]);
    expect(summarizeStarterTemplateAssets(artifact.assets)).toEqual([
      {
        targetPath: asset.targetPath,
        contentType: asset.contentType,
        sizeBytes: asset.sizeBytes,
        sha256: asset.sha256,
      },
    ]);
  });

  test('rejects missing, unreferenced, duplicate, and escaping asset paths', () => {
    const manifest = createImageManifest();

    expect(() => validateStarterTemplateAssets(manifest, [])).toThrow('missing its template asset');
    expect(() =>
      validateStarterTemplateAssets(createCategoryAppManifest('graphics_design'), [asset]),
    ).toThrow('not referenced');
    expect(() => validateStarterTemplateAssets(manifest, [asset, asset])).toThrow(
      'target is duplicated',
    );
    expect(() =>
      validateStarterTemplateAssets(manifest, [
        { ...asset, sourcePath: 'assets/templates/../secret.svg' },
      ]),
    ).toThrow('normalized relative path');
    expect(() =>
      validateStarterTemplateAssets(manifest, [
        { ...asset, targetPath: 'assets/visuals/checker.png' },
      ]),
    ).toThrow('does not match image/svg+xml');
  });
});

describe('successful starter template asset materialization', () => {
  test('copies verified packaged bytes into the generated project', async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), 'templates-assets-'));

    try {
      const manifest = createImageManifest();
      const result = await createProjectSeed({
        cwd,
        projectSlug: 'asset-app',
        readmeText: '# Asset app\n',
        metadata: {
          package: '@ankhorage/templates',
          version: '9.0.0',
          projectSlug: 'asset-app',
          displayName: 'Asset App',
          category: 'graphics_design',
          templateId: 'asset-proof',
          selector: 'graphics_design/asset-proof',
        },
        manifest,
        assets: [asset],
      });

      const source = await readFile(asset.sourcePath);
      const generated = await readFile(path.join(result.projectPath, asset.targetPath));
      const metadata = JSON.parse(
        await readFile(path.join(result.projectPath, 'ankh.template.json'), 'utf8'),
      ) as { readonly assets: readonly Record<string, unknown>[] };

      expect(generated).toEqual(source);
      expect(result.createdFiles).toContain(asset.targetPath);
      expect(metadata.assets).toEqual(summarizeStarterTemplateAssets([asset]));
      expect(metadata.assets[0]).not.toHaveProperty('sourcePath');
    } finally {
      await rm(cwd, { recursive: true, force: true });
    }
  });
});

describe('starter template asset integrity rejection', () => {
  test('verifies packaged bytes before creating a target directory', async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), 'templates-assets-invalid-'));

    try {
      const projectPath = path.join(cwd, 'asset-app');
      let rejection: unknown;
      try {
        await createProjectSeed({
          cwd,
          projectSlug: 'asset-app',
          readmeText: '# Asset app\n',
          metadata: {
            package: '@ankhorage/templates',
            version: '9.0.0',
            projectSlug: 'asset-app',
            displayName: 'Asset App',
            category: 'graphics_design',
            templateId: 'asset-proof',
            selector: 'graphics_design/asset-proof',
          },
          manifest: createImageManifest(),
          assets: [{ ...asset, sha256: '0'.repeat(64) }],
        });
      } catch (error) {
        rejection = error;
      }
      expect(rejection).toBeInstanceOf(Error);
      if (!(rejection instanceof Error)) throw new Error('Expected project creation to fail.');
      expect(rejection.message).toContain('sha256 does not match');
      expect(await Bun.file(projectPath).exists()).toBe(false);
    } finally {
      await rm(cwd, { recursive: true, force: true });
    }
  });
});

/*** Create one release-valid manifest whose image is backed by the capability proof asset. */
function createImageManifest(): AppManifest {
  return {
    ...createCategoryAppManifest('graphics_design'),
    media: {
      assets: {
        checker: {
          id: 'checker',
          name: 'Checker image',
          kind: 'image',
          source: { kind: 'bundled', path: asset.targetPath },
          contentType: asset.contentType,
          metadata: { sizeBytes: asset.sizeBytes, width: 2, height: 2 },
        },
      },
    },
  };
}
