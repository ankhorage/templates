import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createMusicAudioStarterTemplate } from './default.template';

export { createMusicAudioStarterTemplate } from './default.template';

export const musicAudioStarterTemplates = [
  {
    id: 'default',
    label: 'Listening experience',
    description: 'A home, search, library, player, and profile starter for music and audio apps.',
    create: createMusicAudioStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
