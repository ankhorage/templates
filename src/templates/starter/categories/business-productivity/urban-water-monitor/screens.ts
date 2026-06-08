import type { AppManifest } from '@ankhorage/contracts';

import { createScreen, createScreenRoot, createZoraNode, type ZoraNode } from '../../../../shared';
import { urbanWaterMonitorProjectContent, type UrbanWaterMonitorSectionContent } from './content';
import type { UrbanWaterMonitorScreenIds } from './routes';

function createIdSegment(value: string): string {
  const segment = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return segment || 'section';
}

function createProjectSection(
  idPrefix: string,
  section: UrbanWaterMonitorSectionContent,
): ZoraNode {
  const idSegment = createIdSegment(section.title);

  return createZoraNode(
    `${idPrefix}-project-${idSegment}-disclosure`,
    'DisclosureSection',
    {
      title: section.title,
      description: section.description,
      defaultOpen: false,
    },
    section.cards.map((card, cardIndex) =>
      createZoraNode(`${idPrefix}-project-${idSegment}-card-${cardIndex + 1}`, 'Card', {
        eyebrow: card.eyebrow,
        title: card.title,
        description: card.description,
        tone: 'outline',
      }),
    ),
  );
}

export function createUrbanWaterMonitorScreens(
  idPrefix: string,
  screenIds: UrbanWaterMonitorScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.project]: createScreen({
      id: screenIds.project,
      name: 'Project',
      title: urbanWaterMonitorProjectContent.title,
      description: urbanWaterMonitorProjectContent.description,
      root: createScreenRoot(`${idPrefix}-project-screen`, { width: 'wide' }, [
        createZoraNode(`${idPrefix}-project-header`, 'SectionHeader', {
          eyebrow: urbanWaterMonitorProjectContent.eyebrow,
          title: urbanWaterMonitorProjectContent.title,
          description: urbanWaterMonitorProjectContent.description,
        }),
        ...urbanWaterMonitorProjectContent.sections.map((section) =>
          createProjectSection(idPrefix, section),
        ),
      ]),
    }),
  };
}
