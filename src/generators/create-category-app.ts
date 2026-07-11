import {
  type AppCategory,
  type AppManifest,
  resolveAuthFlow,
  type ScreenSpec,
  type ThemeConfig,
} from '@ankhorage/contracts';

import { mergeAppManifest } from '../internal/merge';
import type { AppManifestOverrides } from '../internal/overrides';
import { CATEGORY_PRESETS } from '../presets/category-presets';
import { createScreen } from '../templates/shared/screen';
import {
  createScreenRoot,
  createSection,
  createZoraNode,
} from '../templates/shared/zora-node-helpers';
import { createStarterTemplate, type TemplateKind } from '../templates/starter';

type ProviderConfig = NonNullable<
  NonNullable<AppManifest['infra']['auth']>['oauth']
>['providers'][number];

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

function addProviderEntryScreen(manifest: AppManifest): AppManifest {
  const providers = manifest.infra.auth?.oauth?.providers.filter(
    (provider) => provider.enabled !== false,
  );

  if (
    manifest.infra.auth?.oauth?.enabled !== true ||
    providers === undefined ||
    providers.length === 0
  ) {
    return manifest;
  }

  const screenId = resolveAuthFlow(manifest.infra.auth.flow).signInRoute;

  if (manifest.screens[screenId] !== undefined) {
    return manifest;
  }

  return {
    ...manifest,
    screens: {
      ...manifest.screens,
      [screenId]: createProviderEntryScreen(screenId, providers),
    },
  };
}

function createProviderEntryScreen(
  screenId: string,
  providers: readonly ProviderConfig[],
): ScreenSpec {
  return createScreen({
    id: screenId,
    name: 'Provider entry',
    title: 'Provider entry',
    description: 'Choose a provider.',
    root: createScreenRoot('provider-entry-screen', { width: 'default' }, [
      createZoraNode('provider-entry-header', 'SectionHeader', {
        eyebrow: 'Account',
        title: 'Continue',
        description: 'Choose a configured provider.',
      }),
      createSection('provider-entry-section', { title: 'Providers' }, [
        createZoraNode('provider-entry-list', 'OAuthProviderList', {
          providers: providers.map((provider) => ({
            id: provider.id,
            ...(provider.label ? { label: provider.label } : {}),
            ...(provider.icon ? { icon: provider.icon } : {}),
          })),
          layout: 'stack',
          fullWidth: true,
        }),
      ]),
    ]),
  });
}

export function createCategoryAppManifest(
  category: AppCategory,
  template: TemplateKind = 'starter',
  overrides?: AppManifestOverrides,
): AppManifest {
  const manifest = createManifestFromTemplate(category, template, overrides);
  return addProviderEntryScreen(mergeAppManifest(manifest, overrides));
}
