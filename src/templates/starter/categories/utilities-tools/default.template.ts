import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createUtilitiesToolsNavigator, createUtilitiesToolsScreenIds } from './routes';
import { createUtilitiesToolsScreens } from './screens';

export function createUtilitiesToolsStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const screenIds = createUtilitiesToolsScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createUtilitiesToolsNavigator(screenIds),
    screens: createUtilitiesToolsScreens(seed, idPrefix, screenIds),
  });
}
