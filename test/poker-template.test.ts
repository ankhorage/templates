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

describe('poker starter template', () => {
  test('groups trainer decision actions in a readable ButtonGroup', () => {
    const manifest = createStarterTemplate(createGamesSeed(), { templateId: 'poker' });
    const trainerScreen = Object.values(manifest.screens).find(
      (screen) => screen.name === 'Trainer',
    );
    const actions = trainerScreen
      ? findNodeById(trainerScreen.root, 'games-poker-home-actions')
      : undefined;

    expect(actions?.type).toBe('ButtonGroup');
    expect(actions?.props).toEqual({
      align: 'start',
      gap: 's',
      orientation: 'responsive',
    });
    expect(actions?.children?.map((child) => child.type)).toEqual(['Button', 'Button', 'Button']);
    expect(actions?.children?.map((child) => child.props?.children)).toEqual([
      'Fold',
      'Call',
      'Raise',
    ]);
    expect(actions?.children?.map((child) => child.props?.variant)).toEqual([
      'soft',
      'soft',
      'solid',
    ]);
    expect(actions?.children?.map((child) => child.props?.color)).toEqual([
      'neutral',
      'primary',
      'primary',
    ]);
  });
});
