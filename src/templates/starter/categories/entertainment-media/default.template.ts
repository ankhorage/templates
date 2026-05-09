import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createEntertainmentMediaNavigator, createEntertainmentMediaScreenIds } from './routes';
import { createEntertainmentMediaScreens } from './screens';

export function createEntertainmentMediaStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const screenIds = createEntertainmentMediaScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createEntertainmentMediaNavigator(screenIds),
    screens: createEntertainmentMediaScreens(seed, idPrefix, screenIds),
  });
}
