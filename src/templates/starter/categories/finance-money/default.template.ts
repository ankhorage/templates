import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createFinanceMoneyNavigator, createFinanceMoneyScreenIds } from './routes';
import { createFinanceMoneyScreens } from './screens';

export function createFinanceMoneyStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const screenIds = createFinanceMoneyScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createFinanceMoneyNavigator(screenIds),
    screens: createFinanceMoneyScreens(seed, idPrefix, screenIds),
  });
}
