import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface PhotoVideoScreenIds {
  capture: string;
  library: string;
  edit: string;
  share: string;
  profile: string;
}

export function createPhotoVideoScreenIds(idPrefix: string): PhotoVideoScreenIds {
  return {
    capture: `${idPrefix}-capture`,
    library: `${idPrefix}-library`,
    edit: `${idPrefix}-edit`,
    share: `${idPrefix}-share`,
    profile: `${idPrefix}-profile`,
  };
}

export function createPhotoVideoNavigator(screenIds: PhotoVideoScreenIds): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.capture,
        label: 'Capture',
        icon: { provider: 'material-community', name: 'camera-outline' },
      }),
      createRoute({
        name: 'library',
        screenId: screenIds.library,
        label: 'Library',
        icon: { provider: 'material-community', name: 'image-multiple-outline' },
      }),
      createRoute({
        name: 'edit',
        screenId: screenIds.edit,
        label: 'Edit',
        icon: { provider: 'material-community', name: 'movie-edit-outline' },
      }),
      createRoute({
        name: 'share',
        screenId: screenIds.share,
        label: 'Share',
        icon: { provider: 'material-community', name: 'share-variant-outline' },
      }),
      createRoute({
        name: 'profile',
        screenId: screenIds.profile,
        label: 'Profile',
        icon: { provider: 'material-community', name: 'account-circle-outline' },
      }),
    ],
  };
}

