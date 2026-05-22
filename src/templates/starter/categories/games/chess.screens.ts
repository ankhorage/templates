import type { AppManifest, UiNode } from '@ankhorage/contracts';

import { createScreen, createSettingsSection, createZoraNode } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { chessContent } from './chess.content';
import type { ChessScreenIds } from './chess.routes';

const INITIAL_CHESS_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

function createNode(
  id: string,
  type: string,
  props?: Record<string, unknown>,
  children?: readonly UiNode[],
): UiNode {
  return {
    id,
    type,
    ...(props ? { props } : {}),
    ...(children && children.length > 0 ? { children: [...children] } : {}),
  };
}

export function createChessScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: ChessScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.home]: createScreen({
      id: screenIds.home,
      name: 'Home',
      title: chessContent.home.title,
      description: chessContent.home.description,
      root: createNode(`${idPrefix}-home-screen`, 'Screen', { width: 'default' }, [
        createNode(`${idPrefix}-home-header`, 'SectionHeader', {
          eyebrow: chessContent.home.eyebrow,
          title: chessContent.home.title,
          description: 'Study and play from the board.',
        }),
        createNode(
          `${idPrefix}-home-board-section`,
          'ScreenSection',
          {
            title: 'Board',
            description: 'Play through the position, then review candidate book moves below.',
          },
          [
            createNode(`${idPrefix}-home-chessboard`, 'ChessBoard', {
              fen: INITIAL_CHESS_FEN,
              orientation: 'white',
              showCoordinates: true,
              validateMoves: true,
              testID: `${idPrefix}-home-chessboard`,
            }),
            createNode(`${idPrefix}-home-opening-book`, 'OpeningBook', {
              title: 'Opening book',
              emptyText: 'Make a legal move to load matching opening-book candidates.',
              selectedMove: null,
              moves: [
                {
                  san: 'e4',
                  uci: 'e2e4',
                  eco: 'B00',
                  name: 'King Pawn Game',
                  games: 42000,
                  whiteWinRate: 0.39,
                  drawRate: 0.31,
                  blackWinRate: 0.3,
                },
                {
                  san: 'd4',
                  uci: 'd2d4',
                  eco: 'D00',
                  name: 'Queen Pawn Game',
                  games: 38000,
                  whiteWinRate: 0.38,
                  drawRate: 0.33,
                  blackWinRate: 0.29,
                },
                {
                  san: 'Nf3',
                  uci: 'g1f3',
                  eco: 'A04',
                  name: 'Reti Opening',
                  games: 19000,
                  whiteWinRate: 0.36,
                  drawRate: 0.35,
                  blackWinRate: 0.29,
                },
              ],
              testID: `${idPrefix}-home-opening-book`,
            }),
          ],
        ),
      ]),
    }),
    [screenIds.settings]: createScreen({
      id: screenIds.settings,
      name: 'Settings',
      title: chessContent.settings.title,
      description: chessContent.settings.description,
      root: createNode(`${idPrefix}-settings-screen`, 'Screen', { width: 'default' }, [
        createZoraNode(`${idPrefix}-settings-header`, 'SectionHeader', {
          eyebrow: chessContent.settings.eyebrow,
          title: chessContent.settings.title,
          description: chessContent.settings.description,
        }),
        createSettingsSection(
          `${idPrefix}-settings`,
          'Board preferences',
          'Prepare board display controls and study preferences before app-specific state is wired.',
          [
            {
              id: 'orientation-row',
              title: 'Board orientation',
              description: 'Default to White at the bottom; expose Black orientation later.',
              meta: 'white',
            },
            {
              id: 'coordinates-row',
              title: 'Coordinates',
              description: 'Show board coordinates by default for study and notation workflows.',
              meta: 'enabled',
            },
            {
              id: 'validation-row',
              title: 'Move validation',
              description: 'Use chess.js-backed validation from the chess extension component.',
              meta: 'enabled',
            },
            {
              id: 'opening-book-row',
              title: 'Opening book',
              description:
                'Display a presentational opening-book panel below the board; dynamic data binding is wired by the generated app runtime.',
              meta: 'below board',
            },
            {
              id: 'scope-row',
              title: 'Category',
              description: `${seed.categoryLabel} uses external ZORA extension components.`,
              meta: 'extension',
            },
          ],
        ),
      ]),
    }),
  };
}
