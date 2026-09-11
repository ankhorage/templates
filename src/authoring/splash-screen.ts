import type { AppManifest, SplashScreenSpec, ThemeConfig } from '@ankhorage/contracts';

export type AppManifestWithSplashScreen = AppManifest & {
  readonly splashScreen: SplashScreenSpec;
};

/*** Create default native splash branding without inventing an asset that the manifest does not own. */
export function createSplashScreen(theme: ThemeConfig): SplashScreenSpec {
  return {
    backgroundColor: theme.light.primaryColor,
    dark: {
      backgroundColor: theme.dark.primaryColor,
    },
  };
}
