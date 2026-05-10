import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createHealthFitnessStarterTemplate } from './default.template';

export const healthFitnessStarterTemplates = [
  {
    id: 'default',
    label: 'Fitness and wellness',
    description: 'A today, plans, progress, coach, and profile starter for fitness apps.',
    create: createHealthFitnessStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
