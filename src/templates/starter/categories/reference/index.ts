import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createReferenceStarterTemplate } from './default.template';

export const referenceStarterTemplates = [
  {
    id: 'default',
    label: 'Knowledge base',
    description:
      'A browse, search, categories, saved, history, and settings starter for reference apps.',
    create: createReferenceStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
