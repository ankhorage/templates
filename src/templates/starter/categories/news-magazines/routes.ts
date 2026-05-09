import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface NewsMagazinesScreenIds {
  headlines: string;
  topics: string;
  saved: string;
  search: string;
  profile: string;
}

export function createNewsMagazinesScreenIds(idPrefix: string): NewsMagazinesScreenIds {
  return {
    headlines: `${idPrefix}-headlines`,
    topics: `${idPrefix}-topics`,
    saved: `${idPrefix}-saved`,
    search: `${idPrefix}-search`,
    profile: `${idPrefix}-profile`,
  };
}

export function createNewsMagazinesNavigator(
  screenIds: NewsMagazinesScreenIds,
): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.headlines,
        label: 'Headlines',
        icon: { provider: 'material-community', name: 'newspaper-variant-outline' },
      }),
      createRoute({
        name: 'topics',
        screenId: screenIds.topics,
        label: 'Topics',
        icon: { provider: 'material-community', name: 'tag-multiple-outline' },
      }),
      createRoute({
        name: 'saved',
        screenId: screenIds.saved,
        label: 'Saved',
        icon: { provider: 'material-community', name: 'bookmark-outline' },
      }),
      createRoute({
        name: 'search',
        screenId: screenIds.search,
        label: 'Search',
        icon: { provider: 'material-community', name: 'magnify' },
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

