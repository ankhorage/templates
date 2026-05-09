export const booksReadingContent = {
  library: {
    eyebrow: 'Reading shelf',
    title: 'Your library at a glance',
    description: 'Track what you own, what you are reading, and what is next.',
    sections: [
      {
        title: 'Currently reading',
        description: 'Keep the active queue visible with progress and format metadata.',
        cards: [
          {
            eyebrow: 'In progress',
            title: 'The next chapter',
            description: 'A placeholder for chapter progress, highlights, and reading streaks.',
          },
          {
            eyebrow: 'Audio',
            title: 'Commute listen',
            description: 'Reserve a slot for audio playback resume and bookmarks.',
          },
        ],
      },
    ],
  },
  discover: {
    eyebrow: 'Discover',
    title: 'Curated recommendations',
    description: 'Seed the discovery surface with editorial picks and personalized shelves.',
    sections: [
      {
        title: 'Featured picks',
        description: 'Model book cards with genre tags, series context, and reasons to read.',
        cards: [
          {
            eyebrow: 'Editor pick',
            title: 'A modern classic',
            description: 'Use this card to explain why the book matters to the reader.',
          },
          {
            eyebrow: 'Because you liked',
            title: 'Similar voices',
            description: 'Reserve this space for similarity, reviews, and shared themes.',
          },
        ],
      },
    ],
  },
  lists: {
    eyebrow: 'Lists',
    title: 'Reading lists and goals',
    description: 'Organize the collection into queues, challenges, and saved wishlists.',
    sections: [
      {
        title: 'List types',
        description: 'Give readers structure before runtime data wiring.',
        cards: [
          {
            eyebrow: 'Queue',
            title: 'Up next',
            description: 'A list that keeps the next books surfaced with priority ordering.',
          },
          {
            eyebrow: 'Goal',
            title: 'Monthly target',
            description: 'Reserve this for goals, streaks, and completion milestones.',
          },
        ],
      },
    ],
  },
  notes: {
    eyebrow: 'Notes',
    title: 'Highlights and annotations',
    description: 'Capture notes, quotes, and review drafts aligned to a reading workflow.',
    sections: [
      {
        title: 'Captured context',
        description: 'Model the card types that belong next to a book or chapter.',
        cards: [
          {
            eyebrow: 'Highlight',
            title: 'Memorable passage',
            description: 'A saved quote with source location and quick tags.',
          },
          {
            eyebrow: 'Reflection',
            title: 'Key takeaway',
            description: 'A short note that can become a review snippet later.',
          },
        ],
      },
    ],
  },
  profile: {
    eyebrow: 'Reader profile',
    title: 'Preferences and reading defaults',
    description: 'Model language, formats, and discovery preferences for a reading app.',
  },
} as const;
