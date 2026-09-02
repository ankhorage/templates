import type { AppManifest, UiNode } from '@ankhorage/contracts';
import { describe, expect, test } from 'bun:test';

import { CATEGORY_PRESETS, createStarterTemplate, type TemplateSeed } from '../src/index';

const INITIAL_CHESS_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

function createGamesSeed(): TemplateSeed {
  const preset = CATEGORY_PRESETS.games;

  return {
    category: 'games',
    categoryLabel: preset.label,
    appName: preset.defaultName,
    slug: preset.defaultSlug,
    summary: preset.summary,
    focusAreas: preset.focusAreas,
    primaryColor: preset.recommendedPrimaryColors[0],
    harmony: preset.recommendedHarmonies[0],
  };
}

function collectNodes(node: UiNode): UiNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function findNodeByType(manifest: AppManifest, type: string): UiNode | undefined {
  return Object.values(manifest.screens)
    .flatMap((screen) => collectNodes(screen.root))
    .find((node) => node.type === type);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

describe('games chess starter', () => {
  test('renders a real ChessBoard node on Home and keeps Settings separate', () => {
    const manifest = createStarterTemplate(createGamesSeed(), { templateId: 'chess' });

    expect(manifest.navigator.type).toBe('tabs');
    expect(manifest.navigator.routes.map((route) => route.label)).toEqual(['Home', 'Settings']);
    expect(manifest.navigator.routes.map((route) => route.name)).toEqual(['index', 'settings']);

    const chessBoard = findNodeByType(manifest, 'ChessBoard');

    expect(chessBoard).toBeDefined();
    expect(chessBoard?.id).toBe('games-chess-home-chessboard');
    expect(isRecord(chessBoard?.props)).toBe(true);

    if (!isRecord(chessBoard?.props)) {
      throw new Error('Expected ChessBoard props to be a serializable object.');
    }

    expect(chessBoard.props.fen).toBe(INITIAL_CHESS_FEN);
    expect(chessBoard.props.orientation).toBe('white');
    expect(chessBoard.props.showCoordinates).toBe(true);
    expect(chessBoard.props.validateMoves).toBe(true);
    expect(chessBoard.props.testID).toBe('games-chess-home-chessboard');
  });
});
