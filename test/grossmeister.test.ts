import { expect, test } from 'bun:test';

import { createTemplateArtifact, resolveTemplate, validateTemplateManifest } from '../src/index';

test('GrossMeister is a release-valid single-Navy chess template with the requested journey', () => {
  const template = resolveTemplate('games', 'grossmeister');
  const manifest = template.createAppManifest();

  expect(Object.keys(manifest.themes)).toEqual(['grossmeister-navy']);
  expect(manifest.navigator.routes[0]?.navigator?.routes.map(({ name }) => name)).toEqual([
    'play',
    'lobby',
  ]);
  expect(Object.keys(manifest.screens)).toEqual([
    'play',
    'lobby',
    'waiting',
    'coin',
    'match',
    'result',
    'sign-in',
    'sign-up',
  ]);
  expect(manifest.screens.match?.root.children?.some(({ type }) => type === 'ChessBoard')).toBe(
    true,
  );
  expect(validateTemplateManifest(manifest, 'release').diagnostics).toEqual([]);
});

test('GrossMeister ships only the checked Navy brand assets with its isolated artifact', () => {
  const artifact = createTemplateArtifact({ category: 'games', slug: 'grossmeister' });

  expect(artifact.assets.map(({ mediaId }) => mediaId)).toEqual([
    'grossmeister-mark',
    'grossmeister-wordmark',
  ]);
});
