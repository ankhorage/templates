import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createSportsStarterTemplate } from './default.template';

export { createSportsStarterTemplate } from './default.template';

export const sportsStarterTemplates = [
  {
    id: 'default',
    label: 'Sports center',
    description: 'A scores, schedule, standings, teams, and profile starter for sports apps.',
    create: createSportsStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];

