import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createGraphicsDesignNavigator, createGraphicsDesignScreenIds } from './routes';
import { createGraphicsDesignScreens } from './screens';

export function createGraphicsDesignStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const screenIds = createGraphicsDesignScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createGraphicsDesignNavigator(screenIds),
    screens: createGraphicsDesignScreens(seed, idPrefix, screenIds),
  });
}

