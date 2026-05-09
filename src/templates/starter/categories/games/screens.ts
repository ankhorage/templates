import type { AppManifest } from '@ankhorage/contracts';

import { createStarterContentScreen, createStarterSettingsScreen } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { gamesContent } from './content';
import type { GamesScreenIds } from './routes';

export function createGamesScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: GamesScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.home]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.home,
      name: 'Home',
      content: gamesContent.home,
    }),
    [screenIds.quests]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.quests,
      name: 'Quests',
      content: gamesContent.quests,
    }),
    [screenIds.inventory]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.inventory,
      name: 'Inventory',
      content: gamesContent.inventory,
    }),
    [screenIds.friends]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.friends,
      name: 'Friends',
      content: gamesContent.friends,
    }),
    [screenIds.profile]: createStarterSettingsScreen({
      idPrefix,
      screenId: screenIds.profile,
      name: 'Profile',
      header: gamesContent.profile,
      section: {
        title: 'Player defaults',
        description: 'Seed accessibility, notifications, and gameplay preferences.',
        rows: [
          {
            id: 'controls-row',
            title: 'Controls',
            description: 'Controls start set to standard with optional remapping later.',
            meta: 'standard',
          },
          {
            id: 'privacy-row',
            title: 'Presence visibility',
            description: 'Friends can see online status by default.',
            meta: 'friends',
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
