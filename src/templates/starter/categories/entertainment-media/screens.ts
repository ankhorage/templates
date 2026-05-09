import type { AppManifest } from '@ankhorage/contracts';

import { createStarterContentScreen, createStarterSettingsScreen } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { entertainmentMediaContent } from './content';
import type { EntertainmentMediaScreenIds } from './routes';

export function createEntertainmentMediaScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: EntertainmentMediaScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.discover]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.discover,
      name: 'Discover',
      content: entertainmentMediaContent.discover,
    }),
    [screenIds.watchlist]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.watchlist,
      name: 'Watchlist',
      content: entertainmentMediaContent.watchlist,
    }),
    [screenIds.now]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.now,
      name: 'Now',
      content: entertainmentMediaContent.now,
    }),
    [screenIds.library]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.library,
      name: 'Library',
      content: entertainmentMediaContent.library,
    }),
    [screenIds.profile]: createStarterSettingsScreen({
      idPrefix,
      screenId: screenIds.profile,
      name: 'Profile',
      header: entertainmentMediaContent.profile,
      section: {
        title: 'Playback defaults',
        description: 'Seed subtitles, downloads, and parental settings placeholders.',
        rows: [
          {
            id: 'subtitles-row',
            title: 'Subtitles',
            description: 'Subtitles start enabled with language follow-system.',
            meta: 'on',
          },
          {
            id: 'downloads-row',
            title: 'Downloads',
            description: 'Offline downloads start on Wi-Fi only.',
            meta: 'wifi',
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

