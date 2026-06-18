import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../../shared';

export interface NutritionCatalogScanScreenIds {
  readonly catalog: string;
  readonly detail: string;
  readonly scan: string;
  readonly create: string;
  readonly stats: string;
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
    create: `${idPrefix}-create`,
    stats: `${idPrefix}-stats`,
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
    initialRouteName: 'products',
    routes: [
      createRoute({
        name: 'products',
        label: 'Products',
        icon: { provider: 'material-community', name: 'package-variant-closed' },
        navigator: {
          type: 'stack',
          initialRouteName: 'index',
          routes: [
            createRoute({
              name: 'index',
              screenId: screenIds.catalog,
              label: 'Products',
            }),
            createRoute({
              name: '[id]',
              screenId: screenIds.detail,
              label: 'Product detail',
              hideInTabBar: true,
            }),
            createRoute({
              name: 'create',
              screenId: screenIds.create,
              label: 'Create product',
              hideInTabBar: true,
            }),
          ],
        },
      }),
      createRoute({
        name: 'scan',
        screenId: screenIds.scan,
        label: 'Scan',
        icon: { provider: 'material-community', name: 'barcode-scan' },
      }),
      createRoute({
        name: 'stats',
        screenId: screenIds.stats,
        label: 'Stats',
        icon: { provider: 'material-community', name: 'chart-bar' },
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
