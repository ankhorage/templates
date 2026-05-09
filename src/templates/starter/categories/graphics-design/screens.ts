import type { AppManifest } from '@ankhorage/contracts';

import { createStarterContentScreen, createStarterSettingsScreen } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { graphicsDesignContent } from './content';
import type { GraphicsDesignScreenIds } from './routes';

export function createGraphicsDesignScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: GraphicsDesignScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.dashboard]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.dashboard,
      name: 'Dashboard',
      content: graphicsDesignContent.dashboard,
    }),
    [screenIds.briefs]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.briefs,
      name: 'Briefs',
      content: graphicsDesignContent.briefs,
    }),
    [screenIds.assets]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.assets,
      name: 'Assets',
      content: graphicsDesignContent.assets,
    }),
    [screenIds.reviews]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.reviews,
      name: 'Reviews',
      content: graphicsDesignContent.reviews,
    }),
    [screenIds.brand]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.brand,
      name: 'Brand',
      content: graphicsDesignContent.brand,
    }),
    [screenIds.settings]: createStarterSettingsScreen({
      idPrefix,
      screenId: screenIds.settings,
      name: 'Settings',
      header: graphicsDesignContent.settings,
      section: {
        title: 'Review defaults',
        description: 'Seed collaboration and export preferences for creative workflows.',
        rows: [
          {
            id: 'exports-row',
            title: 'Default exports',
            description: 'Export PNG and SVG variants by default for handoff.',
            meta: 'png+svg',
          },
          {
            id: 'review-row',
            title: 'Review mode',
            description: 'New briefs require a review before marking final.',
            meta: 'required',
          },
          {
            id: 'auth-row',
            title: 'Auth scope',
            description: `${seed.categoryLabel} inherits the manifest infra auth setting.`,
            meta: 'global',
          },
        ],
      },
    }),
  };
}
