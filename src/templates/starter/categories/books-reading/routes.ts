import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface BooksReadingScreenIds {
  library: string;
  discover: string;
  lists: string;
  notes: string;
  profile: string;
}

export function createBooksReadingScreenIds(idPrefix: string): BooksReadingScreenIds {
  return {
    library: `${idPrefix}-library`,
    discover: `${idPrefix}-discover`,
    lists: `${idPrefix}-lists`,
    notes: `${idPrefix}-notes`,
    profile: `${idPrefix}-profile`,
  };
}

export function createBooksReadingNavigator(
  screenIds: BooksReadingScreenIds,
): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.library,
        label: 'Library',
        icon: { provider: 'material-community', name: 'bookshelf' },
      }),
      createRoute({
        name: 'discover',
        screenId: screenIds.discover,
        label: 'Discover',
        icon: { provider: 'material-community', name: 'compass-outline' },
      }),
      createRoute({
        name: 'lists',
        screenId: screenIds.lists,
        label: 'Lists',
        icon: { provider: 'material-community', name: 'format-list-checks' },
      }),
      createRoute({
        name: 'notes',
        screenId: screenIds.notes,
        label: 'Notes',
        icon: { provider: 'material-community', name: 'notebook-outline' },
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

