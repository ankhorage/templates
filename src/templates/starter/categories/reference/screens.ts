import type { AppManifest } from '@ankhorage/contracts';

import {
  createHeader,
  createPage,
  createScreen,
  createSection,
  createStarterContentScreen,
  createStarterSettingsScreen,
  createZoraNode,
} from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { referenceContent } from './content';
import type { ReferenceScreenIds } from './routes';

export function createReferenceScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: ReferenceScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.browse]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.browse,
      name: 'Browse',
      content: referenceContent.browse,
    }),
    [screenIds.search]: createScreen({
      id: screenIds.search,
      name: 'Search',
      title: referenceContent.search.title,
      description: referenceContent.search.description,
      root: createPage(`${idPrefix}-search-page`, { width: 'wide' }, [
        createHeader(`${idPrefix}-search-header`, {
          eyebrow: referenceContent.search.eyebrow,
          title: referenceContent.search.title,
          description: referenceContent.search.description,
        }),
        createSection(
          `${idPrefix}-search-section`,
          {
            title: 'Query',
            description: 'Seed a reference search experience with scopes and filters.',
          },
          [
            createZoraNode(
              `${idPrefix}-search-panel`,
              'Panel',
              {
                title: 'Search',
                description: 'Search by keyword, concept, or category.',
                tone: 'subtle',
              },
              [
                createZoraNode(
                  `${idPrefix}-search-field`,
                  'FormField',
                  {
                    label: 'Search',
                    description: 'Search the knowledge base.',
                  },
                  [
                    createZoraNode(`${idPrefix}-search-input`, 'Input', {
                      placeholder: 'Search...',
                      size: 'm',
                    }),
                  ],
                ),
              ],
            ),
          ],
        ),
      ]),
    }),
    [screenIds.categories]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.categories,
      name: 'Categories',
      content: referenceContent.categories,
    }),
    [screenIds.saved]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.saved,
      name: 'Saved',
      content: referenceContent.saved,
    }),
    [screenIds.history]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.history,
      name: 'History',
      content: referenceContent.history,
    }),
    [screenIds.settings]: createStarterSettingsScreen({
      idPrefix,
      screenId: screenIds.settings,
      name: 'Settings',
      header: referenceContent.settings,
      section: {
        title: 'Defaults',
        description: 'Seed search and offline preferences before wiring runtime settings.',
        rows: [
          {
            id: 'offline-row',
            title: 'Offline mode',
            description: 'Offline caching remains disabled until storage is configured.',
            meta: 'off',
          },
          {
            id: 'language-row',
            title: 'Language',
            description: 'Default language follows manifest localization defaults.',
            meta: 'en',
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
