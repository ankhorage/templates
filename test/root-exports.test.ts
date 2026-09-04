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
  ]);
  expect(templates.every((template) => typeof template.createAppManifest === 'function')).toBe(
    true,
  );
});

test('exposes a release-ready SharkPrey manifest and bundled logo', () => {
  const sharkPrey = resolveTemplate('education_learning', 'sharkprey').createAppManifest();
  expect(validateTemplateManifest(sharkPrey, 'release')).toMatchObject({
    status: 'ready',
    diagnostics: [],
  });
  expect(sharkPrey.infra.state).toEqual({ provider: 'legend', persistence: 'local' });
  expect(sharkPrey.infra.auth?.flow?.postSignInRoute).toBe(sharkPrey.navigator.initialRouteName);
  expect(Object.keys(sharkPrey.screens)).toHaveLength(10);

  const sharkPreyArtifact = createTemplateArtifact({
    category: 'education_learning',
    slug: 'sharkprey',
  });
  expect(sharkPreyArtifact.assets).toEqual([
    {
      mediaId: 'sharkprey-logo',
      sourcePath:
        'src/templates/categories/education-learning/sharkprey/assets/images/sharkprey-logo.png',
      targetPath: 'assets/images/sharkprey-logo.png',
      contentType: 'image/png',
    },
  ]);
});
