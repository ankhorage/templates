# @ankhorage/templates

## 9.0.0

### Major Changes

- 0dcc320: Return starter-template artifacts with verified bundled image descriptors and materialize their bytes into generated projects.

## 8.0.0

### Major Changes

- 407303f: Make Templates the canonical owner of reconciled category design presets, the exhaustive mode-aware tone-pair catalog, ZORA-compiled category theme resolution, and deterministic manifest authoring diagnostics. Replace the former singular `primaryColor` and `harmony` preset fields with ordered reviewed recommendations, add durable intent/font/density/shape direction, and remove the invalid unknown-category fallback.

  CHANGE REQUIRED: update `@ankhorage/zora` from `^3.3.3` to `^4.0.0` and add the direct `@ankhorage/color-theory` dependency used to construct branded compiler contrast inputs. Templates now consumes the ZORA 4 theme compiler and canonical MissingElement metadata.

  VERIFIED: NO CHANGE REQUIRED for ZORA 3.3.4; that release only refreshed Surface and introduced no Templates API migration beyond the ZORA 4 compiler adoption above.

## 7.0.3

### Patch Changes

- 7dc81fc: Update Ankhorage dependencies: `@ankhorage/zora`.

## 7.0.2

### Patch Changes

- e950c12: Update Ankhorage dependencies: `@ankhorage/contracts`.

## 7.0.1

### Patch Changes

- 41f4528: Update Ankhorage dependencies: `@ankhorage/contracts`, `@ankhorage/paradox`, `@ankhorage/zora`.

## 7.0.0

### Major Changes

- 51b41dd: Migrate template manifests to Contracts 8 canonical APIs and make the Nutrition catalog scanner use the shared external Nutrition HTTP API through `infra.apis[]` instead of generated API database projection or API data sources.

## 6.1.0

### Minor Changes

- 87febd5: Add the authorable ZORA ThemeModeToggle as a starter Settings/Profile default while leaving templates without a settings surface unchanged.

## 6.0.0

### Major Changes

- 6977947: Generate Contracts 6 manifests with the canonical `infra.modules` module registry and remove the legacy module field names from template output.

## 5.0.0

### Major Changes

- c8c24fa: Generate route manifests with the canonical `showInPrimaryNavigation` contract from Contracts 5, preserving hidden routes as navigable entries for Tabs and Drawer navigation.

## 4.0.0

### Major Changes

- d0b77f8: Migrate the nutrition catalog scanner starter to the final Contracts 4 generated API model, canonical generated/external data-source projections, and stable CRUD operation references.

## 3.0.1

### Patch Changes

- 3fa0176: update ZORA

## 3.0.0

### Major Changes

- 8627bee: Emit the canonical AppManifest metadata category from generated starter manifests and update the contracts dependency to the manifest category contract.

## 2.2.0

### Minor Changes

- 8fcac9a: Add canonical Google, Apple, and combined OAuth manifest fixtures, and remove template-owned OAuth provider screen generation so Studio remains the single auth UI/runtime owner.

## 2.1.0

### Minor Changes

- cbf1c5a: Emit the canonical `infra.secretStore.provider = "supabase-vault"` selection from one shared Supabase infra preset across every generated first-party category manifest.

## 2.0.0

### Major Changes

- 7a1d9ad: Generate authentication flow only under `infra.auth.flow`, resolve default OAuth routes through the contracts helper, remove implicit authorization from first-party templates, and reject reintroduction of `settings.authFlow`.

## 1.9.2

### Patch Changes

- 6dd2cec: Move the standalone executable into the canonical `src/cli/` folder while keeping the provider export at `src/cli/index.ts`.

## 1.9.1

### Patch Changes

- 82d0247: Release package entry changes.

## 1.9.0

### Minor Changes

- 18fd9d2: Add Ankh provider metadata, standalone CLI commands, and manifest-first template seed creation.

## 1.8.9

### Patch Changes

- 8114302: Update the nutrition catalog scan starter to use a generic product detail screen loader, preserve wrapped product list repeats, and render a runtime-driven empty state for successful empty product lists.

## 1.8.8

### Patch Changes

- 0336efe: Remove the nutrition scanner starter's hidden root fallback route and make the visible products tab the top-level initial route. Root `/` startup remains generator-owned while the authenticated landing path stays `/products`.

## 1.8.7

### Patch Changes

- 0b90b7d: Fix the nutrition scanner starter's Expo Router tab anchor and web startup routing.

  Generated nutrition scanner apps now anchor the tabs layout to the visible `products` tab, keep `/` as a hidden fallback route, preserve `/products` as the signed-in landing path, and avoid invalid `index` tab anchors during Expo Router startup.

## 1.8.6

### Patch Changes

- Release trigger
- c0966db: Release Trigger

## 1.8.5

### Patch Changes

- 7c0430b: Fix nutrition web route nesting

## 1.8.4

### Patch Changes

- bc1b2c4: Align the nutrition scanner starter with the cleaned product-centric nutrition API.

  Generated nutrition scanner apps now target the single-table `nutrition_products` MVP contract, use direct product CRUD and barcode lookup endpoints, handle duplicate barcode conflicts, and remove stale capture/challenge/review/store-observation assumptions.

## 1.8.3

### Patch Changes

- 481d13b: Align the food/drink nutrition catalog scanner starter with the current product-centric nutrition API.

  Generated nutrition scanner manifests now use direct product CRUD operations under `/v1/nutrition/products`, full runtime product operation paths, and `packageLabel`-based product data instead of the legacy capture/challenge/event flow.
  EOF

## 1.8.2

### Patch Changes

- 14e32f8: Fix wrong nutrition api baseUrl

## 1.8.1

### Patch Changes

- e3e2208: Rewrite the nutrition catalog scan starter to render catalog products through generic repeated product-card bindings backed by `products.list`.

## 1.8.0

### Minor Changes

- 16a2a1f: Emit runtime `dataSources` and `dataBindings` for the nutrition catalog scan starter so scanner lookups and product-card navigation no longer depend on opaque action strings.

## 1.7.4

### Patch Changes

- 4fd369f: Update nutrition app template (scanner) and set the camera permission as a requirement

## 1.7.3

### Patch Changes

- 7f994ac: Use tabs navigation and collapsed disclosure sections for the Urban Water Monitor starter.

## 1.7.2

### Patch Changes

- 4a2adc0: Fix Urban Water Monitor starter root route so generated authenticated apps resolve /.

## 1.7.1

### Patch Changes

- 5ebfab7: Add the `urban-water-monitor` starter variant under Business & Productivity.

  The new template introduces a single Project screen for an event-based urban water monitoring concept, covering field campaigns, sampling workflows, lab result handling, API strategy, data trust, stakeholder communication, MVP scope, and future screens.

  Also reorganize existing named starter variants into per-template folders under their category directories while preserving public template IDs, labels, descriptions, and generated manifest behavior.

## 1.7.0

### Minor Changes

- 368456f: Make the nutrition scanner starter useful with Products, Scan, Stats, and Profile tabs plus direct ZORA scanner and product grid nodes.

## 1.6.0

### Minor Changes

- 870ebf3: Add generated domain data API declarations to the nutrition catalog scan starter.

## 1.5.0

### Minor Changes

- d70345c: Update the nutrition catalog scan starter to model a restricted scanner challenge with global auth, Supabase profile metadata, challenge routes, and leaderboard/profile screens.

## 1.4.0

### Minor Changes

- aea3450: Add a `food_drink/nutrition-catalog-scan` starter manifest for Swiss nutrition product catalog apps with ZORA-first product browsing, scan-to-add capture flow, and API Gateway integration guidance.

## 1.3.4

### Patch Changes

- 7f7c6a8: Keep the poker/card trainer starter API-neutral by removing generated `poker_situations` manifest data and switching sample table copy from `Hero` to `User` terminology.

## 1.3.3

### Patch Changes

- 58b67ed: Improve the generated poker/card trainer starter with a compact trainer layout, visible hero cards, horizontal decisions, hidden initial feedback, and API-first `poker_situations` seed data.

## 1.3.2

### Patch Changes

- d2e2571: Render poker trainer decision actions as a readable ButtonGroup.

## 1.3.1

### Patch Changes

- 3b7eb55: Use the canonical splash screen manifest contract from `@ankhorage/contracts`.

## 1.3.0

### Minor Changes

- bc2db84: Generate OAuth-aware provider entry screens from manifest auth config.

## 1.2.23

### Patch Changes

- 3e61f48: Add default splash screen branding to generated starter manifests.

## 1.2.22

### Patch Changes

- d0ece74: Update packages

## 1.2.21

### Patch Changes

- 77595d3: Add an opening-book panel below the chess starter board.

## 1.2.20

### Patch Changes

- 47c0492: Add a games card-trainer starter template using tabletop presentation components.

## 1.2.19

### Patch Changes

- 52a437c: Update ZORA

## 1.2.18

### Patch Changes

- 6495bfe: Keep the games chess starter home screen focused on the ChessBoard.

## 1.2.17

### Patch Changes

- 1db98fd: Render a real ChessBoard node in the games chess starter home screen.

## 1.2.16

### Patch Changes

- 21ca5f0: Correct the games chess starter to generate Home and Settings tabs.

## 1.2.15

### Patch Changes

- b22f678: Expose starter template listing APIs and add a games chess starter template.

## 1.2.14

### Patch Changes

- 1cb8715: Generate ZORA `Screen` and `ScreenSection` manifest nodes instead of the removed `Page`, `PageHeader`, and `PageSection` nodes.
- 5ef4b15: Update ZORA

## 1.2.13

### Patch Changes

- e39e97d: Update ZORA

## 1.2.12

### Patch Changes

- 31f01d1: Update packages

## 1.2.11

### Patch Changes

- ebdf9e4: Update ZORA

## 1.2.10

### Patch Changes

- f1a62e0: Update ZORA

## 1.2.9

### Patch Changes

- 7bd33ef: Update ZORA

## 1.2.8

### Patch Changes

- 2752f21: Update ZORA

## 1.2.7

### Patch Changes

- dfec107: Update ZORA

## 1.2.6

### Patch Changes

- 7d5707b: Update ZORA

## 1.2.5

### Patch Changes

- 2e15a9c: Update ZORA

## 1.2.4

### Patch Changes

- 96ebcb1: Add default storage infra to generated app manifests.

## 1.2.3

### Patch Changes

- ad37cc4: Update ZORA & CONTRACTS

## 1.2.2

### Patch Changes

- 274e971: Update ZORA

## 1.2.1

### Patch Changes

- 4def903: Update ZORA

## 1.2.0

### Minor Changes

- cf2aea1: Expand starter template coverage to every `AppCategory`.

  Every app category now resolves to a dedicated starter template with an explicit navigator type, category-aware route labels, route-specific `material-community` icons, category theme defaults, and meaningful ZORA-based starter screens. Unknown runtime category strings still fall back to the generic starter behavior.

## 1.1.9

### Patch Changes

- f64788a: update packages

## 1.1.8

### Patch Changes

- 76d1252: Update ZORA

## 1.1.7

### Patch Changes

- update ZORA

## 1.1.6

### Patch Changes

- 5eb272a: Update ZORA

## 1.1.5

### Patch Changes

- ef3a58a: Update ZORA & CONTRACTS

## 1.1.4

### Patch Changes

- c3b1933: Update Ankhorage package dependencies to the latest published Contracts/ZORA releases and remove serialized `colorTone` from generated template manifests, presets, seeds, and tests.

## 1.1.3

### Patch Changes

- 1317c63: update @ankhorage/zora & @ankhorage/contracts
- af4be40: Update ZORA

## 1.1.2

### Patch Changes

- 061fb82: update @ankhorage/zora & @ankhorage/contracts
- 81c8841: Rename systemTone to colorTone
- 9e397ea: Update @ankhorage/zora & @ankhorage/contracts"

## 1.1.1

### Patch Changes

- 1c87c93: Remove the fallback starter's route-level `sign-in` screen so global auth remains represented through infra and auth flow settings instead of navigation.

## 1.1.0

### Minor Changes

- 3adf66e: Add category-specific starter template variants for existing AppCategory values while keeping unsupported categories on the generic fallback path.

## 1.0.0

### Major Changes

- edab0ba: Adopt canonical sign-in, sign-up, and sign-out auth flow fields and generated starter routes, and tighten serialized ZORA node prop typing.

### Patch Changes

- 2feb951: Update @bun/types
- 7c62157: Add 'version-packages' script for releasing"

## 0.1.1

### Patch Changes

- Refresh the README copy so the published package overview and starter-template positioning stay aligned with the current messaging.

## 0.1.0

### Initial release

- bootstrap the standalone `@ankhorage/templates` package
- add ZORA-based starter template generation
- separate category presets from template structure
- expose manifest generation through a root-only public API
- consume shared `AppCategory` and `APP_CATEGORIES` from `@ankhorage/contracts`
