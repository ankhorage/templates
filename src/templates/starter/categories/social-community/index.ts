import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createSocialCommunityTemplate } from './community.template';
import { createSocialCreatorTemplate } from './creator';

export const socialCommunityStarterTemplates = [
  {
    id: 'default',
    label: 'Community network',
    description: 'A feed, groups, messages, profile, and settings starter for community apps.',
    create: createSocialCommunityTemplate,
  },
  {
    id: 'creator',
    label: 'Creator social',
    description: 'A studio, posts, audience, insights, and settings starter for creator apps.',
    create: createSocialCreatorTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
