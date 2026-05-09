import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createDeveloperToolsNavigator, createDeveloperToolsScreenIds } from './routes';
import { createDeveloperToolsScreens } from './screens';

export function createDeveloperToolsStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const screenIds = createDeveloperToolsScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createDeveloperToolsNavigator(screenIds),
    screens: createDeveloperToolsScreens(seed, idPrefix, screenIds),
  });
}
