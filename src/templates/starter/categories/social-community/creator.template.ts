import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createCreatorSocialNavigator, createCreatorSocialScreenIds } from './routes.creator';
import { createCreatorSocialScreens } from './screens.creator';

export function createSocialCreatorTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-creator-starter`;
  const theme = createTheme(seed);
  const screenIds = createCreatorSocialScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createCreatorSocialNavigator(screenIds),
    screens: createCreatorSocialScreens(seed, idPrefix, screenIds),
  });
}
