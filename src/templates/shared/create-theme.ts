import type { ThemeConfig } from '@ankhorage/contracts';

import { DEFAULT_THEME_ID, DEFAULT_THEME_NAME } from '../../internal/defaults';

export interface CreateThemeSeed {
  primaryColor: string;
  harmony: ThemeConfig['light']['harmony'];
  systemTone: ThemeConfig['light']['systemTone'];
  themeId?: string;
  themeName?: string;
}

export function createTheme(seed: CreateThemeSeed): ThemeConfig {
  const themeId = seed.themeId ?? DEFAULT_THEME_ID;

  return {
    id: themeId,
    name: seed.themeName ?? DEFAULT_THEME_NAME,
    light: {
      primaryColor: seed.primaryColor,
      harmony: seed.harmony,
      systemTone: seed.systemTone,
    },
    dark: {
      primaryColor: seed.primaryColor,
      harmony: seed.harmony,
      systemTone: seed.systemTone,
    },
  };
}
