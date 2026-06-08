import type { AppManifest } from '@ankhorage/contracts';

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

  return {
    ...manifest,
    settings: {
      ...manifest.settings,
      authFlow: {
        ...manifest.settings.authFlow,
        postSignInRoute: 'project',
      },
    },
  };
}
