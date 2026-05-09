export const weatherContent = {
  now: {
    eyebrow: 'Current conditions',
    title: 'Weather now',
    description: 'Seed the current conditions surface with summary, feels-like, and quick insights.',
    sections: [
      {
        title: 'Right now',
        description: 'Model the current condition modules without wiring a weather provider.',
        cards: [
          {
            eyebrow: 'Condition',
            title: 'Partly cloudy',
            description: 'A placeholder condition with temperature, feels-like, and wind.',
          },
          {
            eyebrow: 'Detail',
            title: 'Humidity and UV',
            description: 'Reserve for humidity, UV index, and air quality widgets.',
          },
        ],
      },
    ],
  },
  forecast: {
    eyebrow: 'Forecast',
    title: 'Upcoming weather',
    description: 'Model hourly and daily forecast layouts as placeholder content.',
    sections: [
      {
        title: 'Next hours',
        description: 'Seed hourly cards for time-based predictions.',
        cards: [
          {
            eyebrow: 'Hourly',
            title: 'Next 3 hours',
            description: 'A placeholder for hourly timeline, precipitation, and wind.',
          },
          {
            eyebrow: 'Daily',
            title: 'This week',
            description: 'Reserve for daily highs/lows and condition trends.',
          },
        ],
      },
    ],
  },
  alerts: {
    eyebrow: 'Alerts',
    title: 'Warnings and advisories',
    description: 'Keep severe weather alerts visible and actionable.',
    sections: [
      {
        title: 'Active alerts',
        description: 'Model alert cards with severity, time window, and recommended actions.',
        cards: [
          {
            eyebrow: 'Alert',
            title: 'Advisory placeholder',
            description: 'A placeholder alert with time window and safety guidance.',
          },
          {
            eyebrow: 'Tip',
            title: 'Preparedness',
            description: 'Reserve for actionable checklists and local guidance.',
          },
        ],
      },
    ],
  },
  locations: {
    eyebrow: 'Locations',
    title: 'Saved places',
    description: 'Model multiple saved locations and quick switching.',
    sections: [
      {
        title: 'Saved list',
        description: 'Seed location cards and recent searches.',
        cards: [
          {
            eyebrow: 'Saved',
            title: 'Home',
            description: 'A placeholder location with current condition preview.',
          },
          {
            eyebrow: 'Saved',
            title: 'Work',
            description: 'Reserve for travel locations, pinned trips, and geofences.',
          },
        ],
      },
    ],
  },
} as const;

