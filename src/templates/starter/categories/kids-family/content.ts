export const kidsFamilyContent = {
  home: {
    eyebrow: 'Family home',
    title: 'Today for the family',
    description: 'Seed a safe home surface with routines, reminders, and shared highlights.',
    sections: [
      {
        title: 'Daily highlights',
        description: 'Model the blocks a parent and child might see first.',
        cards: [
          {
            eyebrow: 'Routine',
            title: 'Morning checklist',
            description: 'A placeholder for routine steps and completion progress.',
          },
          {
            eyebrow: 'Reminder',
            title: 'After school',
            description: 'Reserve for pickup, activities, and family messages.',
          },
        ],
      },
    ],
  },
  routines: {
    eyebrow: 'Routines',
    title: 'Schedules and checklists',
    description: 'Keep predictable routines visible and easy to update.',
    sections: [
      {
        title: 'Routine templates',
        description: 'Model routines without implementing calendar engines.',
        cards: [
          {
            eyebrow: 'Routine',
            title: 'Bedtime',
            description: 'A placeholder checklist with steps, rewards, and reminders.',
          },
          {
            eyebrow: 'Routine',
            title: 'Chores',
            description: 'Reserve for rotating tasks and allowance tracking.',
          },
        ],
      },
    ],
  },
  discover: {
    eyebrow: 'Discovery',
    title: 'Safe exploration',
    description: 'Seed curated activities, stories, and kid-friendly modules.',
    sections: [
      {
        title: 'Curated picks',
        description: 'Model discovery content with safety and age cues.',
        cards: [
          {
            eyebrow: 'Activity',
            title: 'Craft ideas',
            description: 'A placeholder for guided activities and supplies lists.',
          },
          {
            eyebrow: 'Story',
            title: 'Read together',
            description: 'Reserve for family reading, audio stories, and favorites.',
          },
        ],
      },
    ],
  },
  favorites: {
    eyebrow: 'Favorites',
    title: 'Saved activities',
    description: 'Keep saved content easy to revisit across the family.',
    sections: [
      {
        title: 'Saved lists',
        description: 'Model favorites and shared collections.',
        cards: [
          {
            eyebrow: 'Saved',
            title: 'Weekend ideas',
            description: 'A placeholder list for saved activities and places.',
          },
          {
            eyebrow: 'Saved',
            title: 'Meal helpers',
            description: 'Reserve for family meal planning and grocery checklists.',
          },
        ],
      },
    ],
  },
  parents: {
    eyebrow: 'Parent controls',
    title: 'Safety and account controls',
    description:
      'Model guardian settings and safety defaults before integrating auth/profile wiring.',
  },
} as const;
