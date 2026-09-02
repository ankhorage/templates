import { parseHexColorOrThrow } from '@ankhorage/color-theory';
import type { AppCategory, ThemeConfig } from '@ankhorage/contracts';
import {
  compileZoraTheme,
  createZoraThemeConfig,
  type ZoraComputedTheme,
  type ZoraThemeSelectionTarget,
} from '@ankhorage/zora/theme';

import { CATEGORY_PRESETS } from '../presets/category-presets';
import type { DesignDensity, DesignShape } from './category-types';
import { resolveTonePair, type ThemeMode, type TonePairDefinition } from './tone-catalog';

export type CategoryDesignDiagnosticCode =
  'decorative-finish-requires-runtime-recipe' | 'tone-pair-mode-mismatch' | 'unknown-tone-pair';

export interface CategoryDesignDiagnostic {
  readonly code: CategoryDesignDiagnosticCode;
  readonly severity: 'error' | 'warning';
  readonly path: string;
  readonly message: string;
}

export interface CategoryDesignOverrides {
  readonly themeId?: string;
  readonly themeName?: string;
  readonly primaryColor?: string;
  readonly harmony?: ThemeConfig['light']['harmony'];
  readonly light?: Partial<ThemeConfig['light']>;
  readonly dark?: Partial<ThemeConfig['dark']>;
  readonly tonePairs?: Partial<Record<ThemeMode, string>>;
  readonly density?: DesignDensity;
  readonly shape?: DesignShape;
  readonly tokens?: ThemeConfig['tokens'];
  readonly recipes?: ThemeConfig['recipes'];
}

export interface ResolvedCategoryDesignPreset {
  readonly category: AppCategory;
  readonly preset: (typeof CATEGORY_PRESETS)[AppCategory];
  readonly primaryColor: string;
  readonly harmony: ThemeConfig['light']['harmony'];
  readonly tonePairs: Readonly<Record<ThemeMode, TonePairDefinition | null>>;
  readonly density: DesignDensity;
  readonly shape: DesignShape;
  readonly themeConfig: ThemeConfig;
  readonly diagnostics: readonly CategoryDesignDiagnostic[];
}

export interface CompiledCategoryDesign extends ResolvedCategoryDesignPreset {
  readonly computedTheme: ZoraComputedTheme;
}

/*** Resolve canonical spacing token overrides for one density profile. */
function resolveDensityTokens(
  density: DesignDensity,
): NonNullable<ThemeConfig['tokens']>['spacing'] {
  if (density === 'compact') return { none: 0, xs: 4, s: 8, m: 12, l: 20, xl: 28, xxl: 40 };
  if (density === 'spacious') return { none: 0, xs: 5, s: 10, m: 20, l: 30, xl: 40, xxl: 60 };
  return { none: 0, xs: 4, s: 8, m: 16, l: 24, xl: 32, xxl: 48 };
}

/*** Resolve canonical radius token overrides for one shape profile. */
function resolveShapeTokens(shape: DesignShape): NonNullable<ThemeConfig['tokens']>['radii'] {
  if (shape === 'sharp') return { none: 0, s: 2, m: 4, l: 8, full: 9999 };
  if (shape === 'soft') return { none: 0, s: 8, m: 12, l: 24, full: 9999 };
  return { none: 0, s: 4, m: 8, l: 16, full: 9999 };
}

/*** Create canonical Contracts token overrides from reviewed density and shape direction. */
function createProfileTokens(
  density: DesignDensity,
  shape: DesignShape,
  overrides: ThemeConfig['tokens'],
): NonNullable<ThemeConfig['tokens']> {
  return {
    spacing: { ...resolveDensityTokens(density), ...overrides?.spacing },
    radii: { ...resolveShapeTokens(shape), ...overrides?.radii },
    ...(overrides?.typography ? { typography: overrides.typography } : {}),
    ...(overrides?.shadows ? { shadows: overrides.shadows } : {}),
  };
}

/*** Resolve one requested tone pair and retain unsupported intent as diagnostics. */
function resolveModeTonePair(
  mode: ThemeMode,
  id: string,
  diagnostics: CategoryDesignDiagnostic[],
): TonePairDefinition | null {
  const pair = resolveTonePair(id);
  if (!pair) {
    diagnostics.push({
      code: 'unknown-tone-pair',
      severity: 'error',
      path: `tonePairs.${mode}`,
      message: `Tone pair "${id}" is not present in the canonical Templates catalog.`,
    });
    return null;
  }
  if (!pair.modes.includes(mode)) {
    diagnostics.push({
      code: 'tone-pair-mode-mismatch',
      severity: 'error',
      path: `tonePairs.${mode}`,
      message: `Tone pair "${id}" is reviewed for ${pair.modes.join(', ')} mode, not ${mode}.`,
    });
  }
  if (pair.decorativeFinish) {
    diagnostics.push({
      code: 'decorative-finish-requires-runtime-recipe',
      severity: 'warning',
      path: `tonePairs.${mode}`,
      message: `${pair.decorativeFinish} remains design intent; only its measurable flat fallback is compiled.`,
    });
  }
  return pair;
}

/*** Resolve category defaults and explicit overrides into canonical compact ThemeConfig source. */
export function resolveCategoryDesignPreset(
  category: AppCategory,
  overrides: CategoryDesignOverrides = {},
): ResolvedCategoryDesignPreset {
  const preset = Object.values(CATEGORY_PRESETS).find(
    (candidate) => candidate.category === category,
  );
  if (!preset) throw new Error(`Missing category preset: ${category}.`);
  const primaryColor = overrides.primaryColor ?? preset.recommendedPrimaryColors[0];
  const harmony = overrides.harmony ?? preset.recommendedHarmonies[0];
  const density = overrides.density ?? preset.density;
  const shape = overrides.shape ?? preset.shape;
  const diagnostics: CategoryDesignDiagnostic[] = [];
  const lightToneId = overrides.tonePairs?.light ?? preset.tonePairs.light;
  const darkToneId = overrides.tonePairs?.dark ?? preset.tonePairs.dark;
  const base = createZoraThemeConfig({
    id: overrides.themeId ?? 'default',
    name: overrides.themeName ?? 'Default',
    appCategory: category,
    primaryColor,
    harmony,
  });
  const themeConfig: ThemeConfig = {
    ...base,
    light: { ...base.light, ...overrides.light },
    dark: { ...base.dark, ...overrides.dark },
    tokens: createProfileTokens(density, shape, overrides.tokens),
    ...(overrides.recipes ? { recipes: overrides.recipes } : {}),
  };
  return {
    category,
    preset,
    primaryColor,
    harmony,
    tonePairs: {
      light: resolveModeTonePair('light', lightToneId, diagnostics),
      dark: resolveModeTonePair('dark', darkToneId, diagnostics),
    },
    density,
    shape,
    themeConfig,
    diagnostics,
  };
}

/*** Create compiler selection targets for the measurable accent and foundation direction. */
function createSelectionTargets(
  mode: ThemeMode,
  pair: TonePairDefinition | null,
): readonly ZoraThemeSelectionTarget[] {
  if (!pair) return [];
  const darkMode = mode === 'dark';
  return [
    {
      id: 'accent',
      swatch: 'primary',
      target: pair.flatFallbackTarget ?? pair.accentTarget,
      contexts: [
        {
          id: darkMode ? 'on-dark-canvas' : 'on-light-canvas',
          against: parseHexColorOrThrow(darkMode ? '#000000' : '#FFFFFF'),
          minimumContrast: 3,
        },
      ],
      tiePolicy: darkMode ? 'higher-step' : 'lower-step',
    },
    {
      id: 'foundation',
      swatch: 'neutral',
      target: pair.foundationTarget,
      contexts: [
        {
          id: darkMode ? 'light-content' : 'dark-content',
          against: parseHexColorOrThrow(darkMode ? '#FFFFFF' : '#000000'),
          minimumContrast: 4.5,
        },
      ],
      tiePolicy: darkMode ? 'higher-step' : 'lower-step',
    },
  ];
}

/*** Resolve and compile a category theme through the released ZORA owner pipeline. */
export function compileCategoryDesign(
  category: AppCategory,
  overrides: CategoryDesignOverrides = {},
): CompiledCategoryDesign {
  const resolved = resolveCategoryDesignPreset(category, overrides);
  const computedTheme = compileZoraTheme(resolved.themeConfig, {
    selectionTargets: {
      light: createSelectionTargets('light', resolved.tonePairs.light),
      dark: createSelectionTargets('dark', resolved.tonePairs.dark),
    },
  });
  return { ...resolved, computedTheme };
}
