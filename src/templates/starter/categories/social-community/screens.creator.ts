import type { AppManifest } from '@ankhorage/contracts';

import {
  createHeader,
  createPage,
  createScreen,
  createSection,
  createSettingsSection,
  createZoraNode,
  type ZoraNode,
} from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { creatorSocialContent } from './content';
import type { CreatorSocialScreenIds } from './routes.creator';

interface CreatorCardContent {
  eyebrow: string;
  title: string;
  description: string;
}

interface CreatorSectionContent {
  title: string;
  description: string;
  cards: readonly CreatorCardContent[];
}

interface CreatorScreenContent {
  eyebrow: string;
  title: string;
  description: string;
  sections: readonly CreatorSectionContent[];
}

function createCreatorScreen(args: {
  idPrefix: string;
  screenId: string;
  name: string;
  content: CreatorScreenContent;
}) {
  const sectionNodes: ZoraNode[] = args.content.sections.map((section, sectionIndex) =>
    createSection(
      `${args.idPrefix}-${args.name.toLowerCase()}-section-${sectionIndex + 1}`,
      {
        title: section.title,
        description: section.description,
      },
      [
        createZoraNode(
          `${args.idPrefix}-${args.name.toLowerCase()}-panel-${sectionIndex + 1}`,
          'Panel',
          {
            title: section.title,
            description: section.description,
            tone: 'subtle',
          },
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
    root: createPage(`${args.idPrefix}-${args.name.toLowerCase()}-page`, { width: 'wide' }, [
      createHeader(`${args.idPrefix}-${args.name.toLowerCase()}-header`, {
        eyebrow: args.content.eyebrow,
        title: args.content.title,
        description: args.content.description,
      }),
      ...sectionNodes,
    ]),
  });
}

export function createCreatorSocialScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: CreatorSocialScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.studio]: createCreatorScreen({
      idPrefix,
      screenId: screenIds.studio,
      name: 'Studio',
      content: creatorSocialContent.studio,
    }),
    [screenIds.posts]: createCreatorScreen({
      idPrefix,
      screenId: screenIds.posts,
      name: 'Posts',
      content: creatorSocialContent.posts,
    }),
    [screenIds.audience]: createCreatorScreen({
      idPrefix,
      screenId: screenIds.audience,
      name: 'Audience',
      content: creatorSocialContent.audience,
    }),
    [screenIds.insights]: createCreatorScreen({
      idPrefix,
      screenId: screenIds.insights,
      name: 'Insights',
      content: creatorSocialContent.insights,
    }),
    [screenIds.settings]: createScreen({
      id: screenIds.settings,
      name: 'Settings',
      title: 'Creator settings',
      description: creatorSocialContent.settings.description,
      root: createPage(`${idPrefix}-settings-page`, { width: 'default' }, [
        createHeader(`${idPrefix}-settings-header`, {
          eyebrow: creatorSocialContent.settings.eyebrow,
          title: creatorSocialContent.settings.title,
          description: creatorSocialContent.settings.description,
        }),
        createSettingsSection(
          `${idPrefix}-settings`,
          'Publishing defaults',
          'Model profile, notification, and publishing preferences for a creator-led app.',
          [
            {
              id: 'profile-row',
              title: 'Public profile',
              description: 'Creator profile fields are ready for avatar, bio, and links.',
              meta: 'ready',
            },
            {
              id: 'publish-row',
              title: 'Publishing review',
              description: 'Drafts can move through review before scheduling.',
              meta: 'manual',
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
