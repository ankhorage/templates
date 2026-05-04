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
    colorTone: preset.colorTone,
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
  food_drink: ['Discover', 'Menu', 'Reservations', 'Orders', 'Profile'],
  health_fitness: ['Today', 'Plans', 'Progress', 'Coach', 'Profile'],
  shopping_commerce: ['Browse', 'Search', 'Sell', 'Orders', 'Profile'],
  social_community: ['Feed', 'Groups', 'Messages', 'Profile', 'Settings'],
};

describe('createCategoryAppManifest', () => {
  test('builds a manifest for every category preset', () => {
    for (const category of APP_CATEGORIES) {
      const manifest: AppManifest = createCategoryAppManifest(category);
      const preset = CATEGORY_PRESETS[category];

      expect(manifest.metadata.name).toBe(preset.defaultName);
      expect(manifest.metadata.slug).toBe(preset.defaultSlug);
      expect(manifest.themes[0]?.light.primaryColor).toBe(preset.primaryColor);
      expect(manifest.themes[0]?.light.harmony).toBe(preset.harmony);
      expect(manifest.themes[0]?.light.colorTone).toBe(preset.colorTone);
      assertManifestIntegrity(manifest);

      const categoryRouteLabels = CATEGORY_SPECIFIC_ROUTE_LABELS[category];

      if (categoryRouteLabels) {
        expect(manifest.navigator.routes.map((route) => route.label ?? '')).toEqual([
          ...categoryRouteLabels,
        ]);
        expect(manifest.navigator.routes.every((route) => route.icon)).toBe(true);
      } else {
        expect(manifest.navigator.routes.map((route) => route.name)).toEqual([
          'index',
          'details',
          'settings',
        ]);
      }

      expect(manifest.navigator.routes.map((route) => route.name)).not.toContain('sign-in');

      expect(manifest.settings.authFlow.signInRoute).toBe('sign-in');
      expect(manifest.settings.authFlow.signUpRoute).toBe('sign-up');
      expect(manifest.settings.authFlow.signOutRoute).toBe('sign-out');
      expect(manifest.settings.authFlow.postSignInRoute).toBe('index');
      expect(manifest.infra.auth?.scope).toBe('global');
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
            colorTone: 'neutral',
          },
          dark: {
            primaryColor: '#0F766E',
            harmony: 'monochromatic',
            colorTone: 'neutral',
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
    expect(manifest.activeThemeMode).toBe('dark');
    expect(manifest.themes[0]?.id).toBe('brand');
    expect(manifest.themes[0]?.light.primaryColor).toBe('#0F766E');
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
      colorTone: 'jewel',
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

  test('falls back to the generic starter for unregistered categories', () => {
    const manifest = createStarterTemplate(createSeed('developer_tools'));

    expect(manifest.navigator.routes.map((route) => route.name)).toEqual([
      'index',
      'details',
      'settings',
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
    const registeredCategories: AppCategory[] = [
      'food_drink',
      'health_fitness',
      'shopping_commerce',
      'social_community',
    ];

    for (const category of registeredCategories) {
      for (const template of listStarterTemplates(category)) {
        const manifest = createStarterTemplate(createSeed(category), { templateId: template.id });

        assertManifestIntegrity(manifest);
        expect(manifest.navigator.routes.map((route) => route.name)).not.toContain('sign-in');
        expect(manifest.navigator.routes.every((route) => route.icon)).toBe(true);
      }
    }
  });
});
