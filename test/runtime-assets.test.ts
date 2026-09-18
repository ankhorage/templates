import { expect, test } from 'bun:test';

import { resolveTemplate, validateTemplateManifest } from '../src/index';

test('release validation accepts separate SVG Icon and Image references inside screen content', () => {
  const base = resolveTemplate('social_community', 'chat').createAppManifest();
  const manifest = {
    ...base,
    screens: {
      ...base.screens,
      'asset-content': {
        id: 'asset-content',
        name: 'Asset content',
        root: {
          id: 'asset-content-root',
          type: 'View',
          children: [
            { id: 'asset-icon', type: 'Icon', props: { source: { mediaId: 'friends' } } },
            {
              id: 'asset-image',
              type: 'Image',
              props: { source: { mediaId: 'lake' }, alt: 'Alpine lake' },
            },
          ],
        },
      },
    },
    navigator: {
      ...base.navigator,
      routes: [...base.navigator.routes, { name: 'asset-content', screenId: 'asset-content' }],
    },
  };
  const result = validateTemplateManifest(manifest, 'release');
  expect(result.status).toBe('ready');
  expect(result.diagnostics).toEqual([]);
});
