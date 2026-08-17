import type { AppManifest } from '@ankhorage/contracts';

import {
  createScreen,
  createScreenRoot,
  createSection,
  createZoraNode,
  type ZoraNode,
} from '../../../../shared';

interface CardContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

interface SectionContent {
  readonly title: string;
  readonly description: string;
  readonly cards: readonly CardContent[];
}

export interface NutritionContentScreen {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly sections: readonly SectionContent[];
}

export function createNutritionContentScreen(args: {
  readonly idPrefix: string;
  readonly screenId: string;
  readonly name: string;
  readonly content: NutritionContentScreen;
  readonly body?: readonly ZoraNode[];
  readonly dataLoaders?: AppManifest['screens'][string]['dataLoaders'];
  readonly requires?: AppManifest['screens'][string]['requires'];
}): AppManifest['screens'][string] {
  const idSegment = args.name.toLowerCase().replaceAll(' ', '-');
  const body = args.body ?? createSectionCards(args.idPrefix, idSegment, args.content.sections);

  return createScreen({
    id: args.screenId,
    name: args.name,
    title: args.content.title,
    description: args.content.description,
    root: createScreenRoot(`${args.idPrefix}-${idSegment}-screen`, { width: 'wide' }, [
      createZoraNode(`${args.idPrefix}-${idSegment}-header`, 'SectionHeader', {
        eyebrow: args.content.eyebrow,
        title: args.content.title,
        description: args.content.description,
      }),
      ...body,
    ]),
    dataLoaders: args.dataLoaders,
    requires: args.requires,
  });
}

function createSectionCards(
  idPrefix: string,
  idSegment: string,
  sections: readonly SectionContent[],
): ZoraNode[] {
  return sections.map((section, sectionIndex) =>
    createSection(
      `${idPrefix}-${idSegment}-section-${sectionIndex + 1}`,
      { title: section.title, description: section.description },
      [
        createZoraNode(
          `${idPrefix}-${idSegment}-panel-${sectionIndex + 1}`,
          'Panel',
          { title: section.title, description: section.description, tone: 'subtle' },
          section.cards.map((card, cardIndex) =>
            createZoraNode(
              `${idPrefix}-${idSegment}-card-${sectionIndex + 1}-${cardIndex + 1}`,
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
}
