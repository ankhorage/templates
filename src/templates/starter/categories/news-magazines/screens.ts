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
import { newsMagazinesContent } from './content';
import type { NewsMagazinesScreenIds } from './routes';

export function createNewsMagazinesScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: NewsMagazinesScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.headlines]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.headlines,
      name: 'Headlines',
      content: newsMagazinesContent.headlines,
    }),
    [screenIds.topics]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.topics,
      name: 'Topics',
      content: newsMagazinesContent.topics,
    }),
    [screenIds.saved]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.saved,
      name: 'Saved',
      content: newsMagazinesContent.saved,
    }),
    [screenIds.search]: createScreen({
      id: screenIds.search,
      name: 'Search',
      title: newsMagazinesContent.search.title,
      description: newsMagazinesContent.search.description,
      root: createPage(`${idPrefix}-search-page`, { width: 'wide' }, [
        createHeader(`${idPrefix}-search-header`, {
          eyebrow: newsMagazinesContent.search.eyebrow,
          title: newsMagazinesContent.search.title,
          description: newsMagazinesContent.search.description,
        }),
        createSection(
          `${idPrefix}-search-section`,
          {
            title: 'Query',
            description: 'Seed a reader search experience with scope filters.',
          },
          [
            createZoraNode(
              `${idPrefix}-search-panel`,
              'Panel',
              {
                title: 'Search',
                description: 'Search across stories, topics, and sources.',
                tone: 'subtle',
              },
              [
                createZoraNode(
                  `${idPrefix}-search-field`,
                  'FormField',
                  {
                    label: 'Search',
                    description: 'Search by keyword, publication, or topic.',
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
    [screenIds.profile]: createStarterSettingsScreen({
      idPrefix,
      screenId: screenIds.profile,
      name: 'Profile',
      header: newsMagazinesContent.profile,
      section: {
        title: 'Reader defaults',
        description: 'Seed topic preferences and digest cadence before wiring subscriptions.',
        rows: [
          {
            id: 'digest-row',
            title: 'Digest cadence',
            description: 'A daily digest arrives in the morning by default.',
            meta: 'daily',
          },
          {
            id: 'topics-row',
            title: 'Topics',
            description: 'Followed topics shape headlines and notifications.',
            meta: 'editable',
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
