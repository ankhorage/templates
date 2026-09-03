import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../../shared';

export interface EbankingMobileScreenIds {
  home: string;
  assets: string;
  payments: string;
  invest: string;
  more: string;
}

export function createEbankingMobileScreenIds(idPrefix: string): EbankingMobileScreenIds {
  return {
    assets: `${idPrefix}-assets`,
    home: `${idPrefix}-home`,
    invest: `${idPrefix}-invest`,
    more: `${idPrefix}-more`,
    payments: `${idPrefix}-payments`,
  };
}

export function createEbankingMobileNavigator(
  screenIds: EbankingMobileScreenIds,
): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'home',
    routes: [
      createRoute({
        name: 'home',
        screenId: screenIds.home,
        label: 'Home',
        icon: { provider: 'material-community', name: 'home-outline' },
      }),
      createRoute({
        name: 'assets',
        screenId: screenIds.assets,
        label: 'Assets',
        icon: { provider: 'material-community', name: 'chart-pie' },
      }),
      createRoute({
        name: 'payments',
        screenId: screenIds.payments,
        label: 'Payments',
        icon: { provider: 'material-community', name: 'swap-horizontal' },
      }),
      createRoute({
        name: 'invest',
        screenId: screenIds.invest,
        label: 'Invest',
        icon: { provider: 'material-community', name: 'chart-line' },
      }),
      createRoute({
        name: 'more',
        screenId: screenIds.more,
        label: 'More',
        icon: { provider: 'material-community', name: 'dots-horizontal' },
      }),
    ],
  };
}
