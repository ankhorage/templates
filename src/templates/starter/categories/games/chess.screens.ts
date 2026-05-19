import type { AppManifest } from '@ankhorage/contracts';

import { createStarterContentScreen } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { chessContent } from './chess.content';
import type { ChessScreenIds } from './chess.routes';

export function createChessScreens(
  _seed: TemplateSeed,
  idPrefix: string,
  screenIds: ChessScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.home]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.home,
      name: 'Home',
      content: chessContent.home,
    }),
    [screenIds.settings]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.settings,
      name: 'Settings',
      content: chessContent.settings,
    }),
  };
}
