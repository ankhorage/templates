# @ankhorage/templates

Reusable Ankhorage app templates, presets, and manifest generators.

## Usage

```ts
import { createCategoryAppManifest, createStarterTemplate } from '@ankhorage/templates';

const manifest = createCategoryAppManifest('social_community');

const creatorManifest = createStarterTemplate(seed, {
  templateId: 'creator',
});
```

## Category Starter Templates

Starter templates are category-aware. A category can expose one or more template variants.
For example, `social_community` provides a default community starter and a `creator`
starter.

Default resolution is deterministic:

- no `templateId` selects `default`
- an unknown template id falls back to that category's `default`
- an unregistered category falls back to `fallback/default`

The generated manifest includes category-specific routes, screens, copy, and route icons.
Icons use the existing route `icon: IconSpec` property from `@ankhorage/contracts`:

```ts
{
  name: 'groups',
  screenId: 'social_community-community-starter-groups',
  label: 'Groups',
  icon: { provider: 'material-community', name: 'account-group-outline' },
}
```

Auth behavior is not modeled as a visible navigation route in category templates. It remains
controlled by the manifest `infra` and `settings.authFlow` configuration. The original generic
starter remains available as the fallback template and preserves its existing sign-in screen.

## Current Templates

- `fallback/default`: Home, Details, Settings, Sign in
- `food_drink/default`: Discover, Menu, Reservations, Orders, Profile
- `health_fitness/default`: Today, Plans, Progress, Coach, Profile
- `shopping_commerce/default`: Browse, Search, Sell, Orders, Profile
- `social_community/default`: Feed, Groups, Messages, Profile, Settings
- `social_community/community`: Feed, Groups, Messages, Profile, Settings
- `social_community/creator`: Studio, Posts, Audience, Insights, Settings

Only categories that exist in `AppCategory` are registered. New category literals should be added
in `@ankhorage/contracts` before this package registers templates for them.

## Adding A Category Template

Add category-owned files under `src/templates/starter/categories/<category>/`:

- `content.ts` for category-specific copy and placeholder data
- `routes.ts` or `routes.<variant>.ts` for route names, labels, screen ids, and icons
- `screens.ts` or `screens.<variant>.ts` for ZORA node trees
- `<variant>.template.ts` for manifest assembly
- `index.ts` for `CategoryStarterTemplateDefinition` metadata

Register the category in `src/templates/starter/starter.registry.ts`. Keep shared behavior in
`src/templates/shared/*`; category wording and navigation should stay inside the category folder.

## Verification

```bash
bun run typecheck
bun run build
bun run lint
bun run test
```
