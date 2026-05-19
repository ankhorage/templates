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
      root: createScreenRoot(`${idPrefix}-home-screen`, { width: 'default' }, [
        createZoraNode(`${idPrefix}-home-header`, 'SectionHeader', {
          eyebrow: chessContent.home.eyebrow,
          title: chessContent.home.title,
          description: 'Study and play from the board.',
        }),
        createSection(
          `${idPrefix}-home-board-section`,
          {
            title: 'Board',
          },
          [
            createZoraNode(`${idPrefix}-home-chessboard`, 'ChessBoard', {
              fen: INITIAL_CHESS_FEN,
              orientation: 'white',
              showCoordinates: true,
              validateMoves: true,
              testID: `${idPrefix}-home-chessboard`,
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
