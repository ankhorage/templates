import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { pokerTrainerData } from './poker.data';
import { createPokerNavigator, createPokerScreenIds } from './poker.routes';
import { createPokerScreens } from './poker.screens';

export function createPokerStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-poker`;
  const theme = createTheme(seed);
  const screenIds = createPokerScreenIds(idPrefix);

  return createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createPokerNavigator(screenIds),
    screens: createPokerScreens(seed, idPrefix, screenIds),
    data: pokerTrainerData,
  });
}
