import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface GamesScreenIds {
  home: string;
  quests: string;
  inventory: string;
  friends: string;
  profile: string;
}

export function createGamesScreenIds(idPrefix: string): GamesScreenIds {
  return {
    home: `${idPrefix}-home`,
    quests: `${idPrefix}-quests`,
    inventory: `${idPrefix}-inventory`,
    friends: `${idPrefix}-friends`,
    profile: `${idPrefix}-profile`,
  };
}

export function createGamesNavigator(screenIds: GamesScreenIds): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.home,
        label: 'Home',
        icon: { provider: 'material-community', name: 'gamepad-variant-outline' },
      }),
      createRoute({
        name: 'quests',
        screenId: screenIds.quests,
        label: 'Quests',
        icon: { provider: 'material-community', name: 'flag-outline' },
      }),
      createRoute({
        name: 'inventory',
        screenId: screenIds.inventory,
        label: 'Inventory',
        icon: { provider: 'material-community', name: 'treasure-chest-outline' },
      }),
      createRoute({
        name: 'friends',
        screenId: screenIds.friends,
        label: 'Friends',
        icon: { provider: 'material-community', name: 'account-multiple-outline' },
      }),
      createRoute({
        name: 'profile',
        screenId: screenIds.profile,
        label: 'Profile',
        icon: { provider: 'material-community', name: 'account-circle-outline' },
      }),
    ],
  };
}
