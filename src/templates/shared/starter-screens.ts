import type { ScreenSpec } from '@ankhorage/contracts';

import { createScreen } from './screen';
import {
  createScreenRoot,
  createSection,
  createSettingsSection,
  createZoraNode,
  type ZoraNode,
} from './zora-node-helpers';

interface StarterCardContent {
  eyebrow: string;
  title: string;
  description: string;
}

interface StarterSectionContent {
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
  const idSegment = createIdSegment(args.name);
  const sectionNodes: ZoraNode[] = args.content.sections.map((section, sectionIndex) =>
    createSection(
      `${args.idPrefix}-${idSegment}-section-${sectionIndex + 1}`,
      { title: section.title, description: section.description },
      [
        createZoraNode(
          `${args.idPrefix}-${idSegment}-panel-${sectionIndex + 1}`,
          'Panel',
          { title: section.title, description: section.description, tone: 'subtle' },
          section.cards.map((card, cardIndex) =>
            createZoraNode(
              `${args.idPrefix}-${idSegment}-card-${sectionIndex + 1}-${cardIndex + 1}`,
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
    root: createScreenRoot(
      `${args.idPrefix}-${idSegment}-screen`,
      { width: args.pageWidth ?? 'wide' },
      [
        createZoraNode(`${args.idPrefix}-${idSegment}-screen-header`, 'SectionHeader', {
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
  const idSegment = createIdSegment(args.name);

  return createScreen({
    id: args.screenId,
    name: args.name,
    title: args.header.title,
    description: args.header.description,
    root: createScreenRoot(`${args.idPrefix}-${idSegment}-screen`, { width: 'default' }, [
      createZoraNode(`${args.idPrefix}-${idSegment}-screen-header`, 'SectionHeader', {
        eyebrow: args.header.eyebrow,
        title: args.header.title,
        description: args.header.description,
      }),
      createSettingsSection(
        `${args.idPrefix}-${idSegment}`,
        args.section.title,
        args.section.description,
        args.section.rows,
      ),
    ]),
  });
}

function createIdSegment(value: string): string {
  const segment = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return segment || 'screen';
}
