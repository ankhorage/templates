import createAppManifest0 from './categories/lifestyle/stillpath/createAppManifest';
import createAppManifest1 from './categories/social-community/chat/createAppManifest';

import type { TemplateDefinition } from './catalog';

export const TEMPLATE_DEFINITIONS: readonly TemplateDefinition[] = [
  {
    category: 'lifestyle',
    slug: 'stillpath',
    sourceRoot: 'src/templates/categories/lifestyle/stillpath',
    createAppManifest: createAppManifest0,
  },
  {
    category: 'social_community',
    slug: 'chat',
    sourceRoot: 'src/templates/categories/social-community/chat',
    createAppManifest: createAppManifest1,
  },
];
