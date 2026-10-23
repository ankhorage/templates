import type { UiNode } from '@ankhorage/contracts';
import { validateNavigatorManifest } from '@ankhorage/navigator';
import { ZORA_COMPONENT_META } from '@ankhorage/zora/metadata';
import { compileZoraTheme } from '@ankhorage/zora/theme';
import { expect, test } from 'bun:test';

import { createTemplateArtifact, validateTemplateManifest } from '../src/index';
import createAppManifest from '../src/templates/categories/education-learning/sharkprey/createAppManifest';

const SHARKPREY_SURVIVING_NODE_IDS = [
  'stats-metric-0-0',
  'stats-metric-row-0-0',
  'stats-metric-icon-0-0',
  'stats-metric-content-0-0',
  'stats-metric-top-0-0',
  'stats-metric-name-0-0',
  'stats-metric-value-0-0',
  'stats-metric-bar-0-0',
  'stats-metric-range-0-0',
  'stats-metric-min-0-0',
  'stats-metric-max-0-0',
  'stats-metric-0-1',
  'stats-metric-row-0-1',
  'stats-metric-icon-0-1',
  'stats-metric-content-0-1',
  'stats-metric-top-0-1',
  'stats-metric-name-0-1',
  'stats-metric-value-0-1',
  'stats-metric-bar-0-1',
  'stats-metric-range-0-1',
  'stats-metric-min-0-1',
  'stats-metric-max-0-1',
  'stats-metric-1-0',
  'stats-metric-row-1-0',
  'stats-metric-icon-1-0',
  'stats-metric-content-1-0',
  'stats-metric-top-1-0',
  'stats-metric-name-1-0',
  'stats-metric-value-1-0',
  'stats-metric-bar-1-0',
  'stats-metric-range-1-0',
  'stats-metric-min-1-0',
  'stats-metric-max-1-0',
  'stats-metric-1-1',
  'stats-metric-row-1-1',
  'stats-metric-icon-1-1',
  'stats-metric-content-1-1',
  'stats-metric-top-1-1',
  'stats-metric-name-1-1',
  'stats-metric-value-1-1',
  'stats-metric-bar-1-1',
  'stats-metric-range-1-1',
  'stats-metric-min-1-1',
  'stats-metric-max-1-1',
  'history-hand-result-0',
  'history-hand-result-1',
  'history-hand-icon-1',
  'history-hand-status-1',
  'history-hand-result-2',
  'history-hand-icon-2',
  'history-hand-status-2',
  'history-hand-icon-0',
  'history-hand-status-0',
].sort();

test('SharkPrey compiles both theme modes and validates navigation on every target', () => {
  const manifest = createAppManifest();
  for (const theme of Object.values(manifest.themes)) {
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
  const radioGroupMeta = ZORA_COMPONENT_META.RadioGroup;
  if (radioGroupMeta === undefined) throw new Error('ZORA does not expose RadioGroup metadata.');
  expect(radioGroupMeta.props.columns?.type).toBe('enum');
  expect(radioGroupMeta.props.contentOrientation?.type).toBe('enum');
  expect(radioGroupMeta.props.defaultValue?.type).toBe('string');
  const optionsMeta = radioGroupMeta.props.options;
  if (optionsMeta?.type !== 'array') throw new Error('RadioGroup options metadata is unavailable.');
  const { itemSchema } = optionsMeta;
  if (itemSchema === undefined) throw new Error('RadioGroup option fields are unavailable.');
  expect(itemSchema.find(({ key }) => key === 'iconSource')).toMatchObject({
    schema: { type: 'media' },
  });
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

test('SharkPrey preserves the original metric and history node IDs', () => {
  const manifest = createAppManifest();
  const ids = new Set<string>();
  const visit = (node: UiNode): void => {
    ids.add(node.id);
    node.children?.forEach(visit);
  };
  for (const screen of Object.values(manifest.screens)) visit(screen.root);

  expect(
    [...ids]
      .filter(
        (id) =>
          id.startsWith('stats-metric-') || /^history-hand-(?:result|icon|status)-\d$/u.test(id),
      )
      .sort(),
  ).toEqual(SHARKPREY_SURVIVING_NODE_IDS);
  expect(manifest.screens['session-summary']).toBeUndefined();
  expect(manifest.navigator.routes.some(({ name }) => name === 'session-summary')).toBe(false);
});

test('SharkPrey exports runtime media without rendering reference screenshots', () => {
  const artifact = createTemplateArtifact({ category: 'education_learning', slug: 'sharkprey' });
  expect(artifact.assets.length).toBeGreaterThan(0);
  expect(artifact.assets.every(({ targetPath }) => targetPath.startsWith('assets/images/'))).toBe(
    true,
  );
  expect(artifact.manifest.splashScreen).toEqual({
    backgroundColor: '#040404',
    image: { mediaId: 'sharkprey-splash' },
    imageWidth: 280,
    resizeMode: 'contain',
    dark: {
      backgroundColor: '#040404',
      image: { mediaId: 'sharkprey-splash' },
    },
  });
  expect(artifact.manifest.screens.splash).toBeUndefined();
  expect(artifact.manifest.navigator.routes.some(({ name }) => name === 'splash')).toBe(false);
  expect(artifact.assets.some(({ mediaId }) => mediaId === 'sharkprey-logo')).toBe(true);
  expect(artifact.assets.some(({ mediaId }) => mediaId === 'sharkprey-splash')).toBe(true);
  artifact.manifest.metadata.name = 'Consumer edit';
  expect(createAppManifest().metadata.name).toBe('SharkPrey');
});
