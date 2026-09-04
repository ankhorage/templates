---
name: zora-designer
description: >
  Design one application screen or an ordered screen series, audit supplied evidence, and author
  portable Ankhorage templates using installed ZORA metadata, theme APIs, manifest contracts, and
  supported action bindings. Use for any app category; missing runtime capabilities do not restrict
  what may be designed.
---

# ZORA Designer

Design, audit, and author through the target repository's released owner APIs. The complete
`AppManifest` is runtime authority; generated screen images are design evidence.

## Route the request

- `interactive`: resolve design decisions without silently creating implementation artifacts.
- `screen`: design one screen and, when requested, generate its concept image.
- `screens`: design a coherent ordered screen series with shared navigation, state, and tokens.
- `audit`: evaluate supplied image evidence or a URL/runtime when the required capability exists.
- `template`: create one portable template with a complete default-exported `createAppManifest()`.

Natural language is enough. Do not reject an app type because some behavior is not executable yet.
A chat, marketplace, social app, editor, dashboard, game, or other product may still be designed
completely while unsupported behavior remains visibly present and explicitly unbound.

Read [workflow.md](references/workflow.md) for the ordered process and capability rules.

## Start with the owners

From the target repository, run:

```text
bun .agents/skills/zora-designer/scripts/owner-api.mjs inspect
```

Use public exports from installed `@ankhorage/templates`, `@ankhorage/zora/theme`, and
`@ankhorage/zora/metadata`. Never copy owner catalogs, component schemas, token inventories, or
manifest implementations into this skill.

## Map the complete UX

For every screen region, prefer the exact semantic ZORA element supported by current metadata.
Visual resemblance alone is insufficient.

If no exact ZORA element exists, keep the requested UX and use an obvious supported placeholder,
for example a secondary-surface `Box`. Record what capability the placeholder represents. Do not
invent props, custom application components, or pretend the missing element works.

A missing ZORA element is not permission to remove the flow and is not a reason to reject the app.

## Bind supported actions progressively

Inspect the installed Contracts/ZORA action and event model while authoring interactions.

- Bind every requested interaction that current owner contracts can express.
- Prefer real action bindings for supported behavior such as navigation from a collection/list item
  to a detail or chat screen.
- Preserve controls and flows whose action is not supported yet, but leave that behavior explicitly
  unbound and record the capability gap.
- Never invent action types or fake successful behavior.
- Unsupported sending, realtime behavior, push notifications, provider operations, or similar
  capabilities do not invalidate the surrounding screen series.

Example: a chat template may contain a conversation overview, navigate from a colleague to a chat
view, show the composer and send control, and bind the navigation now. If message sending is not in
the installed action model, the send interaction remains unbound until that owner capability exists.

## Template output

A template is exactly one portable unit:

```text
src/templates/categories/{appCategory}/{slug}/
  createAppManifest.ts
  assets/
    screens/
    images/
```

`createAppManifest.ts` default-exports a function returning the complete `AppManifest`.

Two authoring paths are valid:

1. Design-first: generate or receive screens, keep them in `assets/screens/`, then reconstruct the
   UI and extract/crop real application image regions into `assets/images/`.
2. Direct: author the template immediately and generate/save every required application image into
   `assets/images/`; reference screens are optional.

`assets/screens/` is evidence only. Runtime manifest media must never reference those screenshots.
Text, controls, icons, surfaces, and other UI are reconstructed with ZORA rather than cropped from a
screen. Only real image content is extracted as an application asset.

When the target is `@ankhorage/templates`, scaffold with:

```text
bun .agents/skills/zora-designer/scripts/scaffold-template.mjs scaffold-input.json
```

The scaffold creates the uniform template directory and regenerates discovery from the filesystem.
Do not add category registries, seed definitions, fallback templates, or per-template barrels.

## Capability truthfulness

Concept image output requires an image-generation capability. URL/runtime evidence requires a
browser/runtime capability. Image extraction requires the supplied/generated screen bytes.

When a capability is unavailable, mark only that behavior or evidence as unavailable. Continue the
rest of the requested design whenever it can be represented truthfully.

## Validate before handoff

- Compile both theme modes through installed owner APIs.
- Validate the complete manifest and all selected ZORA nodes against current metadata.
- Confirm supported interactions are actually bound and unsupported ones are explicitly recorded.
- Confirm runtime images live under the template's `assets/images/` and are referenced as bundled
  media from the manifest.
- Keep generated concept screens separate from runtime assets.
- Run focused validation; do not create exhaustive fixture suites for individual design templates.
