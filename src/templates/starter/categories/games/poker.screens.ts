import type { AppManifest, UiNode } from '@ankhorage/contracts';

import { createScreen, createSettingsSection } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { pokerContent } from './poker.content';
import type { PokerScreenIds } from './poker.routes';

function createNode(id: string, type: string, props?: Record<string, unknown>, children?: UiNode[]): UiNode {
  return {
    id,
    type,
    ...(props ? { props } : {}),
    ...(children && children.length > 0 ? { children } : {}),
  };
}

export function createPokerScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: PokerScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.home]: createScreen({
      id: screenIds.home,
      name: 'Trainer',
      title: pokerContent.home.title,
      description: pokerContent.home.description,
      root: createNode(`${idPrefix}-home-screen`, 'Screen', { width: 'default' }, [
        createNode(`${idPrefix}-home-header`, 'SectionHeader', {
          eyebrow: pokerContent.home.eyebrow,
          title: pokerContent.home.title,
          description: pokerContent.home.description,
        }),
        createNode(
          `${idPrefix}-home-table-section`,
          'ScreenSection',
          {
            title: 'Scenario table',
            description: 'Visualize seats, stacks, center labels, and current table state.',
          },
          [
            createNode(`${idPrefix}-home-table`, 'TabletopTable', {
              centerLabel: 'Pot: 1.2K',
              centerSublabel: 'Level: 200 / 400',
              seatCount: 6,
              shape: 'oval',
              cardSize: 'small',
              seats: [
                {
                  id: 'seat-button',
                  label: 'BTN',
                  sublabel: '98K',
                  selected: true,
                  tokenLabel: '800',
                  faceDownCards: 2,
                },
                {
                  id: 'seat-small',
                  label: 'SB',
                  sublabel: '100K',
                  tokenLabel: '200',
                  faceDownCards: 2,
                },
                {
                  id: 'seat-big',
                  label: 'BB',
                  sublabel: '99K',
                  tokenLabel: '400',
                  faceDownCards: 2,
                },
                {
                  id: 'seat-early',
                  label: 'EP',
                  sublabel: '104K',
                  muted: true,
                  faceDownCards: 2,
                },
                {
                  id: 'seat-middle',
                  label: 'MP',
                  sublabel: '96K',
                  faceDownCards: 2,
                },
                {
                  id: 'seat-cutoff',
                  label: 'CO',
                  sublabel: '101K',
                  faceDownCards: 2,
                },
              ],
              testID: `${idPrefix}-home-table`,
            }),
          ],
        ),
        createNode(
          `${idPrefix}-home-decision-section`,
          'ScreenSection',
          {
            title: 'Decision',
            description: 'Replace the sample actions with generated or app-specific trainer state.',
          },
          [
            createNode(`${idPrefix}-home-situation`, 'Card', {
              eyebrow: 'Situation',
              title: 'Button faces a raise',
              description:
                'Use this card for stack depth, previous action, position, and trainer prompt copy.',
            }),
            createNode(`${idPrefix}-home-fold`, 'Button', {
              children: 'Fold',
              variant: 'secondary',
            }),
            createNode(`${idPrefix}-home-call`, 'Button', {
              children: 'Call',
              variant: 'secondary',
            }),
            createNode(`${idPrefix}-home-raise`, 'Button', {
              children: 'Raise',
              variant: 'primary',
            }),
            createNode(`${idPrefix}-home-result`, 'Notice', {
              title: 'Explanation placeholder',
              description:
                'Show feedback after an answer is selected. The starter keeps state and scoring out of the template package.',
              tone: 'info',
            }),
          ],
        ),
      ]),
    }),
    [screenIds.settings]: createScreen({
      id: screenIds.settings,
      name: 'Settings',
      title: pokerContent.settings.title,
      description: pokerContent.settings.description,
      root: createNode(`${idPrefix}-settings-screen`, 'Screen', { width: 'default' }, [
        createNode(`${idPrefix}-settings-header`, 'SectionHeader', {
          eyebrow: pokerContent.settings.eyebrow,
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
              description: 'Start with six seats and a centered decision table.',
              meta: '6 seats',
            },
            {
              id: 'feedback-row',
              title: 'Feedback mode',
              description: 'Show explanations after each decision by default.',
              meta: 'after answer',
            },
            {
              id: 'category-row',
              title: 'Category',
              description: `${seed.categoryLabel} uses tabletop extension components.`,
              meta: 'extension',
            },
          ],
        ),
      ]),
    }),
  };
}
