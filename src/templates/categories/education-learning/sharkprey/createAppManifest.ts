import type { AppManifest } from '@ankhorage/contracts';

const manifest = {
  metadata: {
    name: 'SharkPrey',
    slug: 'sharkprey',
    version: '0.1.0',
    category: 'education_learning',
    themeId: 'sharkprey',
  },
  themes: [
    {
      id: 'sharkprey',
      name: 'SharkPrey',
      light: {
        primaryColor: '#2563EB',
        harmony: 'triadic',
      },
      dark: {
        primaryColor: '#2563EB',
        harmony: 'triadic',
      },
      tokens: {
        spacing: {
          none: 0,
          xs: 4,
          s: 8,
          m: 16,
          l: 24,
          xl: 32,
          xxl: 48,
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
  activeThemeId: 'sharkprey',
  splashScreen: {
    backgroundColor: '#060806',
    image: './assets/images/sharkprey-logo.png',
    imageWidth: 280,
    resizeMode: 'contain',
    dark: {
      backgroundColor: '#060806',
      image: './assets/images/sharkprey-logo.png',
      imageWidth: 280,
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
        postSignInRoute: 'onboarding',
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
    state: {
      provider: 'legend',
      persistence: 'local',
    },
  },
  settings: {
    localization: {
      defaultLocale: 'en',
      locales: ['en'],
    },
  },
  navigator: {
    type: 'stack',
    initialRouteName: 'onboarding',
    routes: [
      {
        name: 'splash',
        screenId: 'splash',
        showInPrimaryNavigation: false,
      },
      {
        name: 'onboarding',
        screenId: 'onboarding',
        showInPrimaryNavigation: false,
      },
      {
        name: 'app',
        showInPrimaryNavigation: false,
        navigator: {
          type: 'tabs',
          implementation: 'custom',
          presentation: 'responsive',
          responsive: {
            compact: 'bottom',
            medium: 'rail',
            expanded: 'sidebar',
          },
          initialRouteName: 'train',
          routes: [
            {
              name: 'train',
              label: 'Train',
              icon: {
                source: {
                  mediaId: 'sharkprey-train-icon',
                },
              },
              navigator: {
                type: 'stack',
                initialRouteName: 'training-setup',
                routes: [
                  {
                    name: 'training-setup',
                    screenId: 'training-setup',
                  },
                  {
                    name: 'decision-table',
                    screenId: 'decision-table',
                    showInPrimaryNavigation: false,
                  },
                  {
                    name: 'answer-explanation',
                    screenId: 'answer-explanation',
                    showInPrimaryNavigation: false,
                  },
                  {
                    name: 'session-summary',
                    screenId: 'session-summary',
                    showInPrimaryNavigation: false,
                  },
                ],
              },
            },
            {
              name: 'history',
              label: 'History',
              icon: {
                source: {
                  mediaId: 'sharkprey-history-icon',
                },
              },
              screenId: 'hand-history',
            },
            {
              name: 'stats',
              label: 'Stats',
              icon: {
                source: {
                  mediaId: 'sharkprey-stats-icon',
                },
              },
              screenId: 'stats',
            },
            {
              name: 'learn',
              label: 'Learn',
              icon: {
                source: {
                  mediaId: 'sharkprey-learn-icon',
                },
              },
              screenId: 'learn',
            },
            {
              name: 'settings',
              label: 'Settings',
              icon: {
                source: {
                  mediaId: 'sharkprey-settings-icon',
                },
              },
              screenId: 'settings',
            },
          ],
        },
      },
    ],
  },
  screens: {
    splash: {
      id: 'splash',
      name: 'Splash',
      title: 'SharkPrey',
      description:
        'Native splash evidence. The runtime begins at onboarding after the native splash completes.',
      root: {
        id: 'splash-root',
        type: 'Screen',
        props: {
          width: 'narrow',
          scroll: false,
        },
        style: {
          padding: 24,
          gap: 16,
        },
        children: [
          {
            id: 'splash-logo',
            type: 'Image',
            props: {
              source: {
                mediaId: 'sharkprey-logo',
              },
              alt: 'SharkPrey shark wearing a graduation cap',
            },
            style: {
              width: '100%',
              height: 320,
              borderRadius: 24,
            },
          },
          {
            id: 'splash-tagline',
            type: 'Text',
            props: {
              text: 'Improve your game. Become the shark.',
              variant: 'lead',
              align: 'center',
            },
          },
        ],
      },
    },
    onboarding: {
      id: 'onboarding',
      name: 'Onboarding',
      title: 'Where are you starting?',
      description:
        'Initial skill-level choice. Selection persistence requires generated-app state wiring.',
      root: {
        id: 'onboarding-root',
        type: 'Screen',
        props: {
          width: 'narrow',
          scroll: true,
        },
        style: {
          padding: 24,
          gap: 16,
        },
        children: [
          {
            id: 'onboarding-title',
            type: 'Heading',
            props: {
              text: 'Where are you starting?',
              level: 1,
              size: 'h1',
            },
          },
          {
            id: 'onboarding-tagline',
            type: 'Text',
            props: {
              text: 'Improve your game. Become the shark.',
              variant: 'lead',
              weight: 'semiBold',
            },
          },
          {
            id: 'onboarding-copy',
            type: 'Text',
            props: {
              text: 'Train one decision at a time—with feedback that explains why.',
              variant: 'body',
              emphasis: 'muted',
            },
          },
          {
            id: 'onboarding-new',
            type: 'Card',
            props: {
              title: 'New to NLHE',
              description: 'Learn the rules and build a solid foundation.',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'onboarding-ranges',
            type: 'Card',
            props: {
              title: 'Learning the ranges · Selected',
              description: 'Start with an adaptive baseline assessment.',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'onboarding-experienced',
            type: 'Card',
            props: {
              title: 'Experienced player',
              description: 'Focus on difficult decision categories.',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'onboarding-rules',
            type: 'Button',
            props: {
              children: 'New to NLHE? Learn the rules',
              color: 'primary',
              variant: 'ghost',
              size: 'm',
              onPress: {
                type: 'navigate',
                payload: {
                  route: 'learn',
                },
              },
            },
          },
          {
            id: 'onboarding-start',
            type: 'Button',
            props: {
              children: 'Start assessment',
              color: 'primary',
              variant: 'solid',
              size: 'l',
              onPress: {
                type: 'navigate',
                payload: {
                  route: 'app',
                },
              },
            },
          },
        ],
      },
    },
    'training-setup': {
      id: 'training-setup',
      name: 'Training Setup',
      title: 'Build your session',
      description:
        'Dark cards preserve the selected configuration visually; generated-app state owns editing and persistence.',
      root: {
        id: 'training-setup-root',
        type: 'Screen',
        props: {
          width: 'narrow',
          scroll: true,
        },
        style: {
          padding: 24,
          gap: 16,
        },
        children: [
          {
            id: 'setup-title',
            type: 'Heading',
            props: {
              text: 'Build your session',
              level: 1,
              size: 'h1',
            },
          },
          {
            id: 'setup-game-heading',
            type: 'Heading',
            props: {
              text: 'Game',
              level: 2,
              size: 'h3',
            },
          },
          {
            id: 'setup-ring',
            type: 'Card',
            props: {
              title: 'Ring Game',
              description: 'Available',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'setup-sng',
            type: 'Card',
            props: {
              title: "Sit'n'Go",
              description: 'Available',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'setup-mtt',
            type: 'Card',
            props: {
              title: 'MTT · Selected',
              description: 'Tournament decision practice',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'setup-table-heading',
            type: 'Heading',
            props: {
              text: 'Table',
              level: 2,
              size: 'h3',
            },
          },
          {
            id: 'setup-six-max',
            type: 'Card',
            props: {
              title: '6-max',
              description: 'Available',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'setup-nine-max',
            type: 'Card',
            props: {
              title: '9-max · Selected',
              description: 'Full-ring scenario',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'setup-focus',
            type: 'Card',
            props: {
              title: 'Adaptive mix · Selected',
              description: 'Targets the spots that will improve your game fastest.',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'setup-session',
            type: 'Card',
            props: {
              title: '10 hands · Selected',
              description: 'About 5 minutes',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'setup-start',
            type: 'Button',
            props: {
              children: 'Start training',
              color: 'primary',
              variant: 'solid',
              size: 'l',
              onPress: {
                type: 'navigate',
                payload: {
                  route: 'decision-table',
                },
              },
            },
          },
        ],
      },
    },
    'decision-table': {
      id: 'decision-table',
      name: 'Decision Table',
      title: 'Your decision',
      description:
        'The poker surface is a visible placeholder until @ankhorage/zora-tabletop is exposed by core manifest metadata.',
      root: {
        id: 'decision-table-root',
        type: 'Screen',
        props: {
          width: 'narrow',
          scroll: true,
        },
        style: {
          padding: 24,
          gap: 16,
        },
        children: [
          {
            id: 'decision-title',
            type: 'Heading',
            props: {
              text: 'Your decision',
              level: 1,
              size: 'h1',
            },
          },
          {
            id: 'decision-category',
            type: 'Text',
            props: {
              text: 'Flop · C-bet sizing',
              variant: 'eyebrow',
              color: 'primary',
            },
          },
          {
            id: 'decision-progress',
            type: 'Text',
            props: {
              text: 'Hand 3 of 10 · Blinds 50 / 100 · Pot 650',
              variant: 'label',
            },
          },
          {
            id: 'decision-table-placeholder',
            type: 'Box',
            style: {
              padding: 16,
              borderRadius: 24,
            },
            children: [
              {
                id: 'decision-table-label',
                type: 'Heading',
                props: {
                  text: '9-max MTT · CO vs BB',
                  level: 2,
                  size: 'h3',
                },
              },
              {
                id: 'decision-table-seats',
                type: 'Text',
                props: {
                  text: 'Seats: UTG · UTG+1 · MP · MP+1 · HJ · CO · BTN (D) · SB · BB',
                  variant: 'bodySmall',
                  emphasis: 'muted',
                },
              },
              {
                id: 'decision-table-cards',
                type: 'Text',
                props: {
                  text: 'Hero CO: A♠ Q♦   Board: Q♥ 7♣ 2♠   Pot: 650',
                  variant: 'body',
                  weight: 'semiBold',
                },
              },
            ],
          },
          {
            id: 'decision-action',
            type: 'Text',
            props: {
              text: 'You raised from CO. BB called.',
              variant: 'bodySmall',
              emphasis: 'muted',
            },
          },
          {
            id: 'decision-question',
            type: 'Heading',
            props: {
              text: "What's the best default continuation-bet size?",
              level: 2,
              size: 'h2',
            },
          },
          {
            id: 'decision-actions',
            type: 'ButtonGroup',
            props: {
              align: 'stretch',
              orientation: 'vertical',
              gap: 's',
            },
            children: [
              {
                id: 'decision-check',
                type: 'Button',
                props: {
                  children: 'Check',
                  color: 'primary',
                  variant: 'outline',
                  size: 'm',
                  onPress: {
                    type: 'alert',
                    payload: {
                      message: 'The poker task runtime evaluates this choice.',
                    },
                  },
                },
              },
              {
                id: 'decision-small',
                type: 'Button',
                props: {
                  children: 'Bet ~33% pot',
                  color: 'primary',
                  variant: 'outline',
                  size: 'm',
                  onPress: {
                    type: 'alert',
                    payload: {
                      message: 'The poker task runtime evaluates this choice.',
                    },
                  },
                },
              },
              {
                id: 'decision-large',
                type: 'Button',
                props: {
                  children: 'Bet ~75% pot',
                  color: 'primary',
                  variant: 'outline',
                  size: 'm',
                  onPress: {
                    type: 'navigate',
                    payload: {
                      route: 'answer-explanation',
                    },
                  },
                },
              },
            ],
          },
        ],
      },
    },
    'answer-explanation': {
      id: 'answer-explanation',
      name: 'Answer Explanation',
      title: 'Review the decision',
      description:
        'Immediate wrong-answer feedback with the correct default and a strategic explanation.',
      root: {
        id: 'answer-explanation-root',
        type: 'Screen',
        props: {
          width: 'narrow',
          scroll: true,
        },
        style: {
          padding: 24,
          gap: 16,
        },
        children: [
          {
            id: 'answer-title',
            type: 'Heading',
            props: {
              text: 'Review the decision',
              level: 1,
              size: 'h1',
            },
          },
          {
            id: 'answer-category',
            type: 'Text',
            props: {
              text: 'Flop · C-bet sizing',
              variant: 'eyebrow',
              color: 'primary',
            },
          },
          {
            id: 'answer-context',
            type: 'Card',
            props: {
              title: 'Hero A♠ Q♦',
              description: 'Board Q♥ 7♣ 2♠ · Pot 650',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'answer-error',
            type: 'Notice',
            props: {
              title: 'Not quite',
              description: 'You chose Bet ~75% pot',
              color: 'danger',
            },
          },
          {
            id: 'answer-correct',
            type: 'Notice',
            props: {
              title: 'Best default: Bet ~33% pot',
              description: 'Correct answer',
              color: 'success',
            },
          },
          {
            id: 'answer-why',
            type: 'Heading',
            props: {
              text: 'Why',
              level: 2,
              size: 'h2',
            },
          },
          {
            id: 'answer-explanation-copy',
            type: 'Text',
            props: {
              text: 'A small continuation bet gains value from worse Qx and denies equity efficiently. A large size is unnecessary as a baseline.',
              variant: 'body',
            },
          },
          {
            id: 'answer-next',
            type: 'Button',
            props: {
              children: 'Next hand',
              color: 'primary',
              variant: 'solid',
              size: 'l',
              onPress: {
                type: 'navigate',
                payload: {
                  route: 'decision-table',
                },
              },
            },
          },
        ],
      },
    },
    'session-summary': {
      id: 'session-summary',
      name: 'Session Summary',
      title: 'Session complete',
      description: 'Session-level accuracy and adaptive category guidance.',
      root: {
        id: 'session-summary-root',
        type: 'Screen',
        props: {
          width: 'narrow',
          scroll: true,
        },
        style: {
          padding: 24,
          gap: 16,
        },
        children: [
          {
            id: 'summary-title',
            type: 'Heading',
            props: {
              text: 'Session complete',
              level: 1,
              size: 'h1',
            },
          },
          {
            id: 'summary-progress',
            type: 'ProgressRing',
            props: {
              value: 7,
              max: 10,
              centerValue: '70%',
              centerLabel: 'Accuracy',
              accessibilityLabel: 'Session accuracy',
              accessibilityValueText: '7 of 10 answers correct',
              color: 'primary',
              trackColor: 'neutral',
              size: 180,
              thickness: 12,
            },
          },
          {
            id: 'summary-score',
            type: 'Text',
            props: {
              text: '7 of 10 correct · 70% accuracy',
              variant: 'lead',
              weight: 'semiBold',
            },
          },
          {
            id: 'summary-strongest',
            type: 'Card',
            props: {
              title: 'Preflop ranges · 86',
              description: 'Strongest',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'summary-needs-work',
            type: 'Card',
            props: {
              title: 'Bet sizing · 61',
              description: 'Needs work',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'summary-adaptive',
            type: 'Text',
            props: {
              text: 'Your next session will adapt to these results.',
              variant: 'body',
              emphasis: 'muted',
            },
          },
          {
            id: 'summary-practice',
            type: 'Button',
            props: {
              children: 'Practice bet sizing',
              color: 'primary',
              variant: 'solid',
              size: 'l',
              onPress: {
                type: 'navigate',
                payload: {
                  route: 'training-setup',
                },
              },
            },
          },
        ],
      },
    },
    'hand-history': {
      id: 'hand-history',
      name: 'Hand History',
      title: 'History',
      description: 'Completed one-decision summaries only. Hand replay is intentionally deferred.',
      root: {
        id: 'hand-history-root',
        type: 'Screen',
        props: {
          width: 'narrow',
          scroll: true,
        },
        style: {
          padding: 24,
          gap: 16,
        },
        children: [
          {
            id: 'history-title',
            type: 'Heading',
            props: {
              text: 'History',
              level: 1,
              size: 'h1',
            },
          },
          {
            id: 'history-filters',
            type: 'ButtonGroup',
            props: {
              align: 'stretch',
              orientation: 'horizontal',
              gap: 's',
            },
            children: [
              {
                id: 'history-all',
                type: 'Button',
                props: {
                  children: 'All · Selected',
                  color: 'primary',
                  variant: 'outline',
                  size: 'm',
                  onPress: {
                    type: 'filter',
                    payload: {
                      filterKey: 'decisionStatus',
                      filterValue: 'all',
                    },
                  },
                },
              },
              {
                id: 'history-correct',
                type: 'Button',
                props: {
                  children: 'Correct',
                  color: 'primary',
                  variant: 'outline',
                  size: 'm',
                  onPress: {
                    type: 'filter',
                    payload: {
                      filterKey: 'decisionStatus',
                      filterValue: 'correct',
                    },
                  },
                },
              },
              {
                id: 'history-review',
                type: 'Button',
                props: {
                  children: 'Review',
                  color: 'primary',
                  variant: 'outline',
                  size: 'm',
                  onPress: {
                    type: 'filter',
                    payload: {
                      filterKey: 'decisionStatus',
                      filterValue: 'incorrect',
                    },
                  },
                },
              },
            ],
          },
          {
            id: 'history-recent',
            type: 'Heading',
            props: {
              text: 'Recent decisions',
              level: 2,
              size: 'h2',
            },
          },
          {
            id: 'history-aq',
            type: 'Card',
            props: {
              title: 'A♠ Q♦ · Q♥ 7♣ 2♠ · Incorrect',
              description: 'Bet ~75% → Bet ~33% · C-bet sizing',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'history-ak',
            type: 'Card',
            props: {
              title: 'A♣ K♠ · Preflop · Correct',
              description: 'Raise 2.5 BB · Preflop ranges',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'history-kq',
            type: 'Card',
            props: {
              title: 'K♥ Q♣ · Turn · Correct',
              description: 'Check · Pot control',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
        ],
      },
    },
    stats: {
      id: 'stats',
      name: 'Stats',
      title: 'Your game',
      description: 'Strengths and weaknesses derived from completed decision categories.',
      root: {
        id: 'stats-root',
        type: 'Screen',
        props: {
          width: 'narrow',
          scroll: true,
        },
        style: {
          padding: 24,
          gap: 16,
        },
        children: [
          {
            id: 'stats-title',
            type: 'Heading',
            props: {
              text: 'Your game',
              level: 1,
              size: 'h1',
            },
          },
          {
            id: 'stats-overall',
            type: 'ProgressRing',
            props: {
              value: 72,
              max: 100,
              centerValue: '72',
              centerLabel: 'Overall',
              accessibilityLabel: 'Overall poker decision score',
              accessibilityValueText: '72 based on 100 decisions',
              color: 'primary',
              trackColor: 'neutral',
              size: 160,
              thickness: 12,
            },
          },
          {
            id: 'stats-based-on',
            type: 'Text',
            props: {
              text: 'Based on 100 decisions',
              variant: 'body',
              emphasis: 'muted',
            },
          },
          {
            id: 'stats-strengths',
            type: 'Heading',
            props: {
              text: 'Strengths',
              level: 2,
              size: 'h2',
            },
          },
          {
            id: 'stats-preflop',
            type: 'Card',
            props: {
              title: 'Preflop ranges · 86',
              description: 'Strong category',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'stats-position',
            type: 'Card',
            props: {
              title: 'Position · 74',
              description: 'Strong category',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'stats-weaknesses',
            type: 'Heading',
            props: {
              text: 'Weaknesses',
              level: 2,
              size: 'h2',
            },
          },
          {
            id: 'stats-sizing',
            type: 'Card',
            props: {
              title: 'Bet sizing · 61',
              description: 'Needs focused practice',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'stats-bluffing',
            type: 'Card',
            props: {
              title: 'Bluffing · 68',
              description: 'Needs focused practice',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'stats-practice',
            type: 'Button',
            props: {
              children: 'Practice bet sizing',
              color: 'primary',
              variant: 'solid',
              size: 'l',
              onPress: {
                type: 'navigate',
                payload: {
                  route: 'training-setup',
                },
              },
            },
          },
        ],
      },
    },
    learn: {
      id: 'learn',
      name: 'Learn',
      title: 'Learn',
      description: 'Fundamentals remain available without replacing the adaptive training loop.',
      root: {
        id: 'learn-root',
        type: 'Screen',
        props: {
          width: 'narrow',
          scroll: true,
        },
        style: {
          padding: 24,
          gap: 16,
        },
        children: [
          {
            id: 'learn-title',
            type: 'Heading',
            props: {
              text: 'Learn',
              level: 1,
              size: 'h1',
            },
          },
          {
            id: 'learn-rules',
            type: 'Card',
            props: {
              title: 'Start with the rules',
              description: 'Learn the essentials, then put them into practice.',
              tone: 'outline',
              eyebrow: 'NEW TO NLHE?',
            },
            style: {
              borderRadius: 24,
            },
            children: [
              {
                id: 'learn-explore',
                type: 'Button',
                props: {
                  children: 'Explore fundamentals',
                  color: 'primary',
                  variant: 'outline',
                  size: 'm',
                  onPress: {
                    type: 'alert',
                    payload: {
                      message: 'Fundamentals content is supplied by the learning service.',
                    },
                  },
                },
              },
            ],
          },
          {
            id: 'learn-recommended',
            type: 'Heading',
            props: {
              text: 'Recommended for you',
              level: 2,
              size: 'h2',
            },
          },
          {
            id: 'learn-cbet',
            type: 'Card',
            props: {
              title: 'Continuation-bet sizing',
              description: 'Why a small bet does more · 2 of 5 lessons',
              tone: 'outline',
              eyebrow: 'BET SIZING',
            },
            style: {
              borderRadius: 24,
            },
            children: [
              {
                id: 'learn-progress',
                type: 'Progress',
                props: {
                  value: 2,
                  max: 5,
                  color: 'primary',
                  size: 'm',
                },
              },
              {
                id: 'learn-continue',
                type: 'Button',
                props: {
                  children: 'Continue lesson',
                  color: 'primary',
                  variant: 'solid',
                  size: 'l',
                  onPress: {
                    type: 'alert',
                    payload: {
                      message: 'Lesson detail requires the learning-content runtime.',
                    },
                  },
                },
              },
            ],
          },
          {
            id: 'learn-more',
            type: 'Heading',
            props: {
              text: 'More fundamentals',
              level: 2,
              size: 'h2',
            },
          },
          {
            id: 'learn-rankings',
            type: 'Card',
            props: {
              title: 'Hand rankings',
              description: '5 min',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
          {
            id: 'learn-position',
            type: 'Card',
            props: {
              title: 'Position at the table',
              description: '6 min',
              tone: 'outline',
            },
            style: {
              borderRadius: 24,
            },
          },
        ],
      },
    },
    settings: {
      id: 'settings',
      name: 'Settings',
      title: 'Settings',
      description:
        'Preferences are visible through supported SettingsRow nodes. Generated-app adapters own persisted selection, SharkScope connection, and destructive confirmation.',
      root: {
        id: 'settings-root',
        type: 'Screen',
        props: {
          width: 'narrow',
          scroll: true,
        },
        style: {
          padding: 24,
          gap: 16,
        },
        children: [
          {
            id: 'settings-title',
            type: 'Heading',
            props: {
              text: 'Settings',
              level: 1,
              size: 'h1',
            },
          },
          {
            id: 'settings-preferences',
            type: 'Heading',
            props: {
              text: 'Preferences',
              level: 2,
              size: 'h2',
            },
          },
          {
            id: 'settings-appearance',
            type: 'SettingsRow',
            props: {
              title: 'Appearance',
              description: 'Light, dark, or system',
              meta: 'System',
              disabled: false,
            },
          },
          {
            id: 'settings-toggle-theme',
            type: 'Button',
            props: {
              children: 'Toggle theme',
              color: 'primary',
              variant: 'outline',
              size: 'm',
              onPress: {
                type: 'toggleDarkMode',
              },
            },
          },
          {
            id: 'settings-deck',
            type: 'SettingsRow',
            props: {
              title: 'Card deck',
              description: 'Choose your preferred deck style',
              meta: 'SharkPrey Classic',
              disabled: false,
            },
          },
          {
            id: 'settings-language',
            type: 'SettingsRow',
            props: {
              title: 'Language',
              description: 'Application language',
              meta: 'English',
              disabled: false,
            },
          },
          {
            id: 'settings-haptics',
            type: 'SettingsRow',
            props: {
              title: 'Haptics',
              description: 'Decision feedback',
              meta: 'On',
              disabled: false,
            },
          },
          {
            id: 'settings-account',
            type: 'Heading',
            props: {
              text: 'Account',
              level: 2,
              size: 'h2',
            },
          },
          {
            id: 'settings-sharkscope',
            type: 'SettingsRow',
            props: {
              title: 'SharkScope',
              description: 'Connect your account',
              meta: 'Not connected',
              disabled: false,
            },
          },
          {
            id: 'settings-connect',
            type: 'Button',
            props: {
              children: 'Connect account',
              color: 'primary',
              variant: 'outline',
              size: 'm',
              onPress: {
                type: 'alert',
                payload: {
                  message: 'SharkScope connection requires its generated-app adapter.',
                },
              },
            },
          },
          {
            id: 'settings-data',
            type: 'Heading',
            props: {
              text: 'Data',
              level: 2,
              size: 'h2',
            },
          },
          {
            id: 'settings-reset',
            type: 'Button',
            props: {
              children: 'Reset stats',
              color: 'danger',
              variant: 'outline',
              size: 'm',
              onPress: {
                type: 'alert',
                payload: {
                  message:
                    'Confirmation is required before all progress and category scores are erased.',
                },
              },
            },
          },
          {
            id: 'settings-footer',
            type: 'Text',
            props: {
              text: 'SharkPrey · Improve your game. Become the shark.',
              variant: 'caption',
              emphasis: 'muted',
              align: 'center',
            },
          },
        ],
      },
    },
  },
  activeThemeMode: 'dark',
  media: {
    assets: {
      'sharkprey-train-icon': {
        id: 'sharkprey-train-icon',
        name: 'Train navigation icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/train.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          originalFileName: 'train.svg',
          width: 24,
          height: 24,
        },
      },
      'sharkprey-history-icon': {
        id: 'sharkprey-history-icon',
        name: 'History navigation icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/history.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          originalFileName: 'history.svg',
          width: 24,
          height: 24,
        },
      },
      'sharkprey-stats-icon': {
        id: 'sharkprey-stats-icon',
        name: 'Stats navigation icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/stats.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          originalFileName: 'stats.svg',
          width: 24,
          height: 24,
        },
      },
      'sharkprey-learn-icon': {
        id: 'sharkprey-learn-icon',
        name: 'Learn navigation icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/learn.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          originalFileName: 'learn.svg',
          width: 24,
          height: 24,
        },
      },
      'sharkprey-settings-icon': {
        id: 'sharkprey-settings-icon',
        name: 'Settings navigation icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/settings.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          originalFileName: 'settings.svg',
          width: 24,
          height: 24,
        },
      },
      'sharkprey-logo': {
        id: 'sharkprey-logo',
        name: 'SharkPrey shark and graduation-cap logo',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/sharkprey-logo.png',
        },
        contentType: 'image/png',
        metadata: {
          originalFileName: '00-logo.png',
          width: 1536,
          height: 1024,
        },
      },
    },
  },
} satisfies AppManifest;

/*** Create the complete portable application manifest for this template. */
export default function createAppManifest(): AppManifest {
  return structuredClone(manifest);
}
