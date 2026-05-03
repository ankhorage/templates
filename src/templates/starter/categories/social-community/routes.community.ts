import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface CommunitySocialScreenIds {
  feed: string;
  groups: string;
  messages: string;
  profile: string;
  settings: string;
}

export function createCommunitySocialScreenIds(idPrefix: string): CommunitySocialScreenIds {
  return {
    feed: `${idPrefix}-feed`,
    groups: `${idPrefix}-groups`,
    messages: `${idPrefix}-messages`,
    profile: `${idPrefix}-profile`,
    settings: `${idPrefix}-settings`,
  };
}

export function createCommunitySocialNavigator(
  screenIds: CommunitySocialScreenIds,
): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.feed,
        label: 'Feed',
        icon: { provider: 'material-community', name: 'newspaper-variant-outline' },
      }),
      createRoute({
        name: 'groups',
        screenId: screenIds.groups,
        label: 'Groups',
        icon: { provider: 'material-community', name: 'account-group-outline' },
      }),
      createRoute({
        name: 'messages',
        screenId: screenIds.messages,
        label: 'Messages',
        icon: { provider: 'material-community', name: 'message-text-outline' },
      }),
      createRoute({
        name: 'profile',
        screenId: screenIds.profile,
        label: 'Profile',
        icon: { provider: 'material-community', name: 'account-circle-outline' },
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
