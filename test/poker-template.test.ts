import type { UiNode } from '@ankhorage/contracts';
import { describe, expect, test } from 'bun:test';

import { CATEGORY_PRESETS, createStarterTemplate, type TemplateSeed } from '../src/index';

function createGamesSeed(): TemplateSeed {
  const preset = CATEGORY_PRESETS.games;

  return {
    category: 'games',
    categoryLabel: preset.label,
    appName: preset.defaultName,
    slug: preset.defaultSlug,
    summary: preset.summary,
    focusAreas: preset.focusAreas,
    primaryColor: preset.primaryColor,
    harmony: preset.harmony,
  };
}

function findNodeById(node: UiNode, id: string): UiNode | undefined {
  if (node.id === id) return node;

  for (const child of node.children ?? []) {
    const found = findNodeById(child, id);
    if (found) return found;
  }

  return undefined;
}

function collectNodeTypes(node: UiNode): string[] {
  return [node.type, ...(node.children?.flatMap(collectNodeTypes) ?? [])];
}

describe('poker starter template', () => {
  test('groups trainer decision actions horizontally on mobile', () => {
    const manifest = createStarterTemplate(createGamesSeed(), { templateId: 'poker' });
    const trainerScreen = Object.values(manifest.screens).find(
      (screen) => screen.name === 'Trainer',
    );
    const actions = trainerScreen
      ? findNodeById(trainerScreen.root, 'games-poker-home-actions')
      : undefined;

    expect(actions?.type).toBe('ButtonGroup');
    expect(actions?.props).toEqual({
      align: 'stretch',
      gap: 's',
      orientation: 'horizontal',
    });
    expect(actions?.children?.map((child) => child.type)).toEqual(['Button', 'Button', 'Button']);
    expect(actions?.children?.map((child) => child.props?.children)).toEqual([
      'Fold',
      'Call',
      'All-In',
    ]);
    expect(actions?.children?.map((child) => child.props?.variant)).toEqual([
      'soft',
      'soft',
      'soft',
    ]);
    expect(actions?.children?.map((child) => child.props?.color)).toEqual([
      'neutral',
      'primary',
      'primary',
    ]);
  });

  test('renders visible hero cards and hides feedback before answer selection', () => {
    const manifest = createStarterTemplate(createGamesSeed(), { templateId: 'poker' });
    const trainerScreen = Object.values(manifest.screens).find(
      (screen) => screen.name === 'Trainer',
    );

    expect(trainerScreen).toBeDefined();

    const table = trainerScreen
      ? findNodeById(trainerScreen.root, 'games-poker-home-table')
      : undefined;
    const seats = table?.props?.seats;

    expect(Array.isArray(seats)).toBe(true);
    expect(seats).toContainEqual(
      expect.objectContaining({
        id: 'seat-button',
        label: 'BTN',
        selected: true,
        cards: [
          { rank: 'A', suit: 'hearts' },
          { rank: 'A', suit: 'clubs' },
        ],
        tokenLabel: 'Hero',
      }),
    );

    const nodeTypes = trainerScreen ? collectNodeTypes(trainerScreen.root) : [];

    expect(nodeTypes).toContain('Progress');
    expect(nodeTypes).not.toContain('Notice');
  });
});
