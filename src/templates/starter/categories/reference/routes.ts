import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface ReferenceScreenIds {
  browse: string;
  search: string;
  categories: string;
  saved: string;
  history: string;
  settings: string;
}

export function createReferenceScreenIds(idPrefix: string): ReferenceScreenIds {
  return {
    browse: `${idPrefix}-browse`,
    search: `${idPrefix}-search`,
    categories: `${idPrefix}-categories`,
    saved: `${idPrefix}-saved`,
    history: `${idPrefix}-history`,
    settings: `${idPrefix}-settings`,
  };
}

export function createReferenceNavigator(screenIds: ReferenceScreenIds): AppManifest['navigator'] {
  return {
    type: 'drawer',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.browse,
        label: 'Browse',
        icon: { provider: 'material-community', name: 'book-open-variant' },
      }),
      createRoute({
        name: 'search',
        screenId: screenIds.search,
        label: 'Search',
        icon: { provider: 'material-community', name: 'magnify' },
      }),
      createRoute({
        name: 'categories',
        screenId: screenIds.categories,
        label: 'Categories',
        icon: { provider: 'material-community', name: 'shape-outline' },
      }),
      createRoute({
        name: 'saved',
        screenId: screenIds.saved,
        label: 'Saved',
        icon: { provider: 'material-community', name: 'bookmark-outline' },
      }),
      createRoute({
        name: 'history',
        screenId: screenIds.history,
        label: 'History',
        icon: { provider: 'material-community', name: 'clock-outline' },
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
