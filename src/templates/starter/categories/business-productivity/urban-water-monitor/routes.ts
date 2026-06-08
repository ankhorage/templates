import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../../shared';

export interface UrbanWaterMonitorScreenIds {
  project: string;
}

export function createUrbanWaterMonitorScreenIds(idPrefix: string): UrbanWaterMonitorScreenIds {
  return {
    project: `${idPrefix}-project`,
  };
}

export function createUrbanWaterMonitorNavigator(
  screenIds: UrbanWaterMonitorScreenIds,
): AppManifest['navigator'] {
  return {
    type: 'stack',
    initialRouteName: 'project',
    routes: [
      createRoute({
        name: 'project',
        screenId: screenIds.project,
        label: 'Project',
        icon: { provider: 'material-community', name: 'water-outline' },
      }),
    ],
  };
}
