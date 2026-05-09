import type { AppManifest } from '@ankhorage/contracts';

import { createStarterContentScreen, createStarterSettingsScreen } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { kidsFamilyContent } from './content';
import type { KidsFamilyScreenIds } from './routes';

export function createKidsFamilyScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: KidsFamilyScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.home]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.home,
      name: 'Home',
      content: kidsFamilyContent.home,
    }),
    [screenIds.routines]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.routines,
      name: 'Routines',
      content: kidsFamilyContent.routines,
    }),
    [screenIds.discover]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.discover,
      name: 'Discover',
      content: kidsFamilyContent.discover,
    }),
    [screenIds.favorites]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.favorites,
      name: 'Favorites',
      content: kidsFamilyContent.favorites,
    }),
    [screenIds.parents]: createStarterSettingsScreen({
      idPrefix,
      screenId: screenIds.parents,
      name: 'Parents',
      header: kidsFamilyContent.parents,
      section: {
        title: 'Guardian defaults',
        description: 'Seed safety and visibility controls for a family experience.',
        rows: [
          {
            id: 'time-row',
            title: 'Time limits',
            description: 'Session limits start enabled with a family-friendly default.',
            meta: 'starter',
          },
          {
            id: 'content-row',
            title: 'Content filters',
            description: 'Curated content only until categories are configured.',
            meta: 'safe',
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

