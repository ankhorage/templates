---
{
  "schema": "zora-designer/v1",
  "documentKind": "configuration",
  "status": "resolved-with-gaps",
  "language": "en",
  "source": {
    "mode": "screens",
    "inputs": [
      "Mobile Facebook/WhatsApp-like friends wall, chat overview and one-to-one chat; author AppManifest during screen design; category theme recommendations accepted."
    ],
    "evidence": [
      "assets/screens/friends.png",
      "assets/screens/chats.png",
      "assets/screens/direct.png"
    ],
    "limitations": [
      "Generated concepts, not runtime captures. Approximate image and SVG identity, no pixel-equivalence claim."
    ]
  },
  "config": {
    "category": {
      "value": "social_community",
      "origin": "user"
    },
    "platform": {
      "value": "mobile",
      "origin": "user"
    },
    "viewport": {
      "value": {
        "width": 390,
        "height": 844
      },
      "origin": "inferred"
    },
    "audience": {
      "value": "Friends sharing everyday moments and one-to-one conversations",
      "origin": "inferred"
    },
    "primaryColor": {
      "value": "#4F46E5",
      "origin": "category-default"
    },
    "harmony": {
      "value": "analogous",
      "origin": "category-default"
    },
    "tonePairs": {
      "value": {
        "light": "vivid-on-pastel",
        "dark": "pastel-on-neutral-dark"
      },
      "origin": "category-default"
    },
    "typography": {
      "value": "Inter; h1 32/40, body 16/24, metadata 14/20",
      "origin": "category-default"
    },
    "density": {
      "value": "comfortable",
      "origin": "category-default"
    },
    "shape": {
      "value": "soft",
      "origin": "category-default"
    },
    "themeCoverage": {
      "value": "Light concept images; independently compiled light and dark manifest themes",
      "origin": "inferred"
    },
    "navigator": {
      "value": "Native stack around headless bottom Friends/Chats tabs; direct conversation above tabs",
      "origin": "derived"
    }
  },
  "derivation": {
    "provenance": {
      "colorTheory": "0.3.0",
      "contracts": "12.0.1",
      "templates": "9.4.1",
      "zora": "4.4.1",
      "plugins": {
        "@ankhorage/zora-tabletop": "0.1.0"
      },
      "navigator": "3.2.2"
    },
    "diagnostics": [],
    "assumptions": [
      "Three primary screens; English copy; sample data. Native platform chrome is illustrative."
    ],
    "unsupported": [
      {
        "id": "chat-row-press",
        "owner": "@ankhorage/zora",
        "detail": "ChatListItem exposes onPress in React but no bindable press metadata. Use the explicit Open conversation with Maya Button; other rows remain unbound."
      },
      {
        "id": "social-operations",
        "owner": "Contracts/Runtime/application backend",
        "detail": "Publish, like, send and conversation search have no application operations in this template. Visible controls stay explicitly unbound; no fake success or invented action types."
      },
      {
        "id": "message-composer",
        "owner": "@ankhorage/zora",
        "detail": "No metadata-backed MessageComposer for pinned keyboard-aware input, draft lifecycle, attachments, send/retry. message-composer is a visible Box/Input/Button composition pending the released capability."
      },
      {
        "id": "typography",
        "owner": "Surface/application font loader",
        "detail": "Inter is the category-recommended design font. The compiled Surface font map is empty; font loading must be supplied and verified by the consuming app."
      },
      {
        "id": "post-author-schema",
        "owner": "@ankhorage/zora",
        "detail": "PostCard author metadata labels its object as an array. This manifest follows its published blueprint and React PostAuthor object contract."
      }
    ],
    "ownerRuntimeDrift": [
      {
        "id": "chat-row-press",
        "owner": "@ankhorage/zora",
        "detail": "ChatListItem exposes onPress in React but no bindable press metadata. Use the explicit Open conversation with Maya Button; other rows remain unbound."
      },
      {
        "id": "social-operations",
        "owner": "Contracts/Runtime/application backend",
        "detail": "Publish, like, send and conversation search have no application operations in this template. Visible controls stay explicitly unbound; no fake success or invented action types."
      },
      {
        "id": "message-composer",
        "owner": "@ankhorage/zora",
        "detail": "No metadata-backed MessageComposer for pinned keyboard-aware input, draft lifecycle, attachments, send/retry. message-composer is a visible Box/Input/Button composition pending the released capability."
      },
      {
        "id": "typography",
        "owner": "Surface/application font loader",
        "detail": "Inter is the category-recommended design font. The compiled Surface font map is empty; font loading must be supplied and verified by the consuming app."
      },
      {
        "id": "post-author-schema",
        "owner": "@ankhorage/zora",
        "detail": "PostCard author metadata labels its object as an array. This manifest follows its published blueprint and React PostAuthor object contract."
      }
    ]
  },
  "tokens": {
    "light": {
      "colors": {
        "primary": "#4F46E5",
        "secondary": "#0069bf",
        "accent": "#8928c9",
        "highlight": "#4F46E5",
        "tertiary": "#8928c9",
        "quaternary": "#4F46E5",
        "background": "#fbf9fd",
        "surface": "#f5f3f7",
        "text": "#1a171c",
        "textSecondary": "#423f45",
        "border": "#747077",
        "error": "#ef4444",
        "success": "#22c55e",
        "warning": "#f59e0b",
        "info": "#3b82f6"
      },
      "semantics": {
        "neutral": {
          "bg": "#fbf9fd",
          "bgSubtle": "#f5f3f7",
          "surface": "#f5f3f7",
          "surfaceHover": "#e8e6ea",
          "surfaceActive": "#d7d3d9",
          "border": "#e8e6ea",
          "borderStrong": "#d7d3d9",
          "divider": "#e8e6ea",
          "text": "#1a171c",
          "textMuted": "#423f45",
          "textSubtle": "#565359",
          "disabledBg": "#e8e6ea",
          "disabledText": "#747077"
        },
        "brand": {
          "base": "#3828b5",
          "hover": "#2a009c",
          "strong": "#2a009c",
          "softBg": "#dde4ff",
          "softHover": "#cdd6ff",
          "softActive": "#b6c2ff",
          "outline": "#4F46E5",
          "onSurfaceText": "#3828b5",
          "onSolidText": "#FFFFFF",
          "onHoverText": "#FFFFFF",
          "onStrongText": "#FFFFFF",
          "onSoftText": "#000000",
          "onSoftHoverText": "#000000",
          "onSoftActiveText": "#000000",
          "disabledBg": "#e8e6ea",
          "onDisabledText": "#747077"
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
      },
      "typography": {
        "headings": {
          "1": {
            "size": 32,
            "lineHeight": 40,
            "weight": "bold"
          },
          "2": {
            "size": 24,
            "lineHeight": 32,
            "weight": "bold"
          },
          "3": {
            "size": 20,
            "lineHeight": 28,
            "weight": "bold"
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
      }
    },
    "dark": {
      "colors": {
        "primary": "#4F46E5",
        "secondary": "#0069bf",
        "accent": "#8928c9",
        "highlight": "#4F46E5",
        "tertiary": "#8928c9",
        "quaternary": "#4F46E5",
        "background": "#08060a",
        "surface": "#1a171c",
        "text": "#fbf9fd",
        "textSecondary": "#e8e6ea",
        "border": "#a29fa5",
        "error": "#ef4444",
        "success": "#22c55e",
        "warning": "#f59e0b",
        "info": "#3b82f6"
      },
      "semantics": {
        "neutral": {
          "bg": "#08060a",
          "bgSubtle": "#1a171c",
          "surface": "#1a171c",
          "surfaceHover": "#2a272c",
          "surfaceActive": "#423f45",
          "border": "#2a272c",
          "borderStrong": "#565359",
          "divider": "#2a272c",
          "text": "#fbf9fd",
          "textMuted": "#e8e6ea",
          "textSubtle": "#d7d3d9",
          "disabledBg": "#2a272c",
          "disabledText": "#747077"
        },
        "brand": {
          "base": "#7c86fc",
          "hover": "#b6c2ff",
          "strong": "#b6c2ff",
          "softBg": "#0c0044",
          "softHover": "#19006c",
          "softActive": "#2a009c",
          "outline": "#7c86fc",
          "onSurfaceText": "#7c86fc",
          "onSolidText": "#000000",
          "onHoverText": "#000000",
          "onStrongText": "#000000",
          "onSoftText": "#FFFFFF",
          "onSoftHoverText": "#FFFFFF",
          "onSoftActiveText": "#FFFFFF",
          "disabledBg": "#2a272c",
          "onDisabledText": "#747077"
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
      },
      "typography": {
        "headings": {
          "1": {
            "size": 32,
            "lineHeight": 40,
            "weight": "bold"
          },
          "2": {
            "size": 24,
            "lineHeight": 32,
            "weight": "bold"
          },
          "3": {
            "size": 20,
            "lineHeight": 28,
            "weight": "bold"
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
      }
    }
  },
  "components": {
    "stateRequirements": {
      "loading": "Use Skeleton or SkeletonList while initial feed/conversations load; preserve navigator and drafts. Backend bindings are not implemented.",
      "empty": "Use EmptyState: No moments yet / No conversations yet / Say hello to Maya.",
      "error": "Use Notice with retry only once an owned retry operation exists; retain the last content.",
      "offline": "Show offline Notice, retain cached content and unsent draft; never claim delivery.",
      "disabled": "Disable send when draft is empty or a send is pending; awaits composer state binding.",
      "selected": "Current Friends/Chats tab remains visibly selected; unread Maya row has count 2.",
      "pressed": "Use owner Button feedback; no bespoke pressed palette.",
      "focus": "Visible focus ring and input focus/keyboard behavior require runtime verification.",
      "partial": "Existing content remains usable if one image or row fails; image alt text is supplied."
    },
    "recipeDecisions": {
      "feed": "Exact semantic PostCard, Image child for registered photo, Button navigation.",
      "overview": "Exact ChatListItem; explicit navigation Button because row press metadata is absent.",
      "conversation": "Exact MessageBubble; Box placeholder composition for unsupported full composer.",
      "navigation": "@ankhorage/navigator native stack plus headless bottom tabs; external SVG IconSpec sources."
    }
  },
  "screens": [
    {
      "id": "friends",
      "order": 1,
      "title": "Friends",
      "purpose": "Friends-only wall. Sample posts; publishing and likes are visibly unbound pending owned operations.",
      "primaryAction": "Share a moment (unbound); Message Maya opens direct chat",
      "evidence": "assets/screens/friends.png",
      "evidenceKind": "generated-concept",
      "dimensions": {
        "width": 853,
        "height": 1844
      },
      "state": "default with sample content",
      "continuity": "Maya, the same lake asset, and the final 9:41 message continue across all three screens.",
      "scroll": "Screen owns vertical content scroll; direct composer is a target pinned region pending ZORA capability.",
      "responsive": "20pt gutters; expand content width at wider sizes; 320pt and dynamic type require runtime verification.",
      "safeAreas": "44pt top, 34pt bottom; 64pt tab region on Friends/Chats only. System chrome is concept evidence, not app media.",
      "states": {
        "loading": "Use Skeleton or SkeletonList while initial feed/conversations load; preserve navigator and drafts. Backend bindings are not implemented.",
        "empty": "Use EmptyState: No moments yet / No conversations yet / Say hello to Maya.",
        "error": "Use Notice with retry only once an owned retry operation exists; retain the last content.",
        "offline": "Show offline Notice, retain cached content and unsent draft; never claim delivery.",
        "disabled": "Disable send when draft is empty or a send is pending; awaits composer state binding.",
        "selected": "Current Friends/Chats tab remains visibly selected; unread Maya row has count 2.",
        "pressed": "Use owner Button feedback; no bespoke pressed palette.",
        "focus": "Visible focus ring and input focus/keyboard behavior require runtime verification.",
        "partial": "Existing content remains usable if one image or row fails; image alt text is supplied."
      }
    },
    {
      "id": "chats",
      "order": 2,
      "title": "Chats",
      "purpose": "Direct-message overview. Maya opens through a supported Button; row press and search await metadata support.",
      "primaryAction": "Open conversation with Maya",
      "evidence": "assets/screens/chats.png",
      "evidenceKind": "generated-concept",
      "dimensions": {
        "width": 853,
        "height": 1844
      },
      "state": "default with sample content",
      "continuity": "Maya, the same lake asset, and the final 9:41 message continue across all three screens.",
      "scroll": "Screen owns vertical content scroll; direct composer is a target pinned region pending ZORA capability.",
      "responsive": "20pt gutters; expand content width at wider sizes; 320pt and dynamic type require runtime verification.",
      "safeAreas": "44pt top, 34pt bottom; 64pt tab region on Friends/Chats only. System chrome is concept evidence, not app media.",
      "states": {
        "loading": "Use Skeleton or SkeletonList while initial feed/conversations load; preserve navigator and drafts. Backend bindings are not implemented.",
        "empty": "Use EmptyState: No moments yet / No conversations yet / Say hello to Maya.",
        "error": "Use Notice with retry only once an owned retry operation exists; retain the last content.",
        "offline": "Show offline Notice, retain cached content and unsent draft; never claim delivery.",
        "disabled": "Disable send when draft is empty or a send is pending; awaits composer state binding.",
        "selected": "Current Friends/Chats tab remains visibly selected; unread Maya row has count 2.",
        "pressed": "Use owner Button feedback; no bespoke pressed palette.",
        "focus": "Visible focus ring and input focus/keyboard behavior require runtime verification.",
        "partial": "Existing content remains usable if one image or row fails; image alt text is supplied."
      }
    },
    {
      "id": "direct",
      "order": 3,
      "title": "Maya",
      "purpose": "One-to-one conversation with Maya. Reuses the wall photo. Composer and send remain unbound; keyboard avoidance and pinned composer require owner support.",
      "primaryAction": "Send message (unbound)",
      "evidence": "assets/screens/direct.png",
      "evidenceKind": "generated-concept",
      "dimensions": {
        "width": 853,
        "height": 1844
      },
      "state": "default with sample content",
      "continuity": "Maya, the same lake asset, and the final 9:41 message continue across all three screens.",
      "scroll": "Screen owns vertical content scroll; direct composer is a target pinned region pending ZORA capability.",
      "responsive": "20pt gutters; expand content width at wider sizes; 320pt and dynamic type require runtime verification.",
      "safeAreas": "44pt top, 34pt bottom; 64pt tab region on Friends/Chats only. System chrome is concept evidence, not app media.",
      "states": {
        "loading": "Use Skeleton or SkeletonList while initial feed/conversations load; preserve navigator and drafts. Backend bindings are not implemented.",
        "empty": "Use EmptyState: No moments yet / No conversations yet / Say hello to Maya.",
        "error": "Use Notice with retry only once an owned retry operation exists; retain the last content.",
        "offline": "Show offline Notice, retain cached content and unsent draft; never claim delivery.",
        "disabled": "Disable send when draft is empty or a send is pending; awaits composer state binding.",
        "selected": "Current Friends/Chats tab remains visibly selected; unread Maya row has count 2.",
        "pressed": "Use owner Button feedback; no bespoke pressed palette.",
        "focus": "Visible focus ring and input focus/keyboard behavior require runtime verification.",
        "partial": "Existing content remains usable if one image or row fails; image alt text is supplied."
      }
    }
  ],
  "assets": {
    "bundlePath": "design-assets.json",
    "status": "complete",
    "entries": [
      {
        "mediaId": "lake",
        "role": "image",
        "sourcePath": "assets/images/lake.png",
        "targetPath": "assets/images/lake.png",
        "contentType": "image/png",
        "usages": [
          "/screens/friends/root/children/4/children/0/props/source",
          "/screens/direct/root/children/6/children/0/props/source"
        ],
        "dimensions": {
          "width": 1536,
          "height": 1024
        },
        "provenance": "Generated with built-in image_gen; alpine lake and wooden picnic jetty, natural morning light, no UI or text.",
        "visualReview": "Inspected; concepts approximate the reusable media and icon identity. Exact runtime pixels are not verified."
      },
      {
        "mediaId": "friends",
        "role": "icon",
        "sourcePath": "assets/images/svg/friends.svg",
        "targetPath": "assets/images/svg/friends.svg",
        "contentType": "image/svg+xml",
        "usages": [
          "/navigator/routes/0/navigator/routes/0/icon/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original vector paths authored for this template",
        "visualReview": "Inspected; concepts approximate the reusable media and icon identity. Exact runtime pixels are not verified."
      },
      {
        "mediaId": "chats",
        "role": "icon",
        "sourcePath": "assets/images/svg/chats.svg",
        "targetPath": "assets/images/svg/chats.svg",
        "contentType": "image/svg+xml",
        "usages": [
          "/navigator/routes/0/navigator/routes/1/icon/source"
        ],
        "dimensions": {
          "width": 24,
          "height": 24
        },
        "provenance": "Original vector paths authored for this template",
        "visualReview": "Inspected; concepts approximate the reusable media and icon identity. Exact runtime pixels are not verified."
      }
    ],
    "promptsPath": "assets/screens/prompts.json"
  },
  "validation": {
    "scope": "composition",
    "status": "pass-with-gaps",
    "gates": [
      {
        "id": "owner-themes-light-dark",
        "status": "pass"
      },
      {
        "id": "manifest-contract",
        "status": "pass"
      },
      {
        "id": "navigator-ios-android",
        "status": "pass"
      },
      {
        "id": "metadata-props-events",
        "status": "pass-with-gaps",
        "detail": "Author follows object blueprint; unsupported events are unbound."
      },
      {
        "id": "asset-bundle-and-XML",
        "status": "pass"
      },
      {
        "id": "visual-composition",
        "status": "pass",
        "detail": "Each screen reviewed individually; readable copy, safe areas, continuity and stable shell. Extra wall controls removed in targeted revision."
      },
      {
        "id": "runtime-render-and-interactions",
        "status": "not-assessable"
      },
      {
        "id": "repository-tests",
        "status": "pass",
        "detail": "30 tests pass. Removed obsolete tests for the intentionally deleted SharkPrey template."
      }
    ],
    "applicationGate": "not-assessable",
    "ownerRuntimeDrift": [
      {
        "id": "chat-row-press",
        "owner": "@ankhorage/zora",
        "detail": "ChatListItem exposes onPress in React but no bindable press metadata. Use the explicit Open conversation with Maya Button; other rows remain unbound."
      },
      {
        "id": "social-operations",
        "owner": "Contracts/Runtime/application backend",
        "detail": "Publish, like, send and conversation search have no application operations in this template. Visible controls stay explicitly unbound; no fake success or invented action types."
      },
      {
        "id": "message-composer",
        "owner": "@ankhorage/zora",
        "detail": "No metadata-backed MessageComposer for pinned keyboard-aware input, draft lifecycle, attachments, send/retry. message-composer is a visible Box/Input/Button composition pending the released capability."
      },
      {
        "id": "typography",
        "owner": "Surface/application font loader",
        "detail": "Inter is the category-recommended design font. The compiled Surface font map is empty; font loading must be supplied and verified by the consuming app."
      },
      {
        "id": "post-author-schema",
        "owner": "@ankhorage/zora",
        "detail": "PostCard author metadata labels its object as an array. This manifest follows its published blueprint and React PostAuthor object contract."
      }
    ],
    "blockers": [],
    "commands": {
      "passed": [
        "bun run build",
        "bun run typecheck",
        "bun run lint",
        "bun run knip:check",
        "asset-bundle.ts with complete manifest",
        "ZORA metadata node/prop/child/event inspection: 39 nodes, 3 navigation bindings",
        "createTemplateArtifact: 3 portable runtime media files",
        "Navigator iOS and Android plans: supported, no diagnostics",
        "SVG XML parsing",
        "git diff --check",
        "bun test: 30 pass, 0 fail",
        "bun run changeset:status",
        "Targeted Prettier format check"
      ],
      "failed": [],
      "omitted": [
        "No runtime app was launched; no rendered pixel comparison or messaging backend was tested.",
        "AGENTS.md check-types and knip:test scripts do not exist; ran package.json typecheck and knip:check equivalents."
      ]
    }
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

Close brings a friends-only wall and direct conversations together in a calm, friendly mobile design.

## Resolved decisions and origins

The user accepted social/community theme recommendations and required Navigator ownership. Neutral 390 × 844 pt portrait viewport inferred from mobile.

## Color system

Owner-computed light and dark themes are retained above. Light screens use the recommended indigo and analogous palette.

## Typography

Inter is the category design recommendation. Font loading is not yet expressed by the compiled font map.

## Layout, shape, elevation, and motion

20 pt gutters, 44 pt touch targets, soft corners, native stack with stable bottom tabs. Keyboard handling and reduced-motion behavior need consumer evidence.

## Component and interaction states

Use PostCard, ChatListItem and MessageBubble. Only supported navigation events are bound. All required asynchronous and input states are specified above as implementation requirements.

## Screen specifications

1. Friends — share and browse moments. 2. Chats — overview with Maya unread. 3. Maya — direct chat continuing the lake plan. Individual PNGs live in assets/screens.

## Accessibility and validation

Manifest, owner themes, iOS/Android navigator plans, media pointers and SVG XML are checked. Screens establish visual composition only.

## Audit summary

Generation self-review; no independent audit or runtime verification is claimed.

## Findings and remediation

Release a metadata-backed keyboard-aware MessageComposer and ChatListItem press event. Bind publish/like/send/search only to real owned operations. Reconcile PostCard author metadata with its object API.

## Risks needing verification

Consumer media resolver, Inter loading, keyboard avoidance, draft persistence, dynamic type, safe areas, accessibility and real delivery states.

## Not assessable

Runtime rendering, pixel fidelity, backend behavior, focus order, screen-reader semantics and device interactions.

## Open decisions

No further design configuration is required. Runtime capability work remains as documented.

## User notes

Author createAppManifest.ts while designing mobile screens. Prefer ZORA elements; preserve unsupported UX for later ZORA work. Store generated images in assets/images and reuse them in generated screens. Use category theme recommendations and @ankhorage/navigator without exception.
