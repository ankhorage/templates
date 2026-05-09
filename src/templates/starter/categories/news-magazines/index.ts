import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createNewsMagazinesStarterTemplate } from './default.template';

export { createNewsMagazinesStarterTemplate } from './default.template';

export const newsMagazinesStarterTemplates = [
  {
    id: 'default',
    label: 'News reader',
    description: 'A headlines, topics, saved, search, and profile starter for news apps.',
    create: createNewsMagazinesStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
