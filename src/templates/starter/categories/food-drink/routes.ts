import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface FoodDrinkScreenIds {
  discover: string;
  menu: string;
  reservations: string;
  orders: string;
  profile: string;
}

export function createFoodDrinkScreenIds(idPrefix: string): FoodDrinkScreenIds {
  return {
    discover: `${idPrefix}-discover`,
    menu: `${idPrefix}-menu`,
    reservations: `${idPrefix}-reservations`,
    orders: `${idPrefix}-orders`,
    profile: `${idPrefix}-profile`,
  };
}

export function createFoodDrinkNavigator(screenIds: FoodDrinkScreenIds): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.discover,
        label: 'Discover',
        icon: { provider: 'material-community', name: 'silverware-fork-knife' },
      }),
      createRoute({
        name: 'menu',
        screenId: screenIds.menu,
        label: 'Menu',
        icon: { provider: 'material-community', name: 'book-open-page-variant-outline' },
      }),
      createRoute({
        name: 'reservations',
        screenId: screenIds.reservations,
        label: 'Reservations',
        icon: { provider: 'material-community', name: 'calendar-clock-outline' },
      }),
      createRoute({
        name: 'orders',
        screenId: screenIds.orders,
        label: 'Orders',
        icon: { provider: 'material-community', name: 'receipt-text-outline' },
      }),
      createRoute({
        name: 'profile',
        screenId: screenIds.profile,
        label: 'Profile',
        icon: { provider: 'material-community', name: 'account-heart-outline' },
      }),
    ],
  };
}
