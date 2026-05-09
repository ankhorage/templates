import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface FinanceMoneyScreenIds {
  overview: string;
  accounts: string;
  transactions: string;
  budget: string;
  insights: string;
}

export function createFinanceMoneyScreenIds(idPrefix: string): FinanceMoneyScreenIds {
  return {
    overview: `${idPrefix}-overview`,
    accounts: `${idPrefix}-accounts`,
    transactions: `${idPrefix}-transactions`,
    budget: `${idPrefix}-budget`,
    insights: `${idPrefix}-insights`,
  };
}

export function createFinanceMoneyNavigator(
  screenIds: FinanceMoneyScreenIds,
): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.overview,
        label: 'Overview',
        icon: { provider: 'material-community', name: 'view-dashboard-outline' },
      }),
      createRoute({
        name: 'accounts',
        screenId: screenIds.accounts,
        label: 'Accounts',
        icon: { provider: 'material-community', name: 'bank-outline' },
      }),
      createRoute({
        name: 'transactions',
        screenId: screenIds.transactions,
        label: 'Transactions',
        icon: { provider: 'material-community', name: 'swap-horizontal' },
      }),
      createRoute({
        name: 'budget',
        screenId: screenIds.budget,
        label: 'Budget',
        icon: { provider: 'material-community', name: 'wallet-outline' },
      }),
      createRoute({
        name: 'insights',
        screenId: screenIds.insights,
        label: 'Insights',
        icon: { provider: 'material-community', name: 'chart-donut' },
      }),
    ],
  };
}
