import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createLifestyleStarterTemplate } from './default.template';

export { createLifestyleStarterTemplate } from './default.template';

export const lifestyleStarterTemplates = [
  {
    id: 'default',
    label: 'Lifestyle dashboard',
    description:
      'A dashboard, collections, plans, explore, and profile starter for lifestyle apps.',
    create: createLifestyleStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
