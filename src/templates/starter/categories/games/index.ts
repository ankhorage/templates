import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createGamesStarterTemplate } from './default.template';

export const gamesStarterTemplates = [
  {
    id: 'default',
    label: 'Quest loop',
    description: 'A home, quests, inventory, friends, and profile starter for game experiences.',
    create: createGamesStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
