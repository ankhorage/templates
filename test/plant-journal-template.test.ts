import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import type { UiNode } from '@ankhorage/contracts';
import { expect, test } from 'bun:test';

import {
  CATEGORY_PRESETS,
  createStarterTemplate,
  listStarterTemplatesByCategory,
  type StarterTemplateArtifact,
  type TemplateSeed,
} from '../src/index';
import { TEMPLATES_PACKAGE_VERSION } from '../src/packageMetadata';
import { createProjectSeed } from '../src/projectSeed';

function createPlantJournalSeed(): TemplateSeed {
  const preset = CATEGORY_PRESETS.lifestyle;

  return {
    category: 'lifestyle',
    categoryLabel: preset.label,
    appName: 'Plant Journal',
    slug: 'plant-journal',
    summary: preset.summary,
    focusAreas: preset.focusAreas,
    primaryColor: '#9A4E36',
    harmony: 'analogous',
  };
}

function collectImageMediaIds(node: UiNode): string[] {
  const source = node.type === 'Image' ? node.props?.source : undefined;
  const own =
    typeof source === 'object' && source !== null && 'mediaId' in source ? [source.mediaId] : [];

  return [
    ...own.filter((mediaId): mediaId is string => typeof mediaId === 'string'),
    ...(node.children?.flatMap(collectImageMediaIds) ?? []),
  ];
}

function collectBundledMediaPaths(artifact: StarterTemplateArtifact): string[] {
  return Object.values(artifact.manifest.media?.assets ?? {}).flatMap((asset) =>
    asset.source.kind === 'bundled' ? [asset.source.path] : [],
  );
}

async function materializePlantJournalProject(cwd: string, artifact: StarterTemplateArtifact) {
  return createProjectSeed({
    cwd,
    projectSlug: 'plant-journal-proof',
    readmeText: '# Plant Journal\n',
    metadata: {
      package: '@ankhorage/templates',
      version: TEMPLATES_PACKAGE_VERSION,
      projectSlug: 'plant-journal-proof',
      displayName: 'Plant Journal Proof',
      category: 'lifestyle',
      templateId: 'plant-journal',
      selector: 'lifestyle/plant-journal',
    },
    manifest: artifact.manifest,
    assets: artifact.assets,
  });
}

test('lifestyle/plant-journal is listed and composes its bundled plant imagery', () => {
  expect(listStarterTemplatesByCategory('lifestyle')).toContainEqual({
    category: 'lifestyle',
    description:
      'A calm three-screen plant-care journal with bundled botanical imagery and a focused care rhythm.',
    id: 'plant-journal',
    label: 'Plant Journal',
  });

  const { assets, manifest } = createStarterTemplate(createPlantJournalSeed(), {
    templateId: 'plant-journal',
  });
  const imageMediaIds = Object.values(manifest.screens).flatMap((screen) =>
    collectImageMediaIds(screen.root),
  );

  expect(Object.keys(manifest.screens)).toEqual([
    'plant-journal-garden',
    'plant-journal-detail',
    'plant-journal-care-log',
  ]);
  expect(imageMediaIds.sort()).toEqual(['mara-detail', 'mara-hero']);
  expect(Object.keys(manifest.media?.assets ?? {}).sort()).toEqual(['mara-detail', 'mara-hero']);
  expect(assets.map((asset) => asset.targetPath).sort()).toEqual(
    collectBundledMediaPaths({ assets, manifest }).sort(),
  );
});

test('lifestyle/plant-journal materializes bundled imagery byte-for-byte', async () => {
  const cwd = await mkdtemp(path.join(os.tmpdir(), 'templates-plant-journal-'));

  try {
    const artifact = createStarterTemplate(createPlantJournalSeed(), {
      templateId: 'plant-journal',
    });
    const result = await materializePlantJournalProject(cwd, artifact);

    await Promise.all(
      artifact.assets.map(async (asset) => {
        const [source, generated] = await Promise.all([
          readFile(asset.sourcePath),
          readFile(path.join(result.projectPath, asset.targetPath)),
        ]);

        expect(generated).toEqual(source);
      }),
    );
    expect(result.createdFiles).toEqual([
      'ankh.config.json',
      'ankh.template.json',
      'README.md',
      ...artifact.assets.map((asset) => asset.targetPath),
    ]);
  } finally {
    await rm(cwd, { recursive: true, force: true });
  }
});
