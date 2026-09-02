import type { AppCategory, AppManifest } from '@ankhorage/contracts';

import { resolveCategoryDesignPreset } from './design/category-theme.js';
import { CATEGORY_PRESETS } from './presets/category-presets.js';
import {
  createStarterTemplate,
  listStarterTemplateSummaries,
  type StarterTemplateSummary,
  type TemplateSeed,
} from './templates/starter/index.js';
import type { ParsedTemplateSelector } from './templateSelector.js';
import { createTemplateSelector } from './templateSelector.js';

export interface TemplateCatalogEntry {
  readonly selector: string;
  readonly category: AppCategory;
  readonly templateId: string;
  readonly label: string;
  readonly description: string;
}

export function listTemplateCatalog(category?: AppCategory): readonly TemplateCatalogEntry[] {
  const entries = createTemplateCatalogEntries();

  if (category === undefined) {
    return entries;
  }

  return entries.filter((entry) => entry.category === category);
}

export function resolveTemplateCatalogEntry(
  selector: ParsedTemplateSelector,
): TemplateCatalogEntry {
  const entry = listTemplateCatalog(selector.category).find(
    (candidate) => candidate.templateId === selector.templateId,
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

export function createManifestForSelector(args: {
  readonly selector: ParsedTemplateSelector;
  readonly projectSlug: string;
  readonly displayName: string;
}): AppManifest {
  const seed = createTemplateSeed({
    category: args.selector.category,
    displayName: args.displayName,
    projectSlug: args.projectSlug,
  });

  return createStarterTemplate(seed, {
    templateId: args.selector.templateId,
  });
}

function createTemplateCatalogEntries(): readonly TemplateCatalogEntry[] {
  return listStarterTemplateSummaries().map(createTemplateCatalogEntry);
}

function createTemplateCatalogEntry(summary: StarterTemplateSummary): TemplateCatalogEntry {
  return {
    selector: createTemplateSelector(summary.category, summary.id),
    category: summary.category,
    templateId: summary.id,
    label: summary.label,
    description: summary.description,
  };
}

function createTemplateSeed(args: {
  readonly category: AppCategory;
  readonly displayName: string;
  readonly projectSlug: string;
}): TemplateSeed {
  const preset = CATEGORY_PRESETS[args.category];
  const design = resolveCategoryDesignPreset(args.category);

  return {
    category: args.category,
    categoryLabel: preset.label,
    appName: args.displayName,
    slug: args.projectSlug,
    summary: preset.summary,
    focusAreas: preset.focusAreas,
    primaryColor: design.primaryColor,
    harmony: design.harmony,
    theme: design.themeConfig,
  };
}
