export const newsMagazinesContent = {
  headlines: {
    eyebrow: 'Top stories',
    title: 'Headlines and briefings',
    description: 'Seed the feed with top stories, breaking alerts, and editorial highlights.',
    sections: [
      {
        title: 'Today briefing',
        description: 'Model story cards with source, topic, and urgency.',
        cards: [
          {
            eyebrow: 'Breaking',
            title: 'Major headline',
            description: 'A placeholder for breaking news with summary and follow-up coverage.',
          },
          {
            eyebrow: 'Analysis',
            title: 'Deep dive',
            description: 'Reserve for long-form pieces and topic explainers.',
          },
        ],
      },
    ],
  },
  topics: {
    eyebrow: 'Topics',
    title: 'Follow what matters',
    description: 'Organize topics and subscriptions before implementing personalization.',
    sections: [
      {
        title: 'Topic sets',
        description: 'Model the topic taxonomy a reader expects.',
        cards: [
          {
            eyebrow: 'Topic',
            title: 'Technology',
            description: 'A placeholder topic card with follow status and alert frequency.',
          },
          {
            eyebrow: 'Topic',
            title: 'World',
            description: 'Reserve for region focus, sources, and reading bundles.',
          },
        ],
      },
    ],
  },
  saved: {
    eyebrow: 'Saved',
    title: 'Bookmarks and reading list',
    description: 'Keep saved articles, highlights, and read-later states visible.',
    sections: [
      {
        title: 'Saved items',
        description: 'Model saved states and collections without building a full reader engine.',
        cards: [
          {
            eyebrow: 'Saved',
            title: 'Read later',
            description: 'A placeholder saved story with tag and priority.',
          },
          {
            eyebrow: 'Collection',
            title: 'Weekend reads',
            description: 'Reserve for saved bundles and topic collections.',
          },
        ],
      },
    ],
  },
  search: {
    eyebrow: 'Search',
    title: 'Search stories and sources',
    description: 'Provide a search input and filters before wiring the index.',
  },
  profile: {
    eyebrow: 'Reader profile',
    title: 'Subscription and preferences',
    description: 'Model topic preferences, digest frequency, and reading defaults.',
  },
} as const;

