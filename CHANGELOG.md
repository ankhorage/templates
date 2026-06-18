# @ankhorage/templates

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
