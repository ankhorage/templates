import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createEbankingMobileStarterTemplate } from './ebanking-mobile';
import { createFinanceMoneyStarterTemplate } from './default.template';
export const financeMoneyStarterTemplates = [
  {
    id: 'default',
    label: 'Money dashboard',
    description:
      'An overview, accounts, transactions, budget, and insights starter for finance apps.',
    create: createFinanceMoneyStarterTemplate,
  },
  {
    id: 'ebanking-mobile',
    label: 'E-banking mobile',
    description:
      'A five-tab mobile e-banking starter with balances, assets, payments, investing, and secure account settings.',
    create: createEbankingMobileStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
