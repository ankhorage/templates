import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface KidsFamilyScreenIds {
  home: string;
  routines: string;
  discover: string;
  favorites: string;
  parents: string;
}

export function createKidsFamilyScreenIds(idPrefix: string): KidsFamilyScreenIds {
  return {
    home: `${idPrefix}-home`,
    routines: `${idPrefix}-routines`,
    discover: `${idPrefix}-discover`,
    favorites: `${idPrefix}-favorites`,
    parents: `${idPrefix}-parents`,
  };
}

export function createKidsFamilyNavigator(screenIds: KidsFamilyScreenIds): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.home,
        label: 'Home',
        icon: { provider: 'material-community', name: 'home-outline' },
      }),
      createRoute({
        name: 'routines',
        screenId: screenIds.routines,
        label: 'Routines',
        icon: { provider: 'material-community', name: 'calendar-check-outline' },
      }),
      createRoute({
        name: 'discover',
        screenId: screenIds.discover,
        label: 'Discover',
        icon: { provider: 'material-community', name: 'compass-outline' },
      }),
      createRoute({
        name: 'favorites',
        screenId: screenIds.favorites,
        label: 'Favorites',
        icon: { provider: 'material-community', name: 'heart-outline' },
      }),
      createRoute({
        name: 'parents',
        screenId: screenIds.parents,
        label: 'Parents',
        icon: { provider: 'material-community', name: 'shield-account-outline' },
      }),
    ],
  };
}

