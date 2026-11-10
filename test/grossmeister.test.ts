import type { UiNode } from '@ankhorage/contracts';
import { createNavigatorPlan } from '@ankhorage/navigator';
import { expect, test } from 'bun:test';

import { createTemplateArtifact, resolveTemplate, validateTemplateManifest } from '../src/index';

function requiredChild(children: readonly UiNode[] | undefined, id: string): UiNode {
  const child = children?.find((node) => node.id === id);
  if (!child) throw new Error(`Expected GrossMeister node: ${id}`);
  return child;
}

function requiredChildProps(children: readonly UiNode[] | undefined, id: string) {
  const { props } = requiredChild(children, id);
  if (!props) throw new Error(`Expected GrossMeister node props: ${id}`);
  return props;
}

test('GrossMeister is a release-valid single-Navy board-first chess configuration', () => {
  const template = resolveTemplate('games', 'grossmeister');
  const manifest = template.createAppManifest();

  expect(Object.keys(manifest.themes)).toEqual(['grossmeister-navy']);
  expect(manifest.navigator.routes.map(({ name }) => name)).toEqual([
    '(tabs)',
    'waiting',
    'coin',
    'match',
    'result',
    'sign-in',
    'sign-up',
  ]);
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
  expect(manifest.screens.play?.root.children?.some(({ type }) => type === 'ChessBoard')).toBe(
    true,
  );
  expect(validateTemplateManifest(manifest, 'release').diagnostics).toEqual([]);
});

test('GrossMeister preserves the supported 2-24 board configuration and Choice Coin model', () => {
  const manifest = resolveTemplate('games', 'grossmeister').createAppManifest();
  const playChildren = manifest.screens.play?.root.children ?? [];
  const columns = playChildren.find(({ id }) => id === 'play-board-columns');
  const rows = playChildren.find(({ id }) => id === 'play-board-rows');
  const choiceCoin = playChildren.find(({ id }) => id === 'play-choice-coin');
  const coinChildren = manifest.screens.coin?.root.children ?? [];
  const nbPreset = coinChildren.find(({ id }) => id === 'coin-nb-preset');
  const freeChoicePreset = coinChildren.find(({ id }) => id === 'coin-free-choice-preset');
  const columnsProps = columns?.props;
  const rowsProps = rows?.props;
  const choiceCoinProps = choiceCoin?.props;

  expect(columnsProps).toBeDefined();
  expect(rowsProps).toBeDefined();
  expect(choiceCoinProps).toBeDefined();
  if (!columnsProps || !rowsProps || !choiceCoinProps) {
    throw new Error('GrossMeister configuration controls must remain present.');
  }
  expect(columnsProps.options).toHaveLength(23);
  expect(rowsProps.options).toHaveLength(23);
  expect(columnsProps.options).toContainEqual({ value: '2', label: '2' });
  expect(columnsProps.options).toContainEqual({ value: '24', label: '24' });
  expect(rowsProps.options).toContainEqual({ value: '2', label: '2' });
  expect(rowsProps.options).toContainEqual({ value: '24', label: '24' });
  expect(columnsProps.options).toContainEqual({ value: '10', label: '10' });
  expect(rowsProps.options).toContainEqual({ value: '13', label: '13' });
  expect(choiceCoinProps.description).toContain('Choice Coins');
  expect(choiceCoinProps.description).not.toContain('wer die Farbe');
  expect(choiceCoinProps.description).toContain('N/B');
  expect(choiceCoinProps.description).toContain('P/N/B/R/Q/K');
  expect(nbPreset?.props?.description).toContain('je Coin und je Spielenden');
  expect(freeChoicePreset?.props?.description).toContain('P/N/B/R/Q/K');
  expect(JSON.stringify(manifest.screens.coin)).not.toContain('RadioGroup');
});

test('GrossMeister resolves every authored screen through the Navigator topology', () => {
  const manifest = resolveTemplate('games', 'grossmeister').createAppManifest();
  const plan = createNavigatorPlan(manifest.navigator, {
    platform: 'web',
    responsiveSize: 'expanded',
    expoRouterVersion: '57.0.18',
  });
  const screenIds = [
    ...plan.root.routes.flatMap((route) =>
      route.navigator === undefined
        ? route.screenId === undefined
          ? []
          : [route.screenId]
        : route.navigator.routes.flatMap((nestedRoute) =>
            nestedRoute.screenId === undefined ? [] : [nestedRoute.screenId],
          ),
    ),
  ].sort();

  expect(screenIds).toEqual([
    'coin',
    'lobby',
    'match',
    'play',
    'result',
    'sign-in',
    'sign-up',
    'waiting',
  ]);
  expect(plan.diagnostics.filter(({ severity }) => severity === 'error')).toEqual([]);
});

test('GrossMeister does not bind unavailable multiplayer operations as navigation', () => {
  const manifest = resolveTemplate('games', 'grossmeister').createAppManifest();
  const createGameProps = requiredChildProps(manifest.screens.play?.root.children, 'create-game');
  const joinGameProps = requiredChildProps(
    requiredChild(manifest.screens.lobby?.root.children, 'lobby-api-card').children,
    'join-game',
  );
  const startMatchProps = requiredChildProps(
    requiredChild(manifest.screens.waiting?.root.children, 'waiting-status').children,
    'start-match',
  );
  const resignMatchProps = requiredChildProps(
    manifest.screens.match?.root.children,
    'resign-match',
  );
  const bindings = manifest.dataBindings ?? {};

  expect(createGameProps.disabled).toBe(true);
  expect(joinGameProps.disabled).toBe(true);
  expect(startMatchProps.disabled).toBe(true);
  expect(resignMatchProps.disabled).toBe(true);
  expect(Object.keys(bindings)).toEqual(['sign-in-form', 'sign-up-form']);
  expect(manifest.dataSources).toBeUndefined();
});

test('GrossMeister keeps unavailable actions and technical dependencies out of product copy', () => {
  const manifest = resolveTemplate('games', 'grossmeister').createAppManifest();
  const productCopy = JSON.stringify(manifest.screens);

  expect(productCopy).toContain('Partie erstellen');
  expect(productCopy).toContain('Beitreten');
  expect(productCopy).toContain('Choice Coin');
  expect(productCopy).toContain('Partie starten');
  expect(productCopy).toContain('Aufgeben');
  expect(productCopy).not.toContain('API Gateway');
  expect(productCopy).not.toContain('ZORA #');
  expect(productCopy).not.toContain('#70');
  expect(productCopy).not.toContain('#1087');
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
