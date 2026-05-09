export const sportsContent = {
  scores: {
    eyebrow: 'Live',
    title: 'Scores and highlights',
    description: 'Seed the scores surface with fixtures, live states, and highlight placeholders.',
    sections: [
      {
        title: 'Live now',
        description: 'Model score cards with clock, status, and key moments.',
        cards: [
          {
            eyebrow: 'Live',
            title: 'Matchday',
            description: 'A placeholder for a live fixture with score and key events.',
          },
          {
            eyebrow: 'Highlight',
            title: 'Top play',
            description: 'Reserve for highlight clips, stats, and recap cards.',
          },
        ],
      },
    ],
  },
  schedule: {
    eyebrow: 'Schedule',
    title: 'Upcoming fixtures',
    description: 'Keep match schedules and reminders visible before wiring data providers.',
    sections: [
      {
        title: 'This week',
        description: 'Model fixtures by date, league, and team favorites.',
        cards: [
          {
            eyebrow: 'Fixture',
            title: 'Next game',
            description: 'A placeholder fixture with time, venue, and reminder toggle.',
          },
          {
            eyebrow: 'Fixture',
            title: 'Rivalry',
            description: 'Reserve for featured matches and editorial picks.',
          },
        ],
      },
    ],
  },
  standings: {
    eyebrow: 'Standings',
    title: 'Rankings and tables',
    description: 'Model league tables and ranking summaries without implementing calculation.',
    sections: [
      {
        title: 'League table',
        description: 'Seed standings cards and rows as placeholders for teams and ranks.',
        cards: [
          {
            eyebrow: 'Table',
            title: 'Top of the league',
            description: 'A placeholder for rank, points, and form summary.',
          },
          {
            eyebrow: 'Table',
            title: 'Playoff race',
            description: 'Reserve for qualification lines and tie-break explanations.',
          },
        ],
      },
    ],
  },
  teams: {
    eyebrow: 'Teams',
    title: 'Teams and favorites',
    description: 'Seed a team hub with rosters, news, and favorite picks.',
    sections: [
      {
        title: 'Favorites',
        description: 'Model team cards with form, next match, and quick links.',
        cards: [
          {
            eyebrow: 'Team',
            title: 'Home team',
            description: 'A placeholder for team page navigation and stats.',
          },
          {
            eyebrow: 'Team',
            title: 'Following',
            description: 'Reserve for multiple teams, leagues, and notifications.',
          },
        ],
      },
    ],
  },
  profile: {
    eyebrow: 'Fan profile',
    title: 'Preferences and notifications',
    description: 'Model favorite teams, alerts, and viewing preferences.',
  },
} as const;
