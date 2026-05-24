export { createCategoryAppManifest } from './generators/create-category-app';
export { CATEGORY_PRESETS, type CategoryPreset } from './presets/category-presets';
export {
  type CategoryStarterTemplateDefinition,
  createStarterTemplate,
  listStarterTemplates,
  listStarterTemplatesByCategory,
  listStarterTemplateSummaries,
  resolveStarterTemplate,
  type StarterTemplateFactory,
  type StarterTemplateId,
  type StarterTemplateOptions,
  type StarterTemplateSelection,
  type StarterTemplateSummary,
  TEMPLATE_KINDS,
  type TemplateKind,
  type TemplateSeed,
} from './templates/starter';
export {
  APP_CATEGORIES,
  type AppCategory,
  type SplashScreenSpec,
  type SplashScreenResizeMode,
} from '@ankhorage/contracts';