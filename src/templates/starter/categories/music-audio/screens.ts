import type { AppManifest } from '@ankhorage/contracts';

import {
  createScreen,
  createScreenRoot,
  createSection,
  createStarterContentScreen,
  createStarterSettingsScreen,
  createZoraNode,
} from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { musicAudioContent } from './content';
import type { MusicAudioScreenIds } from './routes';

export function createMusicAudioScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: MusicAudioScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.home]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.home,
      name: 'Home',
      content: musicAudioContent.home,
    }),
    [screenIds.search]: createScreen({
      id: screenIds.search,
      name: 'Search',
      title: musicAudioContent.search.title,
      description: musicAudioContent.search.description,
      root: createScreenRoot(`${idPrefix}-search-screen`, { width: 'wide' }, [
        createZoraNode(`${idPrefix}-search-header`, 'SectionHeader', {
          eyebrow: musicAudioContent.search.eyebrow,
          title: musicAudioContent.search.title,
          description: musicAudioContent.search.description,
        }),
        createSection(
          `${idPrefix}-search-section`,
          {
            title: 'Query',
            description: 'Seed a search bar and category chips before adding catalog wiring.',
          },
          [
            createZoraNode(
              `${idPrefix}-search-panel`,
              'Panel',
              {
                title: 'Search catalog',
                description: 'Use the input and filters to shape the search experience.',
                tone: 'subtle',
              },
              [
                createZoraNode(
                  `${idPrefix}-search-field`,
                  'FormField',
                  {
                    label: 'Search',
                    description: 'Search by song, artist, album, or podcast.',
                  },
                  [
                    createZoraNode(`${idPrefix}-search-input`, 'Input', {
                      placeholder: 'Search...',
                      size: 'm',
                    }),
                  ],
                ),
                createZoraNode(`${idPrefix}-search-chip-1`, 'Card', {
                  eyebrow: 'Filter',
                  title: 'Songs',
                  description: 'Reserve for result-scoping filters and sorting.',
                  tone: 'outline',
                }),
                createZoraNode(`${idPrefix}-search-chip-2`, 'Card', {
                  eyebrow: 'Filter',
                  title: 'Artists',
                  description: 'Seed category chips without implementing the search engine.',
                  tone: 'outline',
                }),
              ],
            ),
          ],
        ),
      ]),
    }),
    [screenIds.library]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.library,
      name: 'Library',
      content: musicAudioContent.library,
    }),
    [screenIds.player]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.player,
      name: 'Player',
      content: musicAudioContent.player,
    }),
    [screenIds.profile]: createStarterSettingsScreen({
      idPrefix,
      screenId: screenIds.profile,
      name: 'Profile',
      header: musicAudioContent.profile,
      section: {
        title: 'Playback defaults',
        description: 'Seed quality, downloads, and notification preferences.',
        rows: [
          {
            id: 'quality-row',
            title: 'Streaming quality',
            description: 'Auto quality adjusts to network conditions by default.',
            meta: 'auto',
          },
          {
            id: 'downloads-row',
            title: 'Downloads',
            description: 'Downloads start on Wi-Fi only.',
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
