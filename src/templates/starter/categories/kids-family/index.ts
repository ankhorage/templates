import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createKidsFamilyStarterTemplate } from './default.template';

export { createKidsFamilyStarterTemplate } from './default.template';

export const kidsFamilyStarterTemplates = [
  {
    id: 'default',
    label: 'Family hub',
    description: 'A home, routines, discovery, favorites, and parent controls starter for family apps.',
    create: createKidsFamilyStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];

