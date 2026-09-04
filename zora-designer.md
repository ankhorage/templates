---
{
  "schema": "zora-designer/v1",
  "documentKind": "configuration",
  "status": "resolved-with-gaps",
  "language": "en",
  "source": {
    "mode": "template",
    "inputs": [
      "Interactive user questionnaire",
      "Installed owner API inspection",
      "Live Ankhorage API Gateway OpenAPI and published poker tasks",
      "Local api-gateway SharkPrey v0 review dataset",
      "Released @ankhorage/zora-tabletop public API"
    ],
    "evidence": [
      {
        "id": "owner-inspect",
        "kind": "owner-api",
        "location": ".agents/skills/zora-designer/scripts/owner-api.ts inspect",
        "observation": "Resolved current categories, recommendations, harmonies, tone pairs, navigator types, ZORA components, events, and versions."
      },
      {
        "id": "owner-compose",
        "kind": "owner-api",
        "location": "/tmp/sharkprey-design-input.json",
        "observation": "Both modes compiled and draft application composition passed without owner errors."
      },
      {
        "id": "poker-openapi",
        "kind": "api-contract",
        "location": "https://api.ankhorage.com/openapi.json",
        "observation": "Current task contract exposes game type, street, blinds, positions, cards, pot, players, prompt, learningGoal, difficulty, tags, options, and answer explanations."
      },
      {
        "id": "poker-task",
        "kind": "api-data",
        "location": "https://api.ankhorage.com/v1/poker/training/tasks/6eacd4e9-ea76-4ffb-977e-fc4eb9296315",
        "observation": "Published AQ on Qh-7c-2s continuation-bet sizing task selected as the content basis."
      },
      {
        "id": "sharkprey-v0",
        "kind": "repository-data",
        "location": "../api-gateway/data/poker-training/sharkprey-v0.tasks.jsonl",
        "observation": "One hundred review candidates are currently NLHE tournament tasks with ten player records each."
      },
      {
        "id": "zora-tabletop",
        "kind": "owner-api",
        "location": "../zora-tabletop/src/index.ts",
        "observation": "Released 0.0.5 exports TabletopTable, PlayingCard, CardBack, and CardHand for React Native and React Native Web; TabletopTable supports two through ten seats."
      },
      {
        "id": "concept-image-series",
        "kind": "generated-image-evidence",
        "location": "src/templates/categories/education-learning/sharkprey/assets/screens/01-splash.png through src/templates/categories/education-learning/sharkprey/assets/screens/10-settings.png",
        "observation": "Ten separate portrait mobile concepts were generated and visually inspected at original resolution. The accepted series uses crisp dark surfaces, saturated semantic accents, split-color branding, outlined selected controls, and solid blue only for primary actions."
      },
      {
        "id": "template-manifest",
        "kind": "runtime-manifest",
        "location": "src/templates/categories/education-learning/sharkprey/createAppManifest.ts",
        "observation": "The portable SharkPrey template contains ten screens, a nested stack-and-tabs navigator, an authenticated landing route aligned to onboarding, local persisted state, one bundled logo asset, supported ZORA elements and actions, and an explicit poker-table placeholder pending manifest metadata ownership."
      }
    ],
    "limitations": [
      "Static concept images cannot validate runtime interaction, focus order, accessibility announcements, text scaling, or responsive behavior.",
      "The approved nine-seat MTT scenario is a target adaptation of a currently published cash-game task, not a verbatim public API record."
    ]
  },
  "config": {
    "product": {
      "name": {
        "value": "SharkPrey",
        "origin": "user"
      },
      "tagline": {
        "value": "Improve your game. Become the shark.",
        "origin": "user"
      },
      "category": {
        "requested": "Education & Learning",
        "resolved": "education_learning",
        "origin": "user"
      },
      "audience": {
        "value": "Poker players worldwide, from newcomers to experienced players seeking meaningful improvement.",
        "origin": "user"
      },
      "primaryTask": {
        "value": "Adaptive NLHE decision training with immediate explained feedback and weakness-driven practice.",
        "origin": "user"
      },
      "secondaryTask": {
        "value": "Rules and fundamentals through onboarding and a secondary Learn area.",
        "origin": "user"
      }
    },
    "platform": {
      "runtimeTargets": {
        "value": [
          "android",
          "ios",
          "web"
        ],
        "origin": "user"
      },
      "currentDesignScope": {
        "value": "mobile-only",
        "origin": "user"
      },
      "desktopScaling": {
        "value": "deferred to a separate issue and algorithm",
        "origin": "user"
      },
      "viewport": {
        "width": 390,
        "height": 844,
        "unit": "logical-pixel",
        "orientation": "portrait",
        "origin": "user"
      },
      "inputModes": {
        "value": [
          "touch"
        ],
        "origin": "inferred"
      }
    },
    "theme": {
      "coverage": {
        "value": [
          "light",
          "dark"
        ],
        "origin": "user"
      },
      "defaultMode": {
        "value": "system",
        "origin": "user"
      },
      "conceptMode": {
        "value": "dark",
        "origin": "user"
      },
      "primaryColor": {
        "value": "#2563EB",
        "origin": "category-default",
        "confirmedBy": "user"
      },
      "harmony": {
        "value": "triadic",
        "origin": "category-default",
        "confirmedBy": "user"
      },
      "tonePairs": {
        "light": {
          "value": "jewel-on-pastel",
          "origin": "category-default",
          "confirmedBy": "user"
        },
        "dark": {
          "value": "pastel-on-neutral-dark",
          "origin": "category-default",
          "confirmedBy": "user"
        }
      },
      "typography": {
        "body": {
          "value": "platform system font",
          "origin": "project"
        },
        "headings": {
          "value": "same platform system family with heavier weight",
          "origin": "user"
        },
        "reason": "Owner candidates Atkinson Hyperlegible and Outfit are not installed or bundled."
      },
      "profile": {
        "density": {
          "value": "comfortable",
          "origin": "category-default",
          "confirmedBy": "user"
        },
        "shape": {
          "value": "soft",
          "origin": "category-default",
          "confirmedBy": "user"
        },
        "motion": {
          "value": "restrained instructional transitions with reduced-motion support",
          "origin": "user"
        },
        "contrast": {
          "value": "WCAG AA minimum with non-color state cues",
          "origin": "user"
        }
      }
    },
    "brand": {
      "logo": {
        "value": "Smart approachable shark mascot wearing an academic graduation cap with a split-color SharkPrey wordmark: Shark in off-white and Prey in vivid blue, plus a small amber tassel accent.",
        "origin": "user",
        "avoid": [
          "childish",
          "aggressive",
          "casino styling"
        ]
      },
      "colorHierarchy": {
        "value": "Keep the dark background and surfaces flat and fully opaque; reserve solid saturated blue for the primary action, use blue outlines and checkmarks for selected options, and avoid washed-out color, haze, glow, and all-blue wordmarks.",
        "origin": "user"
      }
    },
    "training": {
      "formats": {
        "value": [
          "ring-game",
          "sit-and-go",
          "mtt"
        ],
        "origin": "user"
      },
      "tableSizes": {
        "value": [
          6,
          9
        ],
        "origin": "user"
      },
      "taskShape": {
        "value": "one situation, one decision, done",
        "origin": "user"
      },
      "difficulty": {
        "value": "adaptive",
        "origin": "user"
      },
      "historyReplay": {
        "value": "deferred",
        "origin": "user"
      }
    },
    "scenario": {
      "origin": "user",
      "basis": "published task poker-flop-top-pair-cbet-size",
      "targetAdaptation": "nine-max MTT",
      "positions": [
        "UTG",
        "UTG+1",
        "MP",
        "MP+1",
        "HJ",
        "CO",
        "BTN",
        "SB",
        "BB"
      ],
      "heroPosition": "CO",
      "dealerPosition": "BTN",
      "heroCards": [
        "A-spades",
        "Q-diamonds"
      ],
      "communityCards": [
        "Q-hearts",
        "7-clubs",
        "2-spades"
      ],
      "pot": 650,
      "blinds": {
        "small": 50,
        "big": 100
      },
      "previousAction": "Hero raised preflop from CO and BB called.",
      "prompt": "What's the best default continuation-bet size?",
      "options": [
        "Check",
        "Bet ~33% pot",
        "Bet ~75% pot"
      ],
      "demonstratedSelection": "Bet ~75% pot",
      "correctAnswer": "Bet ~33% pot",
      "explanation": "On this dry flop, a small continuation bet gains value from worse Qx and denies equity efficiently; a large size is unnecessary as a baseline.",
      "difficulty": 2,
      "category": "Continuation-bet sizing"
    }
  },
  "derivation": {
    "provenance": [
      {
        "owner": "@ankhorage/color-theory",
        "version": "0.3.0",
        "paths": [
          "theme.harmony",
          "theme.generatedPalettes"
        ]
      },
      {
        "owner": "@ankhorage/contracts",
        "version": "8.2.0",
        "paths": [
          "navigator",
          "screens",
          "themeConfig"
        ]
      },
      {
        "owner": "@ankhorage/templates",
        "version": "9.1.5",
        "paths": [
          "categoryPreset",
          "composition"
        ]
      },
      {
        "owner": "@ankhorage/zora",
        "version": "4.0.0",
        "paths": [
          "computedTheme",
          "componentMetadata",
          "events"
        ]
      },
      {
        "owner": "@ankhorage/zora-tabletop",
        "version": "0.0.5",
        "paths": [
          "TabletopTable",
          "PlayingCard",
          "CardBack",
          "CardHand"
        ]
      }
    ],
    "diagnostics": [],
    "assumptions": [
      "The concept renders a full nine-seat MTT context even though the selected published task currently supplies only CO and BB player records.",
      "UTG+2 is omitted when normalizing the current ten-position review data to the approved nine-max target.",
      "The visible hero seat is anchored at the bottom while preserving its CO label; BTN retains the dealer marker.",
      "English copy is used for the global concept series."
    ],
    "unsupported": [
      "Core ZORA manifest metadata does not expose @ankhorage/zora-tabletop elements as direct manifest nodes.",
      "RadioGroup and Form are not direct manifest nodes in installed ZORA metadata.",
      "List and MetricCard are not direct manifest nodes in installed ZORA metadata.",
      "SettingsLayout and SwitchField are not direct manifest nodes in installed ZORA metadata.",
      "React-rendered SplashScreen is not a direct manifest node; native splash configuration is outside ZORA."
    ],
    "ownerRuntimeDrift": [
      {
        "owner": "@ankhorage/zora-tabletop",
        "path": "TabletopTable",
        "ownerValue": "Released presentational React component supporting two through ten seats.",
        "designTarget": "Nine-seat MTT table available to manifest-driven runtime composition.",
        "evidence": "zora-tabletop 0.0.5 public API and Templates owner composition",
        "failedGate": "manifest-node-metadata",
        "requiredOwnerChange": "Expose tabletop components through the appropriate current manifest/runtime metadata owner without adding app-specific logic to zora-tabletop."
      },
      {
        "owner": "Ankhorage API Gateway",
        "path": "/v1/poker/training/tasks",
        "ownerValue": "Published task is nlhe_cash with two player records; local 100-task review dataset is nlhe_tournament with ten player records.",
        "designTarget": "Explicit Ring Game, Sit'n'Go, and MTT formats with six-max or nine-max table size, dealer position, full seat state, adaptive level, category scoring, history, and learner stats.",
        "evidence": "Live OpenAPI, live published endpoint, and local SharkPrey v0 review data",
        "failedGate": "target-api-contract",
        "requiredOwnerChange": "Update the curated API contract and reviewed task data before runtime implementation."
      }
    ]
  },
  "tokens": {
    "modeRendered": "dark",
    "light": {
      "background": "#f8fcf8",
      "surface": "#f2f6f2",
      "text": "#161a16",
      "textSecondary": "#3d423d",
      "primary": "#2563EB",
      "secondary": "#d10e2e",
      "accent": "#008b00",
      "success": "#22c55e",
      "error": "#ef4444"
    },
    "dark": {
      "background": "#060806",
      "surface": "#161a16",
      "text": "#f8fcf8",
      "textSecondary": "#e5e9e5",
      "primary": "#2563EB",
      "secondary": "#d10e2e",
      "accent": "#008b00",
      "success": "#22c55e",
      "error": "#ef4444"
    },
    "typography": {
      "h1": {
        "size": 32,
        "lineHeight": 40,
        "weight": "bold"
      },
      "h2": {
        "size": 24,
        "lineHeight": 32,
        "weight": "bold"
      },
      "h3": {
        "size": 20,
        "lineHeight": 28,
        "weight": "bold"
      },
      "body": {
        "size": 16,
        "lineHeight": 24,
        "weight": "regular"
      },
      "label": {
        "size": 14,
        "lineHeight": 20,
        "weight": "semiBold"
      }
    },
    "spacing": {
      "none": 0,
      "xs": 4,
      "s": 8,
      "m": 16,
      "l": 24,
      "xl": 32,
      "xxl": 48
    },
    "radii": {
      "none": 0,
      "s": 8,
      "m": 12,
      "l": 24,
      "full": 9999
    }
  },
  "components": {
    "stateRequirements": [
      "Every action has pressed, disabled, and focus treatment.",
      "Async data exposes loading, retryable error, offline, empty, and partial states.",
      "Correct and incorrect answers use icon plus text plus semantic color.",
      "Reset statistics requires explicit destructive confirmation.",
      "Leaving an active session requires abandonment confirmation and preserves state until confirmed."
    ],
    "recipeDecisions": {
      "table": "Use @ankhorage/zora-tabletop TabletopTable with PlayingCard, CardBack, and CardHand semantics.",
      "actions": "Use ZORA Button with equal visual weight for answer choices so presentation does not reveal correctness.",
      "feedback": "Use ZORA Notice plus semantic Text and Button.",
      "summary": "Use ZORA ProgressRing and Button.",
      "learning": "Use ZORA Card.",
      "settings": "Use SettingsRow where supported; visually preserve unsupported control patterns with explicit secondary-surface placeholders."
    }
  },
  "screens": [
    {
      "order": 1,
      "id": "splash",
      "title": "SharkPrey",
      "purpose": "Introduce the brand while the app initializes.",
      "primaryAction": "Continue automatically.",
      "successOutcome": "Route to onboarding on first launch or Train on return.",
      "visibleCopy": [
        "SharkPrey",
        "Improve your game. Become the shark."
      ],
      "states": [
        "default",
        "loading",
        "offline-timeout"
      ],
      "route": "root/splash",
      "activeTab": null,
      "assetEvidence": "src/templates/categories/education-learning/sharkprey/assets/screens/01-splash.png"
    },
    {
      "order": 2,
      "id": "onboarding",
      "title": "Improve your game. Become the shark.",
      "purpose": "Set expectations and establish the learner's starting level.",
      "primaryAction": "Start assessment",
      "successOutcome": "Create the initial adaptive profile and continue to Training Setup.",
      "visibleCopy": [
        "Train one decision at a time—with feedback that explains why.",
        "New to NLHE",
        "Learning the ranges",
        "Experienced player",
        "New to NLHE? Learn the rules",
        "Start assessment"
      ],
      "states": [
        "default",
        "selected-level",
        "disabled-until-selection"
      ],
      "route": "root/onboarding",
      "activeTab": null,
      "assetEvidence": "src/templates/categories/education-learning/sharkprey/assets/screens/02-onboarding.png"
    },
    {
      "order": 3,
      "id": "training-setup",
      "title": "Build your session",
      "purpose": "Configure a focused adaptive practice session.",
      "primaryAction": "Start training",
      "successOutcome": "Open the first Decision Table task.",
      "visibleCopy": [
        "Game",
        "MTT",
        "Table",
        "9-max",
        "Focus",
        "Adaptive",
        "Session",
        "10 hands",
        "Difficulty adapts to you",
        "Start training"
      ],
      "states": [
        "default",
        "selected",
        "loading",
        "offline",
        "validation-error"
      ],
      "route": "app/train/training-setup",
      "activeTab": "Train",
      "assetEvidence": "src/templates/categories/education-learning/sharkprey/assets/screens/03-training-setup.png"
    },
    {
      "order": 4,
      "id": "decision-table",
      "title": "Your decision",
      "purpose": "Present one complete NLHE situation and collect one unbiased decision.",
      "primaryAction": "Choose Check, Bet ~33% pot, or Bet ~75% pot.",
      "successOutcome": "Submit the selected option once and open Answer Explanation.",
      "visibleCopy": [
        "Flop · C-bet sizing",
        "Hand 3 of 10",
        "Blinds 50 / 100",
        "Pot 650",
        "You raised from CO. BB called.",
        "What's the best default continuation-bet size?",
        "Check",
        "Bet ~33% pot",
        "Bet ~75% pot"
      ],
      "states": [
        "default",
        "pressed",
        "selected",
        "submitting",
        "disabled",
        "offline",
        "retryable-error"
      ],
      "route": "app/train/decision-table",
      "activeTab": "Train",
      "continuity": "Uses the confirmed nine-max MTT AQ on Qh-7c-2s scenario.",
      "assetEvidence": "src/templates/categories/education-learning/sharkprey/assets/screens/04-decision-table.png"
    },
    {
      "order": 5,
      "id": "answer-explanation",
      "title": "Review the decision",
      "purpose": "Explain why the learner's choice was wrong and identify the correct default.",
      "primaryAction": "Next hand",
      "successOutcome": "Continue to a new adaptive task or finish the session.",
      "visibleCopy": [
        "Not quite",
        "You chose Bet ~75% pot",
        "Best default: Bet ~33% pot",
        "A small continuation bet gains value from worse Qx and denies equity efficiently. A large size is unnecessary as a baseline.",
        "Next hand"
      ],
      "states": [
        "incorrect-selected",
        "correct-answer-highlighted",
        "explanation-expanded"
      ],
      "route": "app/train/answer-explanation",
      "activeTab": "Train",
      "continuity": "Preserves the hand and highlights both selected and correct options without color alone.",
      "assetEvidence": "src/templates/categories/education-learning/sharkprey/assets/screens/05-answer-explanation.png"
    },
    {
      "order": 6,
      "id": "session-summary",
      "title": "Session complete",
      "purpose": "Summarize performance and direct the learner to the highest-value next practice.",
      "primaryAction": "Practice bet sizing",
      "successOutcome": "Open Training Setup prefiltered to the weakest category.",
      "visibleCopy": [
        "7 of 10 correct",
        "70% accuracy",
        "Strongest: Preflop ranges",
        "Needs work: Bet sizing",
        "Practice bet sizing"
      ],
      "states": [
        "default",
        "loading",
        "partial-data"
      ],
      "route": "app/train/session-summary",
      "activeTab": "Train",
      "assetEvidence": "src/templates/categories/education-learning/sharkprey/assets/screens/06-session-summary.png"
    },
    {
      "order": 7,
      "id": "hand-history",
      "title": "History",
      "purpose": "Scan and filter completed one-decision hands without replay.",
      "primaryAction": "Filter completed hands and inspect the recorded result summary.",
      "successOutcome": "Understand prior choices without entering a replay flow.",
      "visibleCopy": [
        "All",
        "Correct",
        "Review",
        "AQ · Qh 7c 2s",
        "Bet ~75% → Bet ~33%",
        "Incorrect",
        "C-bet sizing"
      ],
      "states": [
        "default",
        "filtered",
        "loading",
        "empty",
        "offline",
        "retryable-error"
      ],
      "route": "app/history",
      "activeTab": "History",
      "assetEvidence": "src/templates/categories/education-learning/sharkprey/assets/screens/07-hand-history.png"
    },
    {
      "order": 8,
      "id": "stats",
      "title": "Your game",
      "purpose": "Reveal strengths, weaknesses, and progress by learning category.",
      "primaryAction": "Practice a selected weakness.",
      "successOutcome": "Start an adaptive session focused on that category.",
      "visibleCopy": [
        "Overall 72",
        "Strengths",
        "Preflop ranges 86",
        "Position 74",
        "Weaknesses",
        "Bet sizing 61",
        "Bluffing 68",
        "Practice bet sizing"
      ],
      "states": [
        "default",
        "loading",
        "empty-new-player",
        "partial-data",
        "offline"
      ],
      "route": "app/stats",
      "activeTab": "Stats",
      "assetEvidence": "src/templates/categories/education-learning/sharkprey/assets/screens/08-stats.png"
    },
    {
      "order": 9,
      "id": "learn",
      "title": "Learn",
      "purpose": "Provide rules, fundamentals, and short conceptual lessons outside the main practice loop.",
      "primaryAction": "Open or continue a lesson.",
      "successOutcome": "Complete a lesson and return with improved context for training.",
      "visibleCopy": [
        "New to NLHE?",
        "Start with the rules",
        "Recommended for you",
        "Continuation-bet sizing",
        "Why a small bet does more",
        "Continue lesson"
      ],
      "states": [
        "default",
        "in-progress",
        "completed",
        "loading",
        "offline"
      ],
      "route": "app/learn",
      "activeTab": "Learn",
      "assetEvidence": "src/templates/categories/education-learning/sharkprey/assets/screens/09-learn.png"
    },
    {
      "order": 10,
      "id": "settings",
      "title": "Settings",
      "purpose": "Control appearance, deck presentation, integration, language, and local learning data.",
      "primaryAction": "Settings save immediately; Reset stats requires confirmation.",
      "successOutcome": "Preferences persist without losing an active session.",
      "visibleCopy": [
        "Appearance",
        "System",
        "Card deck",
        "SharkPrey Classic",
        "Language",
        "English",
        "SharkScope",
        "Not connected",
        "Connect account",
        "Reset stats"
      ],
      "states": [
        "default",
        "saving",
        "saved",
        "connection-loading",
        "connection-error",
        "reset-confirmation"
      ],
      "route": "app/settings",
      "activeTab": "Settings",
      "assetEvidence": "src/templates/categories/education-learning/sharkprey/assets/screens/10-settings.png"
    }
  ],
  "validation": {
    "scope": "composition",
    "status": "pass-with-non-blocking-gaps",
    "gates": [
      {
        "id": "questionnaire",
        "status": "pass",
        "evidence": "User confirmed every configuration decision."
      },
      {
        "id": "light-theme-compile",
        "status": "pass",
        "evidence": "Owner compiler returned no diagnostics."
      },
      {
        "id": "dark-theme-compile",
        "status": "pass",
        "evidence": "Owner compiler returned no diagnostics."
      },
      {
        "id": "navigator-screen-agreement",
        "status": "pass",
        "evidence": "Root stack, nested Train stack, and five tab routes map all ten screens; the authenticated landing route resolves to the root navigator's onboarding initial route."
      },
      {
        "id": "concept-image-generation",
        "status": "pass",
        "evidence": "Ten separate portrait mobile concepts were generated, saved under the template assets/screens directory, and inspected at original resolution; exact key copy, active navigation, semantic feedback, and corrected selection hierarchy are represented."
      },
      {
        "id": "template-release-validation",
        "status": "pass",
        "evidence": "Installed Templates 9.1.5 release validation returned ready with no diagnostics for the complete SharkPrey AppManifest."
      },
      {
        "id": "template-assets",
        "status": "pass",
        "evidence": "All ten final screen concepts are stored as design evidence under the portable template assets/screens directory and the final logo is stored under assets/images."
      },
      {
        "id": "runtime-accessibility",
        "status": "not-assessable",
        "evidence": "Static concepts cannot validate runtime semantics or behavior."
      }
    ],
    "applicationGate": "pass-with-non-blocking-gaps",
    "ownerRuntimeDrift": [
      "zora-tabletop manifest metadata",
      "poker target API contract"
    ],
    "blockers": []
  },
  "audit": {
    "status": "not-run",
    "score": null,
    "coverage": null,
    "applicableWeight": null,
    "assessedWeight": null,
    "rounding": "half-up",
    "confidence": {
      "value": null,
      "label": null
    },
    "possibleRange": {
      "lower": null,
      "upper": null
    },
    "releaseGate": "not-assessable",
    "releaseGateCriteria": [],
    "ruleResults": [],
    "findings": [],
    "risks": [],
    "passedRules": [],
    "notAssessable": []
  },
  "openDecisions": []
}
---

# ZORA Designer

## Design direction

SharkPrey is a globally approachable but serious NLHE learning product. It uses a calm, high-contrast dark learning interface around a canonical tabletop surface rather than casino spectacle.

## Resolved decisions and origins

The user explicitly confirmed the product, audience, adaptive learning intent, Android/iOS/web runtime targets, mobile-only current scope, viewport, themes, brand line, 6/9-max table sizes, ten-screen series, and navigation. Category visual defaults were accepted explicitly.

## Color system

Owner-compiled triadic design seeded by #2563EB. Concepts use flat #060806 background, #161a16 surface, #f8fcf8 text, #22c55e success, and #ef4444 error. Solid saturated blue is reserved for primary actions; selected controls use dark surfaces with blue outlines and checkmarks. The split wordmark keeps Shark off-white and Prey vivid blue. Color never communicates correctness alone.

## Typography

Use the platform system family because owner-recommended Atkinson Hyperlegible and Outfit are not installed. H1 is 32/40 bold, H2 is 24/32 bold, H3 is 20/28 bold, and body starts at 16/24.

## Layout, shape, elevation, and motion

390 by 844 portrait, 16-point horizontal gutters, preserved safe areas, minimum 44-point touch targets, comfortable spacing, soft radii, subtle elevation, restrained motion, and reduced-motion support. Use one stable five-item bottom navigation shell.

## Component and interaction states

Use ZORA primitives where metadata supports them and @ankhorage/zora-tabletop for the table and cards. Preserve loading, offline, empty, retry, pressed, selected, disabled, success, error, and destructive-confirmation states.

## Screen specifications

Ten separate screens: Splash, Onboarding, Training Setup, Decision Table, Answer Explanation, Session Summary, Hand History, Stats, Learn, and Settings. Hand replay is explicitly deferred.

## Accessibility and validation

Owner theme and draft composition gates pass without blockers. Concepts maintain readable type, non-color status cues, safe areas, and touch sizing; runtime semantics, focus, announcements, reflow, and assistive behavior remain not assessable until implementation.

## Audit summary

Configuration and portable template are complete with non-blocking owner/runtime gaps. Ten separate portrait mobile concepts and one logo asset were generated, saved, visually inspected at original resolution, and incorporated into the template with a release-ready manifest.

## Findings and remediation

Expose tabletop components through current manifest/runtime metadata and update the curated poker API for explicit formats, table size, dealer/full-seat state, adaptive categories, progress, history, and statistics before implementation.

## Risks needing verification

Nine seats remain dense in a 390-point portrait viewport and should be usability-tested during implementation. Generated images are concept evidence rather than pixel-exact runtime specifications.

## Not assessable

Runtime actions, keyboard/focus order, screen-reader semantics, live announcements, text scaling, and responsive web behavior.

## Open decisions

None for this concept-image scope. Desktop scaling and hand replay are deferred.

## User notes

SharkPrey should genuinely help players improve. Newcomer education exists but is not the main title. The app targets Android, iOS, and web, while this issue designs mobile screens only.
