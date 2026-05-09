import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createKidsFamilyNavigator, createKidsFamilyScreenIds } from './routes';
import { createKidsFamilyScreens } from './screens';

export function createKidsFamilyStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const screenIds = createKidsFamilyScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createKidsFamilyNavigator(screenIds),
    screens: createKidsFamilyScreens(seed, idPrefix, screenIds),
  });
}

