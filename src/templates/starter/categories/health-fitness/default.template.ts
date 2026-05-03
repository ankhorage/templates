import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createHealthFitnessNavigator, createHealthFitnessScreenIds } from './routes';
import { createHealthFitnessScreens } from './screens';

export function createHealthFitnessStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const screenIds = createHealthFitnessScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createHealthFitnessNavigator(screenIds),
    screens: createHealthFitnessScreens(seed, idPrefix, screenIds),
  });
}
