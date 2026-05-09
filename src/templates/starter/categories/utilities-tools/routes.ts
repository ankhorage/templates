import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface UtilitiesToolsScreenIds {
  dashboard: string;
  tools: string;
  shortcuts: string;
  storage: string;
  diagnostics: string;
  settings: string;
}

export function createUtilitiesToolsScreenIds(idPrefix: string): UtilitiesToolsScreenIds {
  return {
    dashboard: `${idPrefix}-dashboard`,
    tools: `${idPrefix}-tools`,
    shortcuts: `${idPrefix}-shortcuts`,
    storage: `${idPrefix}-storage`,
    diagnostics: `${idPrefix}-diagnostics`,
    settings: `${idPrefix}-settings`,
  };
}

export function createUtilitiesToolsNavigator(
  screenIds: UtilitiesToolsScreenIds,
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
        name: 'tools',
        screenId: screenIds.tools,
        label: 'Tools',
        icon: { provider: 'material-community', name: 'wrench-outline' },
      }),
      createRoute({
        name: 'shortcuts',
        screenId: screenIds.shortcuts,
        label: 'Shortcuts',
        icon: { provider: 'material-community', name: 'lightning-bolt-outline' },
      }),
      createRoute({
        name: 'storage',
        screenId: screenIds.storage,
        label: 'Storage',
        icon: { provider: 'material-community', name: 'folder-multiple-outline' },
      }),
      createRoute({
        name: 'diagnostics',
        screenId: screenIds.diagnostics,
        label: 'Diagnostics',
        icon: { provider: 'material-community', name: 'stethoscope' },
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

