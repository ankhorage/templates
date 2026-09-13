import { expect, test } from 'bun:test';

import {
  APP_CATEGORIES,
  CATEGORY_PRESET_RECONCILIATION,
  CATEGORY_PRESETS,
  compileCategoryDesign,
  composeCategoryAppManifest,
  createTemplateArtifact,
  listTemplates,
  resolveCategoryDesignPreset,
  resolveTemplate,
  TONE_PAIR_CATALOG,
  validateTemplateManifest,
} from '../src/index';

test('exposes authoring and standalone template APIs', () => {
  expect(Object.keys(CATEGORY_PRESETS)).toHaveLength(APP_CATEGORIES.length);
  expect(CATEGORY_PRESET_RECONCILIATION).toHaveLength(APP_CATEGORIES.length);
  expect(TONE_PAIR_CATALOG).toHaveLength(70);
  expect(typeof compileCategoryDesign).toBe('function');
  expect(typeof composeCategoryAppManifest).toBe('function');
  expect(typeof resolveCategoryDesignPreset).toBe('function');
  expect(typeof createTemplateArtifact).toBe('function');
  expect(typeof resolveTemplate).toBe('function');
});

test('discovers each portable template from the canonical directory tree', () => {
  const templates = listTemplates();
  expect(
    templates.map(({ category, name, selector, slug, sourceRoot }) => ({
      category,
      name,
      selector,
      slug,
      sourceRoot,
    })),
  ).toEqual([
    {
      category: 'education_learning',
      name: 'SharkPrey',
      selector: 'education_learning/sharkprey',
      slug: 'sharkprey',
      sourceRoot: 'src/templates/categories/education-learning/sharkprey',
    },
    {
      category: 'lifestyle',
      name: 'Stillpath',
      selector: 'lifestyle/stillpath',
      slug: 'stillpath',
      sourceRoot: 'src/templates/categories/lifestyle/stillpath',
    },
    {
      category: 'social_community',
      name: 'Close',
      selector: 'social_community/chat',
      slug: 'chat',
      sourceRoot: 'src/templates/categories/social-community/chat',
    },
  ]);
  expect(templates.every((template) => typeof template.createAppManifest === 'function')).toBe(
    true,
  );
});

test('exports an isolated chat manifest with portable runtime media', () => {
  const artifact = createTemplateArtifact({ category: 'social_community', slug: 'chat' });
  expect(validateTemplateManifest(artifact.manifest, 'release')).toMatchObject({
    status: 'ready',
    diagnostics: [],
  });
  expect(artifact.assets.map((asset) => asset.targetPath)).toEqual([
    'assets/images/lake.png',
    'assets/images/svg/friends.svg',
    'assets/images/svg/chats.svg',
  ]);
  expect(
    artifact.assets.every(
      (asset) =>
        asset.sourcePath === `src/templates/categories/social-community/chat/${asset.targetPath}`,
    ),
  ).toBe(true);
  artifact.manifest.metadata.name = 'Changed by consumer';
  const fresh = resolveTemplate('social_community', 'chat').createAppManifest();
  expect(fresh.metadata.name).toBe('Close');
});

test('native splash artwork resolves through bundled template media', () => {
  for (const template of listTemplates()) {
    const artifact = createTemplateArtifact({ category: template.category, slug: template.slug });
    for (const mode of [artifact.manifest.splashScreen, artifact.manifest.splashScreen?.dark]) {
      const mediaId = mode?.image?.mediaId;
      if (mediaId === undefined) continue;
      const mediaAsset = Object.values(artifact.manifest.media?.assets ?? {}).find(
        (asset) => asset.id === mediaId,
      );
      expect(mediaAsset).toMatchObject({
        id: mediaId,
        kind: 'image',
        source: { kind: 'bundled' },
      });
      expect(artifact.assets.some((asset) => asset.mediaId === mediaId)).toBe(true);
    }
  }
});

test('every published template validates against the current owner component catalog', () => {
  for (const template of listTemplates()) {
    expect(validateTemplateManifest(template.createAppManifest(), 'release')).toMatchObject({
      status: 'ready',
      diagnostics: [],
    });
  }
});

test('every published template uses the environment-aware infrastructure contract', () => {
  for (const template of listTemplates()) {
    const { infra } = template.createAppManifest();
    const { local } = infra.environments;

    expect(local.deployment).toEqual({
      compute: { provider: 'local' },
      runtime: { provider: 'minikube' },
    });
    expect(local.objectStorage).toEqual({ provider: 'supabase', buckets: ['media'] });
    expect(Reflect.has(infra, 'storage')).toBe(false);
    expect(Reflect.has(local.deployment, 'target')).toBe(false);
    expect(Reflect.has(local.deployment, 'monitoring')).toBe(false);
  }

  expect(resolveTemplate('education_learning', 'sharkprey').createAppManifest().state).toEqual({
    provider: 'legend',
    persistence: false,
  });
});
