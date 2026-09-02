import type { AppCategory, ThemeConfig } from '@ankhorage/contracts';

import type { TonePairId } from './tone-catalog';

export const DESIGN_DENSITIES = ['compact', 'comfortable', 'spacious'] as const;
export type DesignDensity = (typeof DESIGN_DENSITIES)[number];

export const DESIGN_SHAPES = ['sharp', 'neutral', 'soft'] as const;
export type DesignShape = (typeof DESIGN_SHAPES)[number];

export interface CategoryPreset {
  readonly category: AppCategory;
  readonly label: string;
  readonly defaultName: string;
  readonly defaultSlug: string;
  readonly summary: string;
  readonly focusAreas: readonly [string, string, string];
  readonly designIntent: string;
  readonly recommendedPrimaryColors: readonly [string, ...string[]];
  readonly recommendedHarmonies: readonly [
    ThemeConfig['light']['harmony'],
    ...ThemeConfig['light']['harmony'][],
  ];
  readonly tonePairs: Readonly<Record<'light' | 'dark', TonePairId>>;
  readonly bodyFontCandidates: readonly [string, ...string[]];
  readonly headingStrategy: 'same' | 'auto-pair';
  readonly headingFontCandidates: readonly string[];
  readonly specialistFontCandidates: readonly {
    readonly family: string;
    readonly usage: string;
  }[];
  readonly density: DesignDensity;
  readonly shape: DesignShape;
}

interface ExistingCategoryPresetSnapshot {
  readonly label: string;
  readonly defaultName: string;
  readonly defaultSlug: string;
  readonly primaryColor: string;
  readonly harmony: ThemeConfig['light']['harmony'];
  readonly summary: string;
  readonly focusAreas: readonly [string, string, string];
}

interface SuppliedCategoryPresetSnapshot {
  readonly designIntent: string;
  readonly primaryColor: string;
  readonly harmony: ThemeConfig['light']['harmony'];
  readonly lightTonePair: TonePairId;
  readonly darkTonePair: TonePairId;
  readonly bodyFontCandidates: readonly [string, ...string[]];
  readonly headingStrategy: 'same' | 'auto-pair';
  readonly headingFontCandidates: readonly string[];
  readonly specialistFontCandidates: readonly {
    readonly family: string;
    readonly usage: string;
  }[];
  readonly density: DesignDensity;
  readonly shape: DesignShape;
}

export interface CategoryPresetReconciliationSource {
  readonly category: AppCategory;
  readonly existing: ExistingCategoryPresetSnapshot;
  readonly supplied: SuppliedCategoryPresetSnapshot;
}

export type CategoryPresetReconciliationDecision =
  'adopted-supplied' | 'ordered-both' | 'preserved-existing' | 'sources-agree';

export interface CategoryPresetFieldReconciliation {
  readonly field: string;
  readonly decision: CategoryPresetReconciliationDecision;
  readonly reason: string;
}

export interface CategoryPresetReconciliationReport {
  readonly category: AppCategory;
  readonly source: CategoryPresetReconciliationSource;
  readonly fields: readonly CategoryPresetFieldReconciliation[];
}
