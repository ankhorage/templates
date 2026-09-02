import {
  assertTemplateManifestReady,
  validateTemplateManifest,
} from '../../authoring/compose-category-manifest';

import { createStarterTemplateArtifact } from './starter.assets';

import {
  listStarterTemplateSummaries,
  listStarterTemplates,
  listStarterTemplatesByCategory,
  resolveStarterTemplate,
} from './starter.registry';
import {
  TEMPLATE_KINDS,
  type StarterTemplateOptions,
  type StarterTemplateResult,
  type TemplateSeed,
} from './starter.types';

export { TEMPLATE_KINDS };
export {
  listStarterTemplateSummaries,
  listStarterTemplates,
  listStarterTemplatesByCategory,
  resolveStarterTemplate,
};
export type {
  CategoryStarterTemplateDefinition,
  StarterTemplateFactory,
  StarterTemplateId,
  StarterTemplateOptions,
  StarterTemplateSelection,
  StarterTemplateSummary,
  StarterTemplateResult,
  TemplateKind,
  TemplateSeed,
} from './starter.types';

export function createStarterTemplate(
  seed: TemplateSeed,
  options: StarterTemplateOptions = {},
): StarterTemplateResult {
  const template = resolveStarterTemplate(seed, options.templateId);
  const manifest = assertTemplateManifestReady(
    validateTemplateManifest(template.create(seed, options)),
  );
  return createStarterTemplateArtifact(manifest, template.assets);
}
