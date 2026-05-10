import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createBusinessProductivityStarterTemplate } from './default.template';

export const businessProductivityStarterTemplates = [
  {
    id: 'default',
    label: 'Work hub',
    description:
      'A dashboard, projects, tasks, calendar, reports, and settings starter for productivity apps.',
    create: createBusinessProductivityStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
