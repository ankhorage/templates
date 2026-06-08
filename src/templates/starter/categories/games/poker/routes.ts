import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../../shared';

export interface PokerScreenIds {
  home: string;
  settings: string;
}

export function createPokerScreenIds(idPrefix: string): PokerScreenIds {
  return {
    home: `${idPrefix}-home`,
    settings: `${idPrefix}-settings`,
  };
}

export function createPokerNavigator(screenIds: PokerScreenIds): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.home,
        label: 'Trainer',
        icon: { provider: 'material-community', name: 'gamepad-variant-outline' },
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
