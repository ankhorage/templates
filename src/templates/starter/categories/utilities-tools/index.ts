import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createUtilitiesToolsStarterTemplate } from './default.template';

export { createUtilitiesToolsStarterTemplate } from './default.template';

export const utilitiesToolsStarterTemplates = [
  {
    id: 'default',
    label: 'Utilities suite',
    description:
      'A dashboard, tools, shortcuts, storage, diagnostics, and settings starter for utilities apps.',
    create: createUtilitiesToolsStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
