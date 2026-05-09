import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createNavigationTravelNavigator, createNavigationTravelScreenIds } from './routes';
import { createNavigationTravelScreens } from './screens';

export function createNavigationTravelStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const screenIds = createNavigationTravelScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createNavigationTravelNavigator(screenIds),
    screens: createNavigationTravelScreens(seed, idPrefix, screenIds),
  });
}

