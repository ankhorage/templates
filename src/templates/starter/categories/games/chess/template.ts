import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../../shared';
import type { TemplateSeed } from '../../../starter.types';
import { createChessNavigator, createChessScreenIds } from './routes';
import { createChessScreens } from './screens';

export function createChessStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-chess`;
  const theme = createTheme(seed);
  const screenIds = createChessScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createChessNavigator(screenIds),
    screens: createChessScreens(seed, idPrefix, screenIds),
  });
}
