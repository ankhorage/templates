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

function findNodeById(node: UiNode, id: string): UiNode | undefined {
  if (node.id === id) {
    return node;
  }

  for (const child of node.children ?? []) {
    const match = findNodeById(child, id);
    if (match) {
      return match;
    }
  }

  return undefined;
}

function findNodeByType(node: UiNode, type: string): UiNode | undefined {
  if (node.type === type) {
    return node;
  }

  for (const child of node.children ?? []) {
    const match = findNodeByType(child, type);
    if (match) {
      return match;
    }
  }

  return undefined;
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
        'A Swiss product catalog starter with ZORA-first product browsing and direct barcode-to-product creation flow.',
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
    const visibleRoutes = manifest.navigator.routes.filter((route) => route.hideInTabBar !== true);

    expect(visibleRoutes.map((route) => route.label)).toEqual([
      'Products',
      'Scan',
      'Stats',
      'Profile',
    ]);
    expect(visibleRoutes.map((route) => route.name)).toEqual(['index', 'scan', 'stats', 'profile']);
    expect(manifest.navigator.routes.find((route) => route.name === 'scan')?.icon).toEqual({
      provider: 'material-community',
      name: 'barcode-scan',
    });
    expect(
      manifest.navigator.routes.find((route) => route.name === '/products/[id]')?.hideInTabBar,
    ).toBe(true);
    expect(
      manifest.navigator.routes.find((route) => route.name === '/products/create')?.hideInTabBar,
    ).toBe(true);
  });

  test('declares scanner runtime requirements on the scan screen', () => {
    const manifest = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });
    const scanRoute = manifest.navigator.routes.find((route) => route.name === 'scan');
    const scanScreen = scanRoute?.screenId ? manifest.screens[scanRoute.screenId] : undefined;

    expect(scanScreen?.requires).toEqual({
      permissions: [{ permission: 'camera' }],
      capabilities: [{ capability: 'barcodeScanner' }],
    });
  });

  test('renders product grid with a repeated product-card template and direct ZORA barcode scanner node', () => {
    const manifest = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });
    const roots = Object.values(manifest.screens).map((screen) => screen.root);
    const nodeTypes = roots.flatMap(collectNodeTypes);
    const nodeText = roots.flatMap(collectNodeText).join('\n');
    const catalogRoute = manifest.navigator.routes.find((route) => route.name === 'index');
    const catalogScreen = catalogRoute?.screenId
      ? manifest.screens[catalogRoute.screenId]
      : undefined;
    const productsGrid = catalogScreen
      ? findNodeById(catalogScreen.root, 'food_drink-nutrition-catalog-scan-products-grid')
      : undefined;
    const productCardChildren =
      productsGrid?.children?.filter((child) => child.type === 'ProductCard') ?? [];

    expect(nodeTypes).toContain('Grid');
    expect(nodeTypes).toContain('ProductCard');
    expect(nodeTypes).toContain('BarcodeScannerView');
    expect(nodeText).toContain('Scan product barcode');
    expect(productsGrid?.repeat).toEqual({
      source: {
        kind: 'operation',
        operation: {
          dataSourceId: 'nutrition-api',
          endpointId: 'products',
          operationId: 'products.list',
        },
      },
      itemAlias: 'item',
      keyPath: 'id',
    });
    expect(productCardChildren).toHaveLength(1);
    expect(productCardChildren[0]?.id).toBe(
      'food_drink-nutrition-catalog-scan-product-card-template',
    );
  });

  test('removes opaque scanner props and emits scanner navigation bindings', () => {
    const manifest = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });
    const scanRoute = manifest.navigator.routes.find((route) => route.name === 'scan');
    const scanScreen = scanRoute?.screenId ? manifest.screens[scanRoute.screenId] : undefined;
    const scannerNode = scanScreen
      ? findNodeById(scanScreen.root, 'food_drink-nutrition-catalog-scan-scan-scanner')
      : undefined;
    const barcodeBindings =
      manifest.dataBindings?.['food_drink-nutrition-catalog-scan-scan-scanner']?.events
        ?.barcodeScanned;

    expect(scannerNode?.props).not.toHaveProperty('onBarcodeScanned');
    expect(scannerNode?.props).not.toHaveProperty('onManualEntry');
    expect(scannerNode?.props).not.toHaveProperty('onRequestPermission');
    expect(JSON.stringify(manifest)).not.toContain('nutrition.scanBarcode');
    expect(JSON.stringify(manifest)).not.toContain('nutrition.enterBarcodeManually');
    expect(JSON.stringify(manifest)).not.toContain('camera.requestPermission');
    expect(barcodeBindings).toHaveLength(3);
    expect(barcodeBindings?.[0]?.target.kind).toBe('operation');
    expect(barcodeBindings?.[1]?.input?.route).toEqual({
      kind: 'literal',
      value: '/products/[id]',
    });
    expect(barcodeBindings?.[2]?.input?.route).toEqual({
      kind: 'literal',
      value: '/products/create',
    });
    expect(
      manifest.dataBindings?.['food_drink-nutrition-catalog-scan-scan-scanner']?.events
        ?.manualEntry?.[0]?.input?.route,
    ).toEqual({
      kind: 'literal',
      value: '/products/create',
    });
  });

  test('binds product cards and runtime data sources for catalog navigation', () => {
    const manifest = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });
    const productCardBindings =
      manifest.dataBindings?.['food_drink-nutrition-catalog-scan-product-card-template'];
    const dataSource = manifest.dataSources?.['nutrition-api'];
    const productsEndpoint = dataSource?.endpoints.products;
    const catalogRoute = manifest.navigator.routes.find((route) => route.name === 'index');
    const catalogScreen = catalogRoute?.screenId
      ? manifest.screens[catalogRoute.screenId]
      : undefined;
    const productsGrid = catalogScreen
      ? findNodeById(catalogScreen.root, 'food_drink-nutrition-catalog-scan-products-grid')
      : undefined;
    const repeatedCardTemplate = productsGrid
      ? findNodeByType(productsGrid, 'ProductCard')
      : undefined;

    expect(productCardBindings?.componentType).toBe('ProductCard');
    expect(productCardBindings?.props?.title?.source).toEqual({
      kind: 'context',
      path: 'item.name',
    });
    expect(productCardBindings?.props?.brand?.source).toEqual({
      kind: 'context',
      path: 'item.brand',
    });
    expect(productCardBindings?.props?.subtitle?.source).toEqual({
      kind: 'context',
      path: 'item.packageLabel',
    });
    expect(productCardBindings?.props?.description?.source).toEqual({
      kind: 'context',
      path: 'item.barcode',
    });
    expect(productCardBindings?.events?.press?.[0]?.input?.route).toEqual({
      kind: 'literal',
      value: '/products/[id]',
    });
    expect(productCardBindings?.events?.press?.[0]?.input?.params).toEqual({
      kind: 'object',
      fields: {
        id: {
          kind: 'source',
          source: {
            kind: 'context',
            path: 'item.id',
          },
        },
      },
    });
    expect(productsGrid?.repeat?.source).toEqual({
      kind: 'operation',
      operation: {
        dataSourceId: 'nutrition-api',
        endpointId: 'products',
        operationId: 'products.list',
      },
    });
    expect(repeatedCardTemplate?.id).toBe(
      'food_drink-nutrition-catalog-scan-product-card-template',
    );
    expect(dataSource?.kind).toBe('rest');
    expect(productsEndpoint).toBeDefined();

    if (productsEndpoint === undefined) {
      throw new Error('Expected products endpoint to be defined');
    }

    expect(productsEndpoint.operations['products.list']?.method).toBe('GET');
    expect(productsEndpoint.operations['products.lookupByBarcode']?.path).toBe(
      '/products/by-barcode/:barcode',
    );
    expect(productsEndpoint.operations['products.create']?.path).toBe('/products');
    expect(productsEndpoint.operations['products.read']?.path).toBe('/products/:id');
    expect(productsEndpoint.operations['products.update']?.path).toBe('/products/:id');
    expect(productsEndpoint.operations['products.delete']?.path).toBe('/products/:id');
  });
});
