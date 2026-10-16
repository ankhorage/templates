import createAppManifest0 from './categories/books-reading/reader/createAppManifest';
import createAppManifest1 from './categories/education-learning/sharkprey/createAppManifest';
import createAppManifest2 from './categories/lifestyle/stillpath/createAppManifest';
import createAppManifest3 from './categories/social-community/chat/createAppManifest';

import type { TemplateDefinition } from './catalog';

export const TEMPLATE_DEFINITIONS: readonly TemplateDefinition[] = [
  {
    category: 'books_reading',
    slug: 'reader',
    sourceRoot: 'src/templates/categories/books-reading/reader',
    createAppManifest: createAppManifest0,
  },
  {
    category: 'education_learning',
    slug: 'sharkprey',
    sourceRoot: 'src/templates/categories/education-learning/sharkprey',
    createAppManifest: createAppManifest1,
  },
  {
    category: 'lifestyle',
    slug: 'stillpath',
    sourceRoot: 'src/templates/categories/lifestyle/stillpath',
    createAppManifest: createAppManifest2,
  },
  {
    category: 'social_community',
    slug: 'chat',
    sourceRoot: 'src/templates/categories/social-community/chat',
    createAppManifest: createAppManifest3,
  },
];
