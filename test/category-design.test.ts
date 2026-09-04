import type { NavigatorSpec, ScreenSpec } from '@ankhorage/contracts';
import { describe, expect, test } from 'bun:test';

import {
  ACCENT_TONE_FAMILIES,
  APP_CATEGORIES,
  assertTemplateManifestReady,
  CATEGORY_PRESET_RECONCILIATION,
  CATEGORY_PRESETS,
  compileCategoryDesign,
  composeCategoryAppManifest,
  type ComposeCategoryAppManifestInput,
  FOUNDATION_TONE_FAMILIES,
  resolveCategoryDesignPreset,
  TONE_PAIR_CATALOG,
  validateTemplateManifest,
} from '../src';

const baseNavigator: NavigatorSpec = {
  type: 'stack',
  initialRouteName: 'home',
  routes: [{ name: 'home', path: '/', screenId: 'home' }],
};

const baseScreen: ScreenSpec = {
  id: 'home',
  name: 'Home',
  title: 'Home',
  description: 'Home screen',
  root: { id: 'home-root', type: 'Screen', props: {}, children: [] },
};

const baseScreens: Record<string, ScreenSpec> = { home: baseScreen };

function createMissingElementScreens(): Record<string, ScreenSpec> {
  return {
    home: {
      ...baseScreen,
      root: {
        id: 'home-root',
        type: 'Screen',
        children: [
          {
            id: 'missing-chart',
            type: 'MissingElement',
            props: { requestedCapability: 'polar-area-chart', reason: 'No ZORA element.' },
          },
        ],
        repeat: {
          source: { kind: 'literal', value: [] },
          empty: [
            {
              id: 'missing-map',
              type: 'MissingElement',
              props: { requestedCapability: 'indoor-map', reason: 'No ZORA element.' },
            },
          ],
        },
      },
    },
  };
}

describe('category preset reconciliation', () => {
  test('covers every AppCategory once and accounts for every source field', () => {
    expect(Object.keys(CATEGORY_PRESETS).sort()).toEqual([...APP_CATEGORIES].sort());
    expect(CATEGORY_PRESET_RECONCILIATION.map(({ category }) => category).sort()).toEqual(
      [...APP_CATEGORIES].sort(),
    );

    for (const report of CATEGORY_PRESET_RECONCILIATION) {
      const fields = report.fields.map(({ field }) => field).join('|');
      for (const key of Object.keys(report.source.existing)) expect(fields).toContain(key);
      for (const key of Object.keys(report.source.supplied)) expect(fields).toContain(key);

      const preset = CATEGORY_PRESETS[report.category];
      expect(preset.recommendedPrimaryColors[0]).toBe(report.source.supplied.primaryColor);
      expect(preset.recommendedPrimaryColors).toContain(report.source.existing.primaryColor);
      expect(new Set(preset.recommendedPrimaryColors).size).toBe(
        preset.recommendedPrimaryColors.length,
      );
      expect(preset.recommendedHarmonies[0]).toBe(report.source.supplied.harmony);
      expect(preset.recommendedHarmonies).toContain(report.source.existing.harmony);
      expect(new Set(preset.recommendedHarmonies).size).toBe(preset.recommendedHarmonies.length);
    }
  });
});

describe('tone pair catalog', () => {
  test('contains every accent and foundation pair exactly once with mode policy', () => {
    expect(TONE_PAIR_CATALOG).toHaveLength(
      ACCENT_TONE_FAMILIES.length * FOUNDATION_TONE_FAMILIES.length,
    );
    expect(new Set(TONE_PAIR_CATALOG.map(({ id }) => id)).size).toBe(70);

    for (const accent of ACCENT_TONE_FAMILIES) {
      for (const foundation of FOUNDATION_TONE_FAMILIES) {
        const pair = TONE_PAIR_CATALOG.find(
          (candidate) => candidate.accent === accent && candidate.foundation === foundation,
        );
        expect(pair).toBeDefined();
        expect(pair?.modes).toHaveLength(1);
        if (!pair) throw new Error(`Missing ${accent}-on-${foundation}.`);
        expect(['recommended', 'conditional', 'unsafe']).toContain(pair.classification);
      }
    }
  });

  test('requires measurable flat fallbacks for decorative finish families', () => {
    for (const pair of TONE_PAIR_CATALOG) {
      if (pair.accent === 'metallic' || pair.accent === 'neon') {
        expect(pair.decorativeFinish).toBeDefined();
        expect(pair.flatFallbackTarget).toBeDefined();
      } else {
        expect(pair.decorativeFinish).toBeUndefined();
        expect(pair.flatFallbackTarget).toBeUndefined();
      }
    }
  });
});

describe('category design resolution', () => {
  test('compiles every category deterministically through ZORA owner evidence', () => {
    for (const category of APP_CATEGORIES) {
      const first = compileCategoryDesign(category);
      const second = compileCategoryDesign(category);
      expect(JSON.stringify(first)).toBe(JSON.stringify(second));
      expect(first.computedTheme.themeConfig).toEqual(first.themeConfig);
      expect(first.computedTheme.light.surfaceTheme).toBeDefined();
      expect(first.computedTheme.dark.surfaceTheme).toBeDefined();
    }
  });

  test('applies explicit mode and token overrides after category defaults', () => {
    const result = resolveCategoryDesignPreset('finance_money', {
      primaryColor: '#112233',
      harmony: 'square',
      light: { primaryColor: '#223344', harmony: 'triadic' },
      dark: { primaryColor: '#DDEEFF', harmony: 'monochromatic' },
      density: 'spacious',
      shape: 'soft',
      tokens: { spacing: { m: 99 }, radii: { l: 77 } },
    });

    expect(result.themeConfig.light).toEqual({ primaryColor: '#223344', harmony: 'triadic' });
    expect(result.themeConfig.dark).toEqual({
      primaryColor: '#DDEEFF',
      harmony: 'monochromatic',
    });
    expect(result.themeConfig.tokens?.spacing?.m).toBe(99);
    expect(result.themeConfig.tokens?.radii?.l).toBe(77);
  });

  test('retains invalid and mode-incompatible tone intent as diagnostics', () => {
    const invalid = resolveCategoryDesignPreset('weather', {
      tonePairs: { light: 'unknown-on-foundation' },
    });
    expect(invalid.tonePairs.light).toBeNull();
    expect(invalid.diagnostics.map(({ code }) => code)).toContain('unknown-tone-pair');

    const mismatched = resolveCategoryDesignPreset('weather', {
      tonePairs: { light: 'neon-on-neutral-dark' },
    });
    expect(mismatched.diagnostics.map(({ code }) => code)).toContain('tone-pair-mode-mismatch');
    expect(mismatched.diagnostics.map(({ code }) => code)).toContain(
      'decorative-finish-requires-runtime-recipe',
    );
  });
});

describe('ready manifest composition', () => {
  test('returns a canonical deterministic manifest with data and module inputs', () => {
    const input = {
      category: 'business_productivity',
      name: 'Work Board',
      slug: 'work-board',
      navigator: baseNavigator,
      screens: baseScreens,
      dataSources: {},
      dataBindings: {},
      modules: ['expo-localization'],
      modulesConfig: { localization: { defaultLocale: 'en' } },
    } satisfies ComposeCategoryAppManifestInput;
    const first = composeCategoryAppManifest(input);
    const second = composeCategoryAppManifest(input);

    expect(first.status).toBe('ready');
    expect(first.diagnostics).toEqual([]);
    expect(first.manifest).toEqual(second.manifest);
    expect(first.manifest.infra.modules).toEqual(['expo-localization']);
    expect(first.manifest.infra.modulesConfig).toEqual(input.modulesConfig);
    expect(first.manifest.dataSources).toEqual({});
    expect(first.manifest.dataBindings).toEqual({});
    expect(assertTemplateManifestReady(first)).toBe(first.manifest);
  });
});

describe('blocked manifest composition', () => {
  test('blocks every MissingElement and reports its capability and path', () => {
    const result = composeCategoryAppManifest({
      category: 'business_productivity',
      navigator: baseNavigator,
      screens: createMissingElementScreens(),
      authoringState: 'draft',
    });

    expect(result.status).toBe('blocked');
    expect(result.diagnostics.filter(({ code }) => code === 'missing-element')).toHaveLength(2);
    const capabilities = result.diagnostics.map(({ requestedCapability }) => requestedCapability);
    expect(capabilities).toContain('polar-area-chart');
    expect(capabilities).toContain('indoor-map');
    expect(() => assertTemplateManifestReady(result)).toThrow('not release-ready');
  });

  test('blocks routes that refer to absent screens', () => {
    const result = composeCategoryAppManifest({
      category: 'reference',
      navigator: {
        ...baseNavigator,
        routes: [{ name: 'missing', screenId: 'absent' }],
      },
      screens: baseScreens,
    });
    expect(result.status).toBe('blocked');
    expect(result.diagnostics.map(({ code }) => code)).toContain('missing-route-screen');
  });

  test('blocks missing navigator initial routes and authenticated landing screens', () => {
    const { manifest } = composeCategoryAppManifest({
      category: 'reference',
      navigator: baseNavigator,
      screens: baseScreens,
      authoringState: 'release',
    });
    manifest.navigator.initialRouteName = 'missing';
    manifest.infra.auth = {
      provider: 'supabase',
      scope: 'global',
      flow: {
        signInRoute: 'sign-in',
        postSignInRoute: '/missing',
      },
    };

    const result = validateTemplateManifest(manifest, 'release');

    expect(result.status).toBe('blocked');
    expect(result.diagnostics.map(({ code }) => code)).toContain('missing-initial-route');
    expect(result.diagnostics.map(({ code }) => code)).toContain('missing-auth-landing-route');
  });
});
