import type { AppManifest } from '@ankhorage/contracts';

import {
  listStarterTemplateSummaries,
  listStarterTemplates,
  listStarterTemplatesByCategory,
  resolveStarterTemplate,
} from './starter.registry';
import {
  FALLBACK_TEMPLATE_CATEGORY,
  TEMPLATE_KINDS,
  type StarterTemplateCategory,
  type StarterTemplateOptions,
  type TemplateSeed,
} from './starter.types';

export { FALLBACK_TEMPLATE_CATEGORY, TEMPLATE_KINDS };
export {
  listStarterTemplateSummaries,
  listStarterTemplates,
  listStarterTemplatesByCategory,
  resolveStarterTemplate,
};
export type {
  CategoryStarterTemplateDefinition,
  StarterTemplateFactory,
  StarterTemplateCategory,
  StarterTemplateId,
  StarterTemplateOptions,
  StarterTemplateSelection,
  StarterTemplateSummary,
  TemplateKind,
  TemplateSeed,
} from './starter.types';

export function createStarterTemplate(
  seed: TemplateSeed,
  options: StarterTemplateOptions = {},
): AppManifest {
  const template = resolveStarterTemplate(seed, options.templateId);
  return template.create(seed, options);
}
