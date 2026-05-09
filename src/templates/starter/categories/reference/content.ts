export const referenceContent = {
  browse: {
    eyebrow: 'Browse',
    title: 'Explore reference sets',
    description: 'Seed browsing with featured collections, quick links, and popular entries.',
    sections: [
      {
        title: 'Featured sets',
        description: 'Model curated sets and entrypoints before adding a full taxonomy engine.',
        cards: [
          {
            eyebrow: 'Set',
            title: 'Quick lookup',
            description: 'A placeholder for common lookups and favorite shortcuts.',
          },
          {
            eyebrow: 'Set',
            title: 'Top entries',
            description: 'Reserve for trending queries and editorial highlights.',
          },
        ],
      },
    ],
  },
  search: {
    eyebrow: 'Search',
    title: 'Search the knowledge base',
    description: 'Provide a query input and scope hints before wiring the search index.',
  },
  categories: {
    eyebrow: 'Categories',
    title: 'Browse by topic',
    description: 'Seed taxonomy cards and navigation hints for structured reference content.',
    sections: [
      {
        title: 'Topic groups',
        description: 'Model category groupings that scale as content grows.',
        cards: [
          {
            eyebrow: 'Category',
            title: 'Basics',
            description: 'A placeholder category with subtopics and entry count.',
          },
          {
            eyebrow: 'Category',
            title: 'Advanced',
            description: 'Reserve for deep dives, glossaries, and best practices.',
          },
        ],
      },
    ],
  },
  saved: {
    eyebrow: 'Saved',
    title: 'Bookmarks and notes',
    description: 'Keep saved entries, reading lists, and reference notes visible.',
    sections: [
      {
        title: 'Saved items',
        description: 'Model bookmarks without implementing persistence or sync.',
        cards: [
          {
            eyebrow: 'Bookmark',
            title: 'Pinned entry',
            description: 'A placeholder saved entry with tag and last accessed time.',
          },
          {
            eyebrow: 'List',
            title: 'Study set',
            description: 'Reserve for saved collections and review sessions.',
          },
        ],
      },
    ],
  },
  history: {
    eyebrow: 'History',
    title: 'Recent lookups',
    description: 'Model recent entries and revisit states for reference usage.',
    sections: [
      {
        title: 'Recently viewed',
        description: 'Seed history cards with timestamps and quick actions.',
        cards: [
          {
            eyebrow: 'Recent',
            title: 'Last lookup',
            description: 'A placeholder for revisiting an entry and saving it.',
          },
          {
            eyebrow: 'Recent',
            title: 'Related entries',
            description: 'Reserve for suggested follow-ups and cross links.',
          },
        ],
      },
    ],
  },
  settings: {
    eyebrow: 'Settings',
    title: 'Reference settings',
    description: 'Model search, language, and offline preferences for reference apps.',
  },
} as const;

