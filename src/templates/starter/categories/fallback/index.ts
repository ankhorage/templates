import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createFallbackStarterTemplate } from './default.template';

export { createFallbackStarterTemplate } from './default.template';

export const fallbackStarterTemplates = [
  {
    id: 'default',
    label: 'Generic starter',
    description: 'The original Home, Details, Settings, and Sign in starter manifest.',
    create: createFallbackStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
