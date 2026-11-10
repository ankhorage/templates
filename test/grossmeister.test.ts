import { expect, test } from 'bun:test';

import { createTemplateArtifact, resolveTemplate, validateTemplateManifest } from '../src/index';

test('GrossMeister is a release-valid single-Navy board-first chess configuration', () => {
  const template = resolveTemplate('games', 'grossmeister');
  const manifest = template.createAppManifest();

  expect(Object.keys(manifest.themes)).toEqual(['grossmeister-navy']);
  expect(manifest.navigator.routes[0]?.navigator?.routes.map(({ name }) => name)).toEqual([
    'play',
    'lobby',
  ]);
  expect(Object.keys(manifest.screens)).toEqual(['play', 'lobby', 'sign-in', 'sign-up']);
  expect(manifest.screens.play?.root.children?.some(({ type }) => type === 'ChessBoard')).toBe(
    true,
  );
  expect(validateTemplateManifest(manifest, 'release').diagnostics).toEqual([]);
});

test('GrossMeister preserves the supported 2-24 board configuration and Choice Coin model', () => {
  const manifest = resolveTemplate('games', 'grossmeister').createAppManifest();
  const playChildren = manifest.screens.play?.root.children ?? [];
  const boardSize = playChildren.find(({ id }) => id === 'play-board-size');
  const choiceCoin = playChildren.find(({ id }) => id === 'play-choice-coin');
  const boardSizeProps = boardSize?.props;
  const choiceCoinProps = choiceCoin?.props;

  expect(boardSizeProps).toBeDefined();
  expect(choiceCoinProps).toBeDefined();
  if (!boardSizeProps || !choiceCoinProps) {
    throw new Error('GrossMeister configuration controls must remain present.');
  }
  expect(boardSizeProps.options).toHaveLength(23);
  expect(boardSizeProps.options).toContainEqual({ value: '2x2', label: '2 × 2' });
  expect(boardSizeProps.options).toContainEqual({ value: '24x24', label: '24 × 24' });
  expect(choiceCoinProps.description).toContain('konfigurierbare Schachfiguren');
  expect(choiceCoinProps.description).not.toContain('wer die Farbe');
});

test('GrossMeister does not bind unavailable multiplayer operations as navigation', () => {
  const manifest = resolveTemplate('games', 'grossmeister').createAppManifest();
  const createGame = manifest.screens.play?.root.children?.find(({ id }) => id === 'create-game');
  const joinGame = manifest.screens.lobby?.root.children
    ?.find(({ id }) => id === 'lobby-api-card')
    ?.children?.find(({ id }) => id === 'join-game');
  const createGameProps = createGame?.props;
  const joinGameProps = joinGame?.props;
  const bindings = manifest.dataBindings ?? {};

  expect(createGameProps).toBeDefined();
  expect(joinGameProps).toBeDefined();
  if (!createGameProps || !joinGameProps) {
    throw new Error('GrossMeister multiplayer boundaries must remain visible.');
  }
  expect(createGameProps.disabled).toBe(true);
  expect(joinGameProps.disabled).toBe(true);
  expect(Object.keys(bindings)).not.toContain('create-game');
  expect(Object.keys(bindings)).not.toContain('join-game');
  expect(Object.keys(bindings)).not.toContain('start-match');
  expect(Object.keys(bindings)).not.toContain('resign-match');
});

test('GrossMeister ships only the checked Navy brand assets with its isolated artifact', () => {
  const artifact = createTemplateArtifact({ category: 'games', slug: 'grossmeister' });

  expect(artifact.assets.map(({ mediaId }) => mediaId)).toEqual([
    'grossmeister-mark',
    'grossmeister-wordmark',
  ]);
});

test('GrossMeister retains the complete Navy wordmark geometry', async () => {
  const wordmark = await Bun.file(
    new URL(
      '../src/templates/categories/games/grossmeister/assets/images/svg/grossmeister-wordmark.svg',
      import.meta.url,
    ),
  ).text();

  expect(wordmark).toContain('viewBox="81 17 70 46"');
  expect(wordmark.match(/<path\b/g)).toHaveLength(14);
});
