# @ankhorage/templates

Reusable Ankhorage app templates, presets, and manifest generators.

## Usage

```ts
import {
  createCategoryAppManifest,
  createStarterTemplate,
  listStarterTemplatesByCategory,
} from '@ankhorage/templates';

const manifest = createCategoryAppManifest('social_community');

const creatorManifest = createStarterTemplate(seed, {
  templateId: 'creator',
});

const gameTemplates = listStarterTemplatesByCategory('games');
```

## Category Starter Templates

Starter templates are category-aware. A category can expose one or more template variants.
For example, `social_community` provides a default community starter and a `creator`
starter, while `games` provides the default quest-loop starter and a `chess` starter.

Use `listStarterTemplatesByCategory(category)` when an editor or generator needs a selectable
list for one category. It returns summaries only, not factories:

```ts
const templates = listStarterTemplatesByCategory('games');
// [
//   { id: 'default', category: 'games', label: 'Quest loop', ... },
//   { id: 'chess', category: 'games', label: 'Chess', ... },
// ]
```

Use `listStarterTemplateSummaries()` when a tool needs all registered starter choices.

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

All `AppCategory` values have a dedicated `starter/default` template with an explicit
`navigator.type`, deterministic route labels, and `material-community` route icons.

| Category                | Navigator | Routes (labels)                                                        | Icons (`material-community`)                                                                                                                      |
| ----------------------- | --------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `books_reading`         | `tabs`    | Library · Discover · Lists · Notes · Profile                           | `bookshelf` · `compass-outline` · `format-list-checks` · `notebook-outline` · `account-circle-outline`                                            |
| `business_productivity` | `drawer`  | Dashboard · Projects · Tasks · Calendar · Reports · Settings           | `view-dashboard-outline` · `folder-multiple-outline` · `clipboard-check-outline` · `calendar-month-outline` · `chart-box-outline` · `cog-outline` |
| `developer_tools`       | `drawer`  | Dashboard · Builds · Incidents · Environments · Deployments · Settings | `view-dashboard-outline` · `hammer-wrench` · `alert-circle-outline` · `server-network` · `rocket-launch-outline` · `cog-outline`                  |
| `education_learning`    | `tabs`    | Courses · Study · Practice · Progress · Profile                        | `book-education-outline` · `school-outline` · `pencil-box-outline` · `chart-line` · `account-circle-outline`                                      |
| `entertainment_media`   | `tabs`    | Discover · Watchlist · Now · Library · Profile                         | `compass-outline` · `bookmark-outline` · `play-circle-outline` · `movie-open-outline` · `account-circle-outline`                                  |
| `finance_money`         | `tabs`    | Overview · Accounts · Transactions · Budget · Insights                 | `view-dashboard-outline` · `bank-outline` · `swap-horizontal` · `wallet-outline` · `chart-donut`                                                  |
| `food_drink`            | `tabs`    | Discover · Menu · Reservations · Orders · Profile                      | `silverware-fork-knife` · `book-open-page-variant-outline` · `calendar-clock-outline` · `receipt-text-outline` · `account-heart-outline`          |
| `games`                 | `tabs`    | Home · Quests · Inventory · Friends · Profile                          | `gamepad-variant-outline` · `flag-outline` · `treasure-chest-outline` · `account-multiple-outline` · `account-circle-outline`                     |
| `graphics_design`       | `drawer`  | Dashboard · Briefs · Assets · Reviews · Brand · Settings               | `view-dashboard-outline` · `file-document-outline` · `image-multiple-outline` · `comment-check-outline` · `palette-outline` · `cog-outline`       |
| `health_fitness`        | `tabs`    | Today · Plans · Progress · Coach · Profile                             | `calendar-today-outline` · `clipboard-list-outline` · `chart-line` · `message-processing-outline` · `account-circle-outline`                      |
| `kids_family`           | `tabs`    | Home · Routines · Discover · Favorites · Parents                       | `home-outline` · `calendar-check-outline` · `compass-outline` · `heart-outline` · `shield-account-outline`                                        |
| `lifestyle`             | `tabs`    | Dashboard · Collections · Plans · Explore · Profile                    | `view-dashboard-outline` · `bookmark-multiple-outline` · `calendar-star` · `compass-outline` · `account-circle-outline`                           |
| `medical`               | `tabs`    | Appointments · Care Team · Records · Messages · Profile                | `calendar-check-outline` · `account-heart-outline` · `file-document-outline` · `message-processing-outline` · `account-circle-outline`            |
| `music_audio`           | `tabs`    | Home · Search · Library · Player · Profile                             | `music-note-outline` · `magnify` · `playlist-music-outline` · `play-circle-outline` · `account-circle-outline`                                    |
| `navigation_travel`     | `tabs`    | Destinations · Itinerary · Bookings · Map · Profile                    | `map-marker-outline` · `timeline-outline` · `ticket-outline` · `map-outline` · `account-circle-outline`                                           |
| `news_magazines`        | `tabs`    | Headlines · Topics · Saved · Search · Profile                          | `newspaper-variant-outline` · `tag-multiple-outline` · `bookmark-outline` · `magnify` · `account-circle-outline`                                  |
| `photo_video`           | `tabs`    | Capture · Library · Edit · Share · Profile                             | `camera-outline` · `image-multiple-outline` · `movie-edit-outline` · `share-variant-outline` · `account-circle-outline`                           |
| `reference`             | `drawer`  | Browse · Search · Categories · Saved · History · Settings              | `book-open-variant` · `magnify` · `shape-outline` · `bookmark-outline` · `clock-outline` · `cog-outline`                                          |
| `shopping_commerce`     | `tabs`    | Browse · Search · Sell · Orders · Profile                              | `shopping-outline` · `magnify` · `store-plus-outline` · `package-variant-closed` · `account-circle-outline`                                       |
| `social_community`      | `tabs`    | Feed · Groups · Messages · Profile · Settings                          | `newspaper-variant-outline` · `account-group-outline` · `message-text-outline` · `account-circle-outline` · `cog-outline`                         |
| `sports`                | `tabs`    | Scores · Schedule · Standings · Teams · Profile                        | `scoreboard-outline` · `calendar-month-outline` · `format-list-numbered` · `soccer-field` · `account-circle-outline`                              |
| `utilities_tools`       | `drawer`  | Dashboard · Tools · Shortcuts · Storage · Diagnostics · Settings       | `view-dashboard-outline` · `wrench-outline` · `lightning-bolt-outline` · `folder-multiple-outline` · `stethoscope` · `cog-outline`                |
| `weather`               | `tabs`    | Now · Forecast · Alerts · Locations                                    | `weather-partly-cloudy` · `weather-cloudy-clock` · `weather-cloudy-alert` · `map-marker-outline`                                                  |

The fallback template remains available and is used only for unknown runtime category strings:

- `fallback/default`: Home · Details · Settings (stack)

Additional variants:

- `games/chess`: Home · Settings. The Home screen renders a `ChessBoard` node with a static
  initial FEN and requires generated apps to provide `@ankhorage/zora-chess` through their
  extension registry.
- `food_drink/nutrition-catalog-scan`: Challenge · Products · Scan · Ranking · Profile. This
  restricted Swiss scanner challenge starter uses `infra.auth.scope = "global"`, Supabase auth,
  native RBAC, and an app-facing `profiles` table. The generated app should keep identity in
  Supabase Auth, store leaderboard display fields in `profiles`, and send product, scan, capture,
  challenge, and leaderboard data through the API Gateway. Native barcode scanning can use an app
  camera adapter such as `expo-camera`, while visible scanner and permission UI should use ZORA
  scanner primitives.
- `social_community/creator`: Studio · Posts · Audience · Insights · Settings

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
