import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface NutritionCatalogScanScreenIds {
  readonly catalog: string;
  readonly detail: string;
  readonly scan: string;
  readonly capture: string;
  readonly success: string;
  readonly queue: string;
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
    settings: `${idPrefix}-settings`,
  };
}

export function createNutritionCatalogScanNavigator(
  screenIds: NutritionCatalogScanScreenIds,
): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
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
        name: 'capture',
        screenId: screenIds.capture,
        label: 'Capture',
        icon: { provider: 'material-community', name: 'package-variant-plus' },
      }),
      createRoute({
        name: 'queue',
        screenId: screenIds.queue,
        label: 'Queue',
        icon: { provider: 'material-community', name: 'tray-full' },
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
