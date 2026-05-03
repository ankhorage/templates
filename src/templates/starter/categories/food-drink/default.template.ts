import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createFoodDrinkNavigator, createFoodDrinkScreenIds } from './routes';
import { createFoodDrinkScreens } from './screens';

export function createFoodDrinkStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const screenIds = createFoodDrinkScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createFoodDrinkNavigator(screenIds),
    screens: createFoodDrinkScreens(seed, idPrefix, screenIds),
  });
}
