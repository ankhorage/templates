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
    eyebrow: 'Signed-in nutrition catalog',
    title: 'Catalog products',
    description:
      'Signed-in scanners browse the shared Swiss product catalog, scan barcodes, and create missing products directly through the gateway.',
    sections: [
      {
        title: 'Restricted catalog',
        description: 'The whole app is protected by global auth. Product browsing happens after sign-in.',
        cards: [
          {
            eyebrow: 'Known product',
            title: 'Bio Greek Yogurt 250 g',
            description:
              'Example product card with brand, package label, barcode, and typed nutrition metadata.',
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
              'Missing barcodes can be turned into real products immediately from the create screen.',
          },
        ],
      },
      {
        title: 'Scanner loop',
        description:
          'Friends sign in, scan products, look up known barcodes, and create missing products when needed.',
        cards: [
          {
            eyebrow: 'Action',
            title: 'Scan barcode',
            description:
              'Open the scanner, normalize barcode digits, and look up the product through the gateway.',
          },
          {
            eyebrow: 'Create path',
            title: 'Direct product creation',
            description:
              'When a barcode is unknown, the app opens a direct product create form instead of a capture queue.',
          },
        ],
      },
    ],
  },
  detail: {
    eyebrow: 'Published product',
    title: 'Product detail',
    description:
      'Show barcode, brand, package label, image refs, and nutrition facts from the API Gateway.',
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
            eyebrow: 'Stable DTO',
            title: 'Gateway-owned product shape',
            description:
              'The detail payload exposes packageLabel, nutritionFacts, imageRefs, and soft-delete-safe product reads.',
          },
        ],
      },
    ],
  },
  scan: {
    eyebrow: 'Authenticated scan',
    title: 'Scan barcode',
    description:
      'Use the ZORA BarcodeScannerView with an app-level camera adapter. Successful scans look up products by barcode and branch to detail or create.',
    sections: [
      {
        title: 'Scanner adapter',
        description:
          'Native camera dependencies such as expo-camera stay in the generated app adapter; ZORA owns visible scanner UI.',
        cards: [
          {
            eyebrow: 'Camera shell',
            title: 'BarcodeScannerView',
            description:
              'Use ZORA scanner, permission, and overlay primitives for the visible scanner surface.',
          },
          {
            eyebrow: 'Fallback',
            title: 'Manual barcode entry',
            description:
              'Useful on web, simulator, denied camera permission, or damaged retail labels.',
          },
        ],
      },
      {
        title: 'Lookup branch',
        description: 'After scanning, call GET /v1/nutrition/products/by-barcode/{barcode}.',
        cards: [
          {
            eyebrow: 'Found',
            title: 'Open product detail',
            description:
              'A known barcode opens the product detail screen.',
          },
          {
            eyebrow: 'Unknown',
            title: 'Create product',
            description:
              'A missing barcode opens the direct product create form.',
          },
        ],
      },
    ],
  },
  capture: {
    eyebrow: 'Direct create flow',
    title: 'Create product',
    description:
      'Collect the minimal data needed to create a nutrition product directly through the gateway.',
    sections: [
      {
        title: 'Required fields',
        description: 'Keep in-store entry fast while matching the current product API.',
        cards: [
          {
            eyebrow: 'Product identity',
            title: 'Barcode, name, brand',
            description: 'The barcode is prefilled from the scanner or manual input.',
          },
          {
            eyebrow: 'Packaging',
            title: 'Package label',
            description: 'Store package text such as 500ml, 1L, or 6 x 33cl.',
          },
          {
            eyebrow: 'Photos placeholder',
            title: 'Front, nutrition, ingredients, barcode',
            description: 'Real image upload can be added later through typed imageRefs inputs.',
          },
        ],
      },
    ],
  },
  challenge: {
    eyebrow: 'Active challenge',
    title: 'Scanner challenge',
    description:
      'Show challenge rules, dates, invite status, scoring, and the signed-in scanner progress.',
    sections: [
      {
        title: 'Scoring rules',
        description:
          'Point rules should reward useful scans and discourage duplicate barcode farming.',
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
            description:
              'Awarded later when review tooling publishes or accepts the captured product.',
          },
        ],
      },
    ],
  },
  leaderboard: {
    eyebrow: 'Catalog progress',
    title: 'Stats',
    description: 'Use this screen for catalog growth, scan throughput, and contributor-facing nutrition app metrics.',
    sections: [
      {
        title: 'Suggested metrics',
        description: 'This starter no longer assumes challenge or scan-event APIs.',
        cards: [
          {
            eyebrow: 'Catalog',
            title: 'Products added',
            description:
              'Track how many products were created or enriched through the app.',
          },
          {
            eyebrow: 'Quality',
            title: 'Lookup hit rate',
            description: 'Compare known-barcode hits against direct product creation prompts.',
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
        description:
          'Profile data comes from the app-facing profiles table linked to Supabase Auth.',
        cards: [
          {
            eyebrow: 'Identity',
            title: 'Display name and avatar',
            description:
              'Stored in public.profiles; auth.users remains provider-owned identity data.',
          },
          {
            eyebrow: 'Stats',
            title: 'Catalog activity',
            description: 'Aggregate product contributions and lookup activity from app-facing analytics.',
          },
        ],
      },
    ],
  },
  success: {
    eyebrow: 'Product created',
    title: 'Thanks - product created',
    description:
      'The API returns the created product directly, so the app can open detail or continue scanning immediately.',
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
            title: 'Open product detail',
            description: 'Show the freshly created product and let the scanner add more metadata later.',
          },
        ],
      },
    ],
  },
  queue: {
    eyebrow: 'Offline-ready shell',
    title: 'Create queue',
    description:
      'A simple local queue abstraction prepares the signed-in app for offline retry without losing direct-create field data.',
    sections: [
      {
        title: 'Queue states',
        description: 'Use ZORA cards and notices for pending, failed, and submitted items.',
        cards: [
          {
            eyebrow: 'Pending',
            title: 'Waiting for connection',
            description: 'Create requests can be stored locally until the gateway is reachable again.',
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
    description: 'Friends sign in before entering the nutrition scanner app.',
    sections: [
      {
        title: 'Scanner access',
        description: 'This template uses global auth, so app entry is protected.',
        cards: [
          {
            eyebrow: 'Auth provider',
            title: 'Supabase Auth',
            description: 'Email sign-in is the default identity flow for generated nutrition scanner apps.',
          },
        ],
      },
    ],
  },
  signUp: {
    eyebrow: 'Join scanner app',
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
            description: 'The profile table stores display name and avatar for shared catalog attribution.',
          },
        ],
      },
    ],
  },
  settings: {
    eyebrow: 'Nutrition app settings',
    title: 'Settings',
    description:
      'Configuration for API Gateway base URL, locale, profile table, and nutrition scanner auth.',
    sections: [
      {
        title: 'Runtime configuration',
        description: 'Settings screen sections are assembled by the screen factory.',
        cards: [
          {
            eyebrow: 'Auth',
            title: 'Global Supabase auth',
            description: 'Friends sign in before entering the scanner app.',
          },
        ],
      },
    ],
  },
} satisfies Record<string, NutritionCatalogScreenContent>;
