import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createFoodDrinkStarterTemplate } from './default.template';

export { createFoodDrinkStarterTemplate } from './default.template';

export const foodDrinkStarterTemplates = [
  {
    id: 'default',
    label: 'Restaurant and ordering',
    description: 'A discover, menu, reservations, orders, and profile starter for food apps.',
    create: createFoodDrinkStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
