import type { AppManifest } from '@ankhorage/contracts';
import { resolveAuthFlow } from '@ankhorage/contracts/auth';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../../shared';
import type { TemplateSeed } from '../../../starter.types';
import { createUrbanWaterMonitorNavigator, createUrbanWaterMonitorScreenIds } from './routes';
import { createUrbanWaterMonitorScreens } from './screens';

export function createUrbanWaterMonitorStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-urban-water-monitor`;
  const theme = createTheme(seed);
  const screenIds = createUrbanWaterMonitorScreenIds(idPrefix);
  const manifest = createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createUrbanWaterMonitorNavigator(screenIds),
    screens: createUrbanWaterMonitorScreens(idPrefix, screenIds),
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
          postSignInRoute: 'index',
        },
      },
    },
  };
}
