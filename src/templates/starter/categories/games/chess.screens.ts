import type { AppManifest } from '@ankhorage/contracts';

import {
  createScreen,
  createScreenRoot,
  createSection,
  createSettingsSection,
  createZoraNode,
} from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { chessContent } from './chess.content';
import type { ChessScreenIds } from './chess.routes';

const INITIAL_CHESS_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

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
      root: createScreenRoot(`${idPrefix}-home-screen`, { width: 'wide' }, [
        createZoraNode(`${idPrefix}-home-header`, 'SectionHeader', {
          eyebrow: chessContent.home.eyebrow,
          title: chessContent.home.title,
          description: chessContent.home.description,
        }),
        createSection(
          `${idPrefix}-home-board-section`,
          {
            title: 'Board',
            description:
              'Start from the initial position and wire move handling once app state is available.',
          },
          [
            createZoraNode(
              `${idPrefix}-home-board-panel`,
              'Panel',
              {
                title: 'Interactive board',
                description:
                  'Rendered by @ankhorage/zora-chess through the generated app extension registry.',
                tone: 'subtle',
              },
              [
                createZoraNode(`${idPrefix}-home-chessboard`, 'ChessBoard', {
                  fen: INITIAL_CHESS_FEN,
                  orientation: 'white',
                  showCoordinates: true,
                  validateMoves: true,
                  testID: `${idPrefix}-home-chessboard`,
                }),
                createZoraNode(`${idPrefix}-home-position-card`, 'Card', {
                  eyebrow: 'Position',
                  title: 'Initial position',
                  description:
                    'A static FEN is used for now. Opening-book queries and persisted study state come later via data binding.',
                  tone: 'outline',
                }),
              ],
            ),
          ],
        ),
        createSection(
          `${idPrefix}-home-study-section`,
          {
            title: 'Study context',
            description:
              'Useful starter scaffolding around the board without hardcoding an opening-book API yet.',
          },
          [
            createZoraNode(
              `${idPrefix}-home-study-panel`,
              'Panel',
              {
                title: 'Practice flow',
                description:
                  'Keep board, position notes, and next actions together so the app can evolve into a trainer.',
                tone: 'subtle',
              },
              [
                createZoraNode(`${idPrefix}-home-line-card`, 'Card', {
                  eyebrow: 'Opening line',
                  title: 'Choose a repertoire branch',
                  description:
                    'Reserve this block for the selected opening family, variation name, and next-book moves.',
                  tone: 'outline',
                }),
                createZoraNode(`${idPrefix}-home-action-card`, 'Card', {
                  eyebrow: 'Next step',
                  title: 'Play, review, repeat',
                  description:
                    'Connect move events to local state first, then add public opening-book API data later.',
                  tone: 'outline',
                }),
              ],
            ),
          ],
        ),
      ]),
    }),
    [screenIds.settings]: createScreen({
      id: screenIds.settings,
      name: 'Settings',
      title: chessContent.settings.title,
      description: chessContent.settings.description,
      root: createScreenRoot(`${idPrefix}-settings-screen`, { width: 'default' }, [
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
              id: 'scope-row',
              title: 'Category',
              description: `${seed.categoryLabel} uses an external ZORA extension component.`,
              meta: 'extension',
            },
          ],
        ),
      ]),
    }),
  };
}
