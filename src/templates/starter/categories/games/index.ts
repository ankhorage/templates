import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createChessStarterTemplate } from './chess.template';
import { createGamesStarterTemplate } from './default.template';

export const gamesStarterTemplates = [
  {
    id: 'default',
    label: 'Quest loop',
    description: 'A home, quests, inventory, friends, and profile starter for game experiences.',
    create: createGamesStarterTemplate,
  },
  {
    id: 'chess',
    label: 'Chess',
    description: 'A two-tab chess starter with a home dashboard and board settings placeholder.',
    create: createChessStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
