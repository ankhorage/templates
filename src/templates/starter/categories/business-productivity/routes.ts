import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface BusinessProductivityScreenIds {
  dashboard: string;
  projects: string;
  tasks: string;
  calendar: string;
  reports: string;
  settings: string;
}

export function createBusinessProductivityScreenIds(
  idPrefix: string,
): BusinessProductivityScreenIds {
  return {
    dashboard: `${idPrefix}-dashboard`,
    projects: `${idPrefix}-projects`,
    tasks: `${idPrefix}-tasks`,
    calendar: `${idPrefix}-calendar`,
    reports: `${idPrefix}-reports`,
    settings: `${idPrefix}-settings`,
  };
}

export function createBusinessProductivityNavigator(
  screenIds: BusinessProductivityScreenIds,
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
        name: 'projects',
        screenId: screenIds.projects,
        label: 'Projects',
        icon: { provider: 'material-community', name: 'folder-multiple-outline' },
      }),
      createRoute({
        name: 'tasks',
        screenId: screenIds.tasks,
        label: 'Tasks',
        icon: { provider: 'material-community', name: 'clipboard-check-outline' },
      }),
      createRoute({
        name: 'calendar',
        screenId: screenIds.calendar,
        label: 'Calendar',
        icon: { provider: 'material-community', name: 'calendar-month-outline' },
      }),
      createRoute({
        name: 'reports',
        screenId: screenIds.reports,
        label: 'Reports',
        icon: { provider: 'material-community', name: 'chart-box-outline' },
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

