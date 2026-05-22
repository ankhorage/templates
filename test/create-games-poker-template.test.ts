import type { UiNode } from '@ankhorage/contracts';
import { describe, expect, test } from 'bun:test';

import {
  CATEGORY_PRESETS,
  createStarterTemplate,
  listStarterTemplatesByCategory,
} from '../src/index';

function collectNodeTypes(node: UiNode): string[] {
  return [node.type, ...(node.children?.flatMap(collectNodeTypes) ?? [])];
}

function createGamesSeed() {
  const preset = CATEGORY_PRESETS.games;

  return {
    category: 'games' as const,
    categoryLabel: preset.label,
    appName: preset.defaultName,
    slug: preset.defaultSlug,
    summary: preset.summary,
    focusAreas: preset.focusAreas,
    primaryColor: preset.primaryColor,
    harmony: preset.harmony,
  };
}

describe('games card trainer starter', () => {
  test('is listed as a games starter template', () => {
    expect(listStarterTemplatesByCategory('games')).toContainEqual({
      category: 'games',
      description: 'A two-tab card-game trainer starter with a tabletop scenario view.',
      id: 'poker',
      label: 'Card trainer',
    });
  });

  test('creates a two-tab trainer manifest with a tabletop table node', () => {
    const manifest = createStarterTemplate(createGamesSeed(), { templateId: 'poker' });
    const nodeTypes = Object.values(manifest.screens).flatMap((screen) =>
      collectNodeTypes(screen.root),
    );

    expect(manifest.navigator.type).toBe('tabs');
    expect(manifest.navigator.routes.map((route) => route.label)).toEqual(['Trainer', 'Settings']);
    expect(Object.values(manifest.screens).map((screen) => screen.name)).toEqual([
      'Trainer',
      'Settings',
    ]);
    expect(nodeTypes).toContain('TabletopTable');
    expect(nodeTypes).toContain('Button');
    expect(nodeTypes).toContain('Notice');
  });
});
