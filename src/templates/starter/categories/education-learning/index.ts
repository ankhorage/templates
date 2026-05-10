import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createEducationLearningStarterTemplate } from './default.template';

export const educationLearningStarterTemplates = [
  {
    id: 'default',
    label: 'Learning journey',
    description: 'A courses, study, practice, progress, and profile starter for learning apps.',
    create: createEducationLearningStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
