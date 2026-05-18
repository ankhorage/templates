import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface ChessScreenIds {
  home: string;
  boardSettings: string;
}

export function createChessScreenIds(idPrefix: string): ChessScreenIds {
  return {
    home: `${idPrefix}-home`,
    boardSettings: `${idPrefix}-board-settings`,
  };
}

export function createChessNavigator(screenIds: ChessScreenIds): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.home,
        label: 'Home',
        icon: { provider: 'material-community', name: 'chess-king' },
      }),
      createRoute({
        name: 'chess-board-settings',
        screenId: screenIds.boardSettings,
        label: 'Chess board & settings',
        icon: { provider: 'material-community', name: 'chess-board' },
      }),
    ],
  };
}
