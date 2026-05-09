import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface DeveloperToolsScreenIds {
  dashboard: string;
  builds: string;
  incidents: string;
  environments: string;
  deployments: string;
  settings: string;
}

export function createDeveloperToolsScreenIds(idPrefix: string): DeveloperToolsScreenIds {
  return {
    dashboard: `${idPrefix}-dashboard`,
    builds: `${idPrefix}-builds`,
    incidents: `${idPrefix}-incidents`,
    environments: `${idPrefix}-environments`,
    deployments: `${idPrefix}-deployments`,
    settings: `${idPrefix}-settings`,
  };
}

export function createDeveloperToolsNavigator(
  screenIds: DeveloperToolsScreenIds,
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
        name: 'builds',
        screenId: screenIds.builds,
        label: 'Builds',
        icon: { provider: 'material-community', name: 'hammer-wrench' },
      }),
      createRoute({
        name: 'incidents',
        screenId: screenIds.incidents,
        label: 'Incidents',
        icon: { provider: 'material-community', name: 'alert-circle-outline' },
      }),
      createRoute({
        name: 'environments',
        screenId: screenIds.environments,
        label: 'Environments',
        icon: { provider: 'material-community', name: 'server-network' },
      }),
      createRoute({
        name: 'deployments',
        screenId: screenIds.deployments,
        label: 'Deployments',
        icon: { provider: 'material-community', name: 'rocket-launch-outline' },
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
