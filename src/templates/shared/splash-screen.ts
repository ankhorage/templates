import type { AppManifest, SplashScreenSpec, ThemeConfig } from '@ankhorage/contracts';

export type AppManifestWithSplashScreen = AppManifest & {
  readonly splashScreen: SplashScreenSpec;
};

const DEFAULT_SPLASH_IMAGE = './assets/splash/icon.png';
const DEFAULT_DARK_SPLASH_IMAGE = './assets/splash/icon-dark.png';
const DEFAULT_SPLASH_IMAGE_WIDTH = 160;
const DEFAULT_SPLASH_RESIZE_MODE = 'contain' satisfies SplashScreenSpec['resizeMode'];

export function createSplashScreen(theme: ThemeConfig): SplashScreenSpec {
  return {
    backgroundColor: theme.light.primaryColor,
    image: DEFAULT_SPLASH_IMAGE,
    imageWidth: DEFAULT_SPLASH_IMAGE_WIDTH,
    resizeMode: DEFAULT_SPLASH_RESIZE_MODE,
    dark: {
      backgroundColor: theme.dark.primaryColor,
      image: DEFAULT_DARK_SPLASH_IMAGE,
      imageWidth: DEFAULT_SPLASH_IMAGE_WIDTH,
      resizeMode: DEFAULT_SPLASH_RESIZE_MODE,
    },
  };
}
