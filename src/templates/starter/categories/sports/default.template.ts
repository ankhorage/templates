import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createSportsNavigator, createSportsScreenIds } from './routes';
import { createSportsScreens } from './screens';

export function createSportsStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const screenIds = createSportsScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createSportsNavigator(screenIds),
    screens: createSportsScreens(seed, idPrefix, screenIds),
  });
}
