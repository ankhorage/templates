import type { AppCategory } from '@ankhorage/contracts';

import { CATEGORY_SOURCE } from '../design/category-source';
import type {
  CategoryPreset,
  CategoryPresetFieldReconciliation,
  CategoryPresetReconciliationReport,
  CategoryPresetReconciliationSource,
} from '../design/category-types';

const CATEGORY_RECONCILIATION_SOURCE: readonly CategoryPresetReconciliationSource[] =
  CATEGORY_SOURCE;

/*** Resolve the single checked-in reconciliation source for a category. */
function resolveSource(category: AppCategory): CategoryPresetReconciliationSource {
  const source = CATEGORY_RECONCILIATION_SOURCE.find((entry) => entry.category === category);
  if (!source) throw new Error(`Missing category reconciliation source: ${category}.`);
  return source;
}

/*** Keep reviewed recommendations in preference order without inventing alternatives. */
function createRecommendations<TValue>(
  supplied: TValue,
  existing: TValue,
): readonly [TValue, ...TValue[]] {
  return supplied === existing ? [supplied] : [supplied, existing];
}

/*** Reconcile existing template identity with richer supplied design direction. */
function createCategoryPreset(source: CategoryPresetReconciliationSource): CategoryPreset {
  return {
    category: source.category,
    label: source.existing.label,
    defaultName: source.existing.defaultName,
    defaultSlug: source.existing.defaultSlug,
    summary: source.existing.summary,
    focusAreas: source.existing.focusAreas,
    designIntent: source.supplied.designIntent,
    recommendedPrimaryColors: createRecommendations(
      source.supplied.primaryColor,
      source.existing.primaryColor,
    ),
    recommendedHarmonies: createRecommendations(source.supplied.harmony, source.existing.harmony),
    tonePairs: { light: source.supplied.lightTonePair, dark: source.supplied.darkTonePair },
    bodyFontCandidates: source.supplied.bodyFontCandidates,
    headingStrategy: source.supplied.headingStrategy,
    headingFontCandidates: source.supplied.headingFontCandidates,
    specialistFontCandidates: source.supplied.specialistFontCandidates,
    density: source.supplied.density,
    shape: source.supplied.shape,
  };
}

/*** Describe every source field decision so reconciliation cannot silently discard input. */
function createFieldReconciliation(
  source: CategoryPresetReconciliationSource,
): readonly CategoryPresetFieldReconciliation[] {
  const preserved = ['label', 'defaultName', 'defaultSlug', 'summary', 'focusAreas'].map(
    (field) => ({
      field: `existing.${field}`,
      decision: 'preserved-existing' as const,
      reason: 'Templates already owns this product and template identity field.',
    }),
  );
  const adopted = [
    'designIntent',
    'lightTonePair',
    'darkTonePair',
    'bodyFontCandidates',
    'headingStrategy',
    'headingFontCandidates',
    'specialistFontCandidates',
    'density',
    'shape',
  ].map((field) => ({
    field: `supplied.${field}`,
    decision: 'adopted-supplied' as const,
    reason: 'The existing preset had no equivalent durable authoring field.',
  }));
  return [
    ...preserved,
    createSharedFieldDecision('primaryColor', source),
    createSharedFieldDecision('harmony', source),
    ...adopted,
  ];
}

/*** Preserve agreeing values once and retain conflicts as ordered recommendations. */
function createSharedFieldDecision(
  field: 'harmony' | 'primaryColor',
  source: CategoryPresetReconciliationSource,
): CategoryPresetFieldReconciliation {
  const agrees = Reflect.get(source.existing, field) === Reflect.get(source.supplied, field);
  return {
    field: `existing.${field} + supplied.${field}`,
    decision: agrees ? 'sources-agree' : 'ordered-both',
    reason: agrees
      ? 'Both reviewed sources specify the same value; the canonical list contains it once.'
      : 'The richer design recommendation is first and the established template value remains an explicit second option.',
  };
}

/*** Build one public reconciliation report entry from the canonical source. */
function createReconciliationReport(
  source: CategoryPresetReconciliationSource,
): CategoryPresetReconciliationReport {
  return { category: source.category, source, fields: createFieldReconciliation(source) };
}

export const CATEGORY_PRESET_RECONCILIATION: readonly CategoryPresetReconciliationReport[] =
  CATEGORY_RECONCILIATION_SOURCE.map(createReconciliationReport);

export const CATEGORY_PRESETS: Record<AppCategory, CategoryPreset> = {
  books_reading: createCategoryPreset(resolveSource('books_reading')),
  business_productivity: createCategoryPreset(resolveSource('business_productivity')),
  developer_tools: createCategoryPreset(resolveSource('developer_tools')),
  education_learning: createCategoryPreset(resolveSource('education_learning')),
  entertainment_media: createCategoryPreset(resolveSource('entertainment_media')),
  finance_money: createCategoryPreset(resolveSource('finance_money')),
  food_drink: createCategoryPreset(resolveSource('food_drink')),
  games: createCategoryPreset(resolveSource('games')),
  graphics_design: createCategoryPreset(resolveSource('graphics_design')),
  health_fitness: createCategoryPreset(resolveSource('health_fitness')),
  kids_family: createCategoryPreset(resolveSource('kids_family')),
  lifestyle: createCategoryPreset(resolveSource('lifestyle')),
  medical: createCategoryPreset(resolveSource('medical')),
  music_audio: createCategoryPreset(resolveSource('music_audio')),
  navigation_travel: createCategoryPreset(resolveSource('navigation_travel')),
  news_magazines: createCategoryPreset(resolveSource('news_magazines')),
  photo_video: createCategoryPreset(resolveSource('photo_video')),
  reference: createCategoryPreset(resolveSource('reference')),
  shopping_commerce: createCategoryPreset(resolveSource('shopping_commerce')),
  social_community: createCategoryPreset(resolveSource('social_community')),
  sports: createCategoryPreset(resolveSource('sports')),
  utilities_tools: createCategoryPreset(resolveSource('utilities_tools')),
  weather: createCategoryPreset(resolveSource('weather')),
};

export type {
  CategoryPreset,
  CategoryPresetFieldReconciliation,
  CategoryPresetReconciliationDecision,
  CategoryPresetReconciliationReport,
} from '../design/category-types';
