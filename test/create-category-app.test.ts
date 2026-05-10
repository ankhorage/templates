import type { AppCategory, AppManifest, UiNode } from '@ankhorage/contracts';
import { describe, expect, test } from 'bun:test';

import {
  APP_CATEGORIES,
  CATEGORY_PRESETS,
  createCategoryAppManifest,
  createStarterTemplate,
  type TemplateSeed,
} from '../src/index';
import { listStarterTemplates } from '../src/templates/starter/starter.registry';

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
    primaryColor: preset.primaryColor,
    harmony: preset.harmony,
  };
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

  for (const route of manifest.navigator.routes) {
    expect(route.screenId).toBeDefined();
    expect(route.screenId ? manifest.screens[route.screenId] : undefined).toBeDefined();
  }

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
  books_reading: ['Library', 'Discover', 'Lists', 'Notes', 'Profile'],
  business_productivity: ['Dashboard', 'Projects', 'Tasks', 'Calendar', 'Reports', 'Settings'],
  developer_tools: ['Dashboard', 'Builds', 'Incidents', 'Environments', 'Deployments', 'Settings'],
  education_learning: ['Courses', 'Study', 'Practice', 'Progress', 'Profile'],
  entertainment_media: ['Discover', 'Watchlist', 'Now', 'Library', 'Profile'],
  finance_money: ['Overview', 'Accounts', 'Transactions', 'Budget', 'Insights'],
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

const CATEGORY_EXPECTED_NAVIGATORS: Record<AppCategory, AppManifest['navigator']['type']> = {
  books_reading: 'tabs',
  business_productivity: 'drawer',
  developer_tools: 'drawer',
  education_learning: 'tabs',
  entertainment_media: 'tabs',
  finance_money: 'tabs',
  food_drink: 'tabs',
  games: 'tabs',
  graphics_design: 'drawer',
  health_fitness: 'tabs',
  kids_family: 'tabs',
  lifestyle: 'tabs',
  medical: 'tabs',
  music_audio: 'tabs',
  navigation_travel: 'tabs',
  news_magazines: 'tabs',
  photo_video: 'tabs',
  reference: 'drawer',
  shopping_commerce: 'tabs',
  social_community: 'tabs',
  sports: 'tabs',
  utilities_tools: 'drawer',
  weather: 'tabs',
};

describe('createCategoryAppManifest', () => {
  test('builds a manifest for every category preset', () => {
    for (const category of APP_CATEGORIES) {
      const manifest: AppManifest = createCategoryAppManifest(category);
      const preset = CATEGORY_PRESETS[category];

      expect(manifest.metadata.name).toBe(preset.defaultName);
      expect(manifest.metadata.slug).toBe(preset.defaultSlug);
      expect(manifest.themes[0]?.light).toEqual({
        primaryColor: preset.primaryColor,
        harmony: preset.harmony,
      });
      expect(Object.keys(manifest.themes[0]?.light ?? {}).sort()).toEqual([
        'harmony',
        'primaryColor',
      ]);
      expect(manifest.themes[0]?.dark).toEqual({
        primaryColor: preset.primaryColor,
        harmony: preset.harmony,
      });
      expect(Object.keys(manifest.themes[0]?.dark ?? {}).sort()).toEqual([
        'harmony',
        'primaryColor',
      ]);
      assertManifestIntegrity(manifest);

      const categoryRouteLabels = CATEGORY_SPECIFIC_ROUTE_LABELS[category];

      expect(categoryRouteLabels).toBeDefined();
      expect(manifest.navigator.type).toBe(CATEGORY_EXPECTED_NAVIGATORS[category]);
      expect(manifest.navigator.routes.map((route) => route.label ?? '')).toEqual([
        ...(categoryRouteLabels ?? []),
      ]);
      expect(manifest.navigator.routes.every((route) => route.icon)).toBe(true);
      expect(
        manifest.navigator.routes.every((route) => route.icon?.provider === 'material-community'),
      ).toBe(true);

      expect(manifest.navigator.routes.map((route) => route.name)).not.toContain('sign-in');

      expect(manifest.settings.authFlow.signInRoute).toBe('sign-in');
      expect(manifest.settings.authFlow.signUpRoute).toBe('sign-up');
      expect(manifest.settings.authFlow.signOutRoute).toBe('sign-out');
      expect(manifest.settings.authFlow.postSignInRoute).toBe('index');
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
    });

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
  });
});

describe('createStarterTemplate', () => {
  test('uses ZORA node types instead of legacy surface-only building blocks', () => {
    const manifest = createStarterTemplate({
      category: 'developer_tools',
      categoryLabel: 'Developer Tools',
      appName: 'Developer Tools',
      slug: 'developer-tools-app',
      summary: 'release workflows, observability, and engineering operations',
      focusAreas: ['Build status', 'Incident queue', 'Developer settings'],
      primaryColor: '#7C3AED',
      harmony: 'triadic',
    });

    const nodeTypes = Object.values(manifest.screens).flatMap((screen) =>
      collectNodeTypes(screen.root),
    );

    expect(nodeTypes).toContain('Page');
    expect(nodeTypes).toContain('Panel');
    expect(nodeTypes).toContain('Card');
    expect(nodeTypes).toContain('SettingsRow');
    expect(nodeTypes).not.toContain('Box');
    expect(nodeTypes).not.toContain('Container');
    expect(nodeTypes).not.toContain('Stack');
    expect(nodeTypes).not.toContain('Heading');
  });

  test('builds a dedicated template for known AppCategory values', () => {
    const manifest = createStarterTemplate(createSeed('developer_tools'));

    expect(manifest.navigator.type).toBe('drawer');
    expect(manifest.navigator.routes.map((route) => route.label)).toEqual([
      'Dashboard',
      'Builds',
      'Incidents',
      'Environments',
      'Deployments',
      'Settings',
    ]);
    expect(manifest.screens['developer_tools-starter-sign-in']).toBeUndefined();
  });

  test('falls back to the generic starter for unknown runtime categories', () => {
    const seed: TemplateSeed = {
      ...createSeed('developer_tools'),
      category: 'unknown_category' as TemplateSeed['category'],
      categoryLabel: 'Unknown Category',
      appName: 'Unknown App',
      slug: 'unknown-app',
    };
    const manifest = createStarterTemplate(seed);

    expect(manifest.navigator.routes.map((route) => route.label)).toEqual([
      'Home',
      'Details',
      'Settings',
    ]);
    expect(manifest.metadata.slug).toBe('unknown-app');
  });

  test('uses category default when a requested template id is unknown', () => {
    const manifest = createStarterTemplate(createSeed('social_community'), {
      templateId: 'missing-template',
    });

    expect(manifest.navigator.routes.map((route) => route.label)).toEqual([
      'Feed',
      'Groups',
      'Messages',
      'Profile',
      'Settings',
    ]);
  });

  test('selects different social community template variants', () => {
    const community = createStarterTemplate(createSeed('social_community'), {
      templateId: 'community',
    });
    const creator = createStarterTemplate(createSeed('social_community'), {
      templateId: 'creator',
    });

    expect(community.navigator.routes.map((route) => route.label)).toEqual([
      'Feed',
      'Groups',
      'Messages',
      'Profile',
      'Settings',
    ]);
    expect(creator.navigator.routes.map((route) => route.label)).toEqual([
      'Studio',
      'Posts',
      'Audience',
      'Insights',
      'Settings',
    ]);
    expect(community.navigator.routes.map((route) => route.label)).not.toEqual(
      creator.navigator.routes.map((route) => route.label),
    );
  });

  test('creates valid manifests for every registered category template', () => {
    for (const category of APP_CATEGORIES) {
      for (const template of listStarterTemplates(category)) {
        const manifest = createStarterTemplate(createSeed(category), { templateId: template.id });

        assertManifestIntegrity(manifest);
        expect(manifest.navigator.routes.map((route) => route.name)).not.toContain('sign-in');
        expect(manifest.navigator.routes.every((route) => route.icon)).toBe(true);
        expect(
          manifest.navigator.routes.every((route) => route.icon?.provider === 'material-community'),
        ).toBe(true);
      }
    }
  });
});
