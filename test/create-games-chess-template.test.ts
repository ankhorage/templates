import type { UiNode } from '@ankhorage/contracts';
import { describe, expect, test } from 'bun:test';

import { CATEGORY_PRESETS, createStarterTemplate } from '../src/index';

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

describe('games chess starter', () => {
  test('places OpeningBook below ChessBoard on the home screen', () => {
    const manifest = createStarterTemplate(createGamesSeed(), { templateId: 'chess' });
    const home = manifest.screens['games-chess-home'];
    const nodeTypes = home ? collectNodeTypes(home.root) : [];

    expect(home).toBeDefined();
    expect(nodeTypes).toContain('ChessBoard');
    expect(nodeTypes).toContain('OpeningBook');
    expect(nodeTypes.indexOf('OpeningBook')).toBeGreaterThan(nodeTypes.indexOf('ChessBoard'));
  });
});
