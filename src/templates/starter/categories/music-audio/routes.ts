import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface MusicAudioScreenIds {
  home: string;
  search: string;
  library: string;
  player: string;
  profile: string;
}

export function createMusicAudioScreenIds(idPrefix: string): MusicAudioScreenIds {
  return {
    home: `${idPrefix}-home`,
    search: `${idPrefix}-search`,
    library: `${idPrefix}-library`,
    player: `${idPrefix}-player`,
    profile: `${idPrefix}-profile`,
  };
}

export function createMusicAudioNavigator(screenIds: MusicAudioScreenIds): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.home,
        label: 'Home',
        icon: { provider: 'material-community', name: 'music-note-outline' },
      }),
      createRoute({
        name: 'search',
        screenId: screenIds.search,
        label: 'Search',
        icon: { provider: 'material-community', name: 'magnify' },
      }),
      createRoute({
        name: 'library',
        screenId: screenIds.library,
        label: 'Library',
        icon: { provider: 'material-community', name: 'playlist-music-outline' },
      }),
      createRoute({
        name: 'player',
        screenId: screenIds.player,
        label: 'Player',
        icon: { provider: 'material-community', name: 'play-circle-outline' },
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

