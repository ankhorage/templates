import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createEntertainmentMediaStarterTemplate } from './default.template';

export { createEntertainmentMediaStarterTemplate } from './default.template';

export const entertainmentMediaStarterTemplates = [
  {
    id: 'default',
    label: 'Streaming hub',
    description:
      'A discover, watchlist, now playing, library, and profile starter for entertainment apps.',
    create: createEntertainmentMediaStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
