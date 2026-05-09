import type { AppManifest } from '@ankhorage/contracts';

import { createStarterContentScreen, createStarterSettingsScreen } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { lifestyleContent } from './content';
import type { LifestyleScreenIds } from './routes';

export function createLifestyleScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: LifestyleScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.dashboard]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.dashboard,
      name: 'Dashboard',
      content: lifestyleContent.dashboard,
    }),
    [screenIds.collections]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.collections,
      name: 'Collections',
      content: lifestyleContent.collections,
    }),
    [screenIds.plans]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.plans,
      name: 'Plans',
      content: lifestyleContent.plans,
    }),
    [screenIds.explore]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.explore,
      name: 'Explore',
      content: lifestyleContent.explore,
    }),
    [screenIds.profile]: createStarterSettingsScreen({
      idPrefix,
      screenId: screenIds.profile,
      name: 'Profile',
      header: lifestyleContent.profile,
      section: {
        title: 'Experience defaults',
        description: 'Seed preferences that shape recommendations and reminders.',
        rows: [
          {
            id: 'notifications-row',
            title: 'Notification cadence',
            description: 'Daily digest with immediate booking updates.',
            meta: 'daily',
          },
          {
            id: 'privacy-row',
            title: 'Profile visibility',
            description: 'Your profile is private until you opt into sharing.',
            meta: 'private',
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
