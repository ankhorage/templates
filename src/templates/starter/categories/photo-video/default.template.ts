import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createPhotoVideoNavigator, createPhotoVideoScreenIds } from './routes';
import { createPhotoVideoScreens } from './screens';

export function createPhotoVideoStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const screenIds = createPhotoVideoScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createPhotoVideoNavigator(screenIds),
    screens: createPhotoVideoScreens(seed, idPrefix, screenIds),
  });
}

