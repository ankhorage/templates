import type { AppManifest } from '@ankhorage/contracts';

import type { TemplateSeed } from '../../../starter.types';
import { AUTHORED_PLANT_JOURNAL_MANIFEST } from './manifest';

/*** Create the authored starter while applying the caller's canonical app identity and theme. */
export function createPlantJournalStarterTemplate(seed: TemplateSeed): AppManifest {
  const theme = seed.theme ?? AUTHORED_PLANT_JOURNAL_MANIFEST.themes[0];
  if (theme === undefined) {
    throw new Error('The authored template requires one resolved theme.');
  }
  return {
    ...AUTHORED_PLANT_JOURNAL_MANIFEST,
    metadata: {
      ...AUTHORED_PLANT_JOURNAL_MANIFEST.metadata,
      name: seed.appName,
      slug: seed.slug,
      version: seed.version ?? AUTHORED_PLANT_JOURNAL_MANIFEST.metadata.version,
      themeId: theme.id,
    },
    themes: [theme],
    activeThemeId: theme.id,
  };
}
