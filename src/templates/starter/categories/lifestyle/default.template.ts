import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createLifestyleNavigator, createLifestyleScreenIds } from './routes';
import { createLifestyleScreens } from './screens';

export function createLifestyleStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const screenIds = createLifestyleScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createLifestyleNavigator(screenIds),
    screens: createLifestyleScreens(seed, idPrefix, screenIds),
  });
}
