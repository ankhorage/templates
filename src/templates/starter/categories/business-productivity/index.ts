import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createBusinessProductivityStarterTemplate } from './default.template';
import { createUrbanWaterMonitorStarterTemplate } from './urban-water-monitor';

export const businessProductivityStarterTemplates = [
  {
    id: 'default',
    label: 'Work hub',
    description:
      'A dashboard, projects, tasks, calendar, reports, and settings starter for productivity apps.',
    create: createBusinessProductivityStarterTemplate,
  },
  {
    id: 'urban-water-monitor',
    label: 'Urban Water Monitor',
    description:
      'An event-based urban water quality monitoring and field-campaign concept starter.',
    create: createUrbanWaterMonitorStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
