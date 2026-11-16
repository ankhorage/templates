---
{
  "schema": "zora-designer/v1",
  "documentKind": "audit",
  "status": "resolved-with-gaps",
  "language": "en",
  "source": {
    "mode": "template",
    "inputs": [
      "Issue #813 portable Flow authoring template"
    ],
    "evidence": [
      "released @ankhorage/contracts@26.10.0",
      "released @ankhorage/zora@27.1.1"
    ]
  },
  "config": {
    "category": {
      "value": "developer_tools",
      "origin": "user"
    },
    "intent": {
      "value": "Portable Flow authoring and monitoring screens",
      "origin": "user"
    },
    "platform": {
      "value": [
        "web",
        "ios",
        "android"
      ],
      "origin": "user"
    }
  },
  "derivation": {
    "provenance": [
      "owner-api.ts inspect"
    ],
    "diagnostics": [],
    "assumptions": [
      "Screen content is serializable fake API acceptance data."
    ],
    "unsupported": [
      "FlowCanvas, mobile outline, node palette, and inspector await ZORA #1108/#1109."
    ],
    "ownerRuntimeDrift": [
      "Flow API #8 is not released; no persistence, executor, publishing, approval resolution, scheduler, or credential adapter is bound."
    ]
  },
  "tokens": {},
  "components": {
    "stateRequirements": [
      "loading",
      "empty",
      "error",
      "selected"
    ],
    "recipeDecisions": {
      "editor": "Card release gate rather than a second visual editor"
    }
  },
  "screens": [
    "workflows",
    "workflow-new",
    "workflow-editor",
    "versions",
    "runs",
    "run-detail",
    "approvals",
    "schedules",
    "credentials",
    "settings"
  ],
  "assets": {
    "bundlePath": "design-assets.json",
    "status": "pass",
    "entries": []
  },
  "validation": {
    "scope": "configuration",
    "status": "pass-with-gaps",
    "gates": [
      "owner inspection",
      "manifest validation",
      "fake API acceptance"
    ],
    "applicationGate": "blocked",
    "ownerRuntimeDrift": [
      "Required owner APIs are unreleased."
    ],
    "blockers": [
      "Generated-app runtime and native acceptance have no owning generator in this repository."
    ]
  },
  "audit": {
    "status": "partial",
    "score": null,
    "coverage": 0,
    "coverageLabel": "low",
    "provisional": true,
    "applicableWeight": 100,
    "assessedWeight": 0,
    "earnedWeight": 0,
    "rounding": "half-up",
    "confidence": {
      "value": null,
      "label": null
    },
    "possibleRange": {
      "lower": 0,
      "upper": 100
    },
    "releaseGate": "not-assessable",
    "releaseGateCriteria": [
      {
        "id": "RG01",
        "name": "core-task-operability",
        "applicable": true,
        "status": "not-assessable",
        "evidenceIds": [],
        "reason": "",
        "criteria": [
          {
            "id": "primary-task-reachable-and-completable",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "required-controls-operable",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "state-and-outcome-perceivable",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "no-blocking-task-failure",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          }
        ]
      },
      {
        "id": "RG02",
        "name": "keyboard-focus-and-no-trap",
        "applicable": true,
        "status": "not-assessable",
        "evidenceIds": [],
        "reason": "",
        "criteria": [
          {
            "id": "keyboard-equivalent-operation",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "visible-focus",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "logical-focus-order",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "no-keyboard-trap-and-contained-modal-focus",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          }
        ]
      },
      {
        "id": "RG03",
        "name": "semantics-names-roles-values-and-announcements",
        "applicable": true,
        "status": "not-assessable",
        "evidenceIds": [],
        "reason": "",
        "criteria": [
          {
            "id": "semantic-structure",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "accessible-names",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "roles-states-and-values",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "announcements-errors-and-live-updates",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          }
        ]
      },
      {
        "id": "RG04",
        "name": "visual-AA-contrast-color-reflow-and-resize",
        "applicable": true,
        "status": "not-assessable",
        "evidenceIds": [],
        "reason": "",
        "criteria": [
          {
            "id": "text-contrast",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "non-text-contrast-and-color-cues",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "reflow-zoom-orientation-and-text-spacing",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "text-resize-without-clipping-or-loss",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          }
        ]
      },
      {
        "id": "RG05",
        "name": "input-AA-target-drag-and-gesture-operation",
        "applicable": true,
        "status": "not-assessable",
        "evidenceIds": [],
        "reason": "",
        "criteria": [
          {
            "id": "minimum-target-size-or-exception",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "target-spacing-and-obstruction",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "drag-and-complex-gesture-alternative",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "pointer-touch-and-motion-equivalence",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          }
        ]
      },
      {
        "id": "RG06",
        "name": "error-recovery-and-destructive-safety",
        "applicable": true,
        "status": "not-assessable",
        "evidenceIds": [],
        "reason": "",
        "criteria": [
          {
            "id": "error-identification-and-prevention",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "recovery-and-input-preservation",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "destructive-confirmation-or-reversal",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "cancel-back-retry-and-context-preservation",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          }
        ]
      },
      {
        "id": "RG07",
        "name": "blocking-owner-or-runtime-diagnostics",
        "applicable": true,
        "status": "not-assessable",
        "evidenceIds": [],
        "reason": "",
        "criteria": [
          {
            "id": "owner-diagnostics-pass",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "runtime-matches-approved-target",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "no-unresolved-application-blocker",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          },
          {
            "id": "required-validation-evidence-present",
            "applicable": true,
            "status": "not-assessable",
            "evidenceIds": [],
            "reason": ""
          }
        ]
      }
    ],
    "ruleResults": [
      {
        "rule": "R01",
        "name": "Clarity",
        "weight": 7,
        "status": "not-assessable",
        "statusFactor": null,
        "applicableCount": 4,
        "assessedCount": 0,
        "assessmentFraction": 0,
        "confidence": {
          "value": null,
          "label": null
        },
        "assessedWeight": 0,
        "earnedWeight": 0,
        "criteria": [
          {
            "id": "purpose-and-primary-task",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "labels-and-copy",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "icons-and-affordances",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "consequences-and-state-clarity",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          }
        ]
      },
      {
        "rule": "R02",
        "name": "Consistency",
        "weight": 5,
        "status": "not-assessable",
        "statusFactor": null,
        "applicableCount": 4,
        "assessedCount": 0,
        "assessmentFraction": 0,
        "confidence": {
          "value": null,
          "label": null
        },
        "assessedWeight": 0,
        "earnedWeight": 0,
        "criteria": [
          {
            "id": "tokens-and-components",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "terminology",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "navigation-and-placement",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "interaction-and-state-behavior",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          }
        ]
      },
      {
        "rule": "R03",
        "name": "Simplicity",
        "weight": 4,
        "status": "not-assessable",
        "statusFactor": null,
        "applicableCount": 4,
        "assessedCount": 0,
        "assessmentFraction": 0,
        "confidence": {
          "value": null,
          "label": null
        },
        "assessedWeight": 0,
        "earnedWeight": 0,
        "criteria": [
          {
            "id": "necessity-and-redundancy",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "task-step-efficiency",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "progressive-disclosure",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "decorative-competition",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          }
        ]
      },
      {
        "rule": "R04",
        "name": "Visual hierarchy",
        "weight": 7,
        "status": "not-assessable",
        "statusFactor": null,
        "applicableCount": 4,
        "assessedCount": 0,
        "assessmentFraction": 0,
        "confidence": {
          "value": null,
          "label": null
        },
        "assessedWeight": 0,
        "earnedWeight": 0,
        "criteria": [
          {
            "id": "focal-priority",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "heading-and-content-order",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "action-priority",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "visual-semantic-focus-order",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          }
        ]
      },
      {
        "rule": "R05",
        "name": "Scannability",
        "weight": 5,
        "status": "not-assessable",
        "statusFactor": null,
        "applicableCount": 4,
        "assessedCount": 0,
        "assessmentFraction": 0,
        "confidence": {
          "value": null,
          "label": null
        },
        "assessedWeight": 0,
        "earnedWeight": 0,
        "criteria": [
          {
            "id": "chunking-and-headings",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "alignment-and-comparison",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "line-length-and-density",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "key-information-discovery",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          }
        ]
      },
      {
        "rule": "R06",
        "name": "Color contrast",
        "weight": 10,
        "status": "not-assessable",
        "statusFactor": null,
        "applicableCount": 4,
        "assessedCount": 0,
        "assessmentFraction": 0,
        "confidence": {
          "value": null,
          "label": null
        },
        "assessedWeight": 0,
        "earnedWeight": 0,
        "criteria": [
          {
            "id": "normal-and-large-text",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "active-ui-and-graphics",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "focus-and-selection",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "states-overlays-images-gradients",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          }
        ]
      },
      {
        "rule": "R07",
        "name": "Intentional color",
        "weight": 5,
        "status": "not-assessable",
        "statusFactor": null,
        "applicableCount": 4,
        "assessedCount": 0,
        "assessmentFraction": 0,
        "confidence": {
          "value": null,
          "label": null
        },
        "assessedWeight": 0,
        "earnedWeight": 0,
        "criteria": [
          {
            "id": "semantic-role-consistency",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "non-color-cues",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "accent-restraint",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "brand-status-separation",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          }
        ]
      },
      {
        "rule": "R08",
        "name": "Negative space",
        "weight": 4,
        "status": "not-assessable",
        "statusFactor": null,
        "applicableCount": 4,
        "assessedCount": 0,
        "assessmentFraction": 0,
        "confidence": {
          "value": null,
          "label": null
        },
        "assessedWeight": 0,
        "earnedWeight": 0,
        "criteria": [
          {
            "id": "internal-rhythm",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "external-rhythm",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "edge-clearance-and-group-separation",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "density-balance",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          }
        ]
      },
      {
        "rule": "R09",
        "name": "Typography hierarchy",
        "weight": 7,
        "status": "not-assessable",
        "statusFactor": null,
        "applicableCount": 4,
        "assessedCount": 0,
        "assessmentFraction": 0,
        "confidence": {
          "value": null,
          "label": null
        },
        "assessedWeight": 0,
        "earnedWeight": 0,
        "criteria": [
          {
            "id": "roles-and-scale",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "line-height-measure-tracking",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "font-glyph-availability",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "scaling-clipping-semantics",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          }
        ]
      },
      {
        "rule": "R10",
        "name": "Immediate feedback",
        "weight": 5,
        "status": "not-assessable",
        "statusFactor": null,
        "applicableCount": 4,
        "assessedCount": 0,
        "assessmentFraction": 0,
        "confidence": {
          "value": null,
          "label": null
        },
        "assessedWeight": 0,
        "earnedWeight": 0,
        "criteria": [
          {
            "id": "direct-interaction-feedback",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "async-loading-progress",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "outcome-and-empty-feedback",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "focus-hover-disabled-states",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          }
        ]
      },
      {
        "rule": "R11",
        "name": "User control",
        "weight": 5,
        "status": "not-assessable",
        "statusFactor": null,
        "applicableCount": 4,
        "assessedCount": 0,
        "assessmentFraction": 0,
        "confidence": {
          "value": null,
          "label": null
        },
        "assessedWeight": 0,
        "earnedWeight": 0,
        "criteria": [
          {
            "id": "exit-cancel-back",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "undo-retry-reversibility",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "destructive-confirmation",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "input-and-context-preservation",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          }
        ]
      },
      {
        "rule": "R12",
        "name": "Error prevention and recovery",
        "weight": 7,
        "status": "not-assessable",
        "statusFactor": null,
        "applicableCount": 4,
        "assessedCount": 0,
        "assessmentFraction": 0,
        "confidence": {
          "value": null,
          "label": null
        },
        "assessedWeight": 0,
        "earnedWeight": 0,
        "criteria": [
          {
            "id": "prevention-constraints-defaults",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "validation-timing",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "error-identification-association",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "recovery-and-data-preservation",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          }
        ]
      },
      {
        "rule": "R13",
        "name": "Familiar patterns",
        "weight": 4,
        "status": "not-assessable",
        "statusFactor": null,
        "applicableCount": 4,
        "assessedCount": 0,
        "assessmentFraction": 0,
        "confidence": {
          "value": null,
          "label": null
        },
        "assessedWeight": 0,
        "earnedWeight": 0,
        "criteria": [
          {
            "id": "navigation-conventions",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "control-conventions",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "domain-flow-conventions",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "innovation-learnability",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          }
        ]
      },
      {
        "rule": "R14",
        "name": "Choice limitation",
        "weight": 3,
        "status": "not-assessable",
        "statusFactor": null,
        "applicableCount": 4,
        "assessedCount": 0,
        "assessmentFraction": 0,
        "confidence": {
          "value": null,
          "label": null
        },
        "assessedWeight": 0,
        "earnedWeight": 0,
        "criteria": [
          {
            "id": "priority-and-defaults",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "option-grouping",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "progressive-choice-disclosure",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "search-filter-for-large-sets",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          }
        ]
      },
      {
        "rule": "R15",
        "name": "Target sizing",
        "weight": 7,
        "status": "not-assessable",
        "statusFactor": null,
        "applicableCount": 4,
        "assessedCount": 0,
        "assessmentFraction": 0,
        "confidence": {
          "value": null,
          "label": null
        },
        "assessedWeight": 0,
        "earnedWeight": 0,
        "criteria": [
          {
            "id": "interactive-bound-size",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "spacing-and-overlap",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "reach-edge-frequency",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "input-specific-equivalence",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          }
        ]
      },
      {
        "rule": "R16",
        "name": "Proximity and grouping",
        "weight": 5,
        "status": "not-assessable",
        "statusFactor": null,
        "applicableCount": 4,
        "assessedCount": 0,
        "assessmentFraction": 0,
        "confidence": {
          "value": null,
          "label": null
        },
        "assessedWeight": 0,
        "earnedWeight": 0,
        "criteria": [
          {
            "id": "label-control-association",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "help-error-proximity",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "action-container-association",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "group-boundary-and-alignment",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          }
        ]
      },
      {
        "rule": "R17",
        "name": "Accessibility",
        "weight": 10,
        "status": "not-assessable",
        "statusFactor": null,
        "applicableCount": 4,
        "assessedCount": 0,
        "assessmentFraction": 0,
        "confidence": {
          "value": null,
          "label": null
        },
        "assessedWeight": 0,
        "earnedWeight": 0,
        "criteria": [
          {
            "id": "semantics-names-roles-values",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "keyboard-focus-order-and-traps",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "reflow-zoom-scaling-orientation",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          },
          {
            "id": "alternatives-announcements-motion-localization",
            "applicable": true,
            "status": "not-assessable",
            "statusFactor": null,
            "evidenceIds": [],
            "essentialEvidenceIds": [],
            "confidenceFactor": null,
            "reason": "Required evidence was not supplied."
          }
        ]
      }
    ],
    "findings": [],
    "risks": [],
    "passedRules": [],
    "notAssessable": [
      {
        "rule": "R01",
        "criterionId": "purpose-and-primary-task",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R01",
        "criterionId": "labels-and-copy",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R01",
        "criterionId": "icons-and-affordances",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R01",
        "criterionId": "consequences-and-state-clarity",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R02",
        "criterionId": "tokens-and-components",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R02",
        "criterionId": "terminology",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R02",
        "criterionId": "navigation-and-placement",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R02",
        "criterionId": "interaction-and-state-behavior",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R03",
        "criterionId": "necessity-and-redundancy",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R03",
        "criterionId": "task-step-efficiency",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R03",
        "criterionId": "progressive-disclosure",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R03",
        "criterionId": "decorative-competition",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R04",
        "criterionId": "focal-priority",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R04",
        "criterionId": "heading-and-content-order",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R04",
        "criterionId": "action-priority",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R04",
        "criterionId": "visual-semantic-focus-order",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R05",
        "criterionId": "chunking-and-headings",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R05",
        "criterionId": "alignment-and-comparison",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R05",
        "criterionId": "line-length-and-density",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R05",
        "criterionId": "key-information-discovery",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R06",
        "criterionId": "normal-and-large-text",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R06",
        "criterionId": "active-ui-and-graphics",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R06",
        "criterionId": "focus-and-selection",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R06",
        "criterionId": "states-overlays-images-gradients",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R07",
        "criterionId": "semantic-role-consistency",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R07",
        "criterionId": "non-color-cues",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R07",
        "criterionId": "accent-restraint",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R07",
        "criterionId": "brand-status-separation",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R08",
        "criterionId": "internal-rhythm",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R08",
        "criterionId": "external-rhythm",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R08",
        "criterionId": "edge-clearance-and-group-separation",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R08",
        "criterionId": "density-balance",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R09",
        "criterionId": "roles-and-scale",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R09",
        "criterionId": "line-height-measure-tracking",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R09",
        "criterionId": "font-glyph-availability",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R09",
        "criterionId": "scaling-clipping-semantics",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R10",
        "criterionId": "direct-interaction-feedback",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R10",
        "criterionId": "async-loading-progress",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R10",
        "criterionId": "outcome-and-empty-feedback",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R10",
        "criterionId": "focus-hover-disabled-states",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R11",
        "criterionId": "exit-cancel-back",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R11",
        "criterionId": "undo-retry-reversibility",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R11",
        "criterionId": "destructive-confirmation",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R11",
        "criterionId": "input-and-context-preservation",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R12",
        "criterionId": "prevention-constraints-defaults",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R12",
        "criterionId": "validation-timing",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R12",
        "criterionId": "error-identification-association",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R12",
        "criterionId": "recovery-and-data-preservation",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R13",
        "criterionId": "navigation-conventions",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R13",
        "criterionId": "control-conventions",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R13",
        "criterionId": "domain-flow-conventions",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R13",
        "criterionId": "innovation-learnability",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R14",
        "criterionId": "priority-and-defaults",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R14",
        "criterionId": "option-grouping",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R14",
        "criterionId": "progressive-choice-disclosure",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R14",
        "criterionId": "search-filter-for-large-sets",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R15",
        "criterionId": "interactive-bound-size",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R15",
        "criterionId": "spacing-and-overlap",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R15",
        "criterionId": "reach-edge-frequency",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R15",
        "criterionId": "input-specific-equivalence",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R16",
        "criterionId": "label-control-association",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R16",
        "criterionId": "help-error-proximity",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R16",
        "criterionId": "action-container-association",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R16",
        "criterionId": "group-boundary-and-alignment",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R17",
        "criterionId": "semantics-names-roles-values",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R17",
        "criterionId": "keyboard-focus-order-and-traps",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R17",
        "criterionId": "reflow-zoom-scaling-orientation",
        "missingEvidence": "Required evidence was not supplied."
      },
      {
        "rule": "R17",
        "criterionId": "alternatives-announcements-motion-localization",
        "missingEvidence": "Required evidence was not supplied."
      }
    ]
  },
  "openDecisions": [
    "Bind published Flow API and ZORA Flow components after their releases."
  ]
}
---

# ZORA Designer

## Design direction

Desktop and mobile authoring monitor with stable tabs and a route-backed detail flow.

## Resolved decisions and origins

All rendered elements are released ZORA primitives; Flow DTO vocabulary comes from released Contracts.

## Color system

Owner category theme compiled by the manifest consumer.

## Typography

Semantic headings and released Text variants only.

## Layout, shape, elevation, and motion

Wide operational screens and default detail screens preserve responsive Navigator planning.

## Component and interaction states

Navigation is bound through Runtime Navigator capabilities. Unreleased Flow operations remain visibly unavailable.

## Screen specifications

Workflows, create/editor boundary, versions, runs/events, approvals, schedules, credentials, and settings are independent screens.

## Accessibility and validation

Runtime focus, contrast, and native interaction remain generated-app acceptance work.

## Audit summary

Configuration is resolved with owner-release gaps.

## Findings and remediation

Replace the release-gate card with owner Flow components only after public release.

## Risks needing verification

A host must provide secret storage and Flow API authorization.

## Not assessable

No generated app or Flow provider is available in this repository.

## Open decisions

Release availability determines the next binding work. The concrete seed command is `bunx @ankhorage/templates create flow-demo --template developer_tools/flow`; it writes a manifest-first seed only. No generator owner exposes an application start command or localhost port, so this artifact intentionally documents no invented port.

## User notes

No unpublished pins, sibling-source imports, Flow executor, or second visual editor.
