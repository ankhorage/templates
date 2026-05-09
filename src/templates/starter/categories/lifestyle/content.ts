export const lifestyleContent = {
  dashboard: {
    eyebrow: 'Lifestyle',
    title: 'Your week at a glance',
    description: 'Seed the dashboard with routines, memberships, and upcoming plans.',
    sections: [
      {
        title: 'Upcoming',
        description: 'Model upcoming plans and reminders without a full scheduling engine.',
        cards: [
          {
            eyebrow: 'Plan',
            title: 'Weekend activity',
            description: 'A placeholder for reservations, tickets, and calendar integration.',
          },
          {
            eyebrow: 'Reminder',
            title: 'Routine check-in',
            description: 'Reserve for habit streaks, goals, and coaching prompts.',
          },
        ],
      },
    ],
  },
  collections: {
    eyebrow: 'Collections',
    title: 'Saved lists and boards',
    description: 'Keep curated lists, saved items, and inspiration boards visible.',
    sections: [
      {
        title: 'Saved sets',
        description: 'Model collections for experiences, products, or routines.',
        cards: [
          {
            eyebrow: 'Board',
            title: 'Favorites',
            description: 'A placeholder board for saved items and quick reordering.',
          },
          {
            eyebrow: 'Board',
            title: 'Wish list',
            description: 'Reserve for future plans, recommendations, and gifts.',
          },
        ],
      },
    ],
  },
  plans: {
    eyebrow: 'Plans',
    title: 'Memberships and schedules',
    description: 'Seed the planning surface with upcoming events and subscriptions.',
    sections: [
      {
        title: 'Plan types',
        description: 'Model plan cards for membership, sessions, and bookings.',
        cards: [
          {
            eyebrow: 'Membership',
            title: 'Studio subscription',
            description: 'A placeholder membership card with renew date and perks.',
          },
          {
            eyebrow: 'Booking',
            title: 'Upcoming class',
            description: 'Reserve for bookings, cancellations, and reminders.',
          },
        ],
      },
    ],
  },
  explore: {
    eyebrow: 'Explore',
    title: 'Find new recommendations',
    description: 'Seed the explore feed with curated picks and nearby suggestions.',
    sections: [
      {
        title: 'Recommended',
        description: 'Model discovery cards with tags, distance, and why-it-matches.',
        cards: [
          {
            eyebrow: 'Nearby',
            title: 'New spot',
            description: 'A placeholder for location-aware recommendations and filters.',
          },
          {
            eyebrow: 'Curated',
            title: 'Editor list',
            description: 'Reserve for seasonal lists and trend stories.',
          },
        ],
      },
    ],
  },
  profile: {
    eyebrow: 'Profile',
    title: 'Preferences and defaults',
    description: 'Model notification, membership, and privacy defaults for a lifestyle app.',
  },
} as const;
