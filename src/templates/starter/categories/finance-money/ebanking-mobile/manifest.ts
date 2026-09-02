import type { AppManifest } from '@ankhorage/contracts';

export const AUTHORED_EBANKING_MOBILE_MANIFEST = {
  metadata: {
    name: 'E-Banking Mobile',
    slug: 'ebanking-mobile',
    version: '1.0.0',
    category: 'finance_money',
    themeId: 'default',
  },
  themes: [
    {
      id: 'default',
      name: 'Default',
      light: {
        primaryColor: '#047857',
        harmony: 'complementary',
      },
      dark: {
        primaryColor: '#047857',
        harmony: 'complementary',
      },
      tokens: {
        spacing: {
          none: 0,
          xs: 4,
          s: 8,
          m: 12,
          l: 20,
          xl: 28,
          xxl: 40,
        },
        radii: {
          none: 0,
          s: 4,
          m: 8,
          l: 16,
          full: 9999,
        },
      },
    },
  ],
  activeThemeId: 'default',
  splashScreen: {
    backgroundColor: '#047857',
    image: './assets/splash/icon.png',
    imageWidth: 160,
    resizeMode: 'contain',
    dark: {
      backgroundColor: '#047857',
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
    initialRouteName: 'home',
    routes: [
      {
        name: 'home',
        screenId: 'finance-money-ebanking-home',
        label: 'Home',
        icon: {
          provider: 'material-community',
          name: 'home-outline',
        },
      },
      {
        name: 'assets',
        screenId: 'finance-money-ebanking-assets',
        label: 'Assets',
        icon: {
          provider: 'material-community',
          name: 'chart-pie',
        },
      },
      {
        name: 'payments',
        screenId: 'finance-money-ebanking-payments',
        label: 'Payments',
        icon: {
          provider: 'material-community',
          name: 'swap-horizontal',
        },
      },
      {
        name: 'invest',
        screenId: 'finance-money-ebanking-invest',
        label: 'Invest',
        icon: {
          provider: 'material-community',
          name: 'chart-line',
        },
      },
      {
        name: 'more',
        screenId: 'finance-money-ebanking-more',
        label: 'More',
        icon: {
          provider: 'material-community',
          name: 'dots-horizontal',
        },
      },
    ],
  },
  screens: {
    'finance-money-ebanking-home': {
      id: 'finance-money-ebanking-home',
      name: 'Home',
      title: 'E-banking overview',
      description: 'Balances, quick actions, and upcoming activity at a glance.',
      root: {
        id: 'finance-money-ebanking-home-root',
        type: 'Screen',
        props: {
          width: 'narrow',
          scroll: true,
        },
        children: [
          {
            id: 'finance-money-ebanking-home-header',
            type: 'SectionHeader',
            props: {
              eyebrow: 'Cash overview',
              title: 'Good morning, Alex',
              description: 'Secure view of your money and next actions.',
            },
          },
          {
            id: 'finance-money-ebanking-home-balance',
            type: 'ScreenSection',
            props: {
              title: 'Balances',
              description: 'Your current account position.',
            },
            children: [
              {
                id: 'finance-money-ebanking-home-balance-panel',
                type: 'Panel',
                props: {
                  title: 'Total balance',
                  description: 'Across linked accounts.',
                  tone: 'subtle',
                },
                children: [
                  {
                    id: 'finance-money-ebanking-home-total',
                    type: 'Card',
                    props: {
                      eyebrow: 'Balance',
                      title: 'Total balance',
                      description: 'Available cash and linked account value.',
                      tone: 'outline',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-home-available',
                    type: 'Card',
                    props: {
                      eyebrow: 'Available',
                      title: 'Available now',
                      description: 'Spendable funds after pending activity.',
                      tone: 'outline',
                    },
                  },
                ],
              },
            ],
          },
          {
            id: 'finance-money-ebanking-home-actions',
            type: 'ScreenSection',
            props: {
              title: 'Quick actions',
              description: 'Common money movement tasks.',
            },
            children: [
              {
                id: 'finance-money-ebanking-home-actions-panel',
                type: 'Panel',
                props: {
                  title: 'Quick actions',
                  description: 'Move money with confidence.',
                  tone: 'subtle',
                },
                children: [
                  {
                    id: 'finance-money-ebanking-home-transfer',
                    type: 'Button',
                    props: {
                      children: 'Transfer',
                      color: 'primary',
                      variant: 'solid',
                      size: 'm',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-home-pay',
                    type: 'Button',
                    props: {
                      children: 'Pay',
                      color: 'primary',
                      variant: 'solid',
                      size: 'm',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-home-deposit',
                    type: 'Button',
                    props: {
                      children: 'Deposit',
                      color: 'primary',
                      variant: 'solid',
                      size: 'm',
                    },
                  },
                ],
              },
            ],
          },
          {
            id: 'finance-money-ebanking-home-upcoming',
            type: 'ScreenSection',
            props: {
              title: 'Upcoming payments',
              description: 'Scheduled obligations and due dates.',
            },
            children: [
              {
                id: 'finance-money-ebanking-home-upcoming-panel',
                type: 'Panel',
                props: {
                  title: 'Upcoming payments',
                  description: 'Stay ahead of bills.',
                  tone: 'subtle',
                },
                children: [
                  {
                    id: 'finance-money-ebanking-home-rent',
                    type: 'Card',
                    props: {
                      eyebrow: 'Due soon',
                      title: 'Rent',
                      description: 'Due May 25.',
                      tone: 'outline',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-home-internet',
                    type: 'Card',
                    props: {
                      eyebrow: 'Upcoming',
                      title: 'Internet',
                      description: 'Due May 28.',
                      tone: 'outline',
                    },
                  },
                ],
              },
            ],
          },
          {
            id: 'finance-money-ebanking-home-activity',
            type: 'ScreenSection',
            props: {
              title: 'Recent activity',
              description: 'Latest account movements.',
            },
            children: [
              {
                id: 'finance-money-ebanking-home-activity-panel',
                type: 'Panel',
                props: {
                  title: 'Recent activity',
                  description: 'Review transactions and status.',
                  tone: 'subtle',
                },
                children: [
                  {
                    id: 'finance-money-ebanking-home-whole-foods',
                    type: 'Card',
                    props: {
                      eyebrow: 'Card',
                      title: 'Whole Foods Market',
                      description: 'Pending card purchase.',
                      tone: 'outline',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-home-payroll',
                    type: 'Card',
                    props: {
                      eyebrow: 'Deposit',
                      title: 'Employer payroll',
                      description: 'Completed incoming payment.',
                      tone: 'outline',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    'finance-money-ebanking-assets': {
      id: 'finance-money-ebanking-assets',
      name: 'Assets',
      title: 'Assets',
      description: 'Net worth, account allocation, and linked accounts.',
      root: {
        id: 'finance-money-ebanking-assets-root',
        type: 'Screen',
        props: {
          width: 'narrow',
          scroll: true,
        },
        children: [
          {
            id: 'finance-money-ebanking-assets-header',
            type: 'SectionHeader',
            props: {
              eyebrow: 'Portfolio',
              title: 'Assets',
              description: 'See how your money is distributed.',
            },
          },
          {
            id: 'finance-money-ebanking-assets-net-worth',
            type: 'ScreenSection',
            props: {
              title: 'Net worth',
              description: 'Total value across your accounts.',
            },
            children: [
              {
                id: 'finance-money-ebanking-assets-net-worth-panel',
                type: 'Panel',
                props: {
                  title: 'Net worth',
                  description: 'A clear total with allocation context.',
                  tone: 'subtle',
                },
                children: [
                  {
                    id: 'finance-money-ebanking-assets-net-worth-card',
                    type: 'Card',
                    props: {
                      eyebrow: 'Total',
                      title: 'Net worth',
                      description: 'Current value across linked assets.',
                      tone: 'outline',
                    },
                  },
                ],
              },
            ],
          },
          {
            id: 'finance-money-ebanking-assets-allocation',
            type: 'ScreenSection',
            props: {
              title: 'Allocation',
              description: 'A measured view of account distribution.',
            },
            children: [
              {
                id: 'finance-money-ebanking-assets-allocation-panel',
                type: 'Panel',
                props: {
                  title: 'Allocation',
                  description: 'Checking, savings, and credit composition.',
                  tone: 'subtle',
                },
                children: [
                  {
                    id: 'finance-money-ebanking-assets-checking',
                    type: 'Card',
                    props: {
                      eyebrow: 'Checking',
                      title: 'Checking',
                      description: 'Primary spending account.',
                      tone: 'outline',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-assets-savings',
                    type: 'Card',
                    props: {
                      eyebrow: 'Savings',
                      title: 'Savings',
                      description: 'Emergency fund and goals.',
                      tone: 'outline',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-assets-credit',
                    type: 'Card',
                    props: {
                      eyebrow: 'Credit',
                      title: 'Credit',
                      description: 'Outstanding credit position.',
                      tone: 'outline',
                    },
                  },
                ],
              },
            ],
          },
          {
            id: 'finance-money-ebanking-assets-accounts',
            type: 'ScreenSection',
            props: {
              title: 'Accounts',
              description: 'Manage linked accounts.',
            },
            children: [
              {
                id: 'finance-money-ebanking-assets-accounts-panel',
                type: 'Panel',
                props: {
                  title: 'Linked accounts',
                  description: 'Review balances and account health.',
                  tone: 'subtle',
                },
                children: [
                  {
                    id: 'finance-money-ebanking-assets-add',
                    type: 'Button',
                    props: {
                      children: 'Add account',
                      color: 'primary',
                      variant: 'outline',
                      size: 'm',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    'finance-money-ebanking-payments': {
      id: 'finance-money-ebanking-payments',
      name: 'Payments',
      title: 'Payments',
      description: 'Transfer funds, pay bills, and review scheduled payments.',
      root: {
        id: 'finance-money-ebanking-payments-root',
        type: 'Screen',
        props: {
          width: 'narrow',
          scroll: true,
        },
        children: [
          {
            id: 'finance-money-ebanking-payments-header',
            type: 'SectionHeader',
            props: {
              eyebrow: 'Money movement',
              title: 'Payments',
              description: 'Send and schedule payments securely.',
            },
          },
          {
            id: 'finance-money-ebanking-payments-actions',
            type: 'ScreenSection',
            props: {
              title: 'Actions',
              description: 'Start a payment flow.',
            },
            children: [
              {
                id: 'finance-money-ebanking-payments-actions-panel',
                type: 'Panel',
                props: {
                  title: 'Payment actions',
                  description: 'Choose a guarded action.',
                  tone: 'subtle',
                },
                children: [
                  {
                    id: 'finance-money-ebanking-payments-transfer',
                    type: 'Button',
                    props: {
                      children: 'Transfer',
                      color: 'primary',
                      variant: 'solid',
                      size: 'm',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-payments-bill',
                    type: 'Button',
                    props: {
                      children: 'Pay a bill',
                      color: 'secondary',
                      variant: 'outline',
                      size: 'm',
                    },
                  },
                ],
              },
            ],
          },
          {
            id: 'finance-money-ebanking-payments-scheduled',
            type: 'ScreenSection',
            props: {
              title: 'Scheduled payments',
              description: 'Upcoming obligations and recurring payments.',
            },
            children: [
              {
                id: 'finance-money-ebanking-payments-scheduled-panel',
                type: 'Panel',
                props: {
                  title: 'Scheduled payments',
                  description: 'Rent, utilities, and subscriptions.',
                  tone: 'subtle',
                },
                children: [
                  {
                    id: 'finance-money-ebanking-payments-rent',
                    type: 'Card',
                    props: {
                      eyebrow: 'Scheduled',
                      title: 'Rent payment',
                      description: 'Due May 25.',
                      tone: 'outline',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-payments-hydro',
                    type: 'Card',
                    props: {
                      eyebrow: 'Scheduled',
                      title: 'Hydro bill',
                      description: 'Due May 28.',
                      tone: 'outline',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-payments-mobile',
                    type: 'Card',
                    props: {
                      eyebrow: 'Scheduled',
                      title: 'Mobile plan',
                      description: 'Due May 30.',
                      tone: 'outline',
                    },
                  },
                ],
              },
            ],
          },
          {
            id: 'finance-money-ebanking-payments-recipients',
            type: 'ScreenSection',
            props: {
              title: 'Recent recipients',
              description: 'Trusted destinations for faster transfers.',
            },
            children: [
              {
                id: 'finance-money-ebanking-payments-recipients-panel',
                type: 'Panel',
                props: {
                  title: 'Recent recipients',
                  description: 'Review recipients before sending.',
                  tone: 'subtle',
                },
                children: [
                  {
                    id: 'finance-money-ebanking-payments-james',
                    type: 'Card',
                    props: {
                      eyebrow: 'Recipient',
                      title: 'James Miller',
                      description: 'Verified recipient.',
                      tone: 'outline',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-payments-sophia',
                    type: 'Card',
                    props: {
                      eyebrow: 'Recipient',
                      title: 'Sophia Patel',
                      description: 'Verified recipient.',
                      tone: 'outline',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    'finance-money-ebanking-invest': {
      id: 'finance-money-ebanking-invest',
      name: 'Invest',
      title: 'Invest',
      description: 'Portfolio value, returns, and diversified holdings.',
      root: {
        id: 'finance-money-ebanking-invest-root',
        type: 'Screen',
        props: {
          width: 'narrow',
          scroll: true,
        },
        children: [
          {
            id: 'finance-money-ebanking-invest-header',
            type: 'SectionHeader',
            props: {
              eyebrow: 'Portfolio',
              title: 'Invest',
              description: 'Track long-term progress with measured context.',
            },
          },
          {
            id: 'finance-money-ebanking-invest-portfolio',
            type: 'ScreenSection',
            props: {
              title: 'Portfolio value',
              description: 'Performance over time.',
            },
            children: [
              {
                id: 'finance-money-ebanking-invest-portfolio-panel',
                type: 'Panel',
                props: {
                  title: 'Portfolio value',
                  description: 'Choose a reporting period.',
                  tone: 'subtle',
                },
                children: [
                  {
                    id: 'finance-money-ebanking-invest-value',
                    type: 'Card',
                    props: {
                      eyebrow: 'Value',
                      title: 'Portfolio value',
                      description: 'Value as of today.',
                      tone: 'outline',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-invest-range',
                    type: 'Button',
                    props: {
                      children: '1M',
                      color: 'neutral',
                      variant: 'outline',
                      size: 'm',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-invest-range6',
                    type: 'Button',
                    props: {
                      children: '6M',
                      color: 'neutral',
                      variant: 'outline',
                      size: 'm',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-invest-range1y',
                    type: 'Button',
                    props: {
                      children: '1Y',
                      color: 'primary',
                      variant: 'solid',
                      size: 'm',
                    },
                  },
                ],
              },
            ],
          },
          {
            id: 'finance-money-ebanking-invest-return',
            type: 'ScreenSection',
            props: {
              title: 'Return',
              description: 'Performance summary.',
            },
            children: [
              {
                id: 'finance-money-ebanking-invest-return-panel',
                type: 'Panel',
                props: {
                  title: 'Return',
                  description: 'Separate return from principal.',
                  tone: 'subtle',
                },
                children: [
                  {
                    id: 'finance-money-ebanking-invest-return-card',
                    type: 'Card',
                    props: {
                      eyebrow: 'Performance',
                      title: 'Return',
                      description: 'Past-year return.',
                      tone: 'outline',
                    },
                  },
                ],
              },
            ],
          },
          {
            id: 'finance-money-ebanking-invest-holdings',
            type: 'ScreenSection',
            props: {
              title: 'Holdings',
              description: 'Diversified positions at a glance.',
            },
            children: [
              {
                id: 'finance-money-ebanking-invest-holdings-panel',
                type: 'Panel',
                props: {
                  title: 'Holdings',
                  description: 'Stocks, bonds, and cash equivalents.',
                  tone: 'subtle',
                },
                children: [
                  {
                    id: 'finance-money-ebanking-invest-us',
                    type: 'Card',
                    props: {
                      eyebrow: 'Stocks',
                      title: 'U.S. stocks',
                      description: 'Diversified equity position.',
                      tone: 'outline',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-invest-intl',
                    type: 'Card',
                    props: {
                      eyebrow: 'Stocks',
                      title: 'International stocks',
                      description: 'Global equity position.',
                      tone: 'outline',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-invest-bonds',
                    type: 'Card',
                    props: {
                      eyebrow: 'Bonds',
                      title: 'Bonds',
                      description: 'Stability allocation.',
                      tone: 'outline',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-invest-cash',
                    type: 'Card',
                    props: {
                      eyebrow: 'Cash',
                      title: 'Cash & cash equivalents',
                      description: 'Liquidity reserve.',
                      tone: 'outline',
                    },
                  },
                ],
              },
            ],
          },
          {
            id: 'finance-money-ebanking-invest-browse',
            type: 'Button',
            props: {
              children: 'Browse investments',
              color: 'primary',
              variant: 'outline',
              size: 'm',
            },
          },
        ],
      },
    },
    'finance-money-ebanking-more': {
      id: 'finance-money-ebanking-more',
      name: 'More',
      title: 'More',
      description: 'Profile, security, support, and account preferences.',
      root: {
        id: 'finance-money-ebanking-more-root',
        type: 'Screen',
        props: {
          width: 'narrow',
          scroll: true,
        },
        children: [
          {
            id: 'finance-money-ebanking-more-header',
            type: 'SectionHeader',
            props: {
              eyebrow: 'Account',
              title: 'More',
              description: 'Manage your profile and security.',
            },
          },
          {
            id: 'finance-money-ebanking-more-profile',
            type: 'ScreenSection',
            props: {
              title: 'Profile & security',
              description: 'Keep account access visible and protected.',
            },
            children: [
              {
                id: 'finance-money-ebanking-more-profile-panel',
                type: 'Panel',
                props: {
                  title: 'Profile',
                  description: 'Your profile and security status.',
                  tone: 'subtle',
                },
                children: [
                  {
                    id: 'finance-money-ebanking-more-profile-card',
                    type: 'Card',
                    props: {
                      eyebrow: 'Profile',
                      title: 'Welcome back',
                      description: 'Review your profile.',
                      tone: 'outline',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-more-secure',
                    type: 'Notice',
                    props: {
                      title: 'Your account is secure',
                      description:
                        'We are monitoring your account and will notify you of important activity.',
                      color: 'success',
                    },
                  },
                ],
              },
            ],
          },
          {
            id: 'finance-money-ebanking-more-settings',
            type: 'ScreenSection',
            props: {
              title: 'Settings',
              description: 'Manage preferences and trusted access.',
            },
            children: [
              {
                id: 'finance-money-ebanking-more-settings-panel',
                type: 'Panel',
                props: {
                  title: 'Settings',
                  description: 'Common account controls.',
                  tone: 'subtle',
                },
                children: [
                  {
                    id: 'finance-money-ebanking-more-security',
                    type: 'Card',
                    props: {
                      eyebrow: 'Security',
                      title: 'Security',
                      description: 'Passcode and device controls.',
                      tone: 'outline',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-more-notifications',
                    type: 'Card',
                    props: {
                      eyebrow: 'Notifications',
                      title: 'Notifications',
                      description: 'Alerts and delivery preferences.',
                      tone: 'outline',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-more-beneficiaries',
                    type: 'Card',
                    props: {
                      eyebrow: 'Beneficiaries',
                      title: 'Beneficiaries',
                      description: 'Manage trusted recipients.',
                      tone: 'outline',
                    },
                  },
                  {
                    id: 'finance-money-ebanking-more-help',
                    type: 'Card',
                    props: {
                      eyebrow: 'Support',
                      title: 'Help and support',
                      description: 'Get assistance.',
                      tone: 'outline',
                    },
                  },
                ],
              },
            ],
          },
          {
            id: 'finance-money-ebanking-more-signout',
            type: 'Button',
            props: {
              children: 'Sign out',
              color: 'secondary',
              variant: 'outline',
              size: 'm',
            },
          },
        ],
      },
    },
  },
} satisfies AppManifest;
