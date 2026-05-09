import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface NavigationTravelScreenIds {
  destinations: string;
  itinerary: string;
  bookings: string;
  map: string;
  profile: string;
}

export function createNavigationTravelScreenIds(idPrefix: string): NavigationTravelScreenIds {
  return {
    destinations: `${idPrefix}-destinations`,
    itinerary: `${idPrefix}-itinerary`,
    bookings: `${idPrefix}-bookings`,
    map: `${idPrefix}-map`,
    profile: `${idPrefix}-profile`,
  };
}

export function createNavigationTravelNavigator(
  screenIds: NavigationTravelScreenIds,
): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.destinations,
        label: 'Destinations',
        icon: { provider: 'material-community', name: 'map-marker-outline' },
      }),
      createRoute({
        name: 'itinerary',
        screenId: screenIds.itinerary,
        label: 'Itinerary',
        icon: { provider: 'material-community', name: 'timeline-outline' },
      }),
      createRoute({
        name: 'bookings',
        screenId: screenIds.bookings,
        label: 'Bookings',
        icon: { provider: 'material-community', name: 'ticket-outline' },
      }),
      createRoute({
        name: 'map',
        screenId: screenIds.map,
        label: 'Map',
        icon: { provider: 'material-community', name: 'map-outline' },
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
