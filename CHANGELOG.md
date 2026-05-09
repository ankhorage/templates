# @ankhorage/templates

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
