# @ankhorage/templates

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
