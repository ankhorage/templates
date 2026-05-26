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

  test('creates a two-tab trainer manifest with a compact tabletop trainer flow', () => {
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
    expect(nodeTypes).toContain('Progress');
    expect(nodeTypes).toContain('TabletopTable');
    expect(nodeTypes).toContain('Button');
    expect(nodeTypes).not.toContain('Notice');
  });

  test('adds an API-first poker_situations generated resource', () => {
    const manifest = createStarterTemplate(createGamesSeed(), { templateId: 'poker' });
    const api = manifest.data?.apis?.poker_situations;

    expect(api?.kind).toBe('generated');

    if (api?.kind !== 'generated') {
      throw new Error('Expected poker_situations to be a generated API.');
    }

    const seed = api.resource?.seed?.[0];

    expect(api.resource?.kind).toBe('collection');
    expect(api.resource?.collection.name).toBe('poker_situations');
    expect(seed).toBeDefined();

    if (!seed) {
      throw new Error('Expected poker_situations to include a seed record.');
    }

    expect(seed.id).toBe('preflop-btn-aa');
    expect(seed.street).toBe('Preflop');
    expect(seed.blinds).toBe('400 / 800');
    expect(seed.heroPosition).toBe('BTN');
    expect(seed.correctAction).toBe('All-In');
  });
});
