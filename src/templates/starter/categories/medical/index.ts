import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createMedicalStarterTemplate } from './default.template';

export { createMedicalStarterTemplate } from './default.template';

export const medicalStarterTemplates = [
  {
    id: 'default',
    label: 'Care hub',
    description: 'An appointments, care team, records, messages, and profile starter for medical experiences.',
    create: createMedicalStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];

