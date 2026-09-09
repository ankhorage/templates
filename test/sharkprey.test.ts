import type { UiNode } from '@ankhorage/contracts';
import { validateNavigatorManifest } from '@ankhorage/navigator';
import { compileZoraTheme } from '@ankhorage/zora/theme';
import { expect, test } from 'bun:test';

import { createTemplateArtifact, validateTemplateManifest } from '../src/index';
import createAppManifest from '../src/templates/categories/education-learning/sharkprey/createAppManifest';

test('SharkPrey compiles both theme modes and validates navigation on every target', () => {
  const manifest = createAppManifest();
  for (const theme of manifest.themes) {
    const compiled = compileZoraTheme(theme);
    expect(compiled.diagnostics).toEqual([]);
  }
  for (const platform of ['ios', 'android', 'web'] as const) {
    expect(
      validateNavigatorManifest(manifest.navigator, {
        platform,
        expoRouterVersion: '57.0.0',
      }).filter(({ severity }) => severity === 'error'),
    ).toEqual([]);
  }
  expect(validateTemplateManifest(manifest, 'release').diagnostics).toEqual([]);
});

test('SharkPrey keeps single-choice values valid and node identities unique per screen', () => {
  const manifest = createAppManifest();
  for (const screen of Object.values(manifest.screens)) {
    const ids = new Set<string>();
    const visit = (node: UiNode): void => {
      expect(ids.has(node.id)).toBe(false);
      ids.add(node.id);
      if (node.type === 'RadioGroup') {
        const options = node.props?.options;
        expect(Array.isArray(options)).toBe(true);
        if (Array.isArray(options) && typeof node.props?.defaultValue === 'string') {
          expect(options.map((option: { value: string }) => option.value)).toContain(
            node.props.defaultValue,
          );
        }
      }
      node.children?.forEach(visit);
    };
    visit(screen.root);
  }
});

test('SharkPrey exports runtime media without rendering reference screenshots', () => {
  const artifact = createTemplateArtifact({ category: 'education_learning', slug: 'sharkprey' });
  expect(artifact.assets.length).toBeGreaterThan(0);
  expect(artifact.assets.every(({ targetPath }) => targetPath.startsWith('assets/images/'))).toBe(
    true,
  );
  artifact.manifest.metadata.name = 'Consumer edit';
  expect(createAppManifest().metadata.name).toBe('SharkPrey');
});
