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
import { shoppingCommerceContent } from './content';
import type { ShoppingCommerceScreenIds } from './routes';

interface ShoppingCommerceCardContent {
  eyebrow: string;
  title: string;
  description: string;
}

interface ShoppingCommerceSectionContent {
  title: string;
  description: string;
  cards: readonly ShoppingCommerceCardContent[];
}

interface ShoppingCommerceScreenContent {
  eyebrow: string;
  title: string;
  description: string;
  sections: readonly ShoppingCommerceSectionContent[];
}

function createShoppingCommerceContentScreen(args: {
  idPrefix: string;
  screenId: string;
  name: string;
  content: ShoppingCommerceScreenContent;
}) {
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

export function createShoppingCommerceScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: ShoppingCommerceScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.browse]: createShoppingCommerceContentScreen({
      idPrefix,
      screenId: screenIds.browse,
      name: 'Browse',
      content: shoppingCommerceContent.browse,
    }),
    [screenIds.search]: createShoppingCommerceContentScreen({
      idPrefix,
      screenId: screenIds.search,
      name: 'Search',
      content: shoppingCommerceContent.search,
    }),
    [screenIds.sell]: createShoppingCommerceContentScreen({
      idPrefix,
      screenId: screenIds.sell,
      name: 'Sell',
      content: shoppingCommerceContent.sell,
    }),
    [screenIds.orders]: createShoppingCommerceContentScreen({
      idPrefix,
      screenId: screenIds.orders,
      name: 'Orders',
      content: shoppingCommerceContent.orders,
    }),
    [screenIds.profile]: createScreen({
      id: screenIds.profile,
      name: 'Profile',
      title: shoppingCommerceContent.profile.title,
      description: shoppingCommerceContent.profile.description,
      root: createPage(`${idPrefix}-profile-page`, { width: 'default' }, [
        createHeader(`${idPrefix}-profile-header`, {
          eyebrow: shoppingCommerceContent.profile.eyebrow,
          title: shoppingCommerceContent.profile.title,
          description: shoppingCommerceContent.profile.description,
        }),
        createSettingsSection(
          `${idPrefix}-profile`,
          'Marketplace account',
          'Model the buyer and seller details a commerce app needs.',
          [
            {
              id: 'trust-row',
              title: 'Trust profile',
              description: 'Verification, reviews, and seller reputation can surface here.',
              meta: 'starter',
            },
            {
              id: 'shipping-row',
              title: 'Shipping preferences',
              description: 'Default address, delivery speed, and seller handling options.',
              meta: 'editable',
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
