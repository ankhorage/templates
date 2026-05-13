import type { AppManifest } from '@ankhorage/contracts';

import {
  createScreen,
  createScreenRoot,
  createSection,
  createSettingsSection,
  createZoraNode,
  type ZoraNode,
} from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { healthFitnessContent } from './content';
import type { HealthFitnessScreenIds } from './routes';

interface HealthFitnessCardContent {
  eyebrow: string;
  title: string;
  description: string;
}

interface HealthFitnessSectionContent {
  title: string;
  description: string;
  cards: readonly HealthFitnessCardContent[];
}

interface HealthFitnessScreenContent {
  eyebrow: string;
  title: string;
  description: string;
  sections: readonly HealthFitnessSectionContent[];
}

function createHealthFitnessContentScreen(args: {
  idPrefix: string;
  screenId: string;
  name: string;
  content: HealthFitnessScreenContent;
}) {
  const idSegment = args.name.toLowerCase();
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
    root: createScreenRoot(`${args.idPrefix}-${idSegment}-screen`, { width: 'wide' }, [
      createZoraNode(`${args.idPrefix}-${idSegment}-header`, 'SectionHeader', {
        eyebrow: args.content.eyebrow,
        title: args.content.title,
        description: args.content.description,
      }),
      ...sectionNodes,
    ]),
  });
}

export function createHealthFitnessScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: HealthFitnessScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.today]: createHealthFitnessContentScreen({
      idPrefix,
      screenId: screenIds.today,
      name: 'Today',
      content: healthFitnessContent.today,
    }),
    [screenIds.plans]: createHealthFitnessContentScreen({
      idPrefix,
      screenId: screenIds.plans,
      name: 'Plans',
      content: healthFitnessContent.plans,
    }),
    [screenIds.progress]: createHealthFitnessContentScreen({
      idPrefix,
      screenId: screenIds.progress,
      name: 'Progress',
      content: healthFitnessContent.progress,
    }),
    [screenIds.coach]: createHealthFitnessContentScreen({
      idPrefix,
      screenId: screenIds.coach,
      name: 'Coach',
      content: healthFitnessContent.coach,
    }),
    [screenIds.profile]: createScreen({
      id: screenIds.profile,
      name: 'Profile',
      title: healthFitnessContent.profile.title,
      description: healthFitnessContent.profile.description,
      root: createScreenRoot(`${idPrefix}-profile-screen`, { width: 'default' }, [
        createZoraNode(`${idPrefix}-profile-header`, 'SectionHeader', {
          eyebrow: healthFitnessContent.profile.eyebrow,
          title: healthFitnessContent.profile.title,
          description: healthFitnessContent.profile.description,
        }),
        createSettingsSection(
          `${idPrefix}-profile`,
          'Training preferences',
          'Model the profile state a fitness app needs before runtime personalization.',
          [
            {
              id: 'goal-row',
              title: 'Primary goal',
              description: 'Strength, mobility, endurance, recovery, or general wellness.',
              meta: 'strength',
            },
            {
              id: 'schedule-row',
              title: 'Training days',
              description: 'Preferred cadence and available workout windows.',
              meta: '4 days',
            },
            {
              id: 'auth-row',
              title: 'Auth scope',
              description: `${seed.categoryLabel} inherits the manifest infra auth setting.`,
              meta: 'global',
            },
          ],
        ),
      ]),
    }),
  };
}
