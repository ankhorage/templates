import type { AppManifest } from '@ankhorage/contracts';

import { createStarterContentScreen, createStarterSettingsScreen } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { navigationTravelContent } from './content';
import type { NavigationTravelScreenIds } from './routes';

export function createNavigationTravelScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: NavigationTravelScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.destinations]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.destinations,
      name: 'Destinations',
      content: navigationTravelContent.destinations,
    }),
    [screenIds.itinerary]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.itinerary,
      name: 'Itinerary',
      content: navigationTravelContent.itinerary,
    }),
    [screenIds.bookings]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.bookings,
      name: 'Bookings',
      content: navigationTravelContent.bookings,
    }),
    [screenIds.map]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.map,
      name: 'Map',
      content: navigationTravelContent.map,
    }),
    [screenIds.profile]: createStarterSettingsScreen({
      idPrefix,
      screenId: screenIds.profile,
      name: 'Profile',
      header: navigationTravelContent.profile,
      section: {
        title: 'Travel defaults',
        description: 'Seed traveler preferences and alert settings.',
        rows: [
          {
            id: 'alerts-row',
            title: 'Travel alerts',
            description: 'Enable delay alerts and safety notifications by default.',
            meta: 'on',
          },
          {
            id: 'preferences-row',
            title: 'Preferences',
            description: 'Seat, accessibility, and dietary preferences live here.',
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
