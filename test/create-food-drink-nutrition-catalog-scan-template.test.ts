import type { RouteDefinition, UiNode } from '@ankhorage/contracts';
import { describe, expect, test } from 'bun:test';

import {
  CATEGORY_PRESETS,
  createStarterTemplate,
  listStarterTemplatesByCategory,
  type TemplateSeed,
} from '../src/index';

function createFoodDrinkSeed(): TemplateSeed {
  const preset = CATEGORY_PRESETS.food_drink;
  return {
    category: 'food_drink',
    categoryLabel: preset.label,
    appName: 'Nutrition Scan',
    slug: 'nutrition-scan',
    summary: preset.summary,
    focusAreas: preset.focusAreas,
    primaryColor: preset.recommendedPrimaryColors[0],
    harmony: preset.recommendedHarmonies[0],
  };
}

function findRoute(routes: readonly RouteDefinition[], name: string) {
  return routes.find((route) => route.name === name);
}

function collectNodeTypes(node: UiNode): string[] {
  return [node.type, ...(node.children?.flatMap(collectNodeTypes) ?? [])];
}

function collectNodeText(node: UiNode): string[] {
  const own = Object.values(node.props ?? {}).filter(
    (value): value is string => typeof value === 'string',
  );
  return [...own, ...(node.children?.flatMap(collectNodeText) ?? [])];
}

describe('food_drink/nutrition-catalog-scan starter', () => {
  test('is listed as a food drink template variant', () => {
    expect(listStarterTemplatesByCategory('food_drink')).toContainEqual({
      id: 'nutrition-catalog-scan',
      category: 'food_drink',
      label: 'Nutrition catalog scan',
      description:
        'A product barcode nutrition scanner starter with direct product lookup, creation, and catalog browsing.',
    });
  });

  test('creates the expected auth and navigation model', () => {
    const { manifest } = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });
    const visibleRoutes = manifest.navigator.routes.filter(
      (route) => route.showInPrimaryNavigation !== false,
    );
    const productsRoute = findRoute(manifest.navigator.routes, 'products');
    const productsStack = productsRoute?.navigator;

    expect(manifest.metadata.name).toBe('Nutrition Scan');
    expect(manifest.navigator.type).toBe('tabs');
    expect(manifest.navigator.initialRouteName).toBe('products');
    expect(visibleRoutes.map((route) => route.name)).toEqual([
      'products',
      'scan',
      'stats',
      'profile',
    ]);
    expect(productsStack?.type).toBe('stack');
    expect(productsStack?.initialRouteName).toBe('index');
    expect(productsStack?.routes.map((route) => route.name)).toEqual(['index', '[id]', 'create']);
    expect(manifest.infra.auth?.flow?.postSignInRoute).toBe('/products');
    expect(manifest.infra.auth?.authorization).toBeUndefined();
    expect(manifest.settings).not.toHaveProperty('authFlow');
  });

  test('declares scanner requirements and useful product UI', () => {
    const { manifest } = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });
    const scanRoute = findRoute(manifest.navigator.routes, 'scan');
    const scanScreen = scanRoute?.screenId ? manifest.screens[scanRoute.screenId] : undefined;
    const roots = Object.values(manifest.screens).map((screen) => screen.root);
    const nodeTypes = roots.flatMap(collectNodeTypes);
    const nodeText = roots.flatMap(collectNodeText).join('\n');

    expect(scanScreen?.requires).toEqual({
      permissions: [{ permission: 'camera' }],
      capabilities: [{ capability: 'barcodeScanner' }],
    });
    expect(nodeTypes).toContain('Grid');
    expect(nodeTypes).toContain('ProductCard');
    expect(nodeTypes).toContain('BarcodeScannerView');
    expect(nodeTypes).toContain('Notice');
    expect(nodeText).toContain('Scan product barcode');
    expect(nodeText).toContain('Product details');
    expect(nodeText).toContain('Nutrition facts');
    expect(nodeText).not.toContain('generated database operation');
    expect(nodeText).not.toContain('database-operation diagnostics');
  });

  test('keeps web route smoke paths stable', () => {
    const { manifest } = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });
    const productsRoute = findRoute(manifest.navigator.routes, 'products');
    const productsStack = productsRoute?.navigator;

    expect(manifest.navigator.routes.some((route) => route.path === '/')).toBe(false);
    expect(productsRoute?.name).toBe('products');
    expect(productsStack?.routes.find((route) => route.name === 'index')?.screenId).toBe(
      'food_drink-nutrition-catalog-scan-catalog',
    );
    expect(productsStack?.routes.find((route) => route.name === '[id]')?.screenId).toBe(
      'food_drink-nutrition-catalog-scan-detail',
    );
    expect(productsStack?.routes.find((route) => route.name === 'create')?.screenId).toBe(
      'food_drink-nutrition-catalog-scan-create',
    );
  });
});
