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
  const props = node.props as Record<string, unknown> | undefined;
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

  test('creates a catalog-first manifest with scan and capture flow screens', () => {
    const manifest = createStarterTemplate(createFoodDrinkSeed(), {
      templateId: 'nutrition-catalog-scan',
    });

    expect(manifest.metadata.name).toBe('Nutrition Scan');
    expect(manifest.navigator.type).toBe('tabs');
    expect(manifest.navigator.initialRouteName).toBe('index');
    expect(manifest.navigator.routes.map((route) => route.label)).toEqual([
      'Products',
      'Scan',
      'Capture',
      'Queue',
      'Settings',
    ]);

    const screenTitles = Object.values(manifest.screens).map((screen) => screen.title);

    expect(screenTitles).toEqual([
      'Available products',
      'Product detail',
      'Scan barcode',
      'Capture missing product',
      'Thanks — product queued',
      'Capture queue',
      'Settings',
    ]);
  });

  test('documents API-only integration and ZORA-first scanner direction in the node tree', () => {
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
    expect(nodeText).toContain('GET /v1/nutrition/products');
    expect(nodeText).toContain('GET /v1/nutrition/products/by-barcode/{barcode}');
    expect(nodeText).toContain('POST /v1/nutrition/products/capture');
    expect(nodeText).toContain('expo-camera');
    expect(nodeText).toContain('BarcodeScannerView');
    expect(nodeText).toContain('never connect this template directly to Supabase');
  });
});
