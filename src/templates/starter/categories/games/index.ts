import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createChessStarterTemplate } from './chess';
import { createGamesStarterTemplate } from './default.template';
import { createPokerStarterTemplate } from './poker';

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
    description: 'A two-tab chess starter with Home and Settings screens.',
    create: createChessStarterTemplate,
  },
  {
    id: 'poker',
    label: 'Card trainer',
    description: 'A two-tab card-game trainer starter with a tabletop scenario view.',
    create: createPokerStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
