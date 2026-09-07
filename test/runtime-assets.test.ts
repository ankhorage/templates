import { expect, test } from 'bun:test';

import { resolveTemplate, validateTemplateManifest } from '../src/index';

test('release validation accepts separate SVG Icon and Image references inside screen content', () => {
  const manifest = resolveTemplate('education_learning', 'sharkprey').createAppManifest();
  manifest.screens['asset-content'] = {
    id: 'asset-content',
    name: 'Asset content',
    root: {
      id: 'asset-content-root',
      type: 'Box',
      children: [
        { id: 'asset-icon', type: 'Icon', props: { source: { mediaId: 'sharkprey-train-icon' } } },
        {
          id: 'asset-image',
          type: 'Image',
          props: { source: { mediaId: 'sharkprey-logo' }, alt: 'SharkPrey' },
        },
      ],
    },
  };
  manifest.navigator.routes.push({ name: 'asset-content', screenId: 'asset-content' });
  const result = validateTemplateManifest(manifest, 'release');
  expect(result.status).toBe('ready');
  expect(result.diagnostics).toEqual([]);
});
