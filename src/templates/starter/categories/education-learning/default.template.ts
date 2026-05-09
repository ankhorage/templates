import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { createEducationLearningNavigator, createEducationLearningScreenIds } from './routes';
import { createEducationLearningScreens } from './screens';

export function createEducationLearningStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const screenIds = createEducationLearningScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createEducationLearningNavigator(screenIds),
    screens: createEducationLearningScreens(seed, idPrefix, screenIds),
  });
}

