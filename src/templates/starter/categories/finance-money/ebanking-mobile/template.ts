import type { AppManifest } from '@ankhorage/contracts';
import { resolveAuthFlow } from '@ankhorage/contracts/auth';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../../shared';
import type { TemplateSeed } from '../../../starter.types';
import type { EbankingMobileScreenIds } from './routes';
import { createEbankingMobileNavigator, createEbankingMobileScreenIds } from './routes';
import { createEbankingMobileScreens } from './screens';

export function createEbankingMobileStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-ebanking-mobile`;
  const theme = createTheme(seed);
  const screenIds = createEbankingMobileScreenIds(idPrefix);
  const manifest = createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createEbankingMobileNavigator(screenIds),
    screens: createEbankingMobileScreens(idPrefix, screenIds),
  });

  const auth = manifest.infra.auth;
  if (auth === undefined) {
    return manifest;
  }

  return {
    ...manifest,
    infra: {
      ...manifest.infra,
      auth: {
        ...auth,
        flow: {
          ...resolveAuthFlow(auth.flow),
          postSignInRoute: 'home',
        },
      },
    },
  };
}
