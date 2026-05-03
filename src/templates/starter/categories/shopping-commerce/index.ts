import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createShoppingCommerceStarterTemplate } from './default.template';

export { createShoppingCommerceStarterTemplate } from './default.template';

export const shoppingCommerceStarterTemplates = [
  {
    id: 'default',
    label: 'Marketplace',
    description: 'A browse, search, sell, orders, and profile starter for commerce apps.',
    create: createShoppingCommerceStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
