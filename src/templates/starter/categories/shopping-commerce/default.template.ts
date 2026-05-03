import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createShoppingCommerceNavigator, createShoppingCommerceScreenIds } from './routes';
import { createShoppingCommerceScreens } from './screens';

export function createShoppingCommerceStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const screenIds = createShoppingCommerceScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createShoppingCommerceNavigator(screenIds),
    screens: createShoppingCommerceScreens(seed, idPrefix, screenIds),
  });
}
