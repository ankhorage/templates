import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createMusicAudioNavigator, createMusicAudioScreenIds } from './routes';
import { createMusicAudioScreens } from './screens';

export function createMusicAudioStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const screenIds = createMusicAudioScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createMusicAudioNavigator(screenIds),
    screens: createMusicAudioScreens(seed, idPrefix, screenIds),
  });
}

