import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createNewsMagazinesNavigator, createNewsMagazinesScreenIds } from './routes';
import { createNewsMagazinesScreens } from './screens';

export function createNewsMagazinesStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const screenIds = createNewsMagazinesScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createNewsMagazinesNavigator(screenIds),
    screens: createNewsMagazinesScreens(seed, idPrefix, screenIds),
  });
}

