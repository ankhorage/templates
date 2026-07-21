import type { AppCategory, AppManifest, ThemeConfig } from '@ankhorage/contracts';

export const FALLBACK_TEMPLATE_CATEGORY = 'fallback' as const;

export type StarterTemplateCategory = AppCategory | typeof FALLBACK_TEMPLATE_CATEGORY;

export const TEMPLATE_KINDS = ['starter'] as const;

export type TemplateKind = (typeof TEMPLATE_KINDS)[number];

export type StarterTemplateId = string;

export interface StarterTemplateSelection {
  category: AppCategory;
  templateId?: StarterTemplateId;
}

export interface StarterTemplateSummary {
  id: StarterTemplateId;
  category: AppCategory;
  label: string;
  description: string;
}

export interface TemplateSeed {
  category: AppCategory;
  categoryLabel: string;
  appName: string;
  slug: string;
  summary: string;
  focusAreas?: readonly [string, string, string];
  primaryColor: string;
  harmony: ThemeConfig['light']['harmony'];
  version?: string;
  themeId?: string;
  themeName?: string;
}

export interface StarterTemplateOptions {
  templateId?: StarterTemplateId;
}

export type StarterTemplateFactory = (
  seed: TemplateSeed,
  options?: StarterTemplateOptions,
) => AppManifest;

export interface CategoryStarterTemplateDefinition {
  id: StarterTemplateId;
  label: string;
  description: string;
  create: StarterTemplateFactory;
}
