import type { AppCategory, AppManifest, ThemeConfig } from '@ankhorage/contracts';

import type { StarterTemplateArtifact, StarterTemplateAsset } from './starter.assets';

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
  theme?: ThemeConfig;
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
  assets?: readonly StarterTemplateAsset[];
}

export type StarterTemplateResult = StarterTemplateArtifact;
