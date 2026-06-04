import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface NutritionCatalogScanScreenIds {
  readonly catalog: string;
  readonly detail: string;
  readonly scan: string;
  readonly capture: string;
  readonly success: string;
  readonly queue: string;
  readonly challenge: string;
  readonly leaderboard: string;
  readonly profile: string;
  readonly signIn: string;
  readonly signUp: string;
  readonly settings: string;
}

export function createNutritionCatalogScanScreenIds(
  idPrefix: string,
): NutritionCatalogScanScreenIds {
  return {
    catalog: `${idPrefix}-catalog`,
    detail: `${idPrefix}-detail`,
    scan: `${idPrefix}-scan`,
    capture: `${idPrefix}-capture`,
    success: `${idPrefix}-success`,
    queue: `${idPrefix}-queue`,
    challenge: `${idPrefix}-challenge`,
    leaderboard: `${idPrefix}-leaderboard`,
    profile: `${idPrefix}-profile`,
    signIn: `${idPrefix}-sign-in`,
    signUp: `${idPrefix}-sign-up`,
    settings: `${idPrefix}-settings`,
  };
}

export function createNutritionCatalogScanNavigator(
  screenIds: NutritionCatalogScanScreenIds,
): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'challenge',
    routes: [
      createRoute({
        name: 'challenge',
        screenId: screenIds.challenge,
        label: 'Challenge',
        icon: { provider: 'material-community', name: 'trophy-outline' },
      }),
      createRoute({
        name: 'index',
        screenId: screenIds.catalog,
        label: 'Products',
        icon: { provider: 'material-community', name: 'barcode-scan' },
      }),
      createRoute({
        name: 'scan',
        screenId: screenIds.scan,
        label: 'Scan',
        icon: { provider: 'material-community', name: 'camera-outline' },
      }),
      createRoute({
        name: 'leaderboard',
        screenId: screenIds.leaderboard,
        label: 'Ranking',
        icon: { provider: 'material-community', name: 'podium-gold' },
      }),
      createRoute({
        name: 'profile',
        screenId: screenIds.profile,
        label: 'Profile',
        icon: { provider: 'material-community', name: 'account-circle-outline' },
      }),
      createRoute({
        name: 'capture',
        screenId: screenIds.capture,
        label: 'Capture',
        icon: { provider: 'material-community', name: 'package-variant-plus' },
        hideInTabBar: true,
      }),
      createRoute({
        name: 'queue',
        screenId: screenIds.queue,
        label: 'Queue',
        icon: { provider: 'material-community', name: 'tray-full' },
        hideInTabBar: true,
      }),
      createRoute({
        name: 'settings',
        screenId: screenIds.settings,
        label: 'Settings',
        icon: { provider: 'material-community', name: 'cog-outline' },
        hideInTabBar: true,
      }),
    ],
  };
}
