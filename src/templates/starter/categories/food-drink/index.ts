import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createFoodDrinkStarterTemplate } from './default.template';
import { createNutritionCatalogScanStarterTemplate } from './nutrition-catalog-scan.template';

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
      'A Swiss product catalog starter with ZORA-first product browsing and scan-to-add capture flow.',
    create: createNutritionCatalogScanStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
