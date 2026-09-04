import type { AppManifest } from '@ankhorage/contracts';

const manifest = {
  metadata: {
    name: 'Stillpath',
    slug: 'stillpath',
    version: '1.0.0',
    category: 'lifestyle',
    themeId: 'stillpath',
  },
  themes: [
    {
      id: 'stillpath',
      name: 'Stillpath',
      light: {
        primaryColor: '#9274A8',
        harmony: 'analogous',
      },
      dark: {
        primaryColor: '#C8B1D8',
        harmony: 'analogous',
      },
    },
  ],
  activeThemeId: 'stillpath',
  activeThemeMode: 'light',
  media: {
    assets: {
      'home-hero': {
        id: 'home-hero',
        name: 'Morning grounding sunrise',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/home-hero.webp',
        },
        contentType: 'image/webp',
        metadata: {
          width: 300,
          height: 208,
        },
      },
      'ritual-hero': {
        id: 'ritual-hero',
        name: 'Morning ritual journal',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/ritual-hero.webp',
        },
        contentType: 'image/webp',
        metadata: {
          width: 300,
          height: 254,
        },
      },
      'reflection-rest': {
        id: 'reflection-rest',
        name: 'Quiet morning reflection',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/reflection-rest.webp',
        },
        contentType: 'image/webp',
        metadata: {
          width: 195,
          height: 138,
        },
      },
      'ocean-release': {
        id: 'ocean-release',
        name: 'Ocean release',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/ocean-release.webp',
        },
        contentType: 'image/webp',
        metadata: {
          width: 292,
          height: 244,
        },
      },
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
        postSignInRoute: 'home',
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
  navigator: {
    type: 'tabs',
    initialRouteName: 'home',
    routes: [
      {
        name: 'home',
        label: 'Home',
        icon: {
          name: 'home-outline',
          provider: 'Ionicons',
        },
        screenId: 'stillpath-home',
      },
      {
        name: 'journal',
        label: 'Journal',
        icon: {
          name: 'book-outline',
          provider: 'Ionicons',
        },
        screenId: 'stillpath-journal',
      },
      {
        name: 'rituals',
        label: 'Rituals',
        icon: {
          name: 'leaf-outline',
          provider: 'Ionicons',
        },
        screenId: 'stillpath-rituals',
      },
      {
        name: 'profile',
        label: 'Profile',
        icon: {
          name: 'person-outline',
          provider: 'Ionicons',
        },
        screenId: 'stillpath-profile',
      },
    ],
  },
  screens: {
    'stillpath-home': {
      id: 'stillpath-home',
      name: 'Home',
      title: 'Home',
      description:
        'Home dashboard reconstructed from assets/screens/home.webp. Save-for-later remains visibly unbound until a persistence action is owned by Contracts.',
      root: {
        id: 'stillpath-home-root',
        type: 'Screen',
        style: {
          padding: 24,
          gap: 20,
        },
        children: [
          {
            id: 'home-greeting',
            type: 'Text',
            props: {
              text: 'Good morning, Fabio',
              variant: 'label',
              emphasis: 'muted',
            },
          },
          {
            id: 'home-brand',
            type: 'Heading',
            props: {
              text: 'Stillpath',
              level: 1,
              size: 'display',
            },
          },
          {
            id: 'home-subtitle',
            type: 'Text',
            props: {
              text: 'A gentle ritual for today',
              variant: 'lead',
              emphasis: 'muted',
            },
          },
          {
            id: 'home-hero-card',
            type: 'Card',
            props: {
              title: 'Morning Grounding',
              tone: 'subtle',
              description: 'Set a calm foundation and move through your day with presence.',
            },
            style: {
              borderRadius: 24,
            },
            children: [
              {
                id: 'home-hero-image',
                type: 'Image',
                props: {
                  source: {
                    mediaId: 'home-hero',
                  },
                  alt: 'Person meditating at sunrise',
                },
                style: {
                  width: '100%',
                  height: 220,
                  borderRadius: 24,
                },
              },
              {
                id: 'home-begin',
                type: 'Button',
                props: {
                  children: 'Begin ritual',
                  variant: 'solid',
                  size: 'l',
                  onPress: {
                    type: 'navigate',
                    payload: {
                      route: 'rituals',
                    },
                  },
                },
              },
              {
                id: 'home-save',
                type: 'Button',
                props: {
                  children: 'Save for later',
                  variant: 'outline',
                  size: 'l',
                },
              },
            ],
          },
          {
            id: 'home-today',
            type: 'Heading',
            props: {
              text: 'Today',
              level: 2,
              size: 'h3',
            },
          },
          {
            id: 'home-today-row',
            type: 'Box',
            style: {
              gap: 12,
              flexDirection: 'row',
              flexWrap: 'wrap',
            },
            children: [
              {
                id: 'home-mood',
                type: 'Card',
                props: {
                  title: 'Mood check-in',
                  tone: 'subtle',
                  description: 'Pause and notice how you’re feeling. · 2 min',
                },
                style: {
                  borderRadius: 24,
                },
              },
              {
                id: 'home-breath',
                type: 'Card',
                props: {
                  title: 'Breath practice',
                  tone: 'subtle',
                  description: 'Three mindful minutes to reset and breathe. · 3 min',
                },
                style: {
                  borderRadius: 24,
                },
              },
            ],
          },
          {
            id: 'home-explore',
            type: 'Heading',
            props: {
              text: 'Explore',
              level: 2,
              size: 'h3',
            },
          },
          {
            id: 'home-explore-row',
            type: 'Box',
            style: {
              gap: 12,
              flexDirection: 'row',
              flexWrap: 'wrap',
            },
            children: [
              {
                id: 'home-sleep',
                type: 'Card',
                props: {
                  title: 'Sleep',
                  tone: 'subtle',
                  description: 'Rest deeply and wake restored.',
                },
                style: {
                  borderRadius: 24,
                },
              },
              {
                id: 'home-focus',
                type: 'Card',
                props: {
                  title: 'Focus',
                  tone: 'subtle',
                  description: 'Cultivate clarity and steady attention.',
                },
                style: {
                  borderRadius: 24,
                },
              },
              {
                id: 'home-release',
                type: 'Card',
                props: {
                  title: 'Release',
                  tone: 'subtle',
                  description: 'Let go, soften, and create space.',
                },
                style: {
                  borderRadius: 24,
                },
              },
            ],
          },
          {
            id: 'home-kournal',
            type: 'Button',
            props: {
              children: 'Open journal',
              variant: 'ghost',
              size: 'l',
              onPress: {
                type: 'navigate',
                payload: {
                  route: 'journal',
                },
              },
            },
          },
        ],
      },
    },
    'stillpath-journal': {
      id: 'stillpath-journal',
      name: 'Journal',
      title: 'Journal',
      description:
        'Journal reconstructed from assets/screens/journal.webp. Photo and voice capture controls remain visible but unbound until media capture actions exist.',
      root: {
        id: 'stillpath-journal-root',
        type: 'Screen',
        style: {
          padding: 24,
          gap: 20,
        },
        children: [
          {
            id: 'journal-brand',
            type: 'Heading',
            props: {
              text: 'Journal',
              level: 1,
              size: 'display',
            },
          },
          {
            id: 'journal-intro',
            type: 'Text',
            props: {
              text: 'Notice what is present and give it words.',
              variant: 'lead',
              emphasis: 'muted',
            },
          },
          {
            id: 'journal-moods',
            type: 'Box',
            style: {
              gap: 8,
              flexDirection: 'row',
              flexWrap: 'wrap',
            },
            children: [
              {
                id: 'journal-mood-calm',
                type: 'Button',
                props: {
                  children: 'Calm',
                  variant: 'soft',
                  size: 'm',
                },
              },
              {
                id: 'journal-mood-heavy',
                type: 'Button',
                props: {
                  children: 'Heavy',
                  variant: 'outline',
                  size: 'm',
                },
              },
              {
                id: 'journal-mood-grateful',
                type: 'Button',
                props: {
                  children: 'Grateful',
                  variant: 'outline',
                  size: 'm',
                },
              },
              {
                id: 'journal-mood-restless',
                type: 'Button',
                props: {
                  children: 'Restless',
                  variant: 'outline',
                  size: 'm',
                },
              },
            ],
          },
          {
            id: 'journal-prompt',
            type: 'Card',
            props: {
              title: 'What would feel supportive today?',
              tone: 'subtle',
              description: 'There’s no right or wrong answer.',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'journal-entry',
            type: 'Textarea',
            props: {
              value:
                'This morning feels quiet and spacious.\n\nI’m grateful for the slow start and the sunlight coming through the window.\n\nI want to be present with what matters and let go of what doesn’t.',
              size: 'l',
            },
            style: {
              minHeight: 240,
              borderRadius: 24,
            },
          },
          {
            id: 'journal-capture',
            type: 'Box',
            style: {
              gap: 12,
              flexDirection: 'row',
              flexWrap: 'wrap',
            },
            children: [
              {
                id: 'journal-add-photo',
                type: 'Button',
                props: {
                  children: 'Add photo',
                  variant: 'outline',
                  size: 'l',
                },
              },
              {
                id: 'journal-voice',
                type: 'Button',
                props: {
                  children: 'Voice note',
                  variant: 'outline',
                  size: 'l',
                },
              },
            ],
          },
          {
            id: 'journal-recent',
            type: 'Heading',
            props: {
              text: 'Recent reflections',
              level: 2,
              size: 'h3',
            },
          },
          {
            id: 'journal-reflection',
            type: 'Card',
            props: {
              title: 'A well-earned rest',
              tone: 'subtle',
              description:
                'A gentle reminder that rest is productive too. I’m learning to slow down with more trust.',
            },
            style: {
              borderRadius: 24,
            },
            children: [
              {
                id: 'journal-reflection-image',
                type: 'Image',
                props: {
                  source: {
                    mediaId: 'reflection-rest',
                  },
                  alt: 'Cup on a soft blanket by a window',
                },
                style: {
                  width: '100%',
                  height: 160,
                  borderRadius: 24,
                },
              },
            ],
          },
        ],
      },
    },
    'stillpath-rituals': {
      id: 'stillpath-rituals',
      name: 'Rituals',
      title: 'Rituals',
      description:
        'Ritual detail reconstructed from assets/screens/rituals.webp. Session start and saving remain visibly unbound until those owner actions exist.',
      root: {
        id: 'stillpath-rituals-root',
        type: 'Screen',
        style: {
          padding: 24,
          gap: 16,
        },
        children: [
          {
            id: 'ritual-title',
            type: 'Heading',
            props: {
              text: 'Rituals',
              level: 1,
              size: 'display',
            },
          },
          {
            id: 'ritual-hero',
            type: 'Image',
            props: {
              source: {
                mediaId: 'ritual-hero',
              },
              alt: 'Sunrise with a journal, cup and soft blanket',
            },
            style: {
              width: '100%',
              height: 280,
              borderRadius: 24,
            },
          },
          {
            id: 'ritual-name',
            type: 'Heading',
            props: {
              text: 'Morning Grounding',
              level: 2,
              size: 'h1',
            },
          },
          {
            id: 'ritual-description',
            type: 'Text',
            props: {
              text: 'A simple morning ritual to help you slow down, connect with your breath, and set a grounded intention for the day.',
              variant: 'lead',
            },
          },
          {
            id: 'ritual-meta',
            type: 'Box',
            style: {
              gap: 8,
              flexDirection: 'row',
              flexWrap: 'wrap',
            },
            children: [
              {
                id: 'ritual-meta-time',
                type: 'Card',
                props: {
                  title: '7 min',
                  tone: 'subtle',
                },
                style: {
                  borderRadius: 24,
                },
              },
              {
                id: 'ritual-meta-level',
                type: 'Card',
                props: {
                  title: 'Beginner',
                  tone: 'subtle',
                },
                style: {
                  borderRadius: 24,
                },
              },
              {
                id: 'ritual-meta-audio',
                type: 'Card',
                props: {
                  title: 'Audio guided',
                  tone: 'subtle',
                },
                style: {
                  borderRadius: 24,
                },
              },
            ],
          },
          {
            id: 'ritual-steps',
            type: 'Heading',
            props: {
              text: 'Steps',
              level: 2,
              size: 'h3',
            },
          },
          {
            id: 'ritual-step-1',
            type: 'Card',
            props: {
              title: '1 · Arrive',
              tone: 'subtle',
              description:
                'Settle in a comfortable position and take a moment to arrive in your body.',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'ritual-step-2',
            type: 'Card',
            props: {
              title: '2 · Breathe',
              tone: 'subtle',
              description: 'Follow the breath with gentle awareness and soften any tension.',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'ritual-step-3',
            type: 'Card',
            props: {
              title: '3 · Intention',
              tone: 'subtle',
              description: 'Invite a grounding intention to guide your mind and heart today.',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'ritual-step-4',
            type: 'Card',
            props: {
              title: '4 · Close',
              tone: 'subtle',
              description: 'Take one more deep breath and move forward with presence.',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'ritual-start',
            type: 'Button',
            props: {
              children: 'Start session',
              variant: 'solid',
              size: 'l',
            },
          },
          {
            id: 'ritual-save',
            type: 'Button',
            props: {
              children: 'Save ritual',
              variant: 'outline',
              size: 'l',
            },
          },
        ],
      },
    },
    'stillpath-profile': {
      id: 'stillpath-profile',
      name: 'Profile',
      title: 'Profile',
      description:
        'Profile reconstructed from assets/screens/profile.webp. Notification and reminder editing remain represented but unbound until those actions exist.',
      root: {
        id: 'stillpath-profile-root',
        type: 'Screen',
        style: {
          padding: 24,
          gap: 20,
        },
        children: [
          {
            id: 'profile-greeting',
            type: 'Text',
            props: {
              text: 'Good morning, Fabio',
              variant: 'label',
              emphasis: 'muted',
            },
          },
          {
            id: 'profile-name',
            type: 'Heading',
            props: {
              text: 'Fabio',
              level: 1,
              size: 'display',
            },
          },
          {
            id: 'profile-subtitle',
            type: 'Text',
            props: {
              text: '7-day return to stillness',
              variant: 'lead',
              emphasis: 'muted',
            },
          },
          {
            id: 'profile-progress',
            type: 'Card',
            props: {
              title: 'You’re building a beautiful habit.',
              tone: 'subtle',
              description: 'Small moments. Lasting change.',
            },
            style: {
              borderRadius: 24,
            },
            children: [
              {
                id: 'profile-progress-ring',
                type: 'ProgressRing',
                props: {
                  value: 78,
                  max: 100,
                  centerValue: '78%',
                  centerLabel: 'This week',
                  accessibilityLabel: 'Weekly practice progress',
                  accessibilityValueText: '78 percent this week',
                  color: 'primary',
                  trackColor: 'neutral',
                  size: 168,
                  thickness: 12,
                },
              },
              {
                id: 'profile-streak',
                type: 'Text',
                props: {
                  text: 'Current streak · 7 days',
                },
              },
              {
                id: 'profile-minutes',
                type: 'Text',
                props: {
                  text: 'Minutes practiced · 126 min',
                },
              },
              {
                id: 'profile-days',
                type: 'Text',
                props: {
                  text: 'Journal days · 5 days',
                },
              },
              {
                id: 'profile-motto',
                type: 'Text',
                props: {
                  text: 'Small moments. Lasting change.',
                  variant: 'caption',
                  emphasis: 'muted',
                },
              },
            ],
          },
          {
            id: 'profile-saved',
            type: 'Heading',
            props: {
              text: 'Saved collections',
              level: 2,
              size: 'h3',
            },
          },
          {
            id: 'profile-saved-row',
            type: 'Box',
            style: {
              gap: 12,
              flexDirection: 'row',
              flexWrap: 'wrap',
            },
            children: [
              {
                id: 'profile-evening',
                type: 'Card',
                props: {
                  title: 'Evening reset',
                  tone: 'subtle',
                  description: 'Wind down and let go',
                },
                style: {
                  borderRadius: 24,
                },
                children: [
                  {
                    id: 'profile-evening-image',
                    type: 'Image',
                    props: {
                      source: {
                        mediaId: 'reflection-rest',
                      },
                      alt: 'Candle-like quiet evening still life',
                    },
                    style: {
                      width: '100%',
                      height: 160,
                      borderRadius: 24,
                    },
                  },
                ],
              },
              {
                id: 'profile-ocean',
                type: 'Card',
                props: {
                  title: 'Ocean release',
                  tone: 'subtle',
                  description: 'Release tension and soften',
                },
                style: {
                  borderRadius: 24,
                },
                children: [
                  {
                    id: 'profile-ocean-image',
                    type: 'Image',
                    props: {
                      source: {
                        mediaId: 'ocean-release',
                      },
                      alt: 'Ocean shoreline at sunset',
                    },
                    style: {
                      width: '100%',
                      height: 160,
                      borderRadius: 24,
                    },
                  },
                ],
              },
            ],
          },
          {
            id: 'profile-preferences',
            type: 'Heading',
            props: {
              text: 'Preferences',
              level: 2,
              size: 'h3',
            },
          },
          {
            id: 'profile-theme',
            type: 'Card',
            props: {
              title: 'Theme',
              tone: 'subtle',
              description: 'Light / dark',
            },
            style: {
              borderRadius: 24,
            },
            children: [
              {
                id: 'profile-theme-toggle',
                type: 'Button',
                props: {
                  children: 'Toggle theme',
                  variant: 'soft',
                  size: 'l',
                  onPress: {
                    type: 'toggleDarkMode',
                  },
                },
              },
            ],
          },
          {
            id: 'profile-notifications',
            type: 'Card',
            props: {
              title: 'Notifications',
              tone: 'subtle',
              description: 'Gentle',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'profile-reminder',
            type: 'Card',
            props: {
              title: 'Daily reminder',
              tone: 'subtle',
              description: '8:00 AM',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'profile-note',
            type: 'Text',
            props: {
              text: 'Consistency is kind. Show up gently.',
              variant: 'caption',
              emphasis: 'muted',
            },
          },
        ],
      },
    },
  },
  settings: {
    localization: {
      defaultLocale: 'en',
      locales: ['en'],
    },
  },
} satisfies AppManifest;

/*** Create the complete portable application manifest for the Stillpath lifestyle template. */
export default function createAppManifest(): AppManifest {
  return structuredClone(manifest);
}
