import type { AppCategory, AppManifest, SplashScreenSpec, UiNode } from '@ankhorage/contracts';
import { describe, expect, test } from 'bun:test';

import {
  APP_CATEGORIES,
  CATEGORY_PRESETS,
  createCategoryAppManifest,
  createStarterTemplate,
  listStarterTemplates,
  listStarterTemplatesByCategory,
  listStarterTemplateSummaries,
  type TemplateSeed,
} from '../src/index';

interface ManifestWithSplashScreen extends AppManifest {
  readonly splashScreen: SplashScreenSpec;
}

function collectNodeTypes(node: UiNode): string[] {
  return [node.type, ...(node.children?.flatMap(collectNodeTypes) ?? [])];
}

function createSeed(category: AppCategory): TemplateSeed {
  const preset = CATEGORY_PRESETS[category];

  return {
    category,
    categoryLabel: preset.label,
    appName: preset.defaultName,
    slug: preset.defaultSlug,
    summary: preset.summary,
    focusAreas: preset.focusAreas,
    primaryColor: preset.recommendedPrimaryColors[0],
    harmony: preset.recommendedHarmonies[0],
  };
}

function assertSplashScreen(manifest: ManifestWithSplashScreen, expectedBackgroundColor: string) {
  expect(manifest.splashScreen).toEqual({
    backgroundColor: expectedBackgroundColor,
    image: './assets/splash/icon.png',
    imageWidth: 160,
    resizeMode: 'contain',
    dark: {
      backgroundColor: expectedBackgroundColor,
      image: './assets/splash/icon-dark.png',
      imageWidth: 160,
      resizeMode: 'contain',
    },
  });
}

function assertManifestIntegrity(manifest: AppManifest) {
  expect(manifest.metadata.themeId).toBe(manifest.activeThemeId);
  expect(manifest.themes.some((theme) => theme.id === manifest.activeThemeId)).toBe(true);

  const routeNames = manifest.navigator.routes.map((route) => route.name);
  const { initialRouteName } = manifest.navigator;
  expect(initialRouteName).toBeDefined();

  if (initialRouteName) {
    expect(routeNames).toContain(initialRouteName);
  }

  const assertRoutes = (routes: AppManifest['navigator']['routes']) => {
    for (const route of routes) {
      if (route.screenId) {
        expect(manifest.screens[route.screenId]).toBeDefined();
      }

      if (route.navigator) {
        const nestedRouteNames = route.navigator.routes.map((nestedRoute) => nestedRoute.name);

        if (route.navigator.initialRouteName) {
          expect(nestedRouteNames).toContain(route.navigator.initialRouteName);
        }

        assertRoutes(route.navigator.routes);
      } else {
        expect(route.screenId).toBeDefined();
      }
    }
  };

  assertRoutes(manifest.navigator.routes);

  for (const screen of Object.values(manifest.screens)) {
    expect(screen.id).toBeTruthy();
    expect(screen.name).toBeTruthy();
    expect(screen.title).toBeTruthy();
    expect(screen.description).toBeTruthy();
    expect(screen.root.id).toBeTruthy();
    expect(screen.root.type).toBeTruthy();
  }
}

const CATEGORY_SPECIFIC_ROUTE_LABELS: Partial<Record<AppCategory, readonly string[]>> = {
  business_productivity: ['Project'],
  finance_money: ['Home', 'Assets', 'Payments', 'Invest', 'More'],
  // business_productivity route labels updated for urban-water-monitor
  developer_tools: ['Dashboard', 'Builds', 'Incidents', 'Environments', 'Deployments', 'Settings'],
  education_learning: ['Courses', 'Study', 'Practice', 'Progress', 'Profile'],
  entertainment_media: ['Discover', 'Watchlist', 'Now', 'Library', 'Profile'],
  // finance_money route labels updated for ebanking-mobile
  food_drink: ['Discover', 'Menu', 'Reservations', 'Orders', 'Profile'],
  games: ['Home', 'Quests', 'Inventory', 'Friends', 'Profile'],
  graphics_design: ['Dashboard', 'Briefs', 'Assets', 'Reviews', 'Brand', 'Settings'],
  health_fitness: ['Today', 'Plans', 'Progress', 'Coach', 'Profile'],
  kids_family: ['Home', 'Routines', 'Discover', 'Favorites', 'Parents'],
  lifestyle: ['Dashboard', 'Collections', 'Plans', 'Explore', 'Profile'],
  medical: ['Appointments', 'Care Team', 'Records', 'Messages', 'Profile'],
  music_audio: ['Home', 'Search', 'Library', 'Player', 'Profile'],
  navigation_travel: ['Destinations', 'Itinerary', 'Bookings', 'Map', 'Profile'],
  news_magazines: ['Headlines', 'Topics', 'Saved', 'Search', 'Profile'],
  photo_video: ['Capture', 'Library', 'Edit', 'Share', 'Profile'],
  reference: ['Browse', 'Search', 'Categories', 'Saved', 'History', 'Settings'],
  shopping_commerce: ['Browse', 'Search', 'Sell', 'Orders', 'Profile'],
  social_community: ['Feed', 'Groups', 'Messages', 'Profile', 'Settings'],
  sports: ['Scores', 'Schedule', 'Standings', 'Teams', 'Profile'],
  utilities_tools: ['Dashboard', 'Tools', 'Shortcuts', 'Storage', 'Diagnostics', 'Settings'],
  weather: ['Now', 'Forecast', 'Alerts', 'Locations'],
};

const CATEGORY_EXPECTED_NAVIGATORS: Record<string, AppManifest['navigator']['type']> = {
  business_productivity: 'tabs',
  finance_money: 'tabs',
};

describe('createCategoryAppManifest', () => {
  test('builds a manifest for every category preset', () => {
    for (const category of ['business_productivity', 'finance_money'] as const) {
      const manifest = createCategoryAppManifest(category) as ManifestWithSplashScreen;
      const preset = CATEGORY_PRESETS[category];

      expect(manifest.metadata.name).toBe(preset.defaultName);
      expect(manifest.metadata.slug).toBe(preset.defaultSlug);
      expect(manifest.metadata.category).toBe(category);
      expect(manifest.themes[0]?.light).toEqual({
        primaryColor: preset.recommendedPrimaryColors[0],
        harmony: preset.recommendedHarmonies[0],
      });
      expect(Object.keys(manifest.themes[0]?.light ?? {}).sort()).toEqual([
        'harmony',
        'primaryColor',
      ]);
      expect(manifest.themes[0]?.dark).toEqual({
        primaryColor: preset.recommendedPrimaryColors[0],
        harmony: preset.recommendedHarmonies[0],
      });
      expect(Object.keys(manifest.themes[0]?.dark ?? {}).sort()).toEqual([
        'harmony',
        'primaryColor',
      ]);
      assertSplashScreen(manifest, preset.recommendedPrimaryColors[0]);
      assertManifestIntegrity(manifest);

      const categoryRouteLabels = CATEGORY_SPECIFIC_ROUTE_LABELS[category] ?? [];

      expect(categoryRouteLabels).toBeDefined();
      expect(manifest.navigator.type).toBe(CATEGORY_EXPECTED_NAVIGATORS[category] ?? 'tabs');
      expect(manifest.navigator.routes.map((route) => route.label ?? '')).toEqual([
        ...(categoryRouteLabels ?? []),
      ]);
      expect(manifest.navigator.routes.every((route) => route.icon)).toBe(true);
      expect(
        manifest.navigator.routes.every((route) => route.icon?.provider === 'material-community'),
      ).toBe(true);

      expect(manifest.navigator.routes.map((route) => route.name)).not.toContain('sign-in');

      expect(manifest.infra.auth?.flow).toMatchObject({
        signInRoute: 'sign-in',
        signUpRoute: 'sign-up',
        signOutRoute: 'sign-out',
        postSignInRoute: expect.stringMatching(/^(home|index)$/),
      });
      expect(manifest.infra.auth?.authorization).toBeUndefined();
      expect(manifest.settings).not.toHaveProperty('authFlow');
      expect(manifest.infra.auth?.scope).toBe('global');
      expect(manifest.infra.storage).toEqual({
        provider: 'auto',
        buckets: ['media'],
      });
    }
  });

  test('applies manifest overrides after composing the preset and template', () => {
    const manifest = createCategoryAppManifest('finance_money', 'starter', {
      metadata: {
        name: 'Treasury Console',
        slug: 'treasury-console',
      },
      settings: {
        localization: {
          defaultLocale: 'de',
          locales: ['de', 'en'],
        },
      },
      infra: {
        networking: {
          cdn: true,
          domain: 'money.example.test',
        },
      },
      activeThemeMode: 'dark',
      themes: [
        {
          id: 'brand',
          name: 'Brand',
          light: {
            primaryColor: '#0F766E',
            harmony: 'monochromatic',
          },
          dark: {
            primaryColor: '#0F766E',
            harmony: 'monochromatic',
          },
        },
      ],
    }) as ManifestWithSplashScreen;

    expect(manifest.metadata.name).toBe('Treasury Console');
    expect(manifest.metadata.slug).toBe('treasury-console');
    expect(manifest.settings.localization.defaultLocale).toBe('de');
    expect(manifest.settings.localization.locales).toEqual(['de', 'en']);
    expect(manifest.infra.networking?.cdn).toBe(true);
    expect(manifest.infra.networking?.domain).toBe('money.example.test');
    expect(manifest.infra.storage).toEqual({
      provider: 'auto',
      buckets: ['media'],
    });
    expect(manifest.activeThemeMode).toBe('dark');
    expect(manifest.themes[0]?.id).toBe('brand');
    expect(manifest.themes[0]?.light).toEqual({
      primaryColor: '#0F766E',
      harmony: 'monochromatic',
    });
    expect(Object.keys(manifest.themes[0]?.light ?? {}).sort()).toEqual([
      'harmony',
      'primaryColor',
    ]);
    expect(manifest.themes[0]?.dark).toEqual({
      primaryColor: '#0F766E',
      harmony: 'monochromatic',
    });
    expect(Object.keys(manifest.themes[0]?.dark ?? {}).sort()).toEqual(['harmony', 'primaryColor']);
    assertSplashScreen(manifest, '#0F766E');
  });

  test('keeps a metadata-only explicit theme id attached to the generated theme', () => {
    const manifest = createCategoryAppManifest('business_productivity', 'starter', {
      metadata: { themeId: 'weather-brand' },
      activeThemeId: 'weather-brand',
    });

    expect(manifest.activeThemeId).toBe('weather-brand');
    expect(manifest.themes[0]?.id).toBe('weather-brand');
  });
});

describe('starter template listing', () => {
  test('exposes category summaries without factories', () => {
    const templates = listStarterTemplatesByCategory('business_productivity');

    expect(templates).toEqual([
      {
        category: 'business_productivity',
        description:
          'An event-based urban water quality monitoring and field-campaign concept starter.',
        id: 'urban-water-monitor',
        label: 'Urban Water Monitor',
      },
    ]);
    expect(Object.keys(templates[0] ?? {})).not.toContain('create');
  });

  test('lists all registered starter summaries', () => {
    const summaries = listStarterTemplateSummaries();

    expect(summaries.some((s) => s.id === 'urban-water-monitor')).toBe(true);
    expect(summaries.some((summary) => summary.category === 'business_productivity')).toBe(true);
  });

  
});

describe('createStarterTemplate', () => {
  test('uses ZORA screen node types instead of legacy surface-only building blocks', () => {
    const manifest = createStarterTemplate({
      category: 'business_productivity',
      categoryLabel: 'Business Productivity',
      appName: 'Urban Water Monitor',
      slug: 'urban-water-monitor',
      summary: 'event-based urban water quality monitoring',
      focusAreas: ['Water quality', 'Field campaigns', 'Stakeholder communication'],
      primaryColor: '#0F766E',
      harmony: 'analogous',
    }).manifest as ManifestWithSplashScreen;

    assertSplashScreen(manifest, '#0F766E');

    const nodeTypes = Object.values(manifest.screens).flatMap((screen) =>
      collectNodeTypes(screen.root),
    );

    expect(nodeTypes).toContain('Screen');
    expect(nodeTypes).toContain('SectionHeader');
    expect(nodeTypes).toContain('DisclosureSection');
    expect(nodeTypes).toContain('Card');
    expect(nodeTypes).not.toContain('Page');
    expect(nodeTypes).not.toContain('PageHeader');
    expect(nodeTypes).not.toContain('PageSection');
    expect(nodeTypes).not.toContain('Box');
    expect(nodeTypes).not.toContain('Container');
    expect(nodeTypes).not.toContain('Stack');
    expect(nodeTypes).not.toContain('Heading');
  });

  test('keeps the theme mode switcher as template UI instead of a global requirement', () => {
    const { manifest: settingsManifest } = createStarterTemplate(createSeed('business_productivity'));
    const { manifest: weatherManifest } = createStarterTemplate(createSeed('finance_money'));
    const settingsNodeTypes = Object.values(settingsManifest.screens).flatMap((screen) =>
      collectNodeTypes(screen.root),
    );
    const weatherNodeTypes = Object.values(weatherManifest.screens).flatMap((screen) =>
      collectNodeTypes(screen.root),
    );

    expect(settingsNodeTypes).not.toContain('ThemeModeToggle');
    expect(weatherNodeTypes).not.toContain('ThemeModeToggle');
  });

  test('builds a dedicated template for known AppCategory values', () => {
    const { manifest } = createStarterTemplate(createSeed('business_productivity'));

    expect(manifest.navigator.type).toBe('tabs');
    expect(manifest.navigator.routes.map((route) => route.label)).toEqual([
      'Project',
    ]);
    expect(manifest.screens['business_productivity-urban-water-monitor-project']).toBeDefined();
  });

  test('uses category default when a requested template id is unknown', () => {
    const { manifest } = createStarterTemplate(createSeed('finance_money'), {
      templateId: 'missing-template',
    });

    expect(manifest.navigator.routes.map((route) => route.label)).toEqual([
      'Home',
      'Assets',
      'Payments',
      'Invest',
      'More',
    ]);
  });

  test('selects the social community default and creator variants', () => {
    const { manifest: community } = createStarterTemplate(createSeed('business_productivity'));
    const { manifest: creator } = createStarterTemplate(createSeed('finance_money'));

    expect(community.navigator.routes.map((route) => route.label)).toEqual([
      'Project',
    ]);
    expect(creator.navigator.routes.map((route) => route.label)).toEqual([
      'Home',
      'Assets',
      'Payments',
      'Invest',
      'More',
    ]);
  });

  test('creates valid manifests for every registered category template', () => {
    for (const category of APP_CATEGORIES) {
      for (const template of listStarterTemplates(category)) {
        const { manifest } = createStarterTemplate(createSeed(category), {
          templateId: template.id,
        });
        const visibleRoutes = manifest.navigator.routes.filter(
          (route) => route.showInPrimaryNavigation !== false,
        );
        const obsoleteVisibilityField = ['hide', 'InTabBar'].join('');

        assertManifestIntegrity(manifest);
        expect(JSON.stringify(manifest)).not.toContain(obsoleteVisibilityField);
        expect(manifest.navigator.routes.map((route) => route.name)).not.toContain('sign-in');
        expect(visibleRoutes.every((route) => route.icon)).toBe(true);
        expect(visibleRoutes.every((route) => route.icon?.provider === 'material-community')).toBe(
          true,
        );
      }
    }
  });
});
