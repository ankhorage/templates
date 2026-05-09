import type { AppManifest } from '@ankhorage/contracts';

import { createStarterContentScreen, createStarterSettingsScreen } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { photoVideoContent } from './content';
import type { PhotoVideoScreenIds } from './routes';

export function createPhotoVideoScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: PhotoVideoScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.capture]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.capture,
      name: 'Capture',
      content: photoVideoContent.capture,
    }),
    [screenIds.library]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.library,
      name: 'Library',
      content: photoVideoContent.library,
    }),
    [screenIds.edit]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.edit,
      name: 'Edit',
      content: photoVideoContent.edit,
    }),
    [screenIds.share]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.share,
      name: 'Share',
      content: photoVideoContent.share,
    }),
    [screenIds.profile]: createStarterSettingsScreen({
      idPrefix,
      screenId: screenIds.profile,
      name: 'Profile',
      header: photoVideoContent.profile,
      section: {
        title: 'Studio defaults',
        description: 'Seed export, storage, and publishing preferences.',
        rows: [
          {
            id: 'quality-row',
            title: 'Default export',
            description: 'Exports default to high quality.',
            meta: 'hq',
          },
          {
            id: 'storage-row',
            title: 'Storage',
            description: 'Keep originals locally until cloud sync is configured.',
            meta: 'local',
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
