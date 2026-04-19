import type { AppCategory, AppManifest, ThemeConfig } from '@ankhorage/contracts';

import { mergeAppManifest } from '../internal/merge';
import type { AppManifestOverrides } from '../internal/overrides';
import { CATEGORY_PRESETS } from '../presets/category-presets';
import { createStarterTemplate, type TemplateKind } from '../templates/starter.template';

function resolveThemeModeValue<TValue>(
  overrides: AppManifestOverrides | undefined,
  selector: (theme: ThemeConfig) => TValue,
  fallback: TValue,
): TValue {
  const [firstTheme] = overrides?.themes ?? [];
  return firstTheme ? selector(firstTheme) : fallback;
}

function resolveSeedName(category: AppCategory, overrides?: AppManifestOverrides) {
  return overrides?.metadata?.name ?? CATEGORY_PRESETS[category].defaultName;
}

function resolveSeedSlug(category: AppCategory, overrides?: AppManifestOverrides) {
  return overrides?.metadata?.slug ?? CATEGORY_PRESETS[category].defaultSlug;
}

function resolveSeedThemeId(overrides?: AppManifestOverrides) {
  return overrides?.activeThemeId ?? overrides?.metadata?.themeId;
}

const TEMPLATE_FACTORIES: Record<
  TemplateKind,
  (category: AppCategory, overrides?: AppManifestOverrides) => AppManifest
> = {
  starter: (category, overrides) => {
    const preset = CATEGORY_PRESETS[category];
    const version = overrides?.metadata?.version;
    const themeId = resolveSeedThemeId(overrides);
    const themeName = overrides?.themes?.[0]?.name;

    return createStarterTemplate({
      category,
      categoryLabel: preset.label,
      appName: resolveSeedName(category, overrides),
      slug: resolveSeedSlug(category, overrides),
      summary: preset.summary,
      focusAreas: preset.focusAreas,
      primaryColor: resolveThemeModeValue(
        overrides,
        (theme) => theme.light.primaryColor,
        preset.primaryColor,
      ),
      harmony: resolveThemeModeValue(overrides, (theme) => theme.light.harmony, preset.harmony),
      systemTone: resolveThemeModeValue(
        overrides,
        (theme) => theme.light.systemTone,
        preset.systemTone,
      ),
      ...(version ? { version } : {}),
      ...(themeId ? { themeId } : {}),
      ...(themeName ? { themeName } : {}),
    });
  },
};

function createManifestFromTemplate(
  category: AppCategory,
  template: TemplateKind,
  overrides?: AppManifestOverrides,
): AppManifest {
  return TEMPLATE_FACTORIES[template](category, overrides);
}

export function createCategoryAppManifest(
  category: AppCategory,
  template: TemplateKind = 'starter',
  overrides?: AppManifestOverrides,
): AppManifest {
  const manifest = createManifestFromTemplate(category, template, overrides);
  return mergeAppManifest(manifest, overrides);
}
