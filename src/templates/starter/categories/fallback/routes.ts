import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface FallbackScreenIds {
  home: string;
  details: string;
  settings: string;
  signIn: string;
}

export function createFallbackScreenIds(idPrefix: string): FallbackScreenIds {
  return {
    home: `${idPrefix}-home`,
    details: `${idPrefix}-details`,
    settings: `${idPrefix}-settings`,
    signIn: `${idPrefix}-sign-in`,
  };
}

export function createFallbackNavigator(screenIds: FallbackScreenIds): AppManifest['navigator'] {
  return {
    type: 'stack',
    initialRouteName: 'index',
    routes: [
      createRoute({ name: 'index', screenId: screenIds.home, label: 'Home' }),
      createRoute({ name: 'details', screenId: screenIds.details, label: 'Details' }),
      createRoute({ name: 'settings', screenId: screenIds.settings, label: 'Settings' }),
      createRoute({ name: 'sign-in', screenId: screenIds.signIn, label: 'Sign in' }),
    ],
  };
}
