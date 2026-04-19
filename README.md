# @ankhorage/templates

Reusable app templates, presets, and manifest generators for Ankhorage.

This package is the single source of truth for application template structure and category branding defaults. It is designed to be consumed by the CLI, Studio, and future tooling without coupling template definitions to any one runtime.

## Architecture

```text
templates
   ↓
zora
   ↓
surface
```

Consumers:

```text
cli → templates
studio → templates
studio → zora
```

## What it provides

- template skeletons built on ZORA-oriented node definitions
- category presets separated from template structure
- manifest generators that compose templates and presets
- a root-only public API with no subpath exports

## Installation

```bash
bun add @ankhorage/templates @ankhorage/contracts @ankhorage/zora
```

## Usage

```ts
import {
  APP_CATEGORIES,
  CATEGORY_PRESETS,
  createCategoryAppManifest,
  createStarterTemplate,
} from '@ankhorage/templates';

const manifest = createCategoryAppManifest('developer_tools', 'starter', {
  metadata: {
    name: 'Ops Console',
    slug: 'ops-console',
  },
});

const preset = CATEGORY_PRESETS.developer_tools;
const categories = APP_CATEGORIES;
```

## Public API

```ts
export { APP_CATEGORIES, type AppCategory } from '@ankhorage/contracts';
export { CATEGORY_PRESETS, type CategoryPreset } from './presets/category-presets';
export {
  createStarterTemplate,
  TEMPLATE_KINDS,
  type TemplateKind,
} from './templates/starter.template';
export { createCategoryAppManifest } from './generators/create-category-app';
```

## Package layout

```text
src/
  templates/
  presets/
  generators/
  internal/
  index.ts
```

## Development

```bash
bun run typecheck
bun run build
bun run lint
bun test
```

## License

MIT
