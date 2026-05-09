import type { AppManifest } from '@ankhorage/contracts';

import { createStarterContentScreen, createStarterSettingsScreen } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { booksReadingContent } from './content';
import type { BooksReadingScreenIds } from './routes';

export function createBooksReadingScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: BooksReadingScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.library]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.library,
      name: 'Library',
      content: booksReadingContent.library,
    }),
    [screenIds.discover]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.discover,
      name: 'Discover',
      content: booksReadingContent.discover,
    }),
    [screenIds.lists]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.lists,
      name: 'Lists',
      content: booksReadingContent.lists,
    }),
    [screenIds.notes]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.notes,
      name: 'Notes',
      content: booksReadingContent.notes,
    }),
    [screenIds.profile]: createStarterSettingsScreen({
      idPrefix,
      screenId: screenIds.profile,
      name: 'Profile',
      header: booksReadingContent.profile,
      section: {
        title: 'Reading defaults',
        description: 'Capture the preferences that shape recommendations and formatting.',
        rows: [
          {
            id: 'formats-row',
            title: 'Preferred formats',
            description: 'Print, ebook, audio, and accessibility modes.',
            meta: 'ebook',
          },
          {
            id: 'genres-row',
            title: 'Favorite genres',
            description: 'Genre affinity feeds the discovery shelf and saved lists.',
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

