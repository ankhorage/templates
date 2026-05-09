import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createGraphicsDesignStarterTemplate } from './default.template';

export { createGraphicsDesignStarterTemplate } from './default.template';

export const graphicsDesignStarterTemplates = [
  {
    id: 'default',
    label: 'Creative workspace',
    description:
      'A dashboard, briefs, assets, reviews, brand, and settings starter for design workflows.',
    create: createGraphicsDesignStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
