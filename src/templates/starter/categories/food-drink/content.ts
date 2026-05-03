export const foodDrinkContent = {
  discover: {
    eyebrow: 'Restaurant discovery',
    title: 'Discover what is ready now',
    description: 'Highlight locations, featured dishes, and timely offers for food and drink apps.',
    sections: [
      {
        title: 'Featured today',
        description: 'Give the first screen strong restaurant and dish signals.',
        cards: [
          {
            eyebrow: 'Chef pick',
            title: 'Roasted cauliflower bowl',
            description: 'A sample featured dish with dietary tags and prep notes.',
          },
          {
            eyebrow: 'Nearby',
            title: 'Downtown lunch menu',
            description: 'Reserve this card for location-aware recommendations.',
          },
        ],
      },
    ],
  },
  menu: {
    eyebrow: 'Menu',
    title: 'Menu sections and dietary tags',
    description: 'Organize dishes by course, preference, availability, and service window.',
    sections: [
      {
        title: 'Menu structure',
        description: 'Start with the sections a restaurant or ordering app needs.',
        cards: [
          {
            eyebrow: 'Lunch',
            title: 'Seasonal mains',
            description: 'Group dishes by service window and kitchen availability.',
          },
          {
            eyebrow: 'Dietary',
            title: 'Vegetarian and gluten-free',
            description: 'Keep dietary tags visible before runtime filtering is added.',
          },
        ],
      },
    ],
  },
  reservations: {
    eyebrow: 'Booking',
    title: 'Reservations and table requests',
    description: 'Prepare a booking surface for time, party size, and special requests.',
    sections: [
      {
        title: 'Upcoming service',
        description: 'Model the states needed for restaurant booking workflows.',
        cards: [
          {
            eyebrow: 'Tonight',
            title: 'Two tables at 19:30',
            description: 'Show booked, waitlisted, and open capacity states.',
          },
          {
            eyebrow: 'Request',
            title: 'Patio preference',
            description: 'Reserve space for guest notes and seating preferences.',
          },
        ],
      },
    ],
  },
  orders: {
    eyebrow: 'Orders',
    title: 'Current and recent orders',
    description: 'Track pickup, delivery, dine-in, and loyalty activity.',
    sections: [
      {
        title: 'Order states',
        description: 'Seed the route with realistic fulfillment placeholders.',
        cards: [
          {
            eyebrow: 'Preparing',
            title: 'Order #1048',
            description: 'A current order row with status and ETA.',
          },
          {
            eyebrow: 'Past order',
            title: 'Friday dinner pickup',
            description: 'A previous order row for receipts and reordering.',
          },
        ],
      },
    ],
  },
  profile: {
    eyebrow: 'Guest profile',
    title: 'Preferences and loyalty',
    description: 'Keep dietary preferences, favorite locations, and rewards visible.',
  },
} as const;
