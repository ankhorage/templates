---
{
  "schema": "zora-designer/v1",
  "documentKind": "configuration",
  "status": "resolved-with-gaps",
  "language": "en",
  "source": {
    "mode": "template",
    "inputs": [
      "Four supplied Stillpath PNG screen references",
      "Use ankhorage/navigator responsively",
      "Finish using current components with documented differences"
    ],
    "evidence": [
      {
        "id": "stillpath-home",
        "path": "assets/screens/01-Home.png",
        "kind": "supplied concept"
      },
      {
        "id": "stillpath-journal",
        "path": "assets/screens/02-Journal.png",
        "kind": "supplied concept"
      },
      {
        "id": "stillpath-rituals",
        "path": "assets/screens/03-Rituals.png",
        "kind": "supplied concept"
      },
      {
        "id": "stillpath-profile",
        "path": "assets/screens/04-Profile.png",
        "kind": "supplied concept"
      }
    ]
  },
  "config": {
    "category": {
      "value": "lifestyle",
      "origin": "project"
    },
    "intent": {
      "value": "Gentle daily mindfulness rituals, reflection and progress",
      "origin": "observed"
    },
    "platforms": {
      "value": [
        "ios",
        "android",
        "web"
      ],
      "origin": "project"
    },
    "viewport": {
      "value": {
        "compact": [
          430,
          911
        ],
        "medium": [
          900,
          1000
        ],
        "expanded": [
          1440,
          1000
        ]
      },
      "origin": "inferred"
    },
    "themes": {
      "value": [
        "light",
        "dark"
      ],
      "origin": "observed"
    },
    "primary": {
      "value": "#9274A8",
      "origin": "project"
    },
    "harmony": {
      "value": "analogous",
      "origin": "project"
    },
    "typography": {
      "value": "Georgia headings; system sans body. Font installation remains consumer-owned.",
      "origin": "inferred"
    },
    "navigator": {
      "value": {
        "type": "tabs",
        "implementation": "headless",
        "presentation": "responsive",
        "responsive": {
          "compact": "bottom",
          "medium": "rail",
          "expanded": "sidebar"
        },
        "initialRouteName": "index",
        "routes": [
          {
            "name": "index",
            "path": "/",
            "label": "Home",
            "screenId": "stillpath-home",
            "icon": {
              "source": {
                "mediaId": "home"
              }
            }
          },
          {
            "name": "journal",
            "path": "/journal",
            "label": "Journal",
            "screenId": "stillpath-journal",
            "icon": {
              "source": {
                "mediaId": "journal"
              }
            }
          },
          {
            "name": "rituals",
            "path": "/rituals",
            "label": "Rituals",
            "screenId": "stillpath-rituals",
            "icon": {
              "source": {
                "mediaId": "rituals"
              }
            }
          },
          {
            "name": "profile",
            "path": "/profile",
            "label": "Profile",
            "screenId": "stillpath-profile",
            "icon": {
              "source": {
                "mediaId": "profile"
              }
            }
          }
        ]
      },
      "origin": "user"
    }
  },
  "derivation": {
    "provenance": {
      "colorTheory": "0.3.0",
      "contracts": "12.0.1",
      "templates": "9.7.1",
      "zora": "4.5.0",
      "plugins": {
        "@ankhorage/zora-tabletop": "0.1.0"
      }
    },
    "diagnostics": [],
    "assumptions": [
      "Screens are approximated as a 430 by 911 logical viewport; supplied bitmaps are 863 by 1822.",
      "Existing Stillpath lavender light/dark seeds are retained.",
      "Georgia is an approximation; no exact font was supplied.",
      "No backend or audio behavior is invented."
    ],
    "unsupported": [
      "home-save",
      "home-today-action",
      "home-explore-action",
      "home-sleep",
      "home-focus",
      "home-release",
      "home-breath",
      "journal-date",
      "journal-photo",
      "journal-voice",
      "journal-recent-action",
      "journal-reflections",
      "rituals-start",
      "rituals-save",
      "profile-settings",
      "profile-collections-action",
      "profile-evening-save-decoration",
      "profile-ocean-save-decoration",
      "profile-notifications-setting",
      "profile-reminder-setting"
    ],
    "ownerRuntimeDrift": [
      {
        "owner": "@ankhorage/surface",
        "path": "Button",
        "observed": "Button discards incoming style and owns text weight, padding, radius and intrinsic width.",
        "decision": "Use released large controls and rounded global tokens; reserve leading icon space in the label. Full-width screenshot buttons remain intrinsic width."
      },
      {
        "owner": "@ankhorage/zora",
        "path": "RadioGroup",
        "observed": "Four horizontal icon options squeeze labels at compact widths; responsive columns are not in manifest metadata.",
        "decision": "Use two columns with the exact semantic RadioGroup and local selection."
      },
      {
        "owner": "@ankhorage/zora",
        "path": "SettingsRow",
        "observed": "Metadata exposes title and meta but no trailing content slot.",
        "decision": "Keep SettingsRow; meta is below its title rather than trailing."
      },
      {
        "owner": "@ankhorage/zora",
        "path": "ProgressRing",
        "observed": "Released ring uses discrete segments.",
        "decision": "Keep the real accessible ProgressRing at 78 percent; do not replace it with an SVG progress imitation."
      },
      {
        "owner": "@ankhorage/navigator",
        "path": "HeadlessTabsLayout",
        "observed": "Built-in bottom presentation differs from the inset floating capsule in the screenshots.",
        "decision": "Use owner-generated bottom, rail and sidebar navigation with the same four routes."
      },
      {
        "owner": "@ankhorage/zora",
        "path": "theme and Heading",
        "observed": "Owner-derived neutral surface differs from warm cream reference; heading line breaks require web pre-line styling; React Native Web exposes header roles as h1 in this owner release.",
        "decision": "Keep owner light/dark compilation and Georgia as a documented approximation. Native font availability and heading outline need consumer review."
      },
      {
        "owner": "@ankhorage/contracts",
        "path": "actions",
        "observed": "Released template Actions do not describe audio sessions, attachments, autosave, bookmarks or notification scheduling.",
        "decision": "Keep unsupported controls visible and unbound. Journal is read-only sample content, labeled Sample reflection with its correct 33-word count."
      }
    ]
  },
  "tokens": {
    "light": {
      "mode": "light",
      "surfaceTheme": {
        "spacing": {
          "none": 0,
          "xs": 4,
          "s": 8,
          "m": 8,
          "l": 16,
          "xl": 14,
          "xxl": 48
        },
        "radii": {
          "none": 0,
          "s": 8,
          "m": 24,
          "l": 24,
          "full": 9999
        },
        "typography": {
          "headings": {
            "1": {
              "size": 32,
              "lineHeight": 40,
              "weight": "regular"
            },
            "2": {
              "size": 24,
              "lineHeight": 32,
              "weight": "regular"
            },
            "3": {
              "size": 20,
              "lineHeight": 28,
              "weight": "regular"
            },
            "4": {
              "size": 18,
              "lineHeight": 24,
              "weight": "semiBold"
            },
            "5": {
              "size": 16,
              "lineHeight": 22,
              "weight": "semiBold"
            },
            "6": {
              "size": 14,
              "lineHeight": 20,
              "weight": "semiBold"
            }
          },
          "sizes": {
            "xs": 12,
            "s": 14,
            "m": 16,
            "l": 18,
            "xl": 20,
            "xxl": 24,
            "3xl": 30,
            "h1": 32,
            "h2": 24,
            "h3": 20,
            "h4": 18,
            "h5": 16,
            "h6": 14
          },
          "weights": {
            "thin": "100",
            "extraLight": "200",
            "light": "300",
            "regular": "400",
            "medium": "500",
            "semiBold": "600",
            "bold": "700",
            "extraBold": "800",
            "black": "900"
          },
          "fonts": {
            "normal": {},
            "italic": {}
          }
        },
        "colors": {
          "primary": "#9274A8",
          "secondary": "#787db4",
          "accent": "#a56e92",
          "highlight": "#9274A8",
          "tertiary": "#a56e92",
          "quaternary": "#9274A8",
          "background": "#fcfafb",
          "surface": "#f6f4f5",
          "text": "#1a1819",
          "textSecondary": "#424041",
          "border": "#747173",
          "error": "#ef4444",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "info": "#3b82f6"
        },
        "semantics": {
          "neutral": {
            "bg": "#fcfafb",
            "bgSubtle": "#f6f4f5",
            "surface": "#f6f4f5",
            "surfaceHover": "#e9e7e8",
            "surfaceActive": "#d7d4d6",
            "border": "#e9e7e8",
            "borderStrong": "#d7d4d6",
            "divider": "#e9e7e8",
            "text": "#1a1819",
            "textMuted": "#424041",
            "textSubtle": "#565355",
            "disabledBg": "#e9e7e8",
            "disabledText": "#747173"
          },
          "brand": {
            "base": "#715784",
            "hover": "#5c436e",
            "strong": "#5c436e",
            "softBg": "#ffffff",
            "softHover": "#fff3ff",
            "softActive": "#f4dcff",
            "outline": "#715784",
            "onSurfaceText": "#5c436e",
            "onSolidText": "#FFFFFF",
            "onHoverText": "#FFFFFF",
            "onStrongText": "#FFFFFF",
            "onSoftText": "#000000",
            "onSoftHoverText": "#000000",
            "onSoftActiveText": "#000000",
            "disabledBg": "#e9e7e8",
            "onDisabledText": "#747173"
          },
          "secondary": {
            "base": "#787db4",
            "hover": "#5b5f8e",
            "strong": "#474b78",
            "softBg": "#ffffff",
            "softHover": "#f6f8ff",
            "softActive": "#dfe4ff",
            "outline": "#5b5f8e",
            "onSurfaceText": "#474b78",
            "onSolidText": "#000000",
            "onHoverText": "#FFFFFF",
            "onStrongText": "#FFFFFF",
            "onSoftText": "#000000",
            "onSoftHoverText": "#000000",
            "onSoftActiveText": "#000000",
            "disabledBg": "#e9e7e8",
            "onDisabledText": "#747173"
          },
          "accent": {
            "base": "#a56e92",
            "hover": "#815271",
            "strong": "#6b3e5c",
            "softBg": "#ffffff",
            "softHover": "#fff0ff",
            "softActive": "#ffd7f4",
            "outline": "#815271",
            "onSurfaceText": "#6b3e5c",
            "onSolidText": "#000000",
            "onHoverText": "#FFFFFF",
            "onStrongText": "#FFFFFF",
            "onSoftText": "#000000",
            "onSoftHoverText": "#000000",
            "onSoftActiveText": "#000000",
            "disabledBg": "#e9e7e8",
            "onDisabledText": "#747173"
          },
          "highlight": {
            "base": "#9274A8",
            "hover": "#715784",
            "strong": "#5c436e",
            "softBg": "#ffffff",
            "softHover": "#fff3ff",
            "softActive": "#f4dcff",
            "outline": "#715784",
            "onSurfaceText": "#5c436e",
            "onSolidText": "#000000",
            "onHoverText": "#FFFFFF",
            "onStrongText": "#FFFFFF",
            "onSoftText": "#000000",
            "onSoftHoverText": "#000000",
            "onSoftActiveText": "#000000",
            "disabledBg": "#e9e7e8",
            "onDisabledText": "#747173"
          },
          "danger": {
            "base": "#ef4444",
            "hover": "#c12a2e",
            "strong": "#a70017",
            "softBg": "#ffffff",
            "softHover": "#ffffff",
            "softActive": "#ffe7e2",
            "outline": "#c12a2e",
            "onSurfaceText": "#a70017",
            "onSolidText": "#000000",
            "onHoverText": "#FFFFFF",
            "onStrongText": "#FFFFFF",
            "onSoftText": "#000000",
            "onSoftHoverText": "#000000",
            "onSoftActiveText": "#000000",
            "disabledBg": "#e9e7e8",
            "onDisabledText": "#747173"
          },
          "success": {
            "base": "#22c55e",
            "hover": "#00a147",
            "strong": "#008a30",
            "softBg": "#ffffff",
            "softHover": "#ffffff",
            "softActive": "#ffffff",
            "outline": "#006b1d",
            "onSurfaceText": "#006b1d",
            "onSolidText": "#000000",
            "onHoverText": "#000000",
            "onStrongText": "#000000",
            "onSoftText": "#000000",
            "onSoftHoverText": "#000000",
            "onSoftActiveText": "#000000",
            "disabledBg": "#e9e7e8",
            "onDisabledText": "#747173"
          },
          "warning": {
            "base": "#f59e0b",
            "hover": "#cc8000",
            "strong": "#b36a00",
            "softBg": "#ffffff",
            "softHover": "#ffffff",
            "softActive": "#ffffff",
            "outline": "#8e5200",
            "onSurfaceText": "#754100",
            "onSolidText": "#000000",
            "onHoverText": "#000000",
            "onStrongText": "#000000",
            "onSoftText": "#000000",
            "onSoftHoverText": "#000000",
            "onSoftActiveText": "#000000",
            "disabledBg": "#e9e7e8",
            "onDisabledText": "#747173"
          },
          "error": {
            "base": "#ef4444",
            "hover": "#c12a2e",
            "strong": "#a70017",
            "softBg": "#ffffff",
            "softHover": "#ffffff",
            "softActive": "#ffe7e2",
            "outline": "#c12a2e",
            "onSurfaceText": "#a70017",
            "onSolidText": "#000000",
            "onHoverText": "#FFFFFF",
            "onStrongText": "#FFFFFF",
            "onSoftText": "#000000",
            "onSoftHoverText": "#000000",
            "onSoftActiveText": "#000000",
            "disabledBg": "#e9e7e8",
            "onDisabledText": "#747173"
          },
          "info": {
            "base": "#3b82f6",
            "hover": "#2563c7",
            "strong": "#0b4caf",
            "softBg": "#ffffff",
            "softHover": "#ffffff",
            "softActive": "#daeeff",
            "outline": "#2563c7",
            "onSurfaceText": "#0b4caf",
            "onSolidText": "#000000",
            "onHoverText": "#FFFFFF",
            "onStrongText": "#FFFFFF",
            "onSoftText": "#000000",
            "onSoftHoverText": "#000000",
            "onSoftActiveText": "#000000",
            "disabledBg": "#e9e7e8",
            "onDisabledText": "#747173"
          },
          "surface": {
            "default": "#f6f4f5",
            "subtle": "#fcfafb",
            "raised": "#fcfafb",
            "sunken": "#fcfafb",
            "overlay": "#fcfafb",
            "scrim": "#0000008f",
            "disabled": "#e9e7e8",
            "inverse": "#1a1819"
          },
          "content": {
            "default": "#1a1819",
            "muted": "#424041",
            "subtle": "#565355",
            "disabled": "#747173",
            "icon": "#1a1819",
            "link": "#5c436e",
            "visited": "#474b78",
            "inverse": "#fcfafb"
          },
          "border": {
            "default": "#747173",
            "subtle": "#e9e7e8",
            "strong": "#424041",
            "divider": "#e9e7e8",
            "focus": "#715784"
          },
          "selection": {
            "background": "#ffffff",
            "content": "#000000",
            "border": "#715784"
          },
          "action": {
            "primary": {
              "base": "#715784",
              "hover": "#5c436e",
              "strong": "#5c436e",
              "softBg": "#ffffff",
              "softHover": "#fff3ff",
              "softActive": "#f4dcff",
              "outline": "#715784",
              "onSurfaceText": "#5c436e",
              "onSolidText": "#FFFFFF",
              "onHoverText": "#FFFFFF",
              "onStrongText": "#FFFFFF",
              "onSoftText": "#000000",
              "onSoftHoverText": "#000000",
              "onSoftActiveText": "#000000",
              "disabledBg": "#e9e7e8",
              "onDisabledText": "#747173"
            },
            "neutral": {
              "base": "#747173",
              "hover": "#565355",
              "strong": "#424041",
              "softBg": "#f6f4f5",
              "softHover": "#e9e7e8",
              "softActive": "#d7d4d6",
              "outline": "#747173",
              "onSurfaceText": "#565355",
              "onSolidText": "#FFFFFF",
              "onHoverText": "#FFFFFF",
              "onStrongText": "#FFFFFF",
              "onSoftText": "#000000",
              "onSoftHoverText": "#000000",
              "onSoftActiveText": "#000000",
              "disabledBg": "#e9e7e8",
              "onDisabledText": "#747173"
            },
            "danger": {
              "base": "#ef4444",
              "hover": "#c12a2e",
              "strong": "#a70017",
              "softBg": "#ffffff",
              "softHover": "#ffffff",
              "softActive": "#ffe7e2",
              "outline": "#c12a2e",
              "onSurfaceText": "#a70017",
              "onSolidText": "#000000",
              "onHoverText": "#FFFFFF",
              "onStrongText": "#FFFFFF",
              "onSoftText": "#000000",
              "onSoftHoverText": "#000000",
              "onSoftActiveText": "#000000",
              "disabledBg": "#e9e7e8",
              "onDisabledText": "#747173"
            }
          }
        }
      }
    },
    "dark": {
      "mode": "dark",
      "surfaceTheme": {
        "spacing": {
          "none": 0,
          "xs": 4,
          "s": 8,
          "m": 8,
          "l": 16,
          "xl": 14,
          "xxl": 48
        },
        "radii": {
          "none": 0,
          "s": 8,
          "m": 24,
          "l": 24,
          "full": 9999
        },
        "typography": {
          "headings": {
            "1": {
              "size": 32,
              "lineHeight": 40,
              "weight": "regular"
            },
            "2": {
              "size": 24,
              "lineHeight": 32,
              "weight": "regular"
            },
            "3": {
              "size": 20,
              "lineHeight": 28,
              "weight": "regular"
            },
            "4": {
              "size": 18,
              "lineHeight": 24,
              "weight": "semiBold"
            },
            "5": {
              "size": 16,
              "lineHeight": 22,
              "weight": "semiBold"
            },
            "6": {
              "size": 14,
              "lineHeight": 20,
              "weight": "semiBold"
            }
          },
          "sizes": {
            "xs": 12,
            "s": 14,
            "m": 16,
            "l": 18,
            "xl": 20,
            "xxl": 24,
            "3xl": 30,
            "h1": 32,
            "h2": 24,
            "h3": 20,
            "h4": 18,
            "h5": 16,
            "h6": 14
          },
          "weights": {
            "thin": "100",
            "extraLight": "200",
            "light": "300",
            "regular": "400",
            "medium": "500",
            "semiBold": "600",
            "bold": "700",
            "extraBold": "800",
            "black": "900"
          },
          "fonts": {
            "normal": {},
            "italic": {}
          }
        },
        "colors": {
          "primary": "#C8B1D8",
          "secondary": "#b4b7e2",
          "accent": "#d7adc7",
          "highlight": "#C8B1D8",
          "tertiary": "#d7adc7",
          "quaternary": "#C8B1D8",
          "background": "#080707",
          "surface": "#1a1818",
          "text": "#fcfafa",
          "textSecondary": "#e9e7e7",
          "border": "#a2a0a1",
          "error": "#ef4444",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "info": "#3b82f6"
        },
        "semantics": {
          "neutral": {
            "bg": "#080707",
            "bgSubtle": "#1a1818",
            "surface": "#1a1818",
            "surfaceHover": "#2a2829",
            "surfaceActive": "#424041",
            "border": "#2a2829",
            "borderStrong": "#565354",
            "divider": "#2a2829",
            "text": "#fcfafa",
            "textMuted": "#e9e7e7",
            "textSubtle": "#d7d4d5",
            "disabledBg": "#2a2829",
            "disabledText": "#747172"
          },
          "brand": {
            "base": "#f8e6ff",
            "hover": "#ffffff",
            "strong": "#ffffff",
            "softBg": "#5e4e69",
            "softHover": "#72617d",
            "softActive": "#8f7c9d",
            "outline": "#8f7c9d",
            "onSurfaceText": "#C8B1D8",
            "onSolidText": "#000000",
            "onHoverText": "#000000",
            "onStrongText": "#000000",
            "onSoftText": "#FFFFFF",
            "onSoftHoverText": "#FFFFFF",
            "onSoftActiveText": "#000000",
            "disabledBg": "#2a2829",
            "onDisabledText": "#747172"
          },
          "secondary": {
            "base": "#b4b7e2",
            "hover": "#e8ebff",
            "strong": "#ffffff",
            "softBg": "#515270",
            "softHover": "#646584",
            "softActive": "#7e81a5",
            "outline": "#7e81a5",
            "onSurfaceText": "#b4b7e2",
            "onSolidText": "#000000",
            "onHoverText": "#000000",
            "onStrongText": "#000000",
            "onSoftText": "#FFFFFF",
            "onSoftHoverText": "#FFFFFF",
            "onSoftActiveText": "#000000",
            "disabledBg": "#2a2829",
            "onDisabledText": "#747172"
          },
          "accent": {
            "base": "#d7adc7",
            "hover": "#ffe3f7",
            "strong": "#ffffff",
            "softBg": "#684b5e",
            "softHover": "#7c5e71",
            "softActive": "#9c788e",
            "outline": "#9c788e",
            "onSurfaceText": "#d7adc7",
            "onSolidText": "#000000",
            "onHoverText": "#000000",
            "onStrongText": "#000000",
            "onSoftText": "#FFFFFF",
            "onSoftHoverText": "#FFFFFF",
            "onSoftActiveText": "#000000",
            "disabledBg": "#2a2829",
            "onDisabledText": "#747172"
          },
          "highlight": {
            "base": "#C8B1D8",
            "hover": "#f8e6ff",
            "strong": "#ffffff",
            "softBg": "#5e4e69",
            "softHover": "#72617d",
            "softActive": "#8f7c9d",
            "outline": "#8f7c9d",
            "onSurfaceText": "#C8B1D8",
            "onSolidText": "#000000",
            "onHoverText": "#000000",
            "onStrongText": "#000000",
            "onSoftText": "#FFFFFF",
            "onSoftHoverText": "#FFFFFF",
            "onSoftActiveText": "#000000",
            "disabledBg": "#2a2829",
            "onDisabledText": "#747172"
          },
          "danger": {
            "base": "#ef4444",
            "hover": "#ff948c",
            "strong": "#ffe7e2",
            "softBg": "#610000",
            "softHover": "#800002",
            "softActive": "#a70017",
            "outline": "#ef4444",
            "onSurfaceText": "#ff948c",
            "onSolidText": "#000000",
            "onHoverText": "#000000",
            "onStrongText": "#000000",
            "onSoftText": "#FFFFFF",
            "onSoftHoverText": "#FFFFFF",
            "onSoftActiveText": "#FFFFFF",
            "disabledBg": "#2a2829",
            "onDisabledText": "#747172"
          },
          "success": {
            "base": "#22c55e",
            "hover": "#8ef2a3",
            "strong": "#ffffff",
            "softBg": "#005510",
            "softHover": "#006b1d",
            "softActive": "#008a30",
            "outline": "#00a147",
            "onSurfaceText": "#22c55e",
            "onSolidText": "#000000",
            "onHoverText": "#000000",
            "onStrongText": "#000000",
            "onSoftText": "#FFFFFF",
            "onSoftHoverText": "#FFFFFF",
            "onSoftActiveText": "#000000",
            "disabledBg": "#2a2829",
            "onDisabledText": "#747172"
          },
          "warning": {
            "base": "#f59e0b",
            "hover": "#ffdca5",
            "strong": "#ffffff",
            "softBg": "#754100",
            "softHover": "#8e5200",
            "softActive": "#b36a00",
            "outline": "#cc8000",
            "onSurfaceText": "#f59e0b",
            "onSolidText": "#000000",
            "onHoverText": "#000000",
            "onStrongText": "#000000",
            "onSoftText": "#FFFFFF",
            "onSoftHoverText": "#FFFFFF",
            "onSoftActiveText": "#000000",
            "disabledBg": "#2a2829",
            "onDisabledText": "#747172"
          },
          "error": {
            "base": "#ef4444",
            "hover": "#ff948c",
            "strong": "#ffe7e2",
            "softBg": "#610000",
            "softHover": "#800002",
            "softActive": "#a70017",
            "outline": "#ef4444",
            "onSurfaceText": "#ff948c",
            "onSolidText": "#000000",
            "onHoverText": "#000000",
            "onStrongText": "#000000",
            "onSoftText": "#FFFFFF",
            "onSoftHoverText": "#FFFFFF",
            "onSoftActiveText": "#FFFFFF",
            "disabledBg": "#2a2829",
            "onDisabledText": "#747172"
          },
          "info": {
            "base": "#3b82f6",
            "hover": "#83b7ff",
            "strong": "#daeeff",
            "softBg": "#001d71",
            "softHover": "#003287",
            "softActive": "#0b4caf",
            "outline": "#3b82f6",
            "onSurfaceText": "#83b7ff",
            "onSolidText": "#000000",
            "onHoverText": "#000000",
            "onStrongText": "#000000",
            "onSoftText": "#FFFFFF",
            "onSoftHoverText": "#FFFFFF",
            "onSoftActiveText": "#FFFFFF",
            "disabledBg": "#2a2829",
            "onDisabledText": "#747172"
          },
          "surface": {
            "default": "#1a1818",
            "subtle": "#080707",
            "raised": "#1a1818",
            "sunken": "#080707",
            "overlay": "#1a1818",
            "scrim": "#0000008f",
            "disabled": "#2a2829",
            "inverse": "#fcfafa"
          },
          "content": {
            "default": "#fcfafa",
            "muted": "#e9e7e7",
            "subtle": "#d7d4d5",
            "disabled": "#747172",
            "icon": "#fcfafa",
            "link": "#C8B1D8",
            "visited": "#b4b7e2",
            "inverse": "#1a1818"
          },
          "border": {
            "default": "#a2a0a1",
            "subtle": "#2a2829",
            "strong": "#d7d4d5",
            "divider": "#2a2829",
            "focus": "#8f7c9d"
          },
          "selection": {
            "background": "#5e4e69",
            "content": "#FFFFFF",
            "border": "#8f7c9d"
          },
          "action": {
            "primary": {
              "base": "#f8e6ff",
              "hover": "#ffffff",
              "strong": "#ffffff",
              "softBg": "#5e4e69",
              "softHover": "#72617d",
              "softActive": "#8f7c9d",
              "outline": "#8f7c9d",
              "onSurfaceText": "#C8B1D8",
              "onSolidText": "#000000",
              "onHoverText": "#000000",
              "onStrongText": "#000000",
              "onSoftText": "#FFFFFF",
              "onSoftHoverText": "#FFFFFF",
              "onSoftActiveText": "#000000",
              "disabledBg": "#2a2829",
              "onDisabledText": "#747172"
            },
            "neutral": {
              "base": "#747172",
              "hover": "#a2a0a1",
              "strong": "#d7d4d5",
              "softBg": "#1a1818",
              "softHover": "#2a2829",
              "softActive": "#424041",
              "outline": "#a2a0a1",
              "onSurfaceText": "#a2a0a1",
              "onSolidText": "#FFFFFF",
              "onHoverText": "#000000",
              "onStrongText": "#000000",
              "onSoftText": "#FFFFFF",
              "onSoftHoverText": "#FFFFFF",
              "onSoftActiveText": "#FFFFFF",
              "disabledBg": "#2a2829",
              "onDisabledText": "#747172"
            },
            "danger": {
              "base": "#ef4444",
              "hover": "#ff948c",
              "strong": "#ffe7e2",
              "softBg": "#610000",
              "softHover": "#800002",
              "softActive": "#a70017",
              "outline": "#ef4444",
              "onSurfaceText": "#ff948c",
              "onSolidText": "#000000",
              "onHoverText": "#000000",
              "onStrongText": "#000000",
              "onSoftText": "#FFFFFF",
              "onSoftHoverText": "#FFFFFF",
              "onSoftActiveText": "#FFFFFF",
              "disabledBg": "#2a2829",
              "onDisabledText": "#747172"
            }
          }
        }
      }
    }
  },
  "components": {
    "recipeDecisions": {
      "mood": "RadioGroup",
      "progress": "ProgressRing",
      "preferences": "SettingsRow",
      "theme": "ThemeModeToggle",
      "media": "Box + Image; Avatar and MediaCard are not direct manifest nodes"
    },
    "stateRequirements": [
      "selected mood",
      "light/dark theme",
      "scrollable narrow content",
      "stable route identity across responsive presentations"
    ],
    "unbound": [
      "home-save",
      "home-today-action",
      "home-explore-action",
      "home-sleep",
      "home-focus",
      "home-release",
      "home-breath",
      "journal-date",
      "journal-photo",
      "journal-voice",
      "journal-recent-action",
      "journal-reflections",
      "rituals-start",
      "rituals-save",
      "profile-settings",
      "profile-collections-action",
      "profile-evening-save-decoration",
      "profile-ocean-save-decoration",
      "profile-notifications-setting",
      "profile-reminder-setting"
    ]
  },
  "screens": [
    {
      "id": "stillpath-home",
      "order": 1,
      "purpose": "Choose a daily ritual or mood check-in",
      "evidence": "assets/screens/01-Home.png",
      "recognition": {
        "confidence": 0.06871559633027523,
        "diagnosticCount": 98,
        "evidencePath": "../../../../../artifacts/stillpath/recognition/home.json"
      },
      "runtimeEvidence": "../../../../../artifacts/stillpath/runtime/home-compact.png"
    },
    {
      "id": "stillpath-journal",
      "order": 2,
      "purpose": "Review a sample reflection and select a mood",
      "evidence": "assets/screens/02-Journal.png",
      "recognition": {
        "confidence": 0.11026315789473685,
        "diagnosticCount": 33,
        "evidencePath": "../../../../../artifacts/stillpath/recognition/journal.json"
      },
      "runtimeEvidence": "../../../../../artifacts/stillpath/runtime/journal-compact.png"
    },
    {
      "id": "stillpath-rituals",
      "order": 3,
      "purpose": "Review the four steps of Morning Grounding",
      "evidence": "assets/screens/03-Rituals.png",
      "recognition": {
        "confidence": 0.04897058823529412,
        "diagnosticCount": 63,
        "evidencePath": "../../../../../artifacts/stillpath/recognition/rituals.json"
      },
      "runtimeEvidence": "../../../../../artifacts/stillpath/runtime/rituals-compact.png"
    },
    {
      "id": "stillpath-profile",
      "order": 4,
      "purpose": "Review weekly practice and preferences",
      "evidence": "assets/screens/04-Profile.png",
      "recognition": {
        "confidence": 0.10464285714285713,
        "diagnosticCount": 48,
        "evidencePath": "../../../../../artifacts/stillpath/recognition/profile.json"
      },
      "runtimeEvidence": "../../../../../artifacts/stillpath/runtime/profile-compact.png"
    }
  ],
  "assets": {
    "bundlePath": "design-assets.json",
    "status": "complete",
    "entries": [
      {
        "id": "home",
        "role": "icon",
        "path": "assets/images/svg/home.svg",
        "usages": [
          "/navigator/routes/0/icon/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "journal",
        "role": "icon",
        "path": "assets/images/svg/journal.svg",
        "usages": [
          "/navigator/routes/1/icon/source",
          "/screens/stillpath-profile/root/children/0/children/2/children/0/children/1/children/4/children/0/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "rituals",
        "role": "icon",
        "path": "assets/images/svg/rituals.svg",
        "usages": [
          "/navigator/routes/2/icon/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "profile",
        "role": "icon",
        "path": "assets/images/svg/profile.svg",
        "usages": [
          "/navigator/routes/3/icon/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "sun",
        "role": "icon",
        "path": "assets/images/svg/sun.svg",
        "usages": [
          "/screens/stillpath-home/root/children/0/children/0/children/1/props/source",
          "/screens/stillpath-journal/root/children/0/children/0/children/1/props/source",
          "/screens/stillpath-rituals/root/children/0/children/0/children/2/props/source",
          "/screens/stillpath-profile/root/children/0/children/0/children/1/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "fabio",
        "role": "image",
        "path": "assets/images/fabio.png",
        "usages": [
          "/screens/stillpath-home/root/children/0/children/0/children/3/props/source",
          "/screens/stillpath-journal/root/children/0/children/0/children/3/props/source",
          "/screens/stillpath-rituals/root/children/0/children/0/children/4/props/source",
          "/screens/stillpath-profile/root/children/0/children/1/children/0/props/source"
        ],
        "dimensions": {
          "width": 1254,
          "height": 1254
        },
        "provenance": "Generated with built-in image_gen",
        "generationPrompt": "Standalone Stillpath application photo asset. Friendly adult man with curly dark hair, warm medium olive skin, short beard, brown eyes and gentle smile, black linen collar shirt. Centered head-and-shoulders portrait, beige background, soft daylight. Square 1024x1024. Natural realistic editorial wellness photography, tactile surfaces, muted cream/beige/sage palette where applicable. Full bleed photograph only; no typography, logos, icons, controls, UI, borders, rounded corners or watermark.",
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "sprig",
        "role": "icon",
        "path": "assets/images/svg/sprig.svg",
        "usages": [
          "/screens/stillpath-home/root/children/0/children/1/children/0/children/0/props/source",
          "/screens/stillpath-home/root/children/0/children/2/children/1/children/3/children/0/children/1/children/0/props/source",
          "/screens/stillpath-journal/root/children/0/children/1/children/0/children/0/children/0/props/source",
          "/screens/stillpath-journal/root/children/0/children/4/children/0/children/0/props/source",
          "/screens/stillpath-journal/root/children/0/children/5/children/1/children/0/props/source",
          "/screens/stillpath-rituals/root/children/0/children/1/children/0/children/0/props/source",
          "/screens/stillpath-rituals/root/children/0/children/6/children/1/props/source",
          "/screens/stillpath-rituals/root/children/0/children/10/children/1/children/0/props/source",
          "/screens/stillpath-profile/root/children/0/children/2/children/0/children/0/children/1/children/2/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "home-hero",
        "role": "image",
        "path": "assets/images/home-hero.png",
        "usages": [
          "/screens/stillpath-home/root/children/0/children/2/children/0/props/source"
        ],
        "dimensions": {
          "width": 1536,
          "height": 1024
        },
        "provenance": "Generated with built-in image_gen",
        "generationPrompt": "Standalone Stillpath application photo asset. Warm creamy sunrise above a winding alpine lake. Curly dark-haired man seen from behind meditates cross-legged on a ledge at right, wearing oatmeal linen and olive trousers. Leave the left half quiet for dark overlay copy. Landscape 1536x1024. Natural realistic editorial wellness photography, tactile surfaces, muted cream/beige/sage palette where applicable. Full bleed photograph only; no typography, logos, icons, controls, UI, borders, rounded corners or watermark.",
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "bookmark",
        "role": "icon",
        "path": "assets/images/svg/bookmark.svg",
        "usages": [
          "/screens/stillpath-home/root/children/0/children/2/children/1/children/3/children/1/children/1/children/0/props/source",
          "/screens/stillpath-rituals/root/children/0/children/11/children/1/children/0/props/source",
          "/screens/stillpath-profile/root/children/0/children/4/children/0/children/1/children/2/children/0/props/source",
          "/screens/stillpath-profile/root/children/0/children/4/children/1/children/1/children/2/children/0/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "mood",
        "role": "image",
        "path": "assets/images/mood.png",
        "usages": [
          "/screens/stillpath-home/root/children/0/children/4/children/0/children/0/props/source"
        ],
        "dimensions": {
          "width": 1254,
          "height": 1254
        },
        "provenance": "Generated with built-in image_gen",
        "generationPrompt": "Standalone Stillpath application photo asset. Rustic beige ceramic mug at lower right on stone coaster and oatmeal linen, cream vase with dried tiny flowers at far right, warm ivory plaster wall. Uncluttered left half for text. Square 1024x1024. Natural realistic editorial wellness photography, tactile surfaces, muted cream/beige/sage palette where applicable. Full bleed photograph only; no typography, logos, icons, controls, UI, borders, rounded corners or watermark.",
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "smile",
        "role": "icon",
        "path": "assets/images/svg/smile.svg",
        "usages": [
          "/screens/stillpath-home/root/children/0/children/4/children/0/children/1/children/0/children/0/props/source",
          "/screens/stillpath-journal/root/children/0/children/3/props/options/0/iconSource"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "clock",
        "role": "icon",
        "path": "assets/images/svg/clock.svg",
        "usages": [
          "/screens/stillpath-home/root/children/0/children/4/children/0/children/1/children/3/children/0/props/source",
          "/screens/stillpath-home/root/children/0/children/4/children/1/children/1/children/3/children/0/props/source",
          "/screens/stillpath-rituals/root/children/0/children/4/children/0/children/0/props/source",
          "/screens/stillpath-profile/root/children/0/children/2/children/0/children/1/children/3/children/0/props/source",
          "/screens/stillpath-profile/root/children/0/children/6/children/2/children/0/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "breath",
        "role": "image",
        "path": "assets/images/breath.png",
        "usages": [
          "/screens/stillpath-home/root/children/0/children/4/children/1/children/0/props/source"
        ],
        "dimensions": {
          "width": 1254,
          "height": 1254
        },
        "provenance": "Generated with built-in image_gen",
        "generationPrompt": "Standalone Stillpath application photo asset. Two smooth gray and sand-colored river stones at lower right on pale limestone; olive branches hang from upper right over softly blurred pale sage and ivory background. Uncluttered light left half. Square 1024x1024. Natural realistic editorial wellness photography, tactile surfaces, muted cream/beige/sage palette where applicable. Full bleed photograph only; no typography, logos, icons, controls, UI, borders, rounded corners or watermark.",
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "wind",
        "role": "icon",
        "path": "assets/images/svg/wind.svg",
        "usages": [
          "/screens/stillpath-home/root/children/0/children/4/children/1/children/1/children/0/children/0/props/source",
          "/screens/stillpath-rituals/root/children/0/children/7/children/1/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "sleep",
        "role": "image",
        "path": "assets/images/sleep.png",
        "usages": [
          "/screens/stillpath-home/root/children/0/children/6/children/0/children/0/children/0/props/source"
        ],
        "dimensions": {
          "width": 1536,
          "height": 1024
        },
        "provenance": "Generated with built-in image_gen",
        "generationPrompt": "Standalone Stillpath application photo asset. Deep navy star-filled night sky, slender crescent moon near center, jagged alpine silhouettes along bottom quarter. Restrained natural astrophotography. Landscape 1536x1024. Natural realistic editorial wellness photography, tactile surfaces, muted cream/beige/sage palette where applicable. Full bleed photograph only; no typography, logos, icons, controls, UI, borders, rounded corners or watermark.",
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "moon",
        "role": "icon",
        "path": "assets/images/svg/moon.svg",
        "usages": [
          "/screens/stillpath-home/root/children/0/children/6/children/0/children/0/children/1/children/0/props/source",
          "/screens/stillpath-profile/root/children/0/children/4/children/0/children/0/children/1/children/0/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "focus",
        "role": "image",
        "path": "assets/images/focus.png",
        "usages": [
          "/screens/stillpath-home/root/children/0/children/6/children/1/children/0/children/0/props/source"
        ],
        "dimensions": {
          "width": 1536,
          "height": 1024
        },
        "provenance": "Generated with built-in image_gen",
        "generationPrompt": "Standalone Stillpath application photo asset. Morning light on a wooden desk, open blank cream notebook, black fountain pen diagonally on left page, beige ceramic mug at right, blurred olive plant behind. Landscape 1536x1024. Natural realistic editorial wellness photography, tactile surfaces, muted cream/beige/sage palette where applicable. Full bleed photograph only; no typography, logos, icons, controls, UI, borders, rounded corners or watermark.",
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "target",
        "role": "icon",
        "path": "assets/images/svg/target.svg",
        "usages": [
          "/screens/stillpath-home/root/children/0/children/6/children/1/children/0/children/1/children/0/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "ocean-release",
        "role": "image",
        "path": "assets/images/ocean-release.png",
        "usages": [
          "/screens/stillpath-home/root/children/0/children/6/children/2/children/0/children/0/props/source",
          "/screens/stillpath-profile/root/children/0/children/4/children/1/children/0/children/0/props/source"
        ],
        "dimensions": {
          "width": 1536,
          "height": 1024
        },
        "provenance": "Generated with built-in image_gen",
        "generationPrompt": "Standalone Stillpath application photo asset. Rocky ocean shoreline at pastel peach sunset, soft waves between weathered dark rocks, receding coastline at left, open sea at right, thin clouds. Reuse for Release and Ocean release. Landscape 1536x1024. Natural realistic editorial wellness photography, tactile surfaces, muted cream/beige/sage palette where applicable. Full bleed photograph only; no typography, logos, icons, controls, UI, borders, rounded corners or watermark.",
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "leaf",
        "role": "icon",
        "path": "assets/images/svg/leaf.svg",
        "usages": [
          "/screens/stillpath-home/root/children/0/children/6/children/2/children/0/children/1/children/0/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "calendar",
        "role": "icon",
        "path": "assets/images/svg/calendar.svg",
        "usages": [
          "/screens/stillpath-journal/root/children/0/children/1/children/1/children/1/children/0/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "cloud",
        "role": "icon",
        "path": "assets/images/svg/cloud.svg",
        "usages": [
          "/screens/stillpath-journal/root/children/0/children/3/props/options/1/iconSource"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "heart",
        "role": "icon",
        "path": "assets/images/svg/heart.svg",
        "usages": [
          "/screens/stillpath-journal/root/children/0/children/3/props/options/2/iconSource",
          "/screens/stillpath-rituals/root/children/0/children/8/children/1/props/source",
          "/screens/stillpath-profile/root/children/0/children/7/children/1/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "waves",
        "role": "icon",
        "path": "assets/images/svg/waves.svg",
        "usages": [
          "/screens/stillpath-journal/root/children/0/children/3/props/options/3/iconSource",
          "/screens/stillpath-profile/root/children/0/children/4/children/1/children/0/children/1/children/0/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "photo",
        "role": "icon",
        "path": "assets/images/svg/photo.svg",
        "usages": [
          "/screens/stillpath-journal/root/children/0/children/6/children/0/children/1/children/0/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "microphone",
        "role": "icon",
        "path": "assets/images/svg/microphone.svg",
        "usages": [
          "/screens/stillpath-journal/root/children/0/children/6/children/1/children/1/children/0/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "reflection-rest",
        "role": "image",
        "path": "assets/images/reflection-rest.png",
        "usages": [
          "/screens/stillpath-journal/root/children/0/children/8/children/0/props/source"
        ],
        "dimensions": {
          "width": 1536,
          "height": 1024
        },
        "provenance": "Generated with built-in image_gen",
        "generationPrompt": "Standalone Stillpath application photo asset. Centered rustic beige speckled mug on a rumpled cream knitted blanket near a bright window, blurred olive plant at far right, intimate calm morning still life. Landscape 1536x1024. Natural realistic editorial wellness photography, tactile surfaces, muted cream/beige/sage palette where applicable. Full bleed photograph only; no typography, logos, icons, controls, UI, borders, rounded corners or watermark.",
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "chevron-right",
        "role": "icon",
        "path": "assets/images/svg/chevron-right.svg",
        "usages": [
          "/screens/stillpath-journal/root/children/0/children/8/children/3/props/source",
          "/screens/stillpath-journal/root/children/0/children/9/children/3/props/source",
          "/screens/stillpath-journal/root/children/0/children/10/children/3/props/source",
          "/screens/stillpath-profile/root/children/0/children/6/children/1/children/2/props/source",
          "/screens/stillpath-profile/root/children/0/children/6/children/2/children/2/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "reflection-mountains",
        "role": "image",
        "path": "assets/images/reflection-mountains.png",
        "usages": [
          "/screens/stillpath-journal/root/children/0/children/9/children/0/props/source"
        ],
        "dimensions": {
          "width": 1536,
          "height": 1024
        },
        "provenance": "Generated with built-in image_gen",
        "generationPrompt": "Standalone Stillpath application photo asset. Quiet alpine valley from a high footpath, dark green slopes at both sides, layered distant peaks beneath peach sunrise and atmospheric haze, no people or buildings. Landscape 1536x1024. Natural realistic editorial wellness photography, tactile surfaces, muted cream/beige/sage palette where applicable. Full bleed photograph only; no typography, logos, icons, controls, UI, borders, rounded corners or watermark.",
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "reflection-stones",
        "role": "image",
        "path": "assets/images/reflection-stones.png",
        "usages": [
          "/screens/stillpath-journal/root/children/0/children/10/children/0/props/source"
        ],
        "dimensions": {
          "width": 1536,
          "height": 1024
        },
        "provenance": "Generated with built-in image_gen",
        "generationPrompt": "Standalone Stillpath application photo asset. Three balanced smooth gray river stones centered on a rough sunlit rock, softly blurred olive leaves and green garden behind, warm late-afternoon light. Landscape 1536x1024. Natural realistic editorial wellness photography, tactile surfaces, muted cream/beige/sage palette where applicable. Full bleed photograph only; no typography, logos, icons, controls, UI, borders, rounded corners or watermark.",
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "ritual-hero",
        "role": "image",
        "path": "assets/images/ritual-hero.png",
        "usages": [
          "/screens/stillpath-rituals/root/children/0/children/2/children/0/props/source"
        ],
        "dimensions": {
          "width": 1536,
          "height": 1024
        },
        "provenance": "Generated with built-in image_gen",
        "generationPrompt": "Standalone Stillpath application photo asset. Golden sunrise above an alpine lake. Open blank cream journal at bottom left, rustic beige mug at bottom center, oatmeal blanket at lower right, dried wildflowers at far right. Empty darker valley at left for white title. Landscape 1536x1024. Natural realistic editorial wellness photography, tactile surfaces, muted cream/beige/sage palette where applicable. Full bleed photograph only; no typography, logos, icons, controls, UI, borders, rounded corners or watermark.",
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "level",
        "role": "icon",
        "path": "assets/images/svg/level.svg",
        "usages": [
          "/screens/stillpath-rituals/root/children/0/children/4/children/1/children/0/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "headphones",
        "role": "icon",
        "path": "assets/images/svg/headphones.svg",
        "usages": [
          "/screens/stillpath-rituals/root/children/0/children/4/children/2/children/0/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "sunrise",
        "role": "icon",
        "path": "assets/images/svg/sunrise.svg",
        "usages": [
          "/screens/stillpath-rituals/root/children/0/children/9/children/1/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "settings",
        "role": "icon",
        "path": "assets/images/svg/settings.svg",
        "usages": [
          "/screens/stillpath-profile/root/children/0/children/0/children/3/children/0/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "flame",
        "role": "icon",
        "path": "assets/images/svg/flame.svg",
        "usages": [
          "/screens/stillpath-profile/root/children/0/children/2/children/0/children/1/children/2/children/0/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "evening-reset",
        "role": "image",
        "path": "assets/images/evening-reset.png",
        "usages": [
          "/screens/stillpath-profile/root/children/0/children/4/children/0/children/0/children/0/props/source"
        ],
        "dimensions": {
          "width": 1536,
          "height": 1024
        },
        "provenance": "Generated with built-in image_gen",
        "generationPrompt": "Standalone Stillpath application photo asset. Lit candle in a rustic cream ceramic cup on rumpled oatmeal linen, slender cream vase with dried wildflowers behind at right, softly blurred mountain hills at dusk. Landscape 1536x1024. Natural realistic editorial wellness photography, tactile surfaces, muted cream/beige/sage palette where applicable. Full bleed photograph only; no typography, logos, icons, controls, UI, borders, rounded corners or watermark.",
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "palette",
        "role": "icon",
        "path": "assets/images/svg/palette.svg",
        "usages": [
          "/screens/stillpath-profile/root/children/0/children/6/children/0/children/0/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      },
      {
        "id": "bell",
        "role": "icon",
        "path": "assets/images/svg/bell.svg",
        "usages": [
          "/screens/stillpath-profile/root/children/0/children/6/children/1/children/0/props/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original standalone SVG vector geometry",
        "generationPrompt": null,
        "visualReview": "Inspected independently and rendered through Runtime media resolution"
      }
    ]
  },
  "validation": {
    "scope": "composition",
    "status": "pass-with-non-blocking-gaps",
    "applicationGate": "pass-with-non-blocking-gaps",
    "gates": [
      {
        "id": "recognition",
        "status": "pass",
        "evidence": "All four deterministic analyses retained with confidence, alternatives and diagnostics. Low confidence required semantic refinement."
      },
      {
        "id": "owner-composition",
        "status": "pass",
        "evidence": "Light and dark compiled independently; complete template release validation and metadata node/prop/child checks pass."
      },
      {
        "id": "asset-bundle",
        "status": "pass",
        "evidence": "12 generated photos and 27 authored SVG files, decoded and reference-checked."
      },
      {
        "id": "navigator",
        "status": "pass",
        "evidence": "Nine platform/size generation cases and all bound route targets pass."
      },
      {
        "id": "web-runtime",
        "status": "pass",
        "evidence": "Real Expo Router 57.0.18, Navigator 3.2.2, ZORA 4.5.0 and Runtime 2.2.9. Images load; bottom/rail/sidebar render with no horizontal page overflow."
      },
      {
        "id": "visual-fidelity",
        "status": "pass",
        "evidence": "Approximation reviewed; user explicitly accepted documented component differences. Pixel identity is not claimed."
      },
      {
        "id": "native-runtime",
        "status": "not-assessable",
        "evidence": "iOS/Android plans checked; no native device rendering performed."
      }
    ],
    "ownerRuntimeDrift": [
      {
        "owner": "@ankhorage/surface",
        "path": "Button",
        "observed": "Button discards incoming style and owns text weight, padding, radius and intrinsic width.",
        "decision": "Use released large controls and rounded global tokens; reserve leading icon space in the label. Full-width screenshot buttons remain intrinsic width."
      },
      {
        "owner": "@ankhorage/zora",
        "path": "RadioGroup",
        "observed": "Four horizontal icon options squeeze labels at compact widths; responsive columns are not in manifest metadata.",
        "decision": "Use two columns with the exact semantic RadioGroup and local selection."
      },
      {
        "owner": "@ankhorage/zora",
        "path": "SettingsRow",
        "observed": "Metadata exposes title and meta but no trailing content slot.",
        "decision": "Keep SettingsRow; meta is below its title rather than trailing."
      },
      {
        "owner": "@ankhorage/zora",
        "path": "ProgressRing",
        "observed": "Released ring uses discrete segments.",
        "decision": "Keep the real accessible ProgressRing at 78 percent; do not replace it with an SVG progress imitation."
      },
      {
        "owner": "@ankhorage/navigator",
        "path": "HeadlessTabsLayout",
        "observed": "Built-in bottom presentation differs from the inset floating capsule in the screenshots.",
        "decision": "Use owner-generated bottom, rail and sidebar navigation with the same four routes."
      },
      {
        "owner": "@ankhorage/zora",
        "path": "theme and Heading",
        "observed": "Owner-derived neutral surface differs from warm cream reference; heading line breaks require web pre-line styling; React Native Web exposes header roles as h1 in this owner release.",
        "decision": "Keep owner light/dark compilation and Georgia as a documented approximation. Native font availability and heading outline need consumer review."
      },
      {
        "owner": "@ankhorage/contracts",
        "path": "actions",
        "observed": "Released template Actions do not describe audio sessions, attachments, autosave, bookmarks or notification scheduling.",
        "decision": "Keep unsupported controls visible and unbound. Journal is read-only sample content, labeled Sample reflection with its correct 33-word count."
      }
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

A calm, photo-led mindfulness app with lavender accents, serif titles, reflection and simple daily practice. All four supplied screens are implemented with released ZORA components.

## Resolved decisions and origins

The user selected Stillpath first and explicitly accepted finishing with documented owner-component differences. The supplied screen content controls the visual hierarchy; the existing template supplies its category and lavender theme seeds.

## Color system

Light and dark are independently compiled by the installed owners. Owner-generated neutral surfaces and action colors differ from the exact warm reference palette. Photos use their own warm editorial lighting.

## Typography

Georgia approximates the reference serif. Body copy uses the consumer system sans. No font bundle or exact font identity was supplied; native font matching is unverified.

## Layout, shape, elevation, and motion

Real Navigator headless tabs use bottom on compact, rail on medium and sidebar on expanded layouts. Content wraps and scrolls. Some reference content needs additional scrolling because current controls preserve their own geometry.

## Component and interaction states

Verified Begin ritual navigation and local mood selection. ThemeModeToggle changes mode. Journal is explicit read-only sample content, not a false autosave demo. Audio, attachments, bookmarks, extra collection/history views, settings and reminders remain visible but unbound.

## Screen specifications

Home: daily hero, two Today tiles, three Explore categories. Journal: two-column mood selection, prompt, sample reflection, attachments and three recent reflections. Rituals: hero, metadata, four ordered steps and session/save controls. Profile: identity, 78% weekly ring, three metrics, two saved collections and preferences.

## Accessibility and validation

Use semantic RadioGroup, ProgressRing, Button, Textarea and SettingsRow. Browser checks cover navigation, selection, images, scrolling and responsive presentation. Current Heading web semantics, native text scaling, keyboard/a11y coverage and color contrast are not certified.

## Audit summary

This is a generation/composition self-check, not an independent audit or a pixel-perfect claim. Runtime captures and original concept images are stored separately.

## Findings and remediation

@ankhorage/surface — Button: Use released large controls and rounded global tokens; reserve leading icon space in the label. Full-width screenshot buttons remain intrinsic width.

@ankhorage/zora — RadioGroup: Use two columns with the exact semantic RadioGroup and local selection.

@ankhorage/zora — SettingsRow: Keep SettingsRow; meta is below its title rather than trailing.

@ankhorage/zora — ProgressRing: Keep the real accessible ProgressRing at 78 percent; do not replace it with an SVG progress imitation.

@ankhorage/navigator — HeadlessTabsLayout: Use owner-generated bottom, rail and sidebar navigation with the same four routes.

@ankhorage/zora — theme and Heading: Keep owner light/dark compilation and Georgia as a documented approximation. Native font availability and heading outline need consumer review.

@ankhorage/contracts — actions: Keep unsupported controls visible and unbound. Journal is read-only sample content, labeled Sample reflection with its correct 33-word count.

## Risks needing verification

Consumer apps must resolve bundled media and load the Ionicons font used internally by ThemeModeToggle. The verification app does both. Native font availability, screen-reader behavior and contrast require separate verification.

## Not assessable

Native rendering, backend persistence, real user data, audio playback, attachments, notifications and scheduling.

## Open decisions

No blocking decision for this approved approximate four-screen template. Additional owner or product features are outside this delivery.

## User notes

Stillpath first. Use ankhorage/navigator responsively. Finish with current components and documented deviations.
