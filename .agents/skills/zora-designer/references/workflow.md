# Design, Composition, and Template Workflow

Use this workflow for `interactive`, `screen`, `screens`, and `template`. Audit uses the same target
model but keeps observed evidence separate from recommendations.

## 1. Establish intent and evidence

Record the requested app/category, audience, primary tasks, screen or series, platform, viewport,
theme modes, supplied images, and requested deliverable. Inspect installed Templates, ZORA metadata,
theme APIs, fonts, and the current manifest when one exists.

For screen-image input, decompose each screen into semantic regions. Preserve image order and
original dimensions. Separate UI structure from real image content that must become an app asset.

Do not narrow the product scope because an action, provider, realtime feature, notification, or ZORA
element is not supported yet.

## 2. Resolve design owners

Run:

```text
bun .agents/skills/zora-designer/scripts/owner-api.mjs inspect
```

Resolve category/theme choices through current owner APIs. Treat category presets as starting points,
not stereotypes or mandatory layouts. Resolve light and dark independently and use exact metadata
names for ZORA components and recipes.

## 3. Compose the full screen model

For each screen define purpose, hierarchy, navigation relationship, data needs, interaction states,
and narrow/wide behavior where relevant. For a series define the shared shell, route topology,
continuity, back/cancel behavior, and one coherent theme.

Map each region to the exact supported ZORA element when one exists. If none exists, select an
obvious supported placeholder such as `Box`, keep the intended capability in the design notes, and
continue. Do not send an unresolved region to composition as though it were a real element.

## 4. Bind actions that exist today

Inspect the installed action/event contracts rather than relying on remembered capabilities.

For every requested interaction:

1. Bind it when the current owner model can express it.
2. Keep the control and destination flow when the action itself is unavailable.
3. Mark that one behavior as unbound/unsupported without blocking unrelated screens.
4. Never invent action contracts or claim execution that cannot occur.

For example, a chat overview may bind item press to navigation into a chat view even when the
composer's send operation or push notifications are not supported yet.

## 5. Handle images

### Design-first

Store generated/provided reference screens in:

```text
assets/screens/
```

When converting them into a template, extract/crop only real image content needed by the app and
save it under:

```text
assets/images/
```

Rebuild text, controls, icons, surfaces, layout, and other UI with ZORA.

### Direct template authoring

No screen step is required. Generate/save application images directly under `assets/images/` and
reference them from `AppManifest.media.assets` as bundled media paths such as
`assets/images/hero.webp`.

`assets/screens/` is never a runtime media source.

## 6. Author the portable template

The canonical source is:

```text
src/templates/categories/{appCategory}/{slug}/
  createAppManifest.ts
  assets/
    screens/
    images/
```

The module contract is uniform:

```ts
export default function createAppManifest(): AppManifest {
  return completeManifest;
}
```

When working in `@ankhorage/templates`, scaffold reviewed output with:

```text
bun .agents/skills/zora-designer/scripts/scaffold-template.mjs scaffold-input.json
```

Input fields are `targetDirectory`, `category`, `slug`, and the complete `manifest`. The helper
validates the manifest, creates the template directory and asset folders, and regenerates the package
catalog by scanning the filesystem. There is no manually maintained per-category registry.

Generated/cropped image and screen files are part of the authoring task and must be written into the
created asset folders before handoff.

## 7. Delivery checks

- complete manifest validates against installed Contracts;
- every selected ZORA element/prop is metadata-supported;
- supported interactions are bound where the owner contracts allow it;
- unsupported interactions remain represented and clearly recorded rather than removed;
- required application images exist under `assets/images/` and match bundled manifest paths;
- reference screens, when present, remain under `assets/screens/` only;
- both theme modes compile without owner errors;
- concept images and runtime evidence are clearly distinguished.

Keep tests focused on the portable template contract and scaffolding/catalog behavior. Individual
visual templates will be exercised through real generated designs rather than large synthetic test
matrices.
