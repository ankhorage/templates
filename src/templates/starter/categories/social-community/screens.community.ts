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
import { communitySocialContent } from './content';
import type { CommunitySocialScreenIds } from './routes.community';

interface SocialCardContent {
  eyebrow: string;
  title: string;
  description: string;
}

interface SocialSectionContent {
  title: string;
  description: string;
  cards: readonly SocialCardContent[];
}

interface SocialScreenContent {
  eyebrow: string;
  title: string;
  description: string;
  sections: readonly SocialSectionContent[];
}

function createSocialScreen(args: {
  idPrefix: string;
  screenId: string;
  name: string;
  content: SocialScreenContent;
}) {
  const idSegment = args.name.toLowerCase();
  const sectionNodes: ZoraNode[] = args.content.sections.map((section, sectionIndex) =>
    createSection(
      `${args.idPrefix}-${idSegment}-section-${sectionIndex + 1}`,
      {
        title: section.title,
        description: section.description,
      },
      [
        createZoraNode(
          `${args.idPrefix}-${idSegment}-panel-${sectionIndex + 1}`,
          'Panel',
          {
            title: section.title,
            description: section.description,
            tone: 'subtle',
          },
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

export function createCommunitySocialScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: CommunitySocialScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.feed]: createSocialScreen({
      idPrefix,
      screenId: screenIds.feed,
      name: 'Feed',
      content: communitySocialContent.feed,
    }),
    [screenIds.groups]: createSocialScreen({
      idPrefix,
      screenId: screenIds.groups,
      name: 'Groups',
      content: communitySocialContent.groups,
    }),
    [screenIds.messages]: createSocialScreen({
      idPrefix,
      screenId: screenIds.messages,
      name: 'Messages',
      content: communitySocialContent.messages,
    }),
    [screenIds.profile]: createSocialScreen({
      idPrefix,
      screenId: screenIds.profile,
      name: 'Profile',
      content: communitySocialContent.profile,
    }),
    [screenIds.settings]: createScreen({
      id: screenIds.settings,
      name: 'Settings',
      title: 'Community settings',
      description: communitySocialContent.settings.description,
      root: createScreenRoot(`${idPrefix}-settings-screen`, { width: 'default' }, [
        createZoraNode(`${idPrefix}-settings-header`, 'SectionHeader', {
          eyebrow: communitySocialContent.settings.eyebrow,
          title: communitySocialContent.settings.title,
          description: communitySocialContent.settings.description,
        }),
        createSettingsSection(
          `${idPrefix}-settings`,
          'Member preferences',
          'Model the defaults that affect feed, groups, messages, and account trust.',
          [
            {
              id: 'notifications-row',
              title: 'Notification cadence',
              description: 'Daily digest with immediate direct-message alerts.',
              meta: 'daily',
            },
            {
              id: 'privacy-row',
              title: 'Profile visibility',
              description: 'Members start visible to joined groups and conversations.',
              meta: 'members',
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
