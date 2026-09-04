import type { AppCategory, AppManifest, ThemeConfig } from '@ankhorage/contracts';

import { BASE_INFRA, BASE_SETTINGS } from '../internal/defaults';
import { type AppManifestWithSplashScreen, createSplashScreen } from './splash-screen';

interface ManifestShellSeed {
  category: AppCategory;
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
      category: args.seed.category,
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
