interface NutritionCatalogCardContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

interface NutritionCatalogSectionContent {
  readonly title: string;
  readonly description: string;
  readonly cards: readonly NutritionCatalogCardContent[];
}

interface NutritionCatalogScreenContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly sections: readonly NutritionCatalogSectionContent[];
}

export const nutritionCatalogScanContent = {
  catalog: {
    eyebrow: 'Friends-only scanner challenge',
    title: 'Challenge products',
    description:
      'Signed-in scanners browse the shared Swiss product catalog, scan new products, and collect points for the active challenge.',
    sections: [
      {
        title: 'Restricted catalog',
        description:
          'The whole app is protected by global auth. Product browsing happens after sign-in inside the challenge app.',
        cards: [
          {
            eyebrow: 'Known product',
            title: 'Bio Greek Yogurt 250 g',
            description: 'Example product card with brand, quantity, barcode, and confidence metadata.',
          },
          {
            eyebrow: 'Known product',
            title: 'Haferdrink Barista 1 l',
            description: 'Products are read through the API Gateway, not directly from Supabase.',
          },
          {
            eyebrow: 'Contribution target',
            title: 'Missing supermarket products',
            description:
              'Scanners earn more points when a missing barcode becomes a queued capture submission.',
          },
        ],
      },
      {
        title: 'Challenge loop',
        description: 'Friends sign in, scan products, submit missing products, and climb the leaderboard.',
        cards: [
          {
            eyebrow: 'Action',
            title: 'Scan barcode',
            description:
              'Open the scanner, normalize barcode digits, then record a scan event for the signed-in user.',
          },
          {
            eyebrow: 'Ranking',
            title: 'Points and leaderboard',
            description:
              'Known product scans, missing product captures, and accepted captures can use different point values.',
          },
        ],
      },
    ],
  },
  detail: {
    eyebrow: 'Published product',
    title: 'Product detail',
    description:
      'Show barcode, brand, quantity, confidence, store observations, and nutrition facts from the API Gateway.',
    sections: [
      {
        title: 'Product summary',
        description: 'A product detail screen for data returned by the API Gateway.',
        cards: [
          {
            eyebrow: 'Primary barcode',
            title: '7612345678901 · EAN-13',
            description: 'Barcode values are normalized by removing non-digits before lookup.',
          },
          {
            eyebrow: 'Challenge value',
            title: 'Known scan: 1 point',
            description: 'The backend should avoid duplicate point farming with per-user barcode limits.',
          },
        ],
      },
    ],
  },
  scan: {
    eyebrow: 'Authenticated scan',
    title: 'Scan barcode',
    description:
      'Use the ZORA BarcodeScannerView with an app-level camera adapter. Successful scans create signed-in scan events.',
    sections: [
      {
        title: 'Scanner adapter',
        description:
          'Native camera dependencies such as expo-camera stay in the generated app adapter; ZORA owns visible scanner UI.',
        cards: [
          {
            eyebrow: 'Camera shell',
            title: 'BarcodeScannerView',
            description: 'Use ZORA scanner, permission, and overlay primitives for the visible scanner surface.',
          },
          {
            eyebrow: 'Fallback',
            title: 'Manual barcode entry',
            description: 'Useful on web, simulator, denied camera permission, or damaged retail labels.',
          },
        ],
      },
      {
        title: 'Lookup branch',
        description: 'After scanning, call GET /v1/nutrition/products/by-barcode/{barcode}.',
        cards: [
          {
            eyebrow: 'Found',
            title: 'Record known scan',
            description: 'A known barcode creates a scan event and can open the product detail screen.',
          },
          {
            eyebrow: 'Unknown',
            title: 'Create capture',
            description: 'A missing barcode opens the capture form and can earn more challenge points.',
          },
        ],
      },
    ],
  },
  capture: {
    eyebrow: 'Challenge contribution',
    title: 'Capture missing product',
    description:
      'Collect the minimal data needed to create a queued capture submission for the signed-in scanner.',
    sections: [
      {
        title: 'Required fields',
        description: 'Keep in-store entry fast and reward useful missing-product captures.',
        cards: [
          {
            eyebrow: 'Product identity',
            title: 'Name, brand, quantity',
            description: 'The barcode is prefilled from the scanner or manual input.',
          },
          {
            eyebrow: 'Store observation',
            title: 'Store chain and location label',
            description: 'Country defaults to CH with de-CH client locale for the Swiss MVP.',
          },
          {
            eyebrow: 'Photos placeholder',
            title: 'Front, nutrition, ingredients, barcode',
            description: 'Real image upload can be added after the first challenge flow works.',
          },
        ],
      },
    ],
  },
  challenge: {
    eyebrow: 'Active challenge',
    title: 'Scanner challenge',
    description: 'Show challenge rules, dates, invite status, scoring, and the signed-in scanner progress.',
    sections: [
      {
        title: 'Scoring rules',
        description: 'Point rules should reward useful scans and discourage duplicate barcode farming.',
        cards: [
          {
            eyebrow: 'Known scan',
            title: '1 point',
            description: 'Awarded for a valid known product scan within the duplicate limits.',
          },
          {
            eyebrow: 'Missing product',
            title: '5 points',
            description: 'Awarded when a signed-in scanner submits a new missing product capture.',
          },
          {
            eyebrow: 'Accepted capture',
            title: '20 points',
            description: 'Awarded later when review tooling publishes or accepts the captured product.',
          },
        ],
      },
    ],
  },
  leaderboard: {
    eyebrow: 'Friends ranking',
    title: 'Leaderboard',
    description: 'Rank signed-in scanners by challenge points, then scan count as a tie breaker.',
    sections: [
      {
        title: 'Top scanners',
        description: 'The API Gateway should expose leaderboard rows for the active challenge.',
        cards: [
          {
            eyebrow: '#1',
            title: 'Scanner with most points',
            description: 'Show display name, points, scan count, accepted captures, and current rank.',
          },
          {
            eyebrow: 'Anti-spam',
            title: 'Backend ranking rules',
            description: 'Duplicate and rejected captures should not increase score.',
          },
        ],
      },
    ],
  },
  profile: {
    eyebrow: 'Scanner profile',
    title: 'Profile',
    description: 'Show signed-in scanner profile, stats, invite status, and sign-out action.',
    sections: [
      {
        title: 'Profile data',
        description: 'Profile data comes from the app-facing profiles table linked to Supabase Auth.',
        cards: [
          {
            eyebrow: 'Identity',
            title: 'Display name and avatar',
            description: 'Stored in public.profiles; auth.users remains provider-owned identity data.',
          },
          {
            eyebrow: 'Stats',
            title: 'Scans, captures, points',
            description: 'Aggregate challenge stats from scan events and capture submissions.',
          },
        ],
      },
    ],
  },
  success: {
    eyebrow: 'Submission queued',
    title: 'Thanks — product queued',
    description:
      'The API returns a submission id and queued status. Points can be updated immediately or after review.',
    sections: [
      {
        title: 'Next actions',
        description: 'Keep contributors in the scan loop.',
        cards: [
          {
            eyebrow: 'Continue',
            title: 'Scan another product',
            description: 'Return to the scan screen for fast in-store collection.',
          },
          {
            eyebrow: 'Ranking',
            title: 'Open leaderboard',
            description: 'Show the scanner how the capture affected their challenge ranking.',
          },
        ],
      },
    ],
  },
  queue: {
    eyebrow: 'Offline-ready shell',
    title: 'Capture queue',
    description:
      'A simple local queue abstraction prepares the signed-in app for offline retry without losing field data.',
    sections: [
      {
        title: 'Queue states',
        description: 'Use ZORA cards and notices for pending, failed, and submitted items.',
        cards: [
          {
            eyebrow: 'Pending',
            title: 'Waiting for connection',
            description: 'Submissions can be stored locally with user id and clientCapturedAt.',
          },
          {
            eyebrow: 'Failed',
            title: 'Retry required',
            description: 'Keep failures visible instead of silently dropping scanner data.',
          },
        ],
      },
    ],
  },
  signIn: {
    eyebrow: 'Restricted access',
    title: 'Sign in',
    description: 'Friends sign in before entering the scanner challenge app.',
    sections: [
      {
        title: 'Challenge access',
        description: 'This template uses global auth, so app entry is protected.',
        cards: [
          {
            eyebrow: 'Auth provider',
            title: 'Supabase Auth',
            description: 'Email sign-in is the default identity flow for generated challenge apps.',
          },
        ],
      },
    ],
  },
  signUp: {
    eyebrow: 'Join challenge',
    title: 'Create scanner account',
    description: 'Create an account with display name and optional invite code before scanning.',
    sections: [
      {
        title: 'Profile creation',
        description: 'Generated infra should create a profiles row linked to the auth user.',
        cards: [
          {
            eyebrow: 'Required fields',
            title: 'Email, password, display name',
            description: 'The profile table stores display name and avatar for leaderboard rows.',
          },
        ],
      },
    ],
  },
  settings: {
    eyebrow: 'Challenge app settings',
    title: 'Settings',
    description: 'Configuration for API Gateway base URL, locale, profile table, and challenge auth.',
  },
} satisfies Record<string, NutritionCatalogScreenContent>;
