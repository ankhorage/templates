import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface SportsScreenIds {
  scores: string;
  schedule: string;
  standings: string;
  teams: string;
  profile: string;
}

export function createSportsScreenIds(idPrefix: string): SportsScreenIds {
  return {
    scores: `${idPrefix}-scores`,
    schedule: `${idPrefix}-schedule`,
    standings: `${idPrefix}-standings`,
    teams: `${idPrefix}-teams`,
    profile: `${idPrefix}-profile`,
  };
}

export function createSportsNavigator(screenIds: SportsScreenIds): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.scores,
        label: 'Scores',
        icon: { provider: 'material-community', name: 'scoreboard-outline' },
      }),
      createRoute({
        name: 'schedule',
        screenId: screenIds.schedule,
        label: 'Schedule',
        icon: { provider: 'material-community', name: 'calendar-month-outline' },
      }),
      createRoute({
        name: 'standings',
        screenId: screenIds.standings,
        label: 'Standings',
        icon: { provider: 'material-community', name: 'format-list-numbered' },
      }),
      createRoute({
        name: 'teams',
        screenId: screenIds.teams,
        label: 'Teams',
        icon: { provider: 'material-community', name: 'soccer-field' },
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
