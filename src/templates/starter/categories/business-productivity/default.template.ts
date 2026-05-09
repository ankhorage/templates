import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import {
  createBusinessProductivityNavigator,
  createBusinessProductivityScreenIds,
} from './routes';
import { createBusinessProductivityScreens } from './screens';

export function createBusinessProductivityStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const screenIds = createBusinessProductivityScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createBusinessProductivityNavigator(screenIds),
    screens: createBusinessProductivityScreens(seed, idPrefix, screenIds),
  });
}

