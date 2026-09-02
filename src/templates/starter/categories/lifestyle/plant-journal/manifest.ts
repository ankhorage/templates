import type { AppManifest } from '@ankhorage/contracts';

export const AUTHORED_PLANT_JOURNAL_MANIFEST = {
  metadata: {
    name: 'Plant Journal',
    slug: 'plant-journal',
    version: '1.0.0',
    category: 'lifestyle',
    themeId: 'plant-journal',
  },
  themes: [
    {
      id: 'plant-journal',
      name: 'Plant Journal',
      light: {
        primaryColor: '#9A4E36',
        harmony: 'analogous',
      },
      dark: {
        primaryColor: '#9A4E36',
        harmony: 'analogous',
      },
      tokens: {
        spacing: {
          none: 0,
          xs: 5,
          s: 10,
          m: 20,
          l: 30,
          xl: 40,
          xxl: 60,
        },
        radii: {
          none: 0,
          s: 8,
          m: 12,
          l: 24,
          full: 9999,
        },
      },
    },
  ],
  activeThemeId: 'plant-journal',
  splashScreen: {
    backgroundColor: '#9A4E36',
    image: './assets/splash/icon.png',
    imageWidth: 160,
    resizeMode: 'contain',
    dark: {
      backgroundColor: '#9A4E36',
      image: './assets/splash/icon-dark.png',
      imageWidth: 160,
      resizeMode: 'contain',
    },
  },
  infra: {
    database: {
      provider: 'supabase',
      tier: 'dev',
    },
    storage: {
      provider: 'auto',
      buckets: ['media'],
    },
    secretStore: {
      provider: 'supabase-vault',
    },
    deployment: {
      target: 'minikube',
      monitoring: false,
    },
    auth: {
      provider: 'supabase',
      scope: 'global',
      flow: {
        signInRoute: 'sign-in',
        signUpRoute: 'sign-up',
        signOutRoute: 'sign-out',
        forgotPasswordRoute: 'forgot-password',
        postSignInRoute: '/',
        unauthorizedRoute: 'sign-in',
      },
      signIn: {
        identifiers: ['email'],
      },
      signUp: {
        requiredFields: ['email', 'password'],
        optionalFields: ['firstName', 'lastName'],
        signUpPolicy: 'autoSignIn',
      },
      profile: {
        fields: ['email', 'firstName', 'lastName'],
      },
    },
    networking: {
      cdn: false,
    },
    modules: [],
  },
  settings: {
    localization: {
      defaultLocale: 'en',
      locales: ['en'],
    },
  },
  navigator: {
    type: 'tabs',
    initialRouteName: 'garden',
    routes: [
      {
        name: 'garden',
        screenId: 'plant-journal-garden',
        label: 'Garden',
        icon: {
          provider: 'material-community',
          name: 'sprout',
        },
      },
      {
        name: 'plants',
        screenId: 'plant-journal-detail',
        label: 'Plants',
        icon: {
          provider: 'material-community',
          name: 'leaf',
        },
      },
      {
        name: 'care-log',
        screenId: 'plant-journal-care-log',
        label: 'Care log',
        icon: {
          provider: 'material-community',
          name: 'clipboard-check-outline',
        },
      },
    ],
  },
  screens: {
    'plant-journal-garden': {
      id: 'plant-journal-garden',
      name: 'Garden',
      title: 'Your indoor garden',
      description: 'A calm care plan for the plants that need you today.',
      root: {
        id: 'plant-journal-garden-screen',
        type: 'Screen',
        props: {
          width: 'wide',
        },
        children: [
          {
            id: 'plant-journal-garden-header',
            type: 'SectionHeader',
            props: {
              eyebrow: 'Plant Journal',
              title: 'Your indoor garden',
              description: 'A calm care plan for the plants that need you today.',
            },
          },
          {
            id: 'plant-journal-garden-next-care',
            type: 'ScreenSection',
            props: {
              title: 'Next care',
              description: 'One small task keeps your garden in rhythm.',
            },
            children: [
              {
                id: 'plant-journal-garden-next-care-card',
                type: 'Card',
                props: {
                  eyebrow: 'Today',
                  title: 'Water Mara',
                  description: 'Check the top inch of soil before you water.',
                  tone: 'outline',
                },
              },
              {
                id: 'plant-journal-garden-complete-care',
                type: 'Button',
                props: {
                  children: 'Mark as cared for',
                  color: 'primary',
                  variant: 'solid',
                  size: 'm',
                },
              },
            ],
          },
          {
            id: 'plant-journal-garden-plant-rail',
            type: 'ContentRail',
            props: {
              itemSize: 'regular',
              gap: 'm',
              padding: 'm',
              peek: 28,
              showControls: true,
              direction: 'auto',
              motion: 'system',
              accessibilityLabel: 'Plant collection',
              previousLabel: 'Previous plant',
              nextLabel: 'Next plant',
            },
            children: [
              {
                id: 'plant-journal-garden-mara-image',
                type: 'Image',
                props: {
                  source: {
                    mediaId: 'mara-hero',
                  },
                  alt: 'Mara, a healthy monstera in a terracotta pot by a window.',
                },
              },
            ],
          },
        ],
      },
    },
    'plant-journal-detail': {
      id: 'plant-journal-detail',
      name: 'Plant detail',
      title: 'Mara, the monstera',
      description: 'A focused view of light, watering, and growth notes.',
      root: {
        id: 'plant-journal-detail-screen',
        type: 'Screen',
        props: {
          width: 'default',
        },
        children: [
          {
            id: 'plant-journal-detail-header',
            type: 'SectionHeader',
            props: {
              eyebrow: 'Plant profile',
              title: 'Mara, the monstera',
              description: 'A focused view of light, watering, and growth notes.',
            },
          },
          {
            id: 'plant-journal-detail-image-rail',
            type: 'ContentRail',
            props: {
              itemSize: 'wide',
              gap: 'm',
              padding: 'm',
              peek: 24,
              showControls: true,
              direction: 'auto',
              motion: 'system',
              accessibilityLabel: 'Mara photo',
              previousLabel: 'Previous photo',
              nextLabel: 'Next photo',
            },
            children: [
              {
                id: 'plant-journal-detail-mara-image',
                type: 'Image',
                props: {
                  source: {
                    mediaId: 'mara-detail',
                  },
                  alt: "Close-up of Mara's healthy monstera leaf and an unfurling new leaf.",
                },
              },
            ],
          },
          {
            id: 'plant-journal-detail-care-section',
            type: 'ScreenSection',
            props: {
              title: 'Care rhythm',
              description: 'A small record keeps the next decision clear.',
            },
            children: [
              {
                id: 'plant-journal-detail-care-card',
                type: 'Card',
                props: {
                  eyebrow: 'Light',
                  title: 'Bright, indirect light',
                  description: 'Rotate a quarter turn when new leaves lean toward the window.',
                  tone: 'subtle',
                },
              },
            ],
          },
        ],
      },
    },
    'plant-journal-care-log': {
      id: 'plant-journal-care-log',
      name: 'Care log',
      title: 'Care that adds up',
      description: 'A reassuring history of the small actions already complete.',
      root: {
        id: 'plant-journal-care-log-screen',
        type: 'Screen',
        props: {
          width: 'default',
        },
        children: [
          {
            id: 'plant-journal-care-log-header',
            type: 'SectionHeader',
            props: {
              eyebrow: 'Care log',
              title: 'Care that adds up',
              description: 'A reassuring history of the small actions already complete.',
            },
          },
          {
            id: 'plant-journal-care-log-section',
            type: 'ScreenSection',
            props: {
              title: 'This week',
              description: 'Completed actions stay visible without demanding attention.',
            },
            children: [
              {
                id: 'plant-journal-care-log-card',
                type: 'Card',
                props: {
                  eyebrow: 'Complete',
                  title: 'Leaf check recorded',
                  description: 'Mara has a new unfurling leaf and no dry edges.',
                  tone: 'outline',
                },
              },
              {
                id: 'plant-journal-care-log-reminder',
                type: 'Notice',
                props: {
                  title: 'Next reminder',
                  description: 'Check soil moisture again in four days.',
                  color: 'success',
                },
              },
            ],
          },
        ],
      },
    },
  },
  media: {
    assets: {
      'mara-detail': {
        id: 'mara-detail',
        name: 'Mara unfurling leaf',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/media/plant-journal/mara-detail-28e8095ae2e5.png',
        },
        contentType: 'image/png',
        metadata: {
          sizeBytes: 2073467,
          width: 1024,
          height: 1536,
        },
      },
      'mara-hero': {
        id: 'mara-hero',
        name: 'Mara by the window',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/media/plant-journal/mara-hero-f4bc5dae1e42.png',
        },
        contentType: 'image/png',
        metadata: {
          sizeBytes: 2400112,
          width: 1024,
          height: 1536,
        },
      },
    },
  },
} satisfies AppManifest;
