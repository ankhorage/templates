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

function findTopLevelRouteByName(
  routes: readonly {
    name: string;
    path?: string;
    screenId?: string;
    hideInTabBar?: boolean;
    navigator?: {
      type: string;
      initialRouteName?: string;
      routes: readonly {
        name: string;
        screenId?: string;
        hideInTabBar?: boolean;
      }[];
    };
  }[],
  name: string,
) {
  return routes.find((route) => route.name === name);
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
        'A product barcode nutrition scanner starter with direct product lookup, creation, and catalog browsing.',
    });
  });

  test('creates a restricted scanner app manifest', () => {
    const manifest = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });

    expect(manifest.metadata.name).toBe('Nutrition Scan');
    expect(manifest.navigator.type).toBe('tabs');
    expect(manifest.navigator.initialRouteName).toBe('products');
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
        postSignInRoute: '/products',
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
    expect(manifest.settings.authFlow.postSignInRoute).toBe('/products');
    expect(manifest.settings.authFlow.postSignInRoute).not.toContain('products/products');
  });

  test('creates useful tabs plus a stack-safe products flow', () => {
    const manifest = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });
    const visibleRoutes = manifest.navigator.routes.filter((route) => route.hideInTabBar !== true);
    const rootRoute = findTopLevelRouteByName(manifest.navigator.routes, 'index');
    const productsRoute = findTopLevelRouteByName(manifest.navigator.routes, 'products');
    const productsStack = productsRoute?.navigator;

    expect(visibleRoutes.map((route) => route.label)).toEqual([
      'Products',
      'Scan',
      'Stats',
      'Profile',
    ]);
    expect(visibleRoutes.map((route) => route.name)).toEqual([
      'products',
      'scan',
      'stats',
      'profile',
    ]);
    expect(rootRoute?.screenId).toBe('food_drink-nutrition-catalog-scan-catalog');
    expect(rootRoute?.hideInTabBar).toBe(true);
    expect(rootRoute?.name).toBe('index');
    expect(manifest.navigator.initialRouteName).toBe('products');
    expect(productsRoute?.screenId).toBeUndefined();
    expect(productsStack?.type).toBe('stack');
    expect(productsStack?.initialRouteName).toBe('index');
    expect(productsStack?.routes.map((route) => route.name)).toEqual(['index', '[id]', 'create']);
    expect(manifest.navigator.routes.find((route) => route.name === 'scan')?.icon).toEqual({
      provider: 'material-community',
      name: 'barcode-scan',
    });
    expect(productsStack?.routes.find((route) => route.name === 'index')?.screenId).toBe(
      'food_drink-nutrition-catalog-scan-catalog',
    );
    expect(productsStack?.routes.find((route) => route.name === '[id]')?.screenId).toBe(
      'food_drink-nutrition-catalog-scan-detail',
    );
    expect(productsStack?.routes.find((route) => route.name === 'create')?.screenId).toBe(
      'food_drink-nutrition-catalog-scan-create',
    );
    expect(productsStack?.routes.find((route) => route.name === '[id]')?.hideInTabBar).toBe(true);
    expect(productsStack?.routes.find((route) => route.name === 'create')?.hideInTabBar).toBe(true);
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

  test('renders product grid, scanner, notices, and DTO detail guidance', () => {
    const manifest = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });
    const roots = Object.values(manifest.screens).map((screen) => screen.root);
    const nodeTypes = roots.flatMap(collectNodeTypes);
    const nodeText = roots.flatMap(collectNodeText).join('\n');
    const productsRoute = findTopLevelRouteByName(manifest.navigator.routes, 'products');
    const catalogRoute = productsRoute?.navigator?.routes.find((route) => route.name === 'index');
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
    expect(nodeTypes).toContain('Notice');
    expect(nodeTypes).toContain('Button');
    expect(nodeText).toContain('Scan product barcode');
    expect(nodeText).toContain('nutritionFacts');
    expect(nodeText).toContain('imageRefs');
    expect(nodeText).toContain('packageLabel');
    expect(nodeText).not.toContain('updatedByUserId');
    expect(productsGrid?.repeat).toEqual({
      source: {
        kind: 'operation',
        operation: {
          dataSourceId: 'nutrition-api',
          endpointId: 'products',
          operationId: 'nutrition.products.list',
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

  test('emits scanner lookup bindings for camera scans and manual barcode entry', () => {
    const manifest = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });
    const scanRoute = manifest.navigator.routes.find((route) => route.name === 'scan');
    const scanScreen = scanRoute?.screenId ? manifest.screens[scanRoute.screenId] : undefined;
    const scannerNode = scanScreen
      ? findNodeById(scanScreen.root, 'food_drink-nutrition-catalog-scan-scan-scanner')
      : undefined;
    const scannerBindings =
      manifest.dataBindings?.['food_drink-nutrition-catalog-scan-scan-scanner']?.events;

    expect(scannerNode?.props).not.toHaveProperty('onBarcodeScanned');
    expect(scannerNode?.props).not.toHaveProperty('onManualEntry');
    expect(scannerNode?.props).not.toHaveProperty('onRequestPermission');
    expect(scannerBindings?.barcodeScanned).toHaveLength(3);
    expect(scannerBindings?.barcodeScanned?.[0]?.target).toEqual({
      kind: 'operation',
      operation: {
        dataSourceId: 'nutrition-api',
        endpointId: 'products',
        operationId: 'nutrition.products.getByBarcode',
      },
    });
    expect(scannerBindings?.barcodeScanned?.[1]?.input?.route).toEqual({
      kind: 'literal',
      value: '/products/[id]',
    });
    expect(scannerBindings?.barcodeScanned?.[1]?.when?.source).toEqual({
      kind: 'operation',
      operation: {
        dataSourceId: 'nutrition-api',
        endpointId: 'products',
        operationId: 'nutrition.products.getByBarcode',
      },
      path: 'product.id',
    });
    expect(scannerBindings?.barcodeScanned?.[1]?.input?.params).toEqual({
      kind: 'object',
      fields: {
        id: {
          kind: 'source',
          source: {
            kind: 'operation',
            operation: {
              dataSourceId: 'nutrition-api',
              endpointId: 'products',
              operationId: 'nutrition.products.getByBarcode',
            },
            path: 'product.id',
          },
        },
      },
    });
    expect(scannerBindings?.barcodeScanned?.[2]?.input?.route).toEqual({
      kind: 'literal',
      value: '/products/create',
    });
    expect(scannerBindings?.barcodeScanned?.[2]?.when?.source).toEqual({
      kind: 'operation',
      operation: {
        dataSourceId: 'nutrition-api',
        endpointId: 'products',
        operationId: 'nutrition.products.getByBarcode',
      },
      path: 'product.id',
    });
    expect(scannerBindings?.manualEntry).toHaveLength(3);
    expect(scannerBindings?.manualEntry?.[0]?.target).toEqual({
      kind: 'operation',
      operation: {
        dataSourceId: 'nutrition-api',
        endpointId: 'products',
        operationId: 'nutrition.products.getByBarcode',
      },
    });
    expect(scannerBindings?.manualEntry?.[1]?.input?.route).toEqual({
      kind: 'literal',
      value: '/products/[id]',
    });
    expect(scannerBindings?.manualEntry?.[1]?.when?.source).toEqual({
      kind: 'operation',
      operation: {
        dataSourceId: 'nutrition-api',
        endpointId: 'products',
        operationId: 'nutrition.products.getByBarcode',
      },
      path: 'product.id',
    });
    expect(scannerBindings?.manualEntry?.[1]?.input?.params).toEqual({
      kind: 'object',
      fields: {
        id: {
          kind: 'source',
          source: {
            kind: 'operation',
            operation: {
              dataSourceId: 'nutrition-api',
              endpointId: 'products',
              operationId: 'nutrition.products.getByBarcode',
            },
            path: 'product.id',
          },
        },
      },
    });
    expect(scannerBindings?.manualEntry?.[2]?.input?.route).toEqual({
      kind: 'literal',
      value: '/products/create',
    });
    expect(scannerBindings?.manualEntry?.[2]?.when?.source).toEqual({
      kind: 'operation',
      operation: {
        dataSourceId: 'nutrition-api',
        endpointId: 'products',
        operationId: 'nutrition.products.getByBarcode',
      },
      path: 'product.id',
    });
  });

  test('binds product cards, create submit behavior, and runtime data sources', () => {
    const manifest = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });
    const productCardBindings =
      manifest.dataBindings?.['food_drink-nutrition-catalog-scan-product-card-template'];
    const createButtonBindings =
      manifest.dataBindings?.['food_drink-nutrition-catalog-scan-create-submit-button'];
    const dataSource = manifest.dataSources?.['nutrition-api'];
    const healthEndpoint = dataSource?.endpoints.health;
    const productsEndpoint = dataSource?.endpoints.products;
    const productsRoute = findTopLevelRouteByName(manifest.navigator.routes, 'products');
    const catalogRoute = productsRoute?.navigator?.routes.find((route) => route.name === 'index');
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
    expect(productsGrid?.repeat?.source).toEqual({
      kind: 'operation',
      operation: {
        dataSourceId: 'nutrition-api',
        endpointId: 'products',
        operationId: 'nutrition.products.list',
      },
    });
    expect(repeatedCardTemplate?.id).toBe(
      'food_drink-nutrition-catalog-scan-product-card-template',
    );

    expect(createButtonBindings?.componentType).toBe('Button');
    expect(createButtonBindings?.events?.press?.[0]?.target).toEqual({
      kind: 'operation',
      operation: {
        dataSourceId: 'nutrition-api',
        endpointId: 'products',
        operationId: 'nutrition.products.create',
      },
    });
    expect(createButtonBindings?.events?.press?.[0]?.input?.packageLabel).toEqual({
      kind: 'source',
      source: {
        kind: 'state',
        path: 'forms.products.create.packageLabel',
      },
      transforms: ['trim'],
    });
    expect(createButtonBindings?.events?.press?.[0]?.input?.nutritionFacts).toEqual({
      kind: 'source',
      source: {
        kind: 'state',
        path: 'forms.products.create.nutritionFacts',
      },
    });
    expect(createButtonBindings?.events?.press?.[0]?.input?.imageRefs).toEqual({
      kind: 'source',
      source: {
        kind: 'state',
        path: 'forms.products.create.imageRefs',
      },
    });
    expect(createButtonBindings?.events?.press).toHaveLength(2);
    expect(createButtonBindings?.events?.press?.[1]?.input?.route).toEqual({
      kind: 'literal',
      value: '/products/[id]',
    });
    expect(createButtonBindings?.events?.press?.[2]).toBeUndefined();
    expect(createButtonBindings?.events?.press?.[1]?.when?.source).toEqual({
      kind: 'operation',
      operation: {
        dataSourceId: 'nutrition-api',
        endpointId: 'products',
        operationId: 'nutrition.products.create',
      },
      path: 'product.id',
    });
    expect(createButtonBindings?.events?.press?.[1]?.input?.params).toEqual({
      kind: 'object',
      fields: {
        id: {
          kind: 'source',
          source: {
            kind: 'operation',
            operation: {
              dataSourceId: 'nutrition-api',
              endpointId: 'products',
              operationId: 'nutrition.products.create',
            },
            path: 'product.id',
          },
        },
      },
    });

    expect(dataSource?.kind).toBe('rest');
    expect(healthEndpoint?.operations['nutrition.health']?.method).toBe('GET');
    expect(healthEndpoint?.operations['nutrition.health']?.path).toBe('/health');

    expect(productsEndpoint).toBeDefined();

    if (productsEndpoint === undefined) {
      throw new Error('Expected products endpoint to be defined');
    }

    expect(productsEndpoint.operations['nutrition.products.list']?.method).toBe('GET');
    expect(productsEndpoint.operations['nutrition.products.getByBarcode']?.path).toBe(
      '/products/by-barcode/:barcode',
    );
    expect(productsEndpoint.operations['nutrition.products.create']?.path).toBe('/products');
    expect(productsEndpoint.operations['nutrition.products.getById']?.path).toBe('/products/:id');
    expect(productsEndpoint.operations['nutrition.products.update']?.path).toBe('/products/:id');
    expect(productsEndpoint.operations['nutrition.products.delete']?.path).toBe('/products/:id');
  });

  test('removes stale capture and challenge vocabulary from the generated manifest', () => {
    const manifest = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });
    const json = JSON.stringify(manifest);

    expect(json).not.toContain('/captures');
    expect(json).not.toContain('/challenges');
    expect(json).not.toContain('/scan-events');
    expect(json).not.toContain('scanEvent');
    expect(json).not.toContain('storeObservation');
    expect(json).not.toContain('review queue');
    expect(json).not.toContain('confidence');
    expect(json).not.toContain('-capture');
  });

  test('keeps web route smoke paths stable for root, products, detail, and create', () => {
    const manifest = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });
    const rootRoute = findTopLevelRouteByName(manifest.navigator.routes, 'index');
    const productsRoute = findTopLevelRouteByName(manifest.navigator.routes, 'products');
    const productsStack = productsRoute?.navigator;
    const detailRoute = productsStack?.routes.find((route) => route.name === '[id]');
    const createRoute = productsStack?.routes.find((route) => route.name === 'create');

    expect(rootRoute?.path).toBe('/');
    expect(rootRoute?.screenId).toBe('food_drink-nutrition-catalog-scan-catalog');
    expect(manifest.navigator.initialRouteName).toBe('products');
    expect(productsRoute?.name).toBe('products');
    expect(productsStack?.initialRouteName).toBe('index');
    expect(productsStack?.routes.find((route) => route.name === 'index')?.screenId).toBe(
      'food_drink-nutrition-catalog-scan-catalog',
    );
    expect(manifest.settings.authFlow.postSignInRoute).toBe('/products');
    expect(manifest.settings.authFlow.postSignInRoute).not.toContain('products/products');
    expect(productsRoute?.navigator?.routes.map((route) => route.name)).toEqual([
      'index',
      '[id]',
      'create',
    ]);
    expect(detailRoute?.screenId).toBe('food_drink-nutrition-catalog-scan-detail');
    expect(createRoute?.screenId).toBe('food_drink-nutrition-catalog-scan-create');
  });
});
