import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createCommunitySocialNavigator, createCommunitySocialScreenIds } from './routes.community';
import { createCommunitySocialScreens } from './screens.community';

export function createSocialCommunityTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-community-starter`;
  const theme = createTheme(seed);
  const screenIds = createCommunitySocialScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createCommunitySocialNavigator(screenIds),
    screens: createCommunitySocialScreens(seed, idPrefix, screenIds),
  });
}
