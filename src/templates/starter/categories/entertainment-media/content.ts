export const entertainmentMediaContent = {
  discover: {
    eyebrow: 'Discovery',
    title: 'Find something to watch',
    description: 'Seed the app with featured releases, trending picks, and personalized rows.',
    sections: [
      {
        title: 'Featured releases',
        description: 'Model the hero content and supporting recommendations.',
        cards: [
          {
            eyebrow: 'New',
            title: 'Tonight premiere',
            description: 'A placeholder for featured content with a CTA and metadata.',
          },
          {
            eyebrow: 'Trending',
            title: 'Top 10 in your region',
            description: 'Reserve for ranking, momentum, and social proof.',
          },
        ],
      },
    ],
  },
  watchlist: {
    eyebrow: 'Saved',
    title: 'Your watchlist',
    description: 'Keep saved content, reminders, and upcoming releases visible.',
    sections: [
      {
        title: 'Saved items',
        description: 'Model saved content cards with status and availability.',
        cards: [
          {
            eyebrow: 'Saved',
            title: 'Continue later',
            description: 'A placeholder saved item with season/episode status and last played.',
          },
          {
            eyebrow: 'Coming soon',
            title: 'Next season',
            description: 'Reserve for release reminders and subscription gating.',
          },
        ],
      },
    ],
  },
  now: {
    eyebrow: 'Now playing',
    title: 'Continue watching',
    description: 'A focused playback surface with progress and next episode suggestions.',
    sections: [
      {
        title: 'Resume',
        description: 'Model playback continuity and “up next” suggestions.',
        cards: [
          {
            eyebrow: 'Resume',
            title: 'Last session',
            description: 'A placeholder for progress, subtitles, and device handoff.',
          },
          {
            eyebrow: 'Up next',
            title: 'Suggested episode',
            description: 'Reserve for recommendations based on watch history.',
          },
        ],
      },
    ],
  },
  library: {
    eyebrow: 'Library',
    title: 'Your catalog',
    description: 'Organize content by category, downloads, and collections.',
    sections: [
      {
        title: 'Collections',
        description: 'Model categories and collections before adding taxonomy engines.',
        cards: [
          {
            eyebrow: 'Collection',
            title: 'Downloaded',
            description: 'A placeholder for offline assets and storage settings.',
          },
          {
            eyebrow: 'Collection',
            title: 'Genres',
            description: 'Reserve for genre browsing and editorial curation.',
          },
        ],
      },
    ],
  },
  profile: {
    eyebrow: 'Viewer profile',
    title: 'Playback and account defaults',
    description: 'Model subtitles, downloads, and profile preferences.',
  },
} as const;

