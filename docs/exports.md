# Public API

## ACCENT_TONE_FAMILIES

Kind: `value`
Module: `src/design/tone-catalog.ts`
Source: `src/design/tone-catalog.ts:1:14`

## ACCENT_TONE_TARGETS

Kind: `value`
Module: `src/design/tone-catalog.ts`
Source: `src/design/tone-catalog.ts:48:14`

## AccentToneFamily

Kind: `unknown`
Module: `src/design/tone-catalog.ts`
Source: `src/design/tone-catalog.ts:24:1`

## APP_CATEGORIES

Kind: `value`
Module: `node_modules/@ankhorage/contracts/dist/types.d.ts`
Source: `node_modules/@ankhorage/contracts/dist/types.d.ts:89:22`

## AppCategory

Kind: `unknown`
Module: `node_modules/@ankhorage/contracts/dist/types.d.ts`
Source: `node_modules/@ankhorage/contracts/dist/types.d.ts:90:1`

## assertTemplateManifestReady

Kind: `function`
Module: `src/authoring/compose-category-manifest.ts`
Source: `src/authoring/compose-category-manifest.ts:301:1`

Fail catalog registration or release finalization while any blocker remains.

### Signatures

- `(composition: CategoryAppManifestComposition) => AppManifest`
  - composition: `CategoryAppManifestComposition`
  - returns: `AppManifest`

## CATEGORY_PRESET_RECONCILIATION

Kind: `value`
Module: `src/presets/category-presets.ts`
Source: `src/presets/category-presets.ts:110:14`

## CATEGORY_PRESETS

Kind: `value`
Module: `src/presets/category-presets.ts`
Source: `src/presets/category-presets.ts:113:14`

## CategoryAppManifestComposition

Kind: `type`
Module: `src/authoring/compose-category-manifest.ts`
Source: `src/authoring/compose-category-manifest.ts:53:1`

### Members

| Name           | Kind     | Type                                       | Required | Description |
| -------------- | -------- | ------------------------------------------ | -------- | ----------- |
| authoringState | property | `TemplateAuthoringState`                   | yes      |             |
| diagnostics    | property | `readonly TemplateCompositionDiagnostic[]` | yes      |             |
| manifest       | property | `AppManifest`                              | yes      |             |
| status         | property | `TemplateCompositionStatus`                | yes      |             |

## CategoryDesignDiagnostic

Kind: `type`
Module: `src/design/category-theme.ts`
Source: `src/design/category-theme.ts:17:1`

### Members

| Name     | Kind     | Type                           | Required | Description |
| -------- | -------- | ------------------------------ | -------- | ----------- |
| code     | property | `CategoryDesignDiagnosticCode` | yes      |             |
| message  | property | `string`                       | yes      |             |
| path     | property | `string`                       | yes      |             |
| severity | property | `"error" \| "warning"`         | yes      |             |

## CategoryDesignDiagnosticCode

Kind: `unknown`
Module: `src/design/category-theme.ts`
Source: `src/design/category-theme.ts:14:1`

## CategoryDesignOverrides

Kind: `type`
Module: `src/design/category-theme.ts`
Source: `src/design/category-theme.ts:24:1`

### Members

| Name         | Kind     | Type                                                                                                                                  | Required | Description |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| dark         | property | `Partial<import("/home/runner/work/templates/templates/node_modules/@ankhorage/contracts/dist/types").ThemeModeConfig>`               | no       |             |
| density      | property | `"compact" \| "comfortable" \| "spacious"`                                                                                            | no       |             |
| harmony      | property | `"monochromatic" \| "analogous" \| "complementary" \| "splitComplementary" \| "triadic" \| "tetradic" \| "square"`                    | no       |             |
| light        | property | `Partial<import("/home/runner/work/templates/templates/node_modules/@ankhorage/contracts/dist/types").ThemeModeConfig>`               | no       |             |
| primaryColor | property | `string`                                                                                                                              | no       |             |
| recipes      | property | `import("/home/runner/work/templates/templates/node_modules/@ankhorage/contracts/dist/theme").ThemeRecipeOverrides \| undefined`      | no       |             |
| shape        | property | `"sharp" \| "neutral" \| "soft"`                                                                                                      | no       |             |
| themeId      | property | `string`                                                                                                                              | no       |             |
| themeName    | property | `string`                                                                                                                              | no       |             |
| tokens       | property | `import("/home/runner/work/templates/templates/node_modules/@ankhorage/contracts/dist/theme").ThemeGlobalTokenOverrides \| undefined` | no       |             |
| tonePairs    | property | `Partial<Record<ThemeMode, string>>`                                                                                                  | no       |             |

## CategoryPreset

Kind: `type`
Module: `src/design/category-types.ts`
Source: `src/design/category-types.ts:11:1`

### Members

| Name                     | Kind     | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Required | Description |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ----------- |
| bodyFontCandidates       | property | `readonly [string, ...string[]]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | yes      |             |
| category                 | property | `"books_reading" \| "business_productivity" \| "developer_tools" \| "education_learning" \| "entertainment_media" \| "finance_money" \| "food_drink" \| "games" \| "graphics_design" \| "health_fitness" \| "kids_family" \| "lifestyle" \| "medical" \| "music_audio" \| "navigation_travel" \| "news_magazines" \| "photo_video" \| "reference" \| "shopping_commerce" \| "social_community" \| "sports" \| "utilities_tools" \| "weather"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | yes      |             |
| defaultName              | property | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | yes      |             |
| defaultSlug              | property | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | yes      |             |
| density                  | property | `"compact" \| "comfortable" \| "spacious"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | yes      |             |
| designIntent             | property | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | yes      |             |
| focusAreas               | property | `readonly [string, string, string]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | yes      |             |
| headingFontCandidates    | property | `readonly string[]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | yes      |             |
| headingStrategy          | property | `"same" \| "auto-pair"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | yes      |             |
| label                    | property | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | yes      |             |
| recommendedHarmonies     | property | `readonly ["monochromatic" \| "analogous" \| "complementary" \| "splitComplementary" \| "triadic" \| "tetradic" \| "square", ...("monochromatic" \| "analogous" \| "complementary" \| "splitComplementary" \| "triadic" \| "tetradic" \| "square")[]]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | yes      |             |
| recommendedPrimaryColors | property | `readonly [string, ...string[]]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | yes      |             |
| shape                    | property | `"sharp" \| "neutral" \| "soft"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | yes      |             |
| specialistFontCandidates | property | `readonly { readonly family: string; readonly usage: string; }[]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | yes      |             |
| summary                  | property | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | yes      |             |
| tonePairs                | property | `Readonly<Record<"light" \| "dark", "jewel-on-pastel" \| "jewel-on-ice" \| "jewel-on-neutral-light" \| "jewel-on-muted-light" \| "jewel-on-earthy-light" \| "jewel-on-neutral-dark" \| "jewel-on-jewel-dark" \| "pastel-on-pastel" \| "pastel-on-ice" \| "pastel-on-neutral-light" \| "pastel-on-muted-light" \| "pastel-on-earthy-light" \| "pastel-on-neutral-dark" \| "pastel-on-jewel-dark" \| "earthy-on-pastel" \| "earthy-on-ice" \| "earthy-on-neutral-light" \| "earthy-on-muted-light" \| "earthy-on-earthy-light" \| "earthy-on-neutral-dark" \| "earthy-on-jewel-dark" \| "muted-on-pastel" \| "muted-on-ice" \| "muted-on-neutral-light" \| "muted-on-muted-light" \| "muted-on-earthy-light" \| "muted-on-neutral-dark" \| "muted-on-jewel-dark" \| "vivid-on-pastel" \| "vivid-on-ice" \| "vivid-on-neutral-light" \| "vivid-on-muted-light" \| "vivid-on-earthy-light" \| "vivid-on-neutral-dark" \| "vivid-on-jewel-dark" \| "bright-on-pastel" \| "bright-on-ice" \| "bright-on-neutral-light" \| "bright-on-muted-light" \| "bright-on-earthy-light" \| "bright-on-neutral-dark" \| "bright-on-jewel-dark" \| "fluorescent-on-pastel" \| "fluorescent-on-ice" \| "fluorescent-on-neutral-light" \| "fluorescent-on-muted-light" \| "fluorescent-on-earthy-light" \| "fluorescent-on-neutral-dark" \| "fluorescent-on-jewel-dark" \| "neon-on-pastel" \| "neon-on-ice" \| "neon-on-neutral-light" \| "neon-on-muted-light" \| "neon-on-earthy-light" \| "neon-on-neutral-dark" \| "neon-on-jewel-dark" \| "ice-on-pastel" \| "ice-on-ice" \| "ice-on-neutral-light" \| "ice-on-muted-light" \| "ice-on-earthy-light" \| "ice-on-neutral-dark" \| "ice-on-jewel-dark" \| "metallic-on-pastel" \| "metallic-on-ice" \| "metallic-on-neutral-light" \| "metallic-on-muted-light" \| "metallic-on-earthy-light" \| "metallic-on-neutral-dark" \| "metallic-on-jewel-dark">>` | yes      |             |

## CategoryPresetFieldReconciliation

Kind: `type`
Module: `src/design/category-types.ts`
Source: `src/design/category-types.ts:72:1`

### Members

| Name     | Kind     | Type                                   | Required | Description |
| -------- | -------- | -------------------------------------- | -------- | ----------- |
| decision | property | `CategoryPresetReconciliationDecision` | yes      |             |
| field    | property | `string`                               | yes      |             |
| reason   | property | `string`                               | yes      |             |

## CategoryPresetReconciliationDecision

Kind: `unknown`
Module: `src/design/category-types.ts`
Source: `src/design/category-types.ts:69:1`

## CategoryPresetReconciliationReport

Kind: `type`
Module: `src/design/category-types.ts`
Source: `src/design/category-types.ts:78:1`

### Members

| Name     | Kind     | Type                                                                                                                                                                                                                                                                                                                                                                                                                                          | Required | Description |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| category | property | `"books_reading" \| "business_productivity" \| "developer_tools" \| "education_learning" \| "entertainment_media" \| "finance_money" \| "food_drink" \| "games" \| "graphics_design" \| "health_fitness" \| "kids_family" \| "lifestyle" \| "medical" \| "music_audio" \| "navigation_travel" \| "news_magazines" \| "photo_video" \| "reference" \| "shopping_commerce" \| "social_community" \| "sports" \| "utilities_tools" \| "weather"` | yes      |             |
| fields   | property | `readonly CategoryPresetFieldReconciliation[]`                                                                                                                                                                                                                                                                                                                                                                                                | yes      |             |
| source   | property | `CategoryPresetReconciliationSource`                                                                                                                                                                                                                                                                                                                                                                                                          | yes      |             |

## compileCategoryDesign

Kind: `function`
Module: `src/design/category-theme.ts`
Source: `src/design/category-theme.ts:203:1`

Resolve and compile a category theme through the released ZORA owner pipeline.

### Signatures

- `(category: "books_reading" | "business_productivity" | "developer_tools" | "education_learning" | "entertainment_media" | "finance_money" | "food_drink" | "games" | "graphics_design" | "health_fitness" | "kids_family" | "lifestyle" | "medical" | "music_audio" | "navigation_travel" | "news_magazines" | "photo_video" | "reference" | "shopping_commerce" | "social_community" | "sports" | "utilities_tools" | "weather", overrides?: CategoryDesignOverrides) => CompiledCategoryDesign`
  - category: `"books_reading" | "business_productivity" | "developer_tools" | "education_learning" | "entertainment_media" | "finance_money" | "food_drink" | "games" | "graphics_design" | "health_fitness" | "kids_family" | "lifestyle" | "medical" | "music_audio" | "navigation_travel" | "news_magazines" | "photo_video" | "reference" | "shopping_commerce" | "social_community" | "sports" | "utilities_tools" | "weather"`
  - overrides: `CategoryDesignOverrides` (optional)
  - returns: `CompiledCategoryDesign`

## CompiledCategoryDesign

Kind: `type`
Module: `src/design/category-theme.ts`
Source: `src/design/category-theme.ts:50:1`

### Members

| Name          | Kind     | Type                                                                                                                                                                                                                                                                                                                                                                                                                                          | Required | Description |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| category      | property | `"books_reading" \| "business_productivity" \| "developer_tools" \| "education_learning" \| "entertainment_media" \| "finance_money" \| "food_drink" \| "games" \| "graphics_design" \| "health_fitness" \| "kids_family" \| "lifestyle" \| "medical" \| "music_audio" \| "navigation_travel" \| "news_magazines" \| "photo_video" \| "reference" \| "shopping_commerce" \| "social_community" \| "sports" \| "utilities_tools" \| "weather"` | yes      |             |
| computedTheme | property | `ZoraComputedTheme`                                                                                                                                                                                                                                                                                                                                                                                                                           | yes      |             |
| density       | property | `"compact" \| "comfortable" \| "spacious"`                                                                                                                                                                                                                                                                                                                                                                                                    | yes      |             |
| diagnostics   | property | `readonly CategoryDesignDiagnostic[]`                                                                                                                                                                                                                                                                                                                                                                                                         | yes      |             |
| harmony       | property | `"monochromatic" \| "analogous" \| "complementary" \| "splitComplementary" \| "triadic" \| "tetradic" \| "square"`                                                                                                                                                                                                                                                                                                                            | yes      |             |
| preset        | property | `import("/home/runner/work/templates/templates/src/index").CategoryPreset`                                                                                                                                                                                                                                                                                                                                                                    | yes      |             |
| primaryColor  | property | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                      | yes      |             |
| shape         | property | `"sharp" \| "neutral" \| "soft"`                                                                                                                                                                                                                                                                                                                                                                                                              | yes      |             |
| themeConfig   | property | `ThemeConfig`                                                                                                                                                                                                                                                                                                                                                                                                                                 | yes      |             |
| tonePairs     | property | `Readonly<Record<ThemeMode, TonePairDefinition \| null>>`                                                                                                                                                                                                                                                                                                                                                                                     | yes      |             |

## composeCategoryAppManifest

Kind: `function`
Module: `src/authoring/compose-category-manifest.ts`
Source: `src/authoring/compose-category-manifest.ts:261:1`

Compose canonical manifest inputs with a category/theme shell and explicit diagnostics.

### Signatures

- `(input: ComposeCategoryAppManifestInput) => CategoryAppManifestComposition`
  - input: `ComposeCategoryAppManifestInput`
  - returns: `CategoryAppManifestComposition`

## ComposeCategoryAppManifestInput

Kind: `type`
Module: `src/authoring/compose-category-manifest.ts`
Source: `src/authoring/compose-category-manifest.ts:38:1`

### Members

| Name           | Kind     | Type                                                                                                                                                                                                                                                                                                                                                                                                                                          | Required | Description |
| -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| authoringState | property | `TemplateAuthoringState`                                                                                                                                                                                                                                                                                                                                                                                                                      | no       |             |
| category       | property | `"books_reading" \| "business_productivity" \| "developer_tools" \| "education_learning" \| "entertainment_media" \| "finance_money" \| "food_drink" \| "games" \| "graphics_design" \| "health_fitness" \| "kids_family" \| "lifestyle" \| "medical" \| "music_audio" \| "navigation_travel" \| "news_magazines" \| "photo_video" \| "reference" \| "shopping_commerce" \| "social_community" \| "sports" \| "utilities_tools" \| "weather"` | yes      |             |
| dataBindings   | property | `Readonly<Record<string, import("/home/runner/work/templates/templates/node_modules/@ankhorage/contracts/dist/bindings").ComponentDataBinding>>`                                                                                                                                                                                                                                                                                              | no       |             |
| dataSources    | property | `Readonly<Record<string, import("/home/runner/work/templates/templates/node_modules/@ankhorage/contracts/dist/index").DatabaseDataSourceConfig>>`                                                                                                                                                                                                                                                                                             | no       |             |
| modules        | property | `readonly string[]`                                                                                                                                                                                                                                                                                                                                                                                                                           | no       |             |
| modulesConfig  | property | `Readonly<Record<string, unknown>>`                                                                                                                                                                                                                                                                                                                                                                                                           | no       |             |
| name           | property | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                      | no       |             |
| navigator      | property | `AppNavigatorManifest`                                                                                                                                                                                                                                                                                                                                                                                                                        | yes      |             |
| screens        | property | `Readonly<Record<string, ScreenSpec>>`                                                                                                                                                                                                                                                                                                                                                                                                        | yes      |             |
| slug           | property | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                      | no       |             |
| theme          | property | `CategoryDesignOverrides`                                                                                                                                                                                                                                                                                                                                                                                                                     | no       |             |
| version        | property | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                      | no       |             |

## createTemplateArtifact

Kind: `function`
Module: `src/templates/catalog.ts`
Source: `src/templates/catalog.ts:46:1`

Create an isolated manifest and the local image files referenced by that template.

### Signatures

- `(args: { readonly category: AppCategory; readonly slug: string; readonly name?: string; readonly projectSlug?: string; }) => TemplateArtifact`
  - args: `{ readonly category: AppCategory; readonly slug: string; readonly name?: string; readonly projectSlug?: string; }`
  - returns: `TemplateArtifact`

## DESIGN_DENSITIES

Kind: `value`
Module: `src/design/category-types.ts`
Source: `src/design/category-types.ts:5:14`

## DESIGN_SHAPES

Kind: `value`
Module: `src/design/category-types.ts`
Source: `src/design/category-types.ts:8:14`

## DesignDensity

Kind: `unknown`
Module: `src/design/category-types.ts`
Source: `src/design/category-types.ts:6:1`

## DesignShape

Kind: `unknown`
Module: `src/design/category-types.ts`
Source: `src/design/category-types.ts:9:1`

## FOUNDATION_TONE_FAMILIES

Kind: `value`
Module: `src/design/tone-catalog.ts`
Source: `src/design/tone-catalog.ts:14:14`

## FOUNDATION_TONE_TARGETS

Kind: `value`
Module: `src/design/tone-catalog.ts`
Source: `src/design/tone-catalog.ts:61:14`

## FoundationToneFamily

Kind: `unknown`
Module: `src/design/tone-catalog.ts`
Source: `src/design/tone-catalog.ts:25:1`

## listOAuthFixtures

Kind: `function`
Module: `src/fixtures/oauth.ts`
Source: `src/fixtures/oauth.ts:74:1`

### Signatures

- `() => OAuthFixtureDefinition[]`
  - returns: `OAuthFixtureDefinition[]`

## listTemplates

Kind: `function`
Module: `src/templates/catalog.ts`
Source: `src/templates/catalog.ts:30:1`

List the standalone templates discovered from the canonical template directory tree.

### Signatures

- `(category?: "books_reading" | "business_productivity" | "developer_tools" | "education_learning" | "entertainment_media" | "finance_money" | "food_drink" | "games" | "graphics_design" | "health_fitness" | "kids_family" | "lifestyle" | "medical" | "music_audio" | "navigation_travel" | "news_magazines" | "photo_video" | "reference" | "shopping_commerce" | "social_community" | "sports" | "utilities_tools" | "weather" | undefined) => readonly TemplateCatalogEntry[]`
  - category: `"books_reading" | "business_productivity" | "developer_tools" | "education_learning" | "entertainment_media" | "finance_money" | "food_drink" | "games" | "graphics_design" | "health_fitness" | "kids_family" | "lifestyle" | "medical" | "music_audio" | "navigation_travel" | "news_magazines" | "photo_video" | "reference" | "shopping_commerce" | "social_community" | "sports" | "utilities_tools" | "weather" | undefined` (optional)
  - returns: `readonly TemplateCatalogEntry[]`

## OAUTH_CALLBACK_ROUTE

Kind: `value`
Module: `src/fixtures/oauth.ts`
Source: `src/fixtures/oauth.ts:3:14`

## OAUTH_FIXTURE_IDS

Kind: `value`
Module: `src/fixtures/oauth.ts`
Source: `src/fixtures/oauth.ts:4:14`

## OAuthFixtureDefinition

Kind: `type`
Module: `src/fixtures/oauth.ts`
Source: `src/fixtures/oauth.ts:11:1`

### Members

| Name        | Kind     | Type                                                                                                          | Required | Description |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| description | property | `string`                                                                                                      | yes      |             |
| id          | property | `"google" \| "apple" \| "google-apple"`                                                                       | yes      |             |
| label       | property | `string`                                                                                                      | yes      |             |
| oauth       | property | `import("/home/runner/work/templates/templates/node_modules/@ankhorage/contracts/dist/auth").AuthOAuthConfig` | yes      |             |

## OAuthFixtureId

Kind: `unknown`
Module: `src/fixtures/oauth.ts`
Source: `src/fixtures/oauth.ts:6:1`

## resolveCategoryDesignPreset

Kind: `function`
Module: `src/design/category-theme.ts`
Source: `src/design/category-theme.ts:120:1`

Resolve category defaults and explicit overrides into canonical compact ThemeConfig source.

### Signatures

- `(category: "books_reading" | "business_productivity" | "developer_tools" | "education_learning" | "entertainment_media" | "finance_money" | "food_drink" | "games" | "graphics_design" | "health_fitness" | "kids_family" | "lifestyle" | "medical" | "music_audio" | "navigation_travel" | "news_magazines" | "photo_video" | "reference" | "shopping_commerce" | "social_community" | "sports" | "utilities_tools" | "weather", overrides?: CategoryDesignOverrides) => ResolvedCategoryDesignPreset`
  - category: `"books_reading" | "business_productivity" | "developer_tools" | "education_learning" | "entertainment_media" | "finance_money" | "food_drink" | "games" | "graphics_design" | "health_fitness" | "kids_family" | "lifestyle" | "medical" | "music_audio" | "navigation_travel" | "news_magazines" | "photo_video" | "reference" | "shopping_commerce" | "social_community" | "sports" | "utilities_tools" | "weather"`
  - overrides: `CategoryDesignOverrides` (optional)
  - returns: `ResolvedCategoryDesignPreset`

## ResolvedCategoryDesignPreset

Kind: `type`
Module: `src/design/category-theme.ts`
Source: `src/design/category-theme.ts:38:1`

### Members

| Name         | Kind     | Type                                                                                                                                                                                                                                                                                                                                                                                                                                          | Required | Description |
| ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| category     | property | `"books_reading" \| "business_productivity" \| "developer_tools" \| "education_learning" \| "entertainment_media" \| "finance_money" \| "food_drink" \| "games" \| "graphics_design" \| "health_fitness" \| "kids_family" \| "lifestyle" \| "medical" \| "music_audio" \| "navigation_travel" \| "news_magazines" \| "photo_video" \| "reference" \| "shopping_commerce" \| "social_community" \| "sports" \| "utilities_tools" \| "weather"` | yes      |             |
| density      | property | `"compact" \| "comfortable" \| "spacious"`                                                                                                                                                                                                                                                                                                                                                                                                    | yes      |             |
| diagnostics  | property | `readonly CategoryDesignDiagnostic[]`                                                                                                                                                                                                                                                                                                                                                                                                         | yes      |             |
| harmony      | property | `"monochromatic" \| "analogous" \| "complementary" \| "splitComplementary" \| "triadic" \| "tetradic" \| "square"`                                                                                                                                                                                                                                                                                                                            | yes      |             |
| preset       | property | `import("/home/runner/work/templates/templates/src/index").CategoryPreset`                                                                                                                                                                                                                                                                                                                                                                    | yes      |             |
| primaryColor | property | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                      | yes      |             |
| shape        | property | `"sharp" \| "neutral" \| "soft"`                                                                                                                                                                                                                                                                                                                                                                                                              | yes      |             |
| themeConfig  | property | `ThemeConfig`                                                                                                                                                                                                                                                                                                                                                                                                                                 | yes      |             |
| tonePairs    | property | `Readonly<Record<ThemeMode, TonePairDefinition \| null>>`                                                                                                                                                                                                                                                                                                                                                                                     | yes      |             |

## resolveOAuthFixture

Kind: `function`
Module: `src/fixtures/oauth.ts`
Source: `src/fixtures/oauth.ts:78:1`

### Signatures

- `(id: "google" | "apple" | "google-apple") => OAuthFixtureDefinition`
  - id: `"google" | "apple" | "google-apple"`
  - returns: `OAuthFixtureDefinition`

## resolveTemplate

Kind: `function`
Module: `src/templates/catalog.ts`
Source: `src/templates/catalog.ts:37:1`

Resolve one standalone template by category and slug.

### Signatures

- `(category: "books_reading" | "business_productivity" | "developer_tools" | "education_learning" | "entertainment_media" | "finance_money" | "food_drink" | "games" | "graphics_design" | "health_fitness" | "kids_family" | "lifestyle" | "medical" | "music_audio" | "navigation_travel" | "news_magazines" | "photo_video" | "reference" | "shopping_commerce" | "social_community" | "sports" | "utilities_tools" | "weather", slug: string) => TemplateCatalogEntry`
  - category: `"books_reading" | "business_productivity" | "developer_tools" | "education_learning" | "entertainment_media" | "finance_money" | "food_drink" | "games" | "graphics_design" | "health_fitness" | "kids_family" | "lifestyle" | "medical" | "music_audio" | "navigation_travel" | "news_magazines" | "photo_video" | "reference" | "shopping_commerce" | "social_community" | "sports" | "utilities_tools" | "weather"`
  - slug: `string`
  - returns: `TemplateCatalogEntry`

## resolveTonePair

Kind: `function`
Module: `src/design/tone-catalog.ts`
Source: `src/design/tone-catalog.ts:274:1`

Resolve a reviewed tone pair or report that the identifier is not canonical.

### Signatures

- `(id: string) => TonePairDefinition | undefined`
  - id: `string`
  - returns: `TonePairDefinition | undefined`

## SplashScreenResizeMode

Kind: `unknown`
Module: `node_modules/@ankhorage/contracts/dist/types.d.ts`
Source: `node_modules/@ankhorage/contracts/dist/types.d.ts:158:1`

## SplashScreenSpec

Kind: `type`
Module: `node_modules/@ankhorage/contracts/dist/types.d.ts`
Source: `node_modules/@ankhorage/contracts/dist/types.d.ts:167:1`

### Members

| Name            | Kind     | Type                     | Required | Description |
| --------------- | -------- | ------------------------ | -------- | ----------- |
| backgroundColor | property | `string`                 | no       |             |
| dark            | property | `SplashScreenModeSpec`   | no       |             |
| image           | property | `string`                 | no       |             |
| imageWidth      | property | `number`                 | no       |             |
| resizeMode      | property | `SplashScreenResizeMode` | no       |             |

## TemplateArtifact

Kind: `type`
Module: `src/templates/catalog.ts`
Source: `src/templates/catalog.ts:24:1`

### Members

| Name     | Kind     | Type                            | Required | Description |
| -------- | -------- | ------------------------------- | -------- | ----------- |
| assets   | property | `readonly TemplateImageAsset[]` | yes      |             |
| manifest | property | `AppManifest`                   | yes      |             |

## TemplateAuthoringState

Kind: `unknown`
Module: `src/authoring/compose-category-manifest.ts`
Source: `src/authoring/compose-category-manifest.ts:18:1`

## TemplateCatalogEntry

Kind: `type`
Module: `src/templates/catalog.ts`
Source: `src/templates/catalog.ts:12:1`

### Members

| Name              | Kind     | Type                                                                                                                                                                                                                                                                                                                                                                                                                                          | Required | Description |
| ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| category          | property | `"books_reading" \| "business_productivity" \| "developer_tools" \| "education_learning" \| "entertainment_media" \| "finance_money" \| "food_drink" \| "games" \| "graphics_design" \| "health_fitness" \| "kids_family" \| "lifestyle" \| "medical" \| "music_audio" \| "navigation_travel" \| "news_magazines" \| "photo_video" \| "reference" \| "shopping_commerce" \| "social_community" \| "sports" \| "utilities_tools" \| "weather"` | yes      |             |
| createAppManifest | property | `() => AppManifest`                                                                                                                                                                                                                                                                                                                                                                                                                           | yes      |             |
| name              | property | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                      | yes      |             |
| selector          | property | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                      | yes      |             |
| slug              | property | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                      | yes      |             |
| sourceRoot        | property | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                      | yes      |             |

## TemplateCompositionDiagnostic

Kind: `type`
Module: `src/authoring/compose-category-manifest.ts`
Source: `src/authoring/compose-category-manifest.ts:29:1`

### Members

| Name                | Kind     | Type                                | Required | Description |
| ------------------- | -------- | ----------------------------------- | -------- | ----------- |
| code                | property | `TemplateCompositionDiagnosticCode` | yes      |             |
| message             | property | `string`                            | yes      |             |
| nodeId              | property | `string`                            | no       |             |
| path                | property | `string`                            | yes      |             |
| requestedCapability | property | `string`                            | no       |             |
| severity            | property | `"error" \| "warning"`              | yes      |             |

## TemplateCompositionDiagnosticCode

Kind: `unknown`
Module: `src/authoring/compose-category-manifest.ts`
Source: `src/authoring/compose-category-manifest.ts:20:1`

## TemplateCompositionStatus

Kind: `unknown`
Module: `src/authoring/compose-category-manifest.ts`
Source: `src/authoring/compose-category-manifest.ts:19:1`

## TemplateDefinition

Kind: `type`
Module: `src/templates/catalog.ts`
Source: `src/templates/catalog.ts:5:1`

### Members

| Name              | Kind     | Type                                                                                                                                                                                                                                                                                                                                                                                                                                          | Required | Description |
| ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| category          | property | `"books_reading" \| "business_productivity" \| "developer_tools" \| "education_learning" \| "entertainment_media" \| "finance_money" \| "food_drink" \| "games" \| "graphics_design" \| "health_fitness" \| "kids_family" \| "lifestyle" \| "medical" \| "music_audio" \| "navigation_travel" \| "news_magazines" \| "photo_video" \| "reference" \| "shopping_commerce" \| "social_community" \| "sports" \| "utilities_tools" \| "weather"` | yes      |             |
| createAppManifest | property | `() => AppManifest`                                                                                                                                                                                                                                                                                                                                                                                                                           | yes      |             |
| slug              | property | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                      | yes      |             |
| sourceRoot        | property | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                      | yes      |             |

## TemplateImageAsset

Kind: `type`
Module: `src/templates/catalog.ts`
Source: `src/templates/catalog.ts:17:1`

### Members

| Name        | Kind     | Type     | Required | Description |
| ----------- | -------- | -------- | -------- | ----------- |
| contentType | property | `string` | no       |             |
| mediaId     | property | `string` | yes      |             |
| sourcePath  | property | `string` | yes      |             |
| targetPath  | property | `string` | yes      |             |

## ThemeMode

Kind: `unknown`
Module: `src/design/tone-catalog.ts`
Source: `src/design/tone-catalog.ts:28:1`

## TONE_PAIR_CATALOG

Kind: `value`
Module: `src/design/tone-catalog.ts`
Source: `src/design/tone-catalog.ts:266:14`

## TonePairClassification

Kind: `unknown`
Module: `src/design/tone-catalog.ts`
Source: `src/design/tone-catalog.ts:27:1`

## TonePairDefinition

Kind: `type`
Module: `src/design/tone-catalog.ts`
Source: `src/design/tone-catalog.ts:35:1`

### Members

| Name               | Kind     | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Required | Description |
| ------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| accent             | property | `"jewel" \| "pastel" \| "earthy" \| "muted" \| "vivid" \| "bright" \| "fluorescent" \| "neon" \| "ice" \| "metallic"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | yes      |             |
| accentTarget       | property | `ToneTarget`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | yes      |             |
| classification     | property | `TonePairClassification`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | yes      |             |
| constraints        | property | `readonly string[]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | yes      |             |
| decorativeFinish   | property | `"glow" \| "material"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | no       |             |
| flatFallbackTarget | property | `ToneTarget`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | no       |             |
| foundation         | property | `"pastel" \| "ice" \| "neutral-light" \| "muted-light" \| "earthy-light" \| "neutral-dark" \| "jewel-dark"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | yes      |             |
| foundationTarget   | property | `ToneTarget`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | yes      |             |
| id                 | property | `"jewel-on-pastel" \| "jewel-on-ice" \| "jewel-on-neutral-light" \| "jewel-on-muted-light" \| "jewel-on-earthy-light" \| "jewel-on-neutral-dark" \| "jewel-on-jewel-dark" \| "pastel-on-pastel" \| "pastel-on-ice" \| "pastel-on-neutral-light" \| "pastel-on-muted-light" \| "pastel-on-earthy-light" \| "pastel-on-neutral-dark" \| "pastel-on-jewel-dark" \| "earthy-on-pastel" \| "earthy-on-ice" \| "earthy-on-neutral-light" \| "earthy-on-muted-light" \| "earthy-on-earthy-light" \| "earthy-on-neutral-dark" \| "earthy-on-jewel-dark" \| "muted-on-pastel" \| "muted-on-ice" \| "muted-on-neutral-light" \| "muted-on-muted-light" \| "muted-on-earthy-light" \| "muted-on-neutral-dark" \| "muted-on-jewel-dark" \| "vivid-on-pastel" \| "vivid-on-ice" \| "vivid-on-neutral-light" \| "vivid-on-muted-light" \| "vivid-on-earthy-light" \| "vivid-on-neutral-dark" \| "vivid-on-jewel-dark" \| "bright-on-pastel" \| "bright-on-ice" \| "bright-on-neutral-light" \| "bright-on-muted-light" \| "bright-on-earthy-light" \| "bright-on-neutral-dark" \| "bright-on-jewel-dark" \| "fluorescent-on-pastel" \| "fluorescent-on-ice" \| "fluorescent-on-neutral-light" \| "fluorescent-on-muted-light" \| "fluorescent-on-earthy-light" \| "fluorescent-on-neutral-dark" \| "fluorescent-on-jewel-dark" \| "neon-on-pastel" \| "neon-on-ice" \| "neon-on-neutral-light" \| "neon-on-muted-light" \| "neon-on-earthy-light" \| "neon-on-neutral-dark" \| "neon-on-jewel-dark" \| "ice-on-pastel" \| "ice-on-ice" \| "ice-on-neutral-light" \| "ice-on-muted-light" \| "ice-on-earthy-light" \| "ice-on-neutral-dark" \| "ice-on-jewel-dark" \| "metallic-on-pastel" \| "metallic-on-ice" \| "metallic-on-neutral-light" \| "metallic-on-muted-light" \| "metallic-on-earthy-light" \| "metallic-on-neutral-dark" \| "metallic-on-jewel-dark"` | yes      |             |
| modes              | property | `readonly [ThemeMode]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | yes      |             |

## TonePairId

Kind: `unknown`
Module: `src/design/tone-catalog.ts`
Source: `src/design/tone-catalog.ts:26:1`

## ToneTarget

Kind: `type`
Module: `src/design/tone-catalog.ts`
Source: `src/design/tone-catalog.ts:30:1`

### Members

| Name      | Kind     | Type     | Required | Description |
| --------- | -------- | -------- | -------- | ----------- |
| chroma    | property | `number` | yes      |             |
| lightness | property | `number` | yes      |             |

## validateTemplateManifest

Kind: `function`
Module: `src/authoring/compose-category-manifest.ts`
Source: `src/authoring/compose-category-manifest.ts:61:1`

Validate one canonical manifest for catalog registration or release finalization.

### Signatures

- `(manifest: AppManifest, authoringState?: TemplateAuthoringState) => CategoryAppManifestComposition`
  - authoringState: `TemplateAuthoringState` (optional)
  - manifest: `AppManifest`
  - returns: `CategoryAppManifestComposition`
