import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import {
  createNutritionCatalogScanNavigator,
  createNutritionCatalogScanScreenIds,
} from './routes.nutrition-catalog-scan';
import { createNutritionCatalogScanScreens } from './screens.nutrition-catalog-scan';

export function createNutritionCatalogScanStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-nutrition-catalog-scan`;
  const theme = createTheme(seed);
  const screenIds = createNutritionCatalogScanScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createNutritionCatalogScanNavigator(screenIds),
    screens: createNutritionCatalogScanScreens(seed, idPrefix, screenIds),
  });
}
