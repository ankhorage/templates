import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../../shared';

export interface CreatorSocialScreenIds {
  studio: string;
  posts: string;
  audience: string;
  insights: string;
  settings: string;
}

export function createCreatorSocialScreenIds(idPrefix: string): CreatorSocialScreenIds {
  return {
    studio: `${idPrefix}-studio`,
    posts: `${idPrefix}-posts`,
    audience: `${idPrefix}-audience`,
    insights: `${idPrefix}-insights`,
    settings: `${idPrefix}-settings`,
  };
}

export function createCreatorSocialNavigator(
  screenIds: CreatorSocialScreenIds,
): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.studio,
        label: 'Studio',
        icon: { provider: 'material-community', name: 'view-dashboard-outline' },
      }),
      createRoute({
        name: 'posts',
        screenId: screenIds.posts,
        label: 'Posts',
        icon: { provider: 'material-community', name: 'file-document-edit-outline' },
      }),
      createRoute({
        name: 'audience',
        screenId: screenIds.audience,
        label: 'Audience',
        icon: { provider: 'material-community', name: 'account-multiple-outline' },
      }),
      createRoute({
        name: 'insights',
        screenId: screenIds.insights,
        label: 'Insights',
        icon: { provider: 'material-community', name: 'chart-line' },
      }),
      createRoute({
        name: 'settings',
        screenId: screenIds.settings,
        label: 'Settings',
        icon: { provider: 'material-community', name: 'cog-outline' },
      }),
    ],
  };
}
