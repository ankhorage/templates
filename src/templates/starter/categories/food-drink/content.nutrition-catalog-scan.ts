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
    eyebrow: 'Swiss product catalog',
    title: 'Available products',
    description:
      'Browse published products from the API Gateway and use the primary scan action to add more products from Swiss stores.',
    sections: [
      {
        title: 'Catalog feed',
        description:
          'Backed by the planned GET /v1/nutrition/products endpoint with search, pagination, and store-chain filters.',
        cards: [
          {
            eyebrow: 'Migros · published',
            title: 'Bio Greek Yogurt 250 g',
            description:
              'Example published product card with brand, quantity, barcode, and confidence metadata.',
          },
          {
            eyebrow: 'Coop · published',
            title: 'Haferdrink Barista 1 l',
            description:
              'Catalog items should render with ZORA cards and never read directly from Supabase.',
          },
          {
            eyebrow: 'Denner · candidate',
            title: 'Protein Quark Vanilla',
            description:
              'The template reserves room for recent captures once review and publish flows are available.',
          },
        ],
      },
      {
        title: 'Primary contribution action',
        description:
          'The scan CTA is the main way to grow the database while keeping browsing useful for users who do not scan yet.',
        cards: [
          {
            eyebrow: 'Main CTA',
            title: 'Scan barcode',
            description:
              'Open the scanner, normalize barcode digits, then lookup or create a queued capture submission.',
          },
          {
            eyebrow: 'Fallback',
            title: 'Enter barcode manually',
            description:
              'Useful on web, simulator, denied camera permission, or damaged retail labels.',
          },
        ],
      },
    ],
  },
  detail: {
    eyebrow: 'Published product',
    title: 'Product detail',
    description:
      'Show barcode, brand, quantity, confidence, store observations, and nutrition facts from the public lookup model.',
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
            eyebrow: 'Nutrition facts',
            title: 'Per 100 g values',
            description:
              'Energy, protein, carbohydrates, sugars, fat, saturated fat, fiber, salt, and sodium can appear once published.',
          },
        ],
      },
    ],
  },
  scan: {
    eyebrow: 'Scan to add',
    title: 'Scan barcode',
    description:
      'Use expo-camera under a local adapter now and migrate the visible scanner and permission states into ZORA later.',
    sections: [
      {
        title: 'Camera permission',
        description:
          'Permission prompts, denied states, retry actions, and manual entry fallback should be composed from ZORA UI.',
        cards: [
          {
            eyebrow: 'Native capability',
            title: 'expo-camera barcode scanner',
            description:
              'The native camera dependency should stay isolated behind a small scanner adapter, not leak into generic templates.',
          },
          {
            eyebrow: 'Future ZORA component',
            title: 'BarcodeScannerView',
            description:
              'A reusable ZORA scanner wrapper can own permission UI, scan overlay, loading, and error states.',
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
              'A 200 response opens the product detail screen for the published product.',
          },
          {
            eyebrow: 'Unknown',
            title: 'Create capture',
            description:
              'A 404 response is expected for unknown barcodes and opens the capture form.',
          },
        ],
      },
    ],
  },
  capture: {
    eyebrow: 'Queued contribution',
    title: 'Capture missing product',
    description:
      'Collect the minimal data needed to create a queued capture submission through the API Gateway.',
    sections: [
      {
        title: 'Required fields',
        description: 'Keep the first PR fast and field-friendly.',
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
            description:
              'Real image upload is intentionally deferred; capture image paths stay API-shaped.',
          },
        ],
      },
    ],
  },
  success: {
    eyebrow: 'Submission queued',
    title: 'Thanks — product queued',
    description:
      'The API returns a submission id and queued status. Publishing happens later through review/merge tooling.',
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
            eyebrow: 'Review',
            title: 'Open local queue',
            description: 'Inspect pending or failed submissions once offline retry is wired.',
          },
        ],
      },
    ],
  },
  queue: {
    eyebrow: 'Offline-ready shell',
    title: 'Capture queue',
    description:
      'A simple local queue abstraction prepares the template for offline retry without overbuilding the first PR.',
    sections: [
      {
        title: 'Queue states',
        description: 'Use ZORA cards and notices for pending, failed, and submitted items.',
        cards: [
          {
            eyebrow: 'Pending',
            title: 'Waiting for connection',
            description:
              'Submissions can be stored locally with anonymousDeviceId and clientCapturedAt.',
          },
          {
            eyebrow: 'Failed',
            title: 'Retry required',
            description: 'Keep failures visible instead of silently dropping field data.',
          },
        ],
      },
    ],
  },
  settings: {
    eyebrow: 'Field scanner settings',
    title: 'Settings',
    description:
      'Configuration for API Gateway base URL, locale, app version, and anonymous device id.',
  },
} satisfies Record<
  string,
  NutritionCatalogScreenContent | { eyebrow: string; title: string; description: string }
>;
