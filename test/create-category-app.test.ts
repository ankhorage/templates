import type { AppManifest, UiNode } from '@ankhorage/contracts';
import { describe, expect, test } from 'bun:test';

import {
  APP_CATEGORIES,
  CATEGORY_PRESETS,
  createCategoryAppManifest,
  createStarterTemplate,
} from '../src/index';

function collectNodeTypes(node: UiNode): string[] {
  return [node.type, ...(node.children?.flatMap(collectNodeTypes) ?? [])];
}

describe('createCategoryAppManifest', () => {
  test('builds a manifest for every category preset', () => {
    for (const category of APP_CATEGORIES) {
      const manifest: AppManifest = createCategoryAppManifest(category);
      const preset = CATEGORY_PRESETS[category];

      expect(manifest.metadata.name).toBe(preset.defaultName);
      expect(manifest.metadata.slug).toBe(preset.defaultSlug);
      expect(manifest.themes[0]?.light.primaryColor).toBe(preset.primaryColor);
      expect(manifest.themes[0]?.light.harmony).toBe(preset.harmony);
      expect(manifest.themes[0]?.light.systemTone).toBe(preset.systemTone);
      expect(manifest.navigator.routes.map((route) => route.name)).toEqual([
        'index',
        'details',
        'settings',
        'sign-in',
      ]);
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
            systemTone: 'neutral',
          },
          dark: {
            primaryColor: '#0F766E',
            harmony: 'monochromatic',
            systemTone: 'neutral',
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
      systemTone: 'jewel',
    });

    const nodeTypes = Object.values(manifest.screens).flatMap((screen) =>
      collectNodeTypes(screen.root),
    );

    expect(nodeTypes).toContain('Page');
    expect(nodeTypes).toContain('Panel');
    expect(nodeTypes).toContain('Card');
    expect(nodeTypes).toContain('AuthLayout');
    expect(nodeTypes).toContain('FormField');
    expect(nodeTypes).not.toContain('Box');
    expect(nodeTypes).not.toContain('Container');
    expect(nodeTypes).not.toContain('Stack');
    expect(nodeTypes).not.toContain('Heading');
  });
});
