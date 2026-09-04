import createAppManifest0 from './categories/education-learning/sharkprey/createAppManifest';
import createAppManifest1 from './categories/lifestyle/stillpath/createAppManifest';

import type { TemplateDefinition } from './catalog';

export const TEMPLATE_DEFINITIONS: readonly TemplateDefinition[] = [
  {
    category: 'education_learning',
    slug: 'sharkprey',
    sourceRoot: 'src/templates/categories/education-learning/sharkprey',
    createAppManifest: createAppManifest0,
  },
  {
    category: 'lifestyle',
    slug: 'stillpath',
    sourceRoot: 'src/templates/categories/lifestyle/stillpath',
    createAppManifest: createAppManifest1,
  },
];
