export const medicalContent = {
  appointments: {
    eyebrow: 'Appointments',
    title: 'Upcoming care',
    description: 'Seed the appointment surface with schedule, reminders, and visit prep placeholders.',
    sections: [
      {
        title: 'Upcoming visits',
        description: 'Model appointment states without implementing scheduling engines.',
        cards: [
          {
            eyebrow: 'Upcoming',
            title: 'Checkup',
            description: 'A placeholder appointment card with time, location, and preparation notes.',
          },
          {
            eyebrow: 'Reminder',
            title: 'Pre-visit checklist',
            description: 'Reserve for intake, documents, and insurance prompts.',
          },
        ],
      },
    ],
  },
  careTeam: {
    eyebrow: 'Care team',
    title: 'Providers and contacts',
    description: 'Keep care contacts visible with roles and secure messaging placeholders.',
    sections: [
      {
        title: 'Team roster',
        description: 'Model provider cards with role, availability, and contact methods.',
        cards: [
          {
            eyebrow: 'Provider',
            title: 'Primary care',
            description: 'A placeholder for provider identity, specialty, and contact channel.',
          },
          {
            eyebrow: 'Specialist',
            title: 'Referral network',
            description: 'Reserve for referrals, appointments, and follow-ups.',
          },
        ],
      },
    ],
  },
  records: {
    eyebrow: 'Records',
    title: 'Health documents',
    description: 'Seed a records space for lab results, summaries, and secure exports.',
    sections: [
      {
        title: 'Record types',
        description: 'Model the file types a medical app needs without building a record engine.',
        cards: [
          {
            eyebrow: 'Lab',
            title: 'Results',
            description: 'A placeholder for lab values, ranges, and interpretation notes.',
          },
          {
            eyebrow: 'Summary',
            title: 'Visit notes',
            description: 'Reserve for after-visit summaries and care plans.',
          },
        ],
      },
    ],
  },
  messages: {
    eyebrow: 'Messaging',
    title: 'Secure communication',
    description: 'Model the messaging workflow for questions, follow-ups, and care coordination.',
    sections: [
      {
        title: 'Message types',
        description: 'Seed threads for care questions and appointment follow-ups.',
        cards: [
          {
            eyebrow: 'Thread',
            title: 'Care question',
            description: 'A placeholder thread with triage status and response SLA.',
          },
          {
            eyebrow: 'Thread',
            title: 'Prescription refill',
            description: 'Reserve for form submissions and provider approvals.',
          },
        ],
      },
    ],
  },
  profile: {
    eyebrow: 'Patient profile',
    title: 'Preferences and intake',
    description: 'Model communication preferences and intake defaults.',
  },
} as const;

