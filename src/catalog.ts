import type { AppCategory, AppManifest, ThemeConfig } from '@ankhorage/contracts';

import { CATEGORY_PRESETS } from './presets/category-presets.js';
import { createFallbackStarterTemplate } from './templates/starter/categories/fallback/default.template.js';
import { fallbackStarterTemplates } from './templates/starter/categories/fallback/index.js';
import {
  createStarterTemplate,
  FALLBACK_TEMPLATE_CATEGORY,
  listStarterTemplateSummaries,
  type StarterTemplateCategory,
  type StarterTemplateSummary,
  type TemplateSeed,
} from './templates/starter/index.js';
import type { ParsedTemplateSelector } from './templateSelector.js';
import { createTemplateSelector } from './templateSelector.js';

export interface TemplateCatalogEntry {
  readonly selector: string;
  readonly category: StarterTemplateCategory;
  readonly templateId: string;
  readonly label: string;
  readonly description: string;
}

const FALLBACK_THEME_HARMONY: ThemeConfig['light']['harmony'] = 'analogous';
const FALLBACK_FOCUS_AREAS = ['Home', 'Details', 'Settings'] as const;
const FALLBACK_MANIFEST_CATEGORY: AppCategory = 'developer_tools';

export function listTemplateCatalog(
  category?: StarterTemplateCategory,
): readonly TemplateCatalogEntry[] {
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

  if (args.selector.category === FALLBACK_TEMPLATE_CATEGORY) {
    return createFallbackStarterTemplate(seed);
  }

  return createStarterTemplate(seed, {
    templateId: args.selector.templateId,
  });
}

function createTemplateCatalogEntries(): readonly TemplateCatalogEntry[] {
  const fallbackEntries = fallbackStarterTemplates.map((template) => ({
    selector: createTemplateSelector(FALLBACK_TEMPLATE_CATEGORY, template.id),
    category: FALLBACK_TEMPLATE_CATEGORY,
    templateId: template.id,
    label: template.label,
    description: template.description,
  }));

  const starterEntries = listStarterTemplateSummaries().map(createTemplateCatalogEntry);

  return [...fallbackEntries, ...starterEntries];
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
  readonly category: StarterTemplateCategory;
  readonly displayName: string;
  readonly projectSlug: string;
}): TemplateSeed {
  if (args.category === FALLBACK_TEMPLATE_CATEGORY) {
    return {
      category: FALLBACK_MANIFEST_CATEGORY,
      categoryLabel: 'Fallback',
      appName: args.displayName,
      slug: args.projectSlug,
      summary: 'Generic starter seed',
      focusAreas: FALLBACK_FOCUS_AREAS,
      primaryColor: '#2563EB',
      harmony: FALLBACK_THEME_HARMONY,
    };
  }

  const preset = CATEGORY_PRESETS[args.category];

  return {
    category: args.category,
    categoryLabel: preset.label,
    appName: args.displayName,
    slug: args.projectSlug,
    summary: preset.summary,
    focusAreas: preset.focusAreas,
    primaryColor: preset.primaryColor,
    harmony: preset.harmony,
  };
}
