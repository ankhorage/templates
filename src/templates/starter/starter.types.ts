import type { AppCategory, AppManifest, ThemeConfig } from '@ankhorage/contracts';

export const TEMPLATE_KINDS = ['starter'] as const;

export type TemplateKind = (typeof TEMPLATE_KINDS)[number];

export type StarterTemplateId = string;

export interface StarterTemplateSelection {
  category: AppCategory;
  templateId?: StarterTemplateId;
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
  colorTone: ThemeConfig['light']['colorTone'];
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
