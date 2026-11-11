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
      "value": "A board-first multiplayer chess configuration that retains every authored presentation state while remaining honest about unavailable server operations.",
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
      "contracts": "26.5.0",
      "runtime": "5.3.0",
      "templates": "12.4.17",
      "zora": "26.1.0"
    },
    "diagnostics": [],
    "assumptions": [
      "The released declarative state bindings persist independent 2 through 24 board dimensions while ChessBoard retains caller-owned pieces."
    ],
    "unsupported": [
      {
        "id": "grossmeister-multiplayer-operations",
        "owner": "@ankhorage/api-gateway#70",
        "detail": "Create, join, Choice Coin player-choice lock, start, move, resign, lobby reads, identity, and seat ownership require the versioned server-authoritative chess API. No released public operation is available to this portable manifest, so the controls are disabled and unbound. Replace only after #70 publishes the supported owner-backed operations."
      },
      {
        "id": "grossmeister-choice-coin-domain",
        "owner": "@ankhorage/chess and @ankhorage/api-gateway#70",
        "detail": "The released chess engine offers Choice Coin N/B and Free Choice P/N/B/R/Q/K presets. Each player selects every coin independently and the server locks complete selections. ZORA RadioGroup is one global single-choice presentation only; it cannot model per-coin selection or server locking. Templates therefore shows the supported preset vocabulary without a bound selector, copied rules, or color coin flip."
      },
      {
        "id": "grossmeister-piece-ownership",
        "owner": "@ankhorage/zora",
        "detail": "ChessBoard owns rendering only. GrossMeister keeps its declarative caller-owned pieces; pieces outside a resized board have no rendered cell."
      }
    ],
    "ownerRuntimeDrift": []
  },
  "screens": [
    {
      "id": "play",
      "purpose": "Board-first configuration preview with explicit unavailable multiplayer boundary.",
      "primaryAction": "Disabled until API Gateway #70 is published and bound by its released public operation.",
      "states": ["default preview", "interactive configuration", "disabled multiplayer action"],
      "evidence": ["play-mobile-concept", "play-desktop-concept"]
    },
    {
      "id": "lobby",
      "purpose": "Visible unavailable lobby boundary; it does not pretend that games can be joined.",
      "primaryAction": "Disabled join action pending API Gateway #70."
    },
    {
      "id": "waiting",
      "purpose": "Authored waiting presentation without a simulated readiness transition.",
      "primaryAction": "Disabled start action pending the server-authoritative readiness state."
    },
    {
      "id": "coin",
      "purpose": "Choice Coin piece-selection presentation for player-owned choices, without a color coin flip or lock simulation.",
      "primaryAction": "Piece choice is displayed declaratively; player locks remain server-owned."
    },
    {
      "id": "match",
      "purpose": "Authored match presentation with a disabled board and resign boundary; it does not implement moves or game rules.",
      "primaryAction": "Disabled resign action pending the server-authoritative match operation."
    },
    {
      "id": "result",
      "purpose": "Authored result presentation without invented outcome data or a new-game transition.",
      "primaryAction": "Disabled create action pending a server-authoritative game creation operation."
    },
    {
      "id": "sign-in",
      "purpose": "Canonical sign-in presentation.",
      "primaryAction": "Submit through the existing authentication binding."
    },
    {
      "id": "sign-up",
      "purpose": "Canonical sign-up presentation.",
      "primaryAction": "Submit through the existing authentication binding."
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

The board configuration controls update the preview through released Runtime state bindings. Multiplayer controls remain disabled until their server-authoritative operations are available. Concept evidence is separate from runtime acceptance.
