import type { ScreenSpec } from '@ankhorage/contracts';

import { createScreen } from './screen';
import {
  createHeader,
  createPage,
  createSection,
  createSettingsSection,
  createZoraNode,
  type ZoraNode,
} from './zora-node-helpers';

export interface StarterCardContent {
  eyebrow: string;
  title: string;
  description: string;
}

export interface StarterSectionContent {
  title: string;
  description: string;
  cards: readonly StarterCardContent[];
}

export interface StarterContentScreenContent {
  eyebrow: string;
  title: string;
  description: string;
  sections: readonly StarterSectionContent[];
}

export function createStarterContentScreen(args: {
  idPrefix: string;
  screenId: string;
  name: string;
  content: StarterContentScreenContent;
  pageWidth?: 'wide' | 'default';
}): ScreenSpec {
  const sectionNodes: ZoraNode[] = args.content.sections.map((section, sectionIndex) =>
    createSection(
      `${args.idPrefix}-${args.name.toLowerCase()}-section-${sectionIndex + 1}`,
      { title: section.title, description: section.description },
      [
        createZoraNode(
          `${args.idPrefix}-${args.name.toLowerCase()}-panel-${sectionIndex + 1}`,
          'Panel',
          { title: section.title, description: section.description, tone: 'subtle' },
          section.cards.map((card, cardIndex) =>
            createZoraNode(
              `${args.idPrefix}-${args.name.toLowerCase()}-card-${sectionIndex + 1}-${cardIndex + 1}`,
              'Card',
              {
                eyebrow: card.eyebrow,
                title: card.title,
                description: card.description,
                tone: 'outline',
              },
            ),
          ),
        ),
      ],
    ),
  );

  return createScreen({
    id: args.screenId,
    name: args.name,
    title: args.content.title,
    description: args.content.description,
    root: createPage(
      `${args.idPrefix}-${args.name.toLowerCase()}-page`,
      { width: args.pageWidth ?? 'wide' },
      [
        createHeader(`${args.idPrefix}-${args.name.toLowerCase()}-header`, {
          eyebrow: args.content.eyebrow,
          title: args.content.title,
          description: args.content.description,
        }),
        ...sectionNodes,
      ],
    ),
  });
}

export function createStarterSettingsScreen(args: {
  idPrefix: string;
  screenId: string;
  name: string;
  header: {
    eyebrow: string;
    title: string;
    description: string;
  };
  section: {
    title: string;
    description: string;
    rows: readonly {
      id: string;
      title: string;
      description: string;
      meta?: string;
    }[];
  };
}): ScreenSpec {
  return createScreen({
    id: args.screenId,
    name: args.name,
    title: args.header.title,
    description: args.header.description,
    root: createPage(`${args.idPrefix}-${args.name.toLowerCase()}-page`, { width: 'default' }, [
      createHeader(`${args.idPrefix}-${args.name.toLowerCase()}-header`, {
        eyebrow: args.header.eyebrow,
        title: args.header.title,
        description: args.header.description,
      }),
      createSettingsSection(
        `${args.idPrefix}-${args.name.toLowerCase()}`,
        args.section.title,
        args.section.description,
        args.section.rows,
      ),
    ]),
  });
}
