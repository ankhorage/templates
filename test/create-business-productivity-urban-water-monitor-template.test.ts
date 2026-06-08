import type { AppManifest } from '@ankhorage/contracts';
import { describe, expect, test } from 'bun:test';

import {
  CATEGORY_PRESETS,
  createStarterTemplate,
  listStarterTemplatesByCategory,
  type TemplateSeed,
} from '../src/index';

function createBusinessProductivitySeed(): TemplateSeed {
  const preset = CATEGORY_PRESETS.business_productivity;

  return {
    category: 'business_productivity',
    categoryLabel: preset.label,
    appName: 'Urban Water Monitor',
    slug: 'urban-water-monitor',
    summary: preset.summary,
    focusAreas: preset.focusAreas,
    primaryColor: '#0F766E',
    harmony: 'analogous',
  };
}

function assertRouteScreenReferences(manifest: AppManifest): void {
  for (const route of manifest.navigator.routes) {
    expect(route.screenId).toBeDefined();
    expect(route.screenId ? manifest.screens[route.screenId] : undefined).toBeDefined();
  }
}

function collectNodeTypes(node: AppManifest['screens'][string]['root']): string[] {
  return [node.type, ...(node.children?.flatMap(collectNodeTypes) ?? [])];
}

function collectNodesByType(
  node: AppManifest['screens'][string]['root'],
  type: string,
): AppManifest['screens'][string]['root'][] {
  return [
    ...(node.type === type ? [node] : []),
    ...(node.children?.flatMap((child) => collectNodesByType(child, type)) ?? []),
  ];
}

describe('business_productivity/urban-water-monitor starter', () => {
  test('is listed as a business productivity template variant', () => {
    expect(listStarterTemplatesByCategory('business_productivity')).toContainEqual({
      category: 'business_productivity',
      description:
        'An event-based urban water quality monitoring and field-campaign concept starter.',
      id: 'urban-water-monitor',
      label: 'Urban Water Monitor',
    });
  });

  test('creates a single index route with project screen content', () => {
    const manifest = createStarterTemplate(createBusinessProductivitySeed(), {
      templateId: 'urban-water-monitor',
    });

    expect(manifest.navigator.type).toBe('tabs');
    expect(manifest.navigator.initialRouteName).toBe('index');
    expect(manifest.settings.authFlow.postSignInRoute).toBe('index');
    expect(manifest.navigator.routes).toHaveLength(1);
    expect(Object.keys(manifest.screens)).toHaveLength(1);
    expect(manifest.navigator.routes[0]).toMatchObject({
      name: 'index',
      label: 'Project',
      screenId: 'business_productivity-urban-water-monitor-project',
      icon: { provider: 'material-community', name: 'water-outline' },
    });
    expect(manifest.screens['business_productivity-urban-water-monitor-project']?.name).toBe(
      'Project',
    );
    assertRouteScreenReferences(manifest);
  });

  test('renders project sections as collapsed disclosure sections', () => {
    const manifest = createStarterTemplate(createBusinessProductivitySeed(), {
      templateId: 'urban-water-monitor',
    });
    const screen = manifest.screens['business_productivity-urban-water-monitor-project'];
    expect(screen).toBeDefined();
    if (!screen) {
      throw new Error('Expected Urban Water Monitor project screen.');
    }
    const nodeTypes = collectNodeTypes(screen.root);
    const disclosureSections = collectNodesByType(screen.root, 'DisclosureSection');

    expect(nodeTypes).toContain('Screen');
    expect(nodeTypes).toContain('SectionHeader');
    expect(nodeTypes).toContain('DisclosureSection');
    expect(disclosureSections).toHaveLength(13);
    expect(disclosureSections.every((node) => node.props?.defaultOpen === false)).toBe(true);
  });

  test('includes project concept and API strategy copy without unsupported live claims', () => {
    const manifest = createStarterTemplate(createBusinessProductivitySeed(), {
      templateId: 'urban-water-monitor',
    });
    const serialized = JSON.stringify(manifest);

    expect(serialized).toContain('Product Vision');
    expect(serialized).toContain('Data Sources and API Integrations');
    expect(serialized).toContain('MeteoSwiss Open Data via data.geo.admin.ch STAC');
    expect(serialized).toContain('geo.admin.ch / Federal Spatial Data Infrastructure');
    expect(serialized).toContain('opendata.swiss CKAN API');
    expect(serialized).toContain('Existenz.ch Hydro and SwissMetNet JSON APIs');
    expect(serialized).toContain('OGC SensorThings API');
    expect(serialized).toContain('OGC WaterML 2.0');
    expect(serialized).toContain(
      'Risk scores are decision-support indicators, not verified pollution measurements.',
    );
  });
});
