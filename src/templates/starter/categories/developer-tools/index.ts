import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createDeveloperToolsStarterTemplate } from './default.template';

export { createDeveloperToolsStarterTemplate } from './default.template';

export const developerToolsStarterTemplates = [
  {
    id: 'default',
    label: 'Engineering console',
    description:
      'A dashboard, builds, incidents, environments, deployments, and settings starter for developer tooling.',
    create: createDeveloperToolsStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
