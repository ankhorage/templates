import type { AppManifest, ThemeConfig } from '@ankhorage/contracts';

export type TemplateSplashScreenResizeMode = 'contain' | 'cover' | 'native';

export interface TemplateSplashScreenAssetSpec {
  readonly image?: string;
  readonly imageWidth?: number;
  readonly resizeMode?: TemplateSplashScreenResizeMode;
}

export interface TemplateSplashScreenSpec extends TemplateSplashScreenAssetSpec {
  readonly backgroundColor?: string;
  readonly dark?: TemplateSplashScreenAssetSpec & {
    readonly backgroundColor?: string;
  };
}

export type AppManifestWithSplashScreen = AppManifest & {
  readonly splashScreen: TemplateSplashScreenSpec;
};

const DEFAULT_SPLASH_IMAGE = './assets/splash/icon.png';
const DEFAULT_DARK_SPLASH_IMAGE = './assets/splash/icon-dark.png';
const DEFAULT_SPLASH_IMAGE_WIDTH = 160;
const DEFAULT_SPLASH_RESIZE_MODE = 'contain' satisfies TemplateSplashScreenResizeMode;

export function createSplashScreen(theme: ThemeConfig): TemplateSplashScreenSpec {
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
