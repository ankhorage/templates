export const graphicsDesignContent = {
  dashboard: {
    eyebrow: 'Creative ops',
    title: 'Work in motion',
    description: 'Seed the workspace with active briefs, review requests, and delivery status.',
    sections: [
      {
        title: 'Today pipeline',
        description: 'Model what designers need to ship: briefs, assets, and approvals.',
        cards: [
          {
            eyebrow: 'Brief',
            title: 'Campaign key art',
            description: 'A placeholder for deliverables, due date, and stakeholders.',
          },
          {
            eyebrow: 'Review',
            title: 'Awaiting feedback',
            description: 'Reserve for comment threads, status, and next actions.',
          },
        ],
      },
    ],
  },
  briefs: {
    eyebrow: 'Briefs',
    title: 'Creative briefs',
    description: 'Prepare a list of briefs with scope, references, and output formats.',
    sections: [
      {
        title: 'Brief structure',
        description: 'Model inputs and constraints before adding workflow automation.',
        cards: [
          {
            eyebrow: 'Scope',
            title: 'Deliverables list',
            description: 'A placeholder for sizes, formats, and channels.',
          },
          {
            eyebrow: 'Reference',
            title: 'Moodboard',
            description: 'Reserve for links, inspiration, and brand context.',
          },
        ],
      },
    ],
  },
  assets: {
    eyebrow: 'Assets',
    title: 'Asset library',
    description: 'Organize assets by collection, status, and usage rules.',
    sections: [
      {
        title: 'Asset types',
        description: 'Model file metadata without implementing storage rules.',
        cards: [
          {
            eyebrow: 'Collection',
            title: 'Social templates',
            description: 'A placeholder asset collection with owners and usage notes.',
          },
          {
            eyebrow: 'Collection',
            title: 'Product imagery',
            description: 'Reserve for versioning, approval, and licensing metadata.',
          },
        ],
      },
    ],
  },
  reviews: {
    eyebrow: 'Reviews',
    title: 'Feedback and approvals',
    description: 'Seed the review surface with comment threads and approval states.',
    sections: [
      {
        title: 'Review queue',
        description: 'Model review cards with status, owners, and next feedback.',
        cards: [
          {
            eyebrow: 'In review',
            title: 'Homepage hero',
            description: 'A placeholder for review notes and version history.',
          },
          {
            eyebrow: 'Approved',
            title: 'Email header',
            description: 'Reserve for final asset packaging and handoff.',
          },
        ],
      },
    ],
  },
  brand: {
    eyebrow: 'Brand',
    title: 'Brand tokens and guidelines',
    description: 'Reserve space for brand colors, typography, and component rules.',
    sections: [
      {
        title: 'Tokens',
        description: 'Model the brand surface without implementing full design-system tooling.',
        cards: [
          {
            eyebrow: 'Color',
            title: 'Primary palette',
            description: 'A placeholder for theme colors and contrast guidance.',
          },
          {
            eyebrow: 'Typography',
            title: 'Type scale',
            description: 'Reserve for headings, body rules, and usage constraints.',
          },
        ],
      },
    ],
  },
  settings: {
    eyebrow: 'Operations',
    title: 'Workspace settings',
    description: 'Model review defaults, exports, and collaboration preferences.',
  },
} as const;

