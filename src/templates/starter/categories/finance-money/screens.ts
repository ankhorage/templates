import type { AppManifest } from '@ankhorage/contracts';

import { createStarterContentScreen } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { financeMoneyContent } from './content';
import type { FinanceMoneyScreenIds } from './routes';

export function createFinanceMoneyScreens(
  _seed: TemplateSeed,
  idPrefix: string,
  screenIds: FinanceMoneyScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.overview]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.overview,
      name: 'Overview',
      content: financeMoneyContent.overview,
    }),
    [screenIds.accounts]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.accounts,
      name: 'Accounts',
      content: financeMoneyContent.accounts,
    }),
    [screenIds.transactions]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.transactions,
      name: 'Transactions',
      content: financeMoneyContent.transactions,
    }),
    [screenIds.budget]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.budget,
      name: 'Budget',
      content: financeMoneyContent.budget,
    }),
    [screenIds.insights]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.insights,
      name: 'Insights',
      content: financeMoneyContent.insights,
    }),
  };
}

