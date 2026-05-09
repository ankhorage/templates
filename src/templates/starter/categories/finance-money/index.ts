import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createFinanceMoneyStarterTemplate } from './default.template';

export { createFinanceMoneyStarterTemplate } from './default.template';

export const financeMoneyStarterTemplates = [
  {
    id: 'default',
    label: 'Money dashboard',
    description: 'An overview, accounts, transactions, budget, and insights starter for finance apps.',
    create: createFinanceMoneyStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];

