import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createFoodDrinkStarterTemplate } from './default.template';
import { createNutritionCatalogScanStarterTemplate } from './nutrition-catalog-scan';

export const foodDrinkStarterTemplates = [
  {
    id: 'default',
    label: 'Restaurant and ordering',
    description: 'A discover, menu, reservations, orders, and profile starter for food apps.',
    create: createFoodDrinkStarterTemplate,
  },
  {
    id: 'nutrition-catalog-scan',
    label: 'Nutrition catalog scan',
    description:
      'A product barcode nutrition scanner starter with direct product lookup, creation, and catalog browsing.',
    create: createNutritionCatalogScanStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
