import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createBooksReadingStarterTemplate } from './default.template';

export { createBooksReadingStarterTemplate } from './default.template';

export const booksReadingStarterTemplates = [
  {
    id: 'default',
    label: 'Reading shelf',
    description: 'A library, discovery, lists, notes, and profile starter for reading apps.',
    create: createBooksReadingStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];

