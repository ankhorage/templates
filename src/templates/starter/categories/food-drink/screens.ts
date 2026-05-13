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
import { foodDrinkContent } from './content';
import type { FoodDrinkScreenIds } from './routes';

interface FoodDrinkCardContent {
  eyebrow: string;
  title: string;
  description: string;
}

interface FoodDrinkSectionContent {
  title: string;
  description: string;
  cards: readonly FoodDrinkCardContent[];
}

interface FoodDrinkScreenContent {
  eyebrow: string;
  title: string;
  description: string;
  sections: readonly FoodDrinkSectionContent[];
}

function createFoodDrinkContentScreen(args: {
  idPrefix: string;
  screenId: string;
  name: string;
  content: FoodDrinkScreenContent;
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

export function createFoodDrinkScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: FoodDrinkScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.discover]: createFoodDrinkContentScreen({
      idPrefix,
      screenId: screenIds.discover,
      name: 'Discover',
      content: foodDrinkContent.discover,
    }),
    [screenIds.menu]: createFoodDrinkContentScreen({
      idPrefix,
      screenId: screenIds.menu,
      name: 'Menu',
      content: foodDrinkContent.menu,
    }),
    [screenIds.reservations]: createFoodDrinkContentScreen({
      idPrefix,
      screenId: screenIds.reservations,
      name: 'Reservations',
      content: foodDrinkContent.reservations,
    }),
    [screenIds.orders]: createFoodDrinkContentScreen({
      idPrefix,
      screenId: screenIds.orders,
      name: 'Orders',
      content: foodDrinkContent.orders,
    }),
    [screenIds.profile]: createScreen({
      id: screenIds.profile,
      name: 'Profile',
      title: foodDrinkContent.profile.title,
      description: foodDrinkContent.profile.description,
      root: createScreenRoot(`${idPrefix}-profile-screen`, { width: 'default' }, [
        createZoraNode(`${idPrefix}-profile-header`, 'SectionHeader', {
          eyebrow: foodDrinkContent.profile.eyebrow,
          title: foodDrinkContent.profile.title,
          description: foodDrinkContent.profile.description,
        }),
        createSettingsSection(
          `${idPrefix}-profile`,
          'Guest defaults',
          'Model the account fields a restaurant app needs before runtime profile wiring.',
          [
            {
              id: 'dietary-row',
              title: 'Dietary preferences',
              description: 'Vegetarian, gluten-free, allergens, and favorite cuisines.',
              meta: 'editable',
            },
            {
              id: 'loyalty-row',
              title: 'Loyalty status',
              description: 'Reward points and membership tier can be attached here.',
              meta: 'starter',
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
