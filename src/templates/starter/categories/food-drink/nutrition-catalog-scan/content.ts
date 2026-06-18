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
      'Signed-in scanners browse the shared Swiss product catalog, scan barcodes, and create missing products directly through the nutrition API.',
    sections: [
      {
        title: 'Product catalog',
        description:
          'The whole app is protected by global auth. Product browsing happens after sign-in.',
        cards: [
          {
            eyebrow: 'Known product',
            title: 'Bio Greek Yogurt 250 g',
            description:
              'Example product card with brand, package label, barcode, and nutritionFacts metadata.',
          },
          {
            eyebrow: 'Known product',
            title: 'Haferdrink Barista 1 l',
            description: 'Products are read through the nutrition API, not directly from Supabase.',
          },
          {
            eyebrow: 'Catalog growth',
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
              'Open the scanner, normalize barcode digits, and look up the product through the nutrition API.',
          },
          {
            eyebrow: 'Create path',
            title: 'Direct product creation',
            description:
              'When a barcode is unknown, the app opens a direct product create form instead of any intermediate queue.',
          },
        ],
      },
    ],
  },
  detail: {
    eyebrow: 'Published product',
    title: 'Product detail',
    description:
      'Show barcode, brand, packageLabel, imageRefs, and nutritionFacts from the nutrition API.',
    sections: [
      {
        title: 'Product summary',
        description: 'A product detail screen for the current NutritionProduct DTO.',
        cards: [
          {
            eyebrow: 'Primary barcode',
            title: '7612345678901 · ean_13',
            description: 'Barcode values are normalized by removing non-digits before lookup.',
          },
          {
            eyebrow: 'Stable DTO',
            title: 'Product-centric response shape',
            description:
              'The detail payload exposes packageLabel, nutritionFacts, imageRefs, createdAt, updatedAt, and optional soft-delete metadata.',
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
              'Manual entry should use the same lookup path as the scanner on web, simulator, denied camera permission, or damaged retail labels.',
          },
        ],
      },
      {
        title: 'Lookup branch',
        description: 'After scanning, call GET /products/by-barcode/:barcode.',
        cards: [
          {
            eyebrow: 'Found',
            title: 'Open product detail',
            description: 'A known barcode opens the product detail screen.',
          },
          {
            eyebrow: 'Unknown',
            title: 'Create product',
            description: 'A missing barcode opens the direct product create form.',
          },
        ],
      },
    ],
  },
  create: {
    eyebrow: 'Direct create flow',
    title: 'Create product',
    description:
      'Collect the minimal data needed to create a nutrition product directly through the nutrition API.',
    sections: [
      {
        title: 'Required fields',
        description: 'Keep in-store entry fast while matching the current product API.',
        cards: [
          {
            eyebrow: 'Product identity',
            title: 'barcode, name, brand',
            description: 'The barcode is prefilled from the scanner or manual input.',
          },
          {
            eyebrow: 'Packaging',
            title: 'packageLabel',
            description: 'Store package text such as 500ml, 1L, or 6 x 33cl.',
          },
          {
            eyebrow: 'Structured data',
            title: 'nutritionFacts and imageRefs',
            description:
              'Use the current DTO fields directly so create requests can match the live product contract.',
          },
        ],
      },
    ],
  },
  stats: {
    eyebrow: 'Catalog progress',
    title: 'Stats',
    description:
      'Use this screen for catalog growth, scan throughput, and contributor-facing nutrition app metrics.',
    sections: [
      {
        title: 'Suggested metrics',
        description: 'This starter keeps metrics focused on the product catalog and scanner flow.',
        cards: [
          {
            eyebrow: 'Catalog',
            title: 'Products added',
            description: 'Track how many products were created or enriched through the app.',
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
    description: 'Show signed-in scanner profile, catalog stats, invite status, and sign-out action.',
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
            description:
              'Aggregate product contributions and lookup activity from app-facing analytics.',
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
            description:
              'Email sign-in is the default identity flow for generated nutrition scanner apps.',
          },
        ],
      },
    ],
  },
  signUp: {
    eyebrow: 'Join scanner app',
    title: 'Create scanner account',
    description: 'Create an account with display name before scanning.',
    sections: [
      {
        title: 'Profile creation',
        description: 'Generated infra should create a profiles row linked to the auth user.',
        cards: [
          {
            eyebrow: 'Required fields',
            title: 'Email, password, display name',
            description:
              'The profile table stores display name and avatar for shared catalog attribution.',
          },
        ],
      },
    ],
  },
  settings: {
    eyebrow: 'Nutrition app settings',
    title: 'Settings',
    description:
      'Configuration for nutrition API base URL, locale, profile table, and nutrition scanner auth.',
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
