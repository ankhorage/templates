import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface HealthFitnessScreenIds {
  today: string;
  plans: string;
  progress: string;
  coach: string;
  profile: string;
}

export function createHealthFitnessScreenIds(idPrefix: string): HealthFitnessScreenIds {
  return {
    today: `${idPrefix}-today`,
    plans: `${idPrefix}-plans`,
    progress: `${idPrefix}-progress`,
    coach: `${idPrefix}-coach`,
    profile: `${idPrefix}-profile`,
  };
}

export function createHealthFitnessNavigator(
  screenIds: HealthFitnessScreenIds,
): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.today,
        label: 'Today',
        icon: { provider: 'material-community', name: 'calendar-today-outline' },
      }),
      createRoute({
        name: 'plans',
        screenId: screenIds.plans,
        label: 'Plans',
        icon: { provider: 'material-community', name: 'clipboard-list-outline' },
      }),
      createRoute({
        name: 'progress',
        screenId: screenIds.progress,
        label: 'Progress',
        icon: { provider: 'material-community', name: 'chart-line' },
      }),
      createRoute({
        name: 'coach',
        screenId: screenIds.coach,
        label: 'Coach',
        icon: { provider: 'material-community', name: 'message-processing-outline' },
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
