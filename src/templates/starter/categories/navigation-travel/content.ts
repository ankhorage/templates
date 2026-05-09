export const navigationTravelContent = {
  destinations: {
    eyebrow: 'Destinations',
    title: 'Choose where to go',
    description: 'Seed a discovery surface for places, favorites, and saved lists.',
    sections: [
      {
        title: 'Saved places',
        description: 'Model destination cards with tags, seasonality, and reminders.',
        cards: [
          {
            eyebrow: 'Saved',
            title: 'Weekend escape',
            description: 'A placeholder destination with notes, distance, and timing.',
          },
          {
            eyebrow: 'Recommended',
            title: 'New region',
            description: 'Reserve for editorial picks and personalized suggestions.',
          },
        ],
      },
    ],
  },
  itinerary: {
    eyebrow: 'Itinerary',
    title: 'Plan the trip',
    description: 'Model a timeline with day plans, checklists, and schedule blocks.',
    sections: [
      {
        title: 'Day plan',
        description: 'Seed itinerary cards without implementing calendar logic.',
        cards: [
          {
            eyebrow: 'Day 1',
            title: 'Arrival',
            description: 'A placeholder day plan with lodging, transport, and activities.',
          },
          {
            eyebrow: 'Checklist',
            title: 'Packing list',
            description: 'Reserve for checklists, reminders, and shared planning.',
          },
        ],
      },
    ],
  },
  bookings: {
    eyebrow: 'Bookings',
    title: 'Reservations and tickets',
    description: 'Keep booking records visible with status and confirmation placeholders.',
    sections: [
      {
        title: 'Booking types',
        description: 'Model lodging, flights, and activities without building booking engines.',
        cards: [
          {
            eyebrow: 'Lodging',
            title: 'Hotel confirmation',
            description: 'A placeholder booking card with dates, address, and contact.',
          },
          {
            eyebrow: 'Activity',
            title: 'Tickets',
            description: 'Reserve for QR codes, check-in, and cancellation policies.',
          },
        ],
      },
    ],
  },
  map: {
    eyebrow: 'Map',
    title: 'Navigate and explore',
    description: 'Prepare a map placeholder with saved pins and routing context.',
    sections: [
      {
        title: 'Map modules',
        description: 'Model pins and routes without implementing mapping SDK behavior.',
        cards: [
          {
            eyebrow: 'Pin',
            title: 'Saved location',
            description: 'A placeholder for saved pins and quick actions.',
          },
          {
            eyebrow: 'Route',
            title: 'Suggested route',
            description: 'Reserve for routing, transit, and offline maps.',
          },
        ],
      },
    ],
  },
  profile: {
    eyebrow: 'Traveler profile',
    title: 'Preferences and defaults',
    description: 'Model travel preferences, alerts, and saved traveler details.',
  },
} as const;
