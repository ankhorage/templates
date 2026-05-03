export const healthFitnessContent = {
  today: {
    eyebrow: 'Daily plan',
    title: 'Today’s training focus',
    description: 'Start from the workout, habit, or recovery actions that matter today.',
    sections: [
      {
        title: 'Current plan',
        description: 'Give the first screen immediate fitness context.',
        cards: [
          {
            eyebrow: 'Workout',
            title: 'Strength circuit',
            description: 'A starter workout card for exercises, sets, and progress state.',
          },
          {
            eyebrow: 'Habit',
            title: 'Hydration check-in',
            description: 'Use this card for recurring wellness habits and reminders.',
          },
        ],
      },
    ],
  },
  plans: {
    eyebrow: 'Programs',
    title: 'Plans for every goal',
    description: 'Organize workouts, habits, recovery, and coaching programs.',
    sections: [
      {
        title: 'Available plans',
        description: 'Seed program discovery with realistic starter options.',
        cards: [
          {
            eyebrow: 'Beginner',
            title: 'Four-week foundation',
            description: 'A progressive plan for strength, mobility, and consistency.',
          },
          {
            eyebrow: 'Wellness',
            title: 'Recovery reset',
            description: 'A lighter plan for sleep, stretching, and stress management.',
          },
        ],
      },
    ],
  },
  progress: {
    eyebrow: 'Progress',
    title: 'Metrics and streaks',
    description: 'Track activity, completion, consistency, and personal milestones.',
    sections: [
      {
        title: 'Signals',
        description: 'Keep metrics visible without requiring analytics wiring.',
        cards: [
          {
            eyebrow: 'Streak',
            title: 'Five active days',
            description: 'Show habit momentum and workout completion.',
          },
          {
            eyebrow: 'Metric',
            title: 'Mobility score',
            description: 'Reserve room for health and fitness measurements.',
          },
        ],
      },
    ],
  },
  coach: {
    eyebrow: 'Coach',
    title: 'Guidance and check-ins',
    description: 'Prepare a surface for coaching prompts, tips, and member messages.',
    sections: [
      {
        title: 'Coaching prompts',
        description: 'Start with guidance that adapts to the member’s plan.',
        cards: [
          {
            eyebrow: 'Tip',
            title: 'Prioritize form over load',
            description: 'A placeholder for advice tied to today’s session.',
          },
          {
            eyebrow: 'Check-in',
            title: 'How is recovery?',
            description: 'Reserve space for feedback loops and coach notes.',
          },
        ],
      },
    ],
  },
  profile: {
    eyebrow: 'Member profile',
    title: 'Goals and preferences',
    description: 'Capture fitness goals, training constraints, and preferred coaching style.',
  },
} as const;
