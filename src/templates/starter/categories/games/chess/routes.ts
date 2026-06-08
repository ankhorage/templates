import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../../shared';

export interface ChessScreenIds {
  home: string;
  settings: string;
}

export function createChessScreenIds(idPrefix: string): ChessScreenIds {
  return {
    home: `${idPrefix}-home`,
    settings: `${idPrefix}-settings`,
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
        name: 'settings',
        screenId: screenIds.settings,
        label: 'Settings',
        icon: { provider: 'material-community', name: 'cog-outline' },
      }),
    ],
  };
}
