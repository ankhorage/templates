import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createPhotoVideoStarterTemplate } from './default.template';

export { createPhotoVideoStarterTemplate } from './default.template';

export const photoVideoStarterTemplates = [
  {
    id: 'default',
    label: 'Capture studio',
    description: 'A capture, library, edit, share, and profile starter for photo/video apps.',
    create: createPhotoVideoStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
