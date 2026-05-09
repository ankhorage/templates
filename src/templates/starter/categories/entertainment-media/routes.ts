import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface EntertainmentMediaScreenIds {
  discover: string;
  watchlist: string;
  now: string;
  library: string;
  profile: string;
}

export function createEntertainmentMediaScreenIds(idPrefix: string): EntertainmentMediaScreenIds {
  return {
    discover: `${idPrefix}-discover`,
    watchlist: `${idPrefix}-watchlist`,
    now: `${idPrefix}-now`,
    library: `${idPrefix}-library`,
    profile: `${idPrefix}-profile`,
  };
}

export function createEntertainmentMediaNavigator(
  screenIds: EntertainmentMediaScreenIds,
): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.discover,
        label: 'Discover',
        icon: { provider: 'material-community', name: 'compass-outline' },
      }),
      createRoute({
        name: 'watchlist',
        screenId: screenIds.watchlist,
        label: 'Watchlist',
        icon: { provider: 'material-community', name: 'bookmark-outline' },
      }),
      createRoute({
        name: 'now',
        screenId: screenIds.now,
        label: 'Now',
        icon: { provider: 'material-community', name: 'play-circle-outline' },
      }),
      createRoute({
        name: 'library',
        screenId: screenIds.library,
        label: 'Library',
        icon: { provider: 'material-community', name: 'movie-open-outline' },
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

