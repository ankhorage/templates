import type { AppManifest } from '@ankhorage/contracts';

import { resolveStarterTemplate } from './starter.registry';
import { TEMPLATE_KINDS, type StarterTemplateOptions, type TemplateSeed } from './starter.types';

export { TEMPLATE_KINDS };
export type {
  CategoryStarterTemplateDefinition,
  StarterTemplateFactory,
  StarterTemplateId,
  StarterTemplateOptions,
  StarterTemplateSelection,
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
