export const educationLearningContent = {
  courses: {
    eyebrow: 'Course library',
    title: 'Choose your next course',
    description: 'Seed the catalog with curated learning paths and recommended modules.',
    sections: [
      {
        title: 'Learning paths',
        description: 'Model paths and prerequisites before implementing a curriculum engine.',
        cards: [
          {
            eyebrow: 'Path',
            title: 'Foundations',
            description: 'A starter path with milestone lessons and a completion target.',
          },
          {
            eyebrow: 'Path',
            title: 'Advanced track',
            description: 'Reserve for deeper content with projects and assessments.',
          },
        ],
      },
    ],
  },
  study: {
    eyebrow: 'Study session',
    title: 'Pick up where you left off',
    description: 'Provide a current lesson surface with objectives and next actions.',
    sections: [
      {
        title: 'Current lesson',
        description: 'Model lesson metadata so the UI structure stays meaningful.',
        cards: [
          {
            eyebrow: 'Lesson',
            title: 'Key concept',
            description: 'A placeholder lesson card with duration, difficulty, and notes.',
          },
          {
            eyebrow: 'Next',
            title: 'Practice prompts',
            description: 'Reserve for quizzes, flashcards, and interactive exercises.',
          },
        ],
      },
    ],
  },
  practice: {
    eyebrow: 'Practice',
    title: 'Reinforce with repetition',
    description: 'Keep drills, quizzes, and review loops visible between lessons.',
    sections: [
      {
        title: 'Practice plan',
        description: 'Model practice modules without overbuilding the domain engine.',
        cards: [
          {
            eyebrow: 'Quiz',
            title: 'Quick check',
            description: 'A placeholder for short quizzes with score and retries.',
          },
          {
            eyebrow: 'Flashcards',
            title: 'Daily review',
            description: 'Reserve for spaced repetition and streak tracking.',
          },
        ],
      },
    ],
  },
  progress: {
    eyebrow: 'Progress',
    title: 'Track milestones',
    description: 'Model course completion, skill growth, and streak continuity.',
    sections: [
      {
        title: 'Milestones',
        description: 'Use cards to represent level-ups, badges, and completion states.',
        cards: [
          {
            eyebrow: 'Milestone',
            title: 'Module complete',
            description: 'A completion card with score, time spent, and next recommendation.',
          },
          {
            eyebrow: 'Streak',
            title: '7-day practice',
            description: 'Reserve for streaks, reminders, and encouragement.',
          },
        ],
      },
    ],
  },
  profile: {
    eyebrow: 'Learner profile',
    title: 'Learning preferences',
    description: 'Model pacing, reminders, and study settings for a learner.',
  },
} as const;
