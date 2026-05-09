import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface GraphicsDesignScreenIds {
  dashboard: string;
  briefs: string;
  assets: string;
  reviews: string;
  brand: string;
  settings: string;
}

export function createGraphicsDesignScreenIds(idPrefix: string): GraphicsDesignScreenIds {
  return {
    dashboard: `${idPrefix}-dashboard`,
    briefs: `${idPrefix}-briefs`,
    assets: `${idPrefix}-assets`,
    reviews: `${idPrefix}-reviews`,
    brand: `${idPrefix}-brand`,
    settings: `${idPrefix}-settings`,
  };
}

export function createGraphicsDesignNavigator(
  screenIds: GraphicsDesignScreenIds,
): AppManifest['navigator'] {
  return {
    type: 'drawer',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.dashboard,
        label: 'Dashboard',
        icon: { provider: 'material-community', name: 'view-dashboard-outline' },
      }),
      createRoute({
        name: 'briefs',
        screenId: screenIds.briefs,
        label: 'Briefs',
        icon: { provider: 'material-community', name: 'file-document-outline' },
      }),
      createRoute({
        name: 'assets',
        screenId: screenIds.assets,
        label: 'Assets',
        icon: { provider: 'material-community', name: 'image-multiple-outline' },
      }),
      createRoute({
        name: 'reviews',
        screenId: screenIds.reviews,
        label: 'Reviews',
        icon: { provider: 'material-community', name: 'comment-check-outline' },
      }),
      createRoute({
        name: 'brand',
        screenId: screenIds.brand,
        label: 'Brand',
        icon: { provider: 'material-community', name: 'palette-outline' },
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

