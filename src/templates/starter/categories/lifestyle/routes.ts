import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface LifestyleScreenIds {
  dashboard: string;
  collections: string;
  plans: string;
  explore: string;
  profile: string;
}

export function createLifestyleScreenIds(idPrefix: string): LifestyleScreenIds {
  return {
    dashboard: `${idPrefix}-dashboard`,
    collections: `${idPrefix}-collections`,
    plans: `${idPrefix}-plans`,
    explore: `${idPrefix}-explore`,
    profile: `${idPrefix}-profile`,
  };
}

export function createLifestyleNavigator(screenIds: LifestyleScreenIds): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.dashboard,
        label: 'Dashboard',
        icon: { provider: 'material-community', name: 'view-dashboard-outline' },
      }),
      createRoute({
        name: 'collections',
        screenId: screenIds.collections,
        label: 'Collections',
        icon: { provider: 'material-community', name: 'bookmark-multiple-outline' },
      }),
      createRoute({
        name: 'plans',
        screenId: screenIds.plans,
        label: 'Plans',
        icon: { provider: 'material-community', name: 'calendar-star' },
      }),
      createRoute({
        name: 'explore',
        screenId: screenIds.explore,
        label: 'Explore',
        icon: { provider: 'material-community', name: 'compass-outline' },
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
