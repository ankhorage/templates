import createAppManifest0 from './categories/books-reading/reader/createAppManifest';
import createAppManifest1 from './categories/business-productivity/urban-water-monitor/createAppManifest';
import createAppManifest2 from './categories/education-learning/sharkprey/createAppManifest';
import createAppManifest3 from './categories/food-drink/nutriflow/createAppManifest';
import createAppManifest4 from './categories/games/grossmeister/createAppManifest';
import createAppManifest5 from './categories/lifestyle/stillpath/createAppManifest';
import createAppManifest6 from './categories/social-community/chat/createAppManifest';
import createAppManifest7 from './categories/social-community/social-media-manager/createAppManifest';

import type { TemplateDefinition } from './catalog';

export const TEMPLATE_DEFINITIONS: readonly TemplateDefinition[] = [
  {
    category: 'books_reading',
    slug: 'reader',
    sourceRoot: 'src/templates/categories/books-reading/reader',
    createAppManifest: createAppManifest0,
  },
  {
    category: 'business_productivity',
    slug: 'urban-water-monitor',
    sourceRoot: 'src/templates/categories/business-productivity/urban-water-monitor',
    createAppManifest: createAppManifest1,
  },
  {
    category: 'education_learning',
    slug: 'sharkprey',
    sourceRoot: 'src/templates/categories/education-learning/sharkprey',
    createAppManifest: createAppManifest2,
  },
  {
    category: 'food_drink',
    slug: 'nutriflow',
    sourceRoot: 'src/templates/categories/food-drink/nutriflow',
    createAppManifest: createAppManifest3,
  },
  {
    category: 'games',
    slug: 'grossmeister',
    sourceRoot: 'src/templates/categories/games/grossmeister',
    createAppManifest: createAppManifest4,
  },
  {
    category: 'lifestyle',
    slug: 'stillpath',
    sourceRoot: 'src/templates/categories/lifestyle/stillpath',
    createAppManifest: createAppManifest5,
  },
  {
    category: 'social_community',
    slug: 'chat',
    sourceRoot: 'src/templates/categories/social-community/chat',
    createAppManifest: createAppManifest6,
  },
  {
    category: 'social_community',
    slug: 'social-media-manager',
    sourceRoot: 'src/templates/categories/social-community/social-media-manager',
    createAppManifest: createAppManifest7,
  },
];
