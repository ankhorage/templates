---
{
  "schema": "zora-designer/v1",
  "documentKind": "configuration",
  "status": "resolved-with-gaps",
  "language": "en",
  "source": {
    "mode": "template",
    "inputs": [
      "Review correction for GrossMeister PR #788: board-first configuration, correct Choice Coin semantics, and no simulated multiplayer operations."
    ],
    "evidence": [
      {
        "id": "play-mobile-concept",
        "path": "assets/screens/01-play-mobile-concept.png",
        "kind": "generated concept",
        "viewport": "852 x 1846 pixels; 390 x 844 logical mobile target"
      },
      {
        "id": "play-desktop-concept",
        "path": "assets/screens/02-play-desktop-concept.png",
        "kind": "generated concept",
        "viewport": "1487 x 1058 pixels; 1440 x 1000 desktop target"
      }
    ],
    "limitations": [
      "The two images are generated ZORA Designer concepts, not runtime captures.",
      "Templates has no generated application host in this PR, so native-device and runtime viewport acceptance are not claimed."
    ]
  },
  "config": {
    "category": { "value": "games", "origin": "project" },
    "intent": {
      "value": "A board-first multiplayer chess configuration that remains honest about unavailable server operations.",
      "origin": "user"
    },
    "platforms": { "value": ["ios", "android", "web"], "origin": "project" },
    "viewports": {
      "value": {
        "mobile": [390, 844],
        "desktop": [1440, 1000]
      },
      "origin": "user"
    },
    "theme": { "value": "GrossMeister Navy/White", "origin": "existing-brief" },
    "navigator": { "value": "Headless Spielen/Lobby tabs", "origin": "existing-brief" }
  },
  "derivation": {
    "provenance": {
      "contracts": "26.4.0",
      "templates": "12.4.17",
      "zora": "26.0.0"
    },
    "diagnostics": [],
    "assumptions": [
      "The 8 x 8 board is a non-interactive presentation preview; the released ChessBoard public metadata permits caller-owned dimensions from 2 through 24 and caller-owned pieces."
    ],
    "unsupported": [
      {
        "id": "grossmeister-multiplayer-operations",
        "owner": "@ankhorage/api-gateway#70",
        "detail": "Create, join, Choice Coin player-choice lock, start, move, resign, lobby reads, identity, and seat ownership require the versioned server-authoritative chess API. No released public operation is available to this portable manifest, so the controls are disabled and unbound. Replace only after #70 publishes the supported owner-backed operations."
      },
      {
        "id": "grossmeister-board-configuration-binding",
        "owner": "@ankhorage/zora",
        "detail": "Released ChessBoard metadata supports instance columns, rows, and pieces plus emitted cell/move intents, but no declarative action binds Select or RadioGroup configuration to a board preview or serializes the configured template. The 2-24 and custom-piece controls therefore remain disabled pending a generic owner-backed authoring capability."
      },
      {
        "id": "grossmeister-choice-coin-domain",
        "owner": "@ankhorage/chess and @ankhorage/api-gateway#70",
        "detail": "Choice Coin is modeled as configurable chess pieces. Its player-owned selections and server lock must use released chess-domain behavior through the Gateway API; Templates neither copies rules nor resolves a color coin flip."
      },
      {
        "id": "grossmeister-web-hit-target",
        "owner": "@ankhorage/zora#1083",
        "detail": "The still-open ZORA fix owns web ChessBoard hit targets. This template carries no local workaround and must consume the published fix when available."
      }
    ],
    "ownerRuntimeDrift": []
  },
  "screens": [
    {
      "id": "play",
      "purpose": "Board-first configuration preview with explicit unavailable multiplayer boundary.",
      "primaryAction": "Disabled until API Gateway #70 is published and bound by its released public operation.",
      "states": ["default preview", "disabled configuration", "disabled multiplayer action"],
      "evidence": ["play-mobile-concept", "play-desktop-concept"]
    },
    {
      "id": "lobby",
      "purpose": "Visible unavailable lobby boundary; it does not pretend that games can be joined.",
      "primaryAction": "Disabled join action pending API Gateway #70."
    }
  ],
  "assets": {
    "bundlePath": "design-assets.json",
    "status": "pass",
    "entries": [
      {
        "id": "grossmeister-mark",
        "kind": "svg icon",
        "path": "assets/images/svg/grossmeister-mark.svg",
        "visualReview": "Retained Navy mark."
      },
      {
        "id": "grossmeister-wordmark",
        "kind": "svg image",
        "path": "assets/images/svg/grossmeister-wordmark.svg",
        "visualReview": "Restored from artiphishle/chess-test public/brand/wordmark-6.svg; 14 paths."
      }
    ]
  },
  "validation": {
    "scope": "composition",
    "status": "pass-with-gaps",
    "gates": [
      { "id": "asset-bundle", "status": "pass" },
      { "id": "owner-manifest", "status": "pass" },
      { "id": "runtime", "status": "not-assessable" }
    ],
    "applicationGate": "not-assessable",
    "ownerRuntimeDrift": [],
    "blockers": []
  },
  "openDecisions": [
    "Bind enabled multiplayer controls only after API Gateway #70 is released with declared owner-backed operations and a generated application host is selected for runtime acceptance."
  ]
}
---

# ZORA Designer

## Design direction

GrossMeister keeps one Navy/White design and puts the released ChessBoard on the configuration screen. It presents configuration intent without representing unavailable server work as a successful game flow.

## Accessibility and validation

The board preview, configuration controls, and multiplayer controls are disabled until their owner-backed behavior is available. Concept evidence is separate from runtime acceptance; no native-device or real-host claim is made.
