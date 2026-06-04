import type { UiNode } from '@ankhorage/contracts';
import { describe, expect, test } from 'bun:test';

import {
  CATEGORY_PRESETS,
  createStarterTemplate,
  listStarterTemplatesByCategory,
  type TemplateSeed,
} from '../src/index';

function collectNodeTypes(node: UiNode): string[] {
  return [node.type, ...(node.children?.flatMap(collectNodeTypes) ?? [])];
}

function collectNodeText(node: UiNode): string[] {
  const { props } = node;
  const values = props
    ? Object.values(props).filter((value): value is string => typeof value === 'string')
    : [];

  return [...values, ...(node.children?.flatMap(collectNodeText) ?? [])];
}

function createFoodDrinkSeed(): TemplateSeed {
  const preset = CATEGORY_PRESETS.food_drink;

  return {
    category: 'food_drink',
    categoryLabel: preset.label,
    appName: 'Nutrition Scan',
    slug: 'nutrition-scan',
    summary: preset.summary,
    focusAreas: preset.focusAreas,
    primaryColor: preset.primaryColor,
    harmony: preset.harmony,
  };
}

describe('food_drink/nutrition-catalog-scan starter', () => {
  test('is listed as a food drink template variant', () => {
    const summaries = listStarterTemplatesByCategory('food_drink');

    expect(summaries).toContainEqual({
      id: 'nutrition-catalog-scan',
      category: 'food_drink',
      label: 'Nutrition catalog scan',
      description:
        'A Swiss product catalog starter with ZORA-first product browsing and scan-to-add capture flow.',
    });
  });

  test('creates a restricted scanner app manifest', () => {
    const manifest = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });

    expect(manifest.metadata.name).toBe('Nutrition Scan');
    expect(manifest.navigator.type).toBe('tabs');
    expect(manifest.navigator.initialRouteName).toBe('index');
    expect(manifest.infra.auth).toEqual({
      scope: 'global',
      provider: 'supabase',
      authorization: {
        kind: 'RBAC',
        engine: 'native',
      },
      flow: {
        signInRoute: 'sign-in',
        signUpRoute: 'sign-up',
        signOutRoute: 'sign-out',
        postSignInRoute: 'index',
        unauthorizedRoute: 'sign-in',
      },
      signIn: {
        identifiers: ['email'],
      },
      signUp: {
        requiredFields: ['email', 'password', 'displayName'],
        signUpPolicy: 'requireVerification',
      },
      profile: {
        fields: ['email', 'displayName', 'avatarUrl'],
        table: 'profiles',
        primaryKey: 'authUserId',
        createStrategy: 'trigger',
        updateStrategy: 'api',
      },
    });
    expect(manifest.settings.authFlow.postSignInRoute).toBe('index');
  });

  test('creates useful tabs for products, scan, stats, and profile', () => {
    const manifest = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });

    expect(manifest.navigator.routes.map((route) => route.label)).toEqual([
      'Products',
      'Scan',
      'Stats',
      'Profile',
    ]);
    expect(manifest.navigator.routes.map((route) => route.name)).toEqual([
      'index',
      'scan',
      'stats',
      'profile',
    ]);
    expect(manifest.navigator.routes.find((route) => route.name === 'scan')?.icon).toEqual({
      provider: 'material-community',
      name: 'barcode-scan',
    });
    expect(manifest.navigator.routes.some((route) => route.hideInTabBar)).toBe(false);
  });

  test('renders product grid and direct ZORA barcode scanner nodes', () => {
    const manifest = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });
    const roots = Object.values(manifest.screens).map((screen) => screen.root);
    const nodeTypes = roots.flatMap(collectNodeTypes);
    const nodeText = roots.flatMap(collectNodeText).join('\n');

    expect(nodeTypes).toContain('Grid');
    expect(nodeTypes).toContain('Card');
    expect(nodeTypes).toContain('BarcodeScannerView');
    expect(nodeText).toContain('Bio Greek Yogurt 250 g');
    expect(nodeText).toContain('Haferdrink Barista 1 l');
    expect(nodeText).toContain('Scan product barcode');
  });
});
