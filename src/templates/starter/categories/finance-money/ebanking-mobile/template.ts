import type { AppManifest } from '@ankhorage/contracts';

import type { TemplateSeed } from '../../../starter.types';
import { AUTHORED_EBANKING_MOBILE_MANIFEST } from './manifest';

/*** Create the authored starter while applying the caller's canonical app identity and theme. */
export function createEbankingMobileStarterTemplate(seed: TemplateSeed): AppManifest {
  const theme = seed.theme ?? AUTHORED_EBANKING_MOBILE_MANIFEST.themes[0];
  if (theme === undefined) {
    throw new Error('The authored template requires one resolved theme.');
  }
  return {
    ...AUTHORED_EBANKING_MOBILE_MANIFEST,
    metadata: {
      ...AUTHORED_EBANKING_MOBILE_MANIFEST.metadata,
      name: seed.appName,
      slug: seed.slug,
      version: seed.version ?? AUTHORED_EBANKING_MOBILE_MANIFEST.metadata.version,
      themeId: theme.id,
    },
    themes: [theme],
    activeThemeId: theme.id,
  };
}
