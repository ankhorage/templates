import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface ShoppingCommerceScreenIds {
  browse: string;
  search: string;
  sell: string;
  orders: string;
  profile: string;
}

export function createShoppingCommerceScreenIds(idPrefix: string): ShoppingCommerceScreenIds {
  return {
    browse: `${idPrefix}-browse`,
    search: `${idPrefix}-search`,
    sell: `${idPrefix}-sell`,
    orders: `${idPrefix}-orders`,
    profile: `${idPrefix}-profile`,
  };
}

export function createShoppingCommerceNavigator(
  screenIds: ShoppingCommerceScreenIds,
): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.browse,
        label: 'Browse',
        icon: { provider: 'material-community', name: 'shopping-outline' },
      }),
      createRoute({
        name: 'search',
        screenId: screenIds.search,
        label: 'Search',
        icon: { provider: 'material-community', name: 'magnify' },
      }),
      createRoute({
        name: 'sell',
        screenId: screenIds.sell,
        label: 'Sell',
        icon: { provider: 'material-community', name: 'store-plus-outline' },
      }),
      createRoute({
        name: 'orders',
        screenId: screenIds.orders,
        label: 'Orders',
        icon: { provider: 'material-community', name: 'package-variant-closed' },
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
