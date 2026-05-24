import type { AppManifest, ThemeConfig } from '@ankhorage/contracts';

import { BASE_INFRA, BASE_SETTINGS } from '../../internal/defaults';
import { createSplashScreen, type AppManifestWithSplashScreen } from './splash-screen';

interface ManifestShellSeed {
  appName: string;
  slug: string;
}

export function createManifestShell(args: {
  seed: ManifestShellSeed;
  theme: ThemeConfig;
  version: string;
  navigator: AppManifest['navigator'];
  screens: AppManifest['screens'];
}): AppManifestWithSplashScreen {
  return {
    metadata: {
      name: args.seed.appName,
      slug: args.seed.slug,
      version: args.version,
      themeId: args.theme.id,
    },
    themes: [args.theme],
    activeThemeId: args.theme.id,
    splashScreen: createSplashScreen(args.theme),
    infra: structuredClone(BASE_INFRA),
    settings: structuredClone(BASE_SETTINGS),
    navigator: args.navigator,
    screens: args.screens,
  };
}
