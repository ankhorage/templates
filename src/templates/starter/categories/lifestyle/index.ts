import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { AUTHORED_PLANT_JOURNAL_ASSETS } from './plant-journal/assets';
import { createLifestyleStarterTemplate } from './default.template';
import { createPlantJournalStarterTemplate } from './plant-journal';
export const lifestyleStarterTemplates = [
  {
    id: 'default',
    label: 'Lifestyle dashboard',
    description:
      'A dashboard, collections, plans, explore, and profile starter for lifestyle apps.',
    create: createLifestyleStarterTemplate,
  },
  {
    id: 'plant-journal',
    label: 'Plant Journal',
    description:
      'A calm three-screen plant-care journal with bundled botanical imagery and a focused care rhythm.',
    create: createPlantJournalStarterTemplate,
    assets: AUTHORED_PLANT_JOURNAL_ASSETS,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
