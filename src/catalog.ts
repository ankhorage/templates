import type { AppCategory } from '@ankhorage/contracts';

import {
  createTemplateArtifact,
  listTemplates,
  type TemplateArtifact,
} from './templates/catalog.js';
import type { ParsedTemplateSelector } from './templateSelector.js';
import { createTemplateSelector } from './templateSelector.js';

export interface TemplateCatalogEntry {
  readonly selector: string;
  readonly category: AppCategory;
  readonly slug: string;
  readonly label: string;
}

export function listTemplateCatalog(category?: AppCategory): readonly TemplateCatalogEntry[] {
  return listTemplates(category).map((template) => ({
    selector: createTemplateSelector(template.category, template.slug),
    category: template.category,
    slug: template.slug,
    label: template.name,
  }));
}

export function resolveTemplateCatalogEntry(
  selector: ParsedTemplateSelector,
): TemplateCatalogEntry {
  const entry = listTemplateCatalog(selector.category).find(
    (candidate) => candidate.slug === selector.slug,
  );

  if (entry !== undefined) {
    return entry;
  }

  const availableSelectors = listTemplateCatalog(selector.category).map(
    (candidate) => candidate.selector,
  );

  if (availableSelectors.length === 0) {
    throw new Error(`Template category "${selector.category}" does not expose any templates.`);
  }

  throw new Error(
    `Unknown template selector "${selector.selector}". Available selectors: ${availableSelectors.join(', ')}.`,
  );
}

export function createTemplateArtifactForSelector(args: {
  readonly selector: ParsedTemplateSelector;
  readonly projectSlug: string;
  readonly displayName: string;
}): TemplateArtifact {
  return createTemplateArtifact({
    category: args.selector.category,
    slug: args.selector.slug,
    name: args.displayName,
    projectSlug: args.projectSlug,
  });
}
