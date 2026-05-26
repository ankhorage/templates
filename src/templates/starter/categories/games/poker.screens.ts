import type { AppManifest, UiNode } from '@ankhorage/contracts';

import { createScreen, createSettingsSection } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { pokerContent } from './poker.content';
import { pokerSituation, type PokerSituation } from './poker.data';
import type { PokerScreenIds } from './poker.routes';

function createNode(
  id: string,
  type: string,
  props?: Record<string, unknown>,
  children?: UiNode[],
): UiNode {
  return {
    id,
    type,
    ...(props ? { props } : {}),
    ...(children && children.length > 0 ? { children } : {}),
  };
}

function createScenarioChips(idPrefix: string, situation: PokerSituation): UiNode {
  return createNode(
    `${idPrefix}-home-scenario-chips`,
    'ButtonGroup',
    {
      align: 'between',
      gap: 'xs',
      orientation: 'horizontal',
    },
    [
      createNode(`${idPrefix}-home-chip-street`, 'Button', {
        children: situation.street,
        color: 'neutral',
        disabled: true,
        size: 's',
        variant: 'soft',
      }),
      createNode(`${idPrefix}-home-chip-blinds`, 'Button', {
        children: `Blinds ${situation.blinds}`,
        color: 'neutral',
        disabled: true,
        size: 's',
        variant: 'soft',
      }),
      createNode(`${idPrefix}-home-chip-position`, 'Button', {
        children: `Hero ${situation.heroPosition}`,
        color: 'primary',
        disabled: true,
        size: 's',
        variant: 'soft',
      }),
    ],
  );
}

function createDecisionActions(idPrefix: string, situation: PokerSituation): UiNode {
  return createNode(
    `${idPrefix}-home-actions`,
    'ButtonGroup',
    {
      align: 'stretch',
      gap: 's',
      orientation: 'horizontal',
    },
    situation.availableActions.map((action) =>
      createNode(
        `${idPrefix}-home-action-${action.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        'Button',
        {
          children: action,
          color: action === 'Fold' ? 'neutral' : 'primary',
          variant: 'soft',
        },
      ),
    ),
  );
}

export function createPokerScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: PokerScreenIds,
): AppManifest['screens'] {
  const situation = pokerSituation;

  return {
    [screenIds.home]: createScreen({
      id: screenIds.home,
      name: 'Trainer',
      title: pokerContent.home.title,
      description: pokerContent.home.description,
      root: createNode(`${idPrefix}-home-screen`, 'Screen', { width: 'default' }, [
        createNode(`${idPrefix}-home-header`, 'Card', {
          eyebrow: 'Poker Trainer',
          title: seed.appName,
          description: `Hand ${situation.progress} / ${situation.progressTotal} · Score ${situation.score}`,
          tone: 'subtle',
        }),
        createNode(`${idPrefix}-home-progress`, 'Progress', {
          color: 'primary',
          max: situation.progressTotal,
          size: 's',
          value: situation.progress,
        }),
        createScenarioChips(idPrefix, situation),
        createNode(`${idPrefix}-home-table`, 'TabletopTable', {
          centerLabel: `Pot ${situation.pot}`,
          centerSublabel: `Level ${situation.level}`,
          seatCount: situation.seats.length,
          shape: 'oval',
          cardSize: 'small',
          seats: situation.seats,
          testID: `${idPrefix}-home-table`,
        }),
        createNode(`${idPrefix}-home-situation`, 'Card', {
          title: 'Your decision',
          description: situation.prompt,
          tone: 'outline',
        }),
        createDecisionActions(idPrefix, situation),
      ]),
    }),
    [screenIds.settings]: createScreen({
      id: screenIds.settings,
      name: 'Settings',
      title: pokerContent.settings.title,
      description: pokerContent.settings.description,
      root: createNode(`${idPrefix}-settings-screen`, 'Screen', { width: 'default' }, [
        createNode(`${idPrefix}-settings-header`, 'SectionHeader', {
          title: pokerContent.settings.title,
          description: pokerContent.settings.description,
        }),
        createSettingsSection(
          `${idPrefix}-settings`,
          'Trainer defaults',
          'Prepare display and study preferences before app-specific state is wired.',
          [
            {
              id: 'table-row',
              title: 'Table layout',
              description:
                'Start with six compact seats, visible hero cards, stacks, and chip labels.',
              meta: '6 seats',
            },
            {
              id: 'feedback-row',
              title: 'Feedback mode',
              description:
                'Initial trainer screen hides explanations until a decision is selected.',
              meta: 'after answer',
            },
            {
              id: 'api-row',
              title: 'Scenario API',
              description: 'Generated data is modeled through manifest.data.apis.poker_situations.',
              meta: 'api-first',
            },
          ],
        ),
      ]),
    }),
  };
}
