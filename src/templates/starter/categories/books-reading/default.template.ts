import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createBooksReadingNavigator, createBooksReadingScreenIds } from './routes';
import { createBooksReadingScreens } from './screens';

export function createBooksReadingStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const screenIds = createBooksReadingScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createBooksReadingNavigator(screenIds),
    screens: createBooksReadingScreens(seed, idPrefix, screenIds),
  });
}
