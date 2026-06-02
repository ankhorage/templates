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

  test('creates a restricted scanner challenge manifest', () => {
    const manifest = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });

    expect(manifest.metadata.name).toBe('Nutrition Scan');
    expect(manifest.navigator.type).toBe('tabs');
    expect(manifest.navigator.initialRouteName).toBe('challenge');
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
        postSignInRoute: 'challenge',
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
    expect(manifest.settings.authFlow.postSignInRoute).toBe('challenge');
  });

  test('creates challenge-first routes and screens', () => {
    const manifest = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });

    expect(manifest.navigator.routes.map((route) => route.label)).toEqual([
      'Challenge',
      'Products',
      'Scan',
      'Ranking',
      'Profile',
      'Capture',
      'Queue',
      'Sign in',
      'Join',
      'Settings',
    ]);
    expect(
      manifest.navigator.routes
        .filter((route) => route.hideInTabBar)
        .map((route) => route.name),
    ).toEqual(['capture', 'queue', 'sign-in', 'sign-up', 'settings']);

    const screenTitles = Object.values(manifest.screens).map((screen) => screen.title);

    expect(screenTitles).toContain('Scanner challenge');
    expect(screenTitles).toContain('Challenge products');
    expect(screenTitles).toContain('Leaderboard');
    expect(screenTitles).toContain('Profile');
    expect(screenTitles).toContain('Sign in');
    expect(screenTitles).toContain('Create scanner account');
  });

  test('documents API-only integration, ZORA scanner direction, and profiles table', () => {
    const manifest = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });
    const roots = Object.values(manifest.screens).map((screen) => screen.root);
    const nodeTypes = roots.flatMap(collectNodeTypes);
    const nodeText = roots.flatMap(collectNodeText).join('\n');

    expect(nodeTypes).toContain('Button');
    expect(nodeTypes).toContain('Card');
    expect(nodeTypes).toContain('FormField');
    expect(nodeTypes).toContain('Input');
    expect(nodeTypes).toContain('Notice');
    expect(nodeText).toContain('GET /v1/nutrition/products/by-barcode/{barcode}');
    expect(nodeText).toContain('POST /v1/nutrition/scan-events');
    expect(nodeText).toContain('GET /v1/nutrition/challenges/current/leaderboard');
    expect(nodeText).toContain('BarcodeScannerView');
    expect(nodeText).toContain('profiles table');
  });
});
