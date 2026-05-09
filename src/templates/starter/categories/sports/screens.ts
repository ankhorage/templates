import type { AppManifest } from '@ankhorage/contracts';

import { createStarterContentScreen, createStarterSettingsScreen } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { sportsContent } from './content';
import type { SportsScreenIds } from './routes';

export function createSportsScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: SportsScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.scores]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.scores,
      name: 'Scores',
      content: sportsContent.scores,
    }),
    [screenIds.schedule]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.schedule,
      name: 'Schedule',
      content: sportsContent.schedule,
    }),
    [screenIds.standings]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.standings,
      name: 'Standings',
      content: sportsContent.standings,
    }),
    [screenIds.teams]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.teams,
      name: 'Teams',
      content: sportsContent.teams,
    }),
    [screenIds.profile]: createStarterSettingsScreen({
      idPrefix,
      screenId: screenIds.profile,
      name: 'Profile',
      header: sportsContent.profile,
      section: {
        title: 'Fan defaults',
        description: 'Seed favorites and alert preferences.',
        rows: [
          {
            id: 'favorites-row',
            title: 'Favorite teams',
            description: 'Start with one favorite team and expand after wiring data.',
            meta: 'starter',
          },
          {
            id: 'alerts-row',
            title: 'Alerts',
            description: 'Score alerts are enabled for favorite teams by default.',
            meta: 'on',
          },
          {
            id: 'auth-row',
            title: 'Auth scope',
            description: `${seed.categoryLabel} inherits the manifest infra auth setting.`,
            meta: 'global',
          },
        ],
      },
    }),
  };
}
