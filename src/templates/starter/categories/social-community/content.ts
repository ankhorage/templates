export const communitySocialContent = {
  feed: {
    eyebrow: 'Community hub',
    title: 'Latest from your network',
    description: 'Follow announcements, discussions, and member updates in one activity stream.',
    sections: [
      {
        title: 'Pinned updates',
        description: 'Keep important community moments visible for every member.',
        cards: [
          {
            eyebrow: 'Announcement',
            title: 'Spring meetup agenda',
            description:
              'Share the schedule, speakers, and arrival details for the next gathering.',
          },
          {
            eyebrow: 'Discussion',
            title: 'Member introductions',
            description:
              'Give new members a place to introduce themselves and find relevant groups.',
          },
        ],
      },
      {
        title: 'Active discussions',
        description: 'Seed the initial feed with prompts that invite participation.',
        cards: [
          {
            eyebrow: 'Thread',
            title: 'What should we build together?',
            description: 'Collect project ideas, requests, and community proposals.',
          },
          {
            eyebrow: 'Poll',
            title: 'Choose the next workshop',
            description: 'Use this slot for a lightweight voting or survey experience.',
          },
        ],
      },
    ],
  },
  groups: {
    eyebrow: 'Spaces',
    title: 'Groups for every interest',
    description: 'Organize conversations by topic, location, or member cohort.',
    sections: [
      {
        title: 'Featured groups',
        description: 'Start with a few visible spaces so the app has immediate shape.',
        cards: [
          {
            eyebrow: 'Open group',
            title: 'Founders circle',
            description: 'A discussion space for strategy, hiring, and fundraising questions.',
          },
          {
            eyebrow: 'Open group',
            title: 'Local meetups',
            description: 'Coordinate regional events, venues, and informal gatherings.',
          },
        ],
      },
    ],
  },
  messages: {
    eyebrow: 'Inbox',
    title: 'Member conversations',
    description: 'Prepare a private messaging surface without committing to runtime wiring.',
    sections: [
      {
        title: 'Conversation states',
        description: 'Model the empty, unread, and active states your app will need.',
        cards: [
          {
            eyebrow: 'Unread',
            title: 'Welcome from the moderators',
            description: 'A starter row for onboarding guidance and community norms.',
          },
          {
            eyebrow: 'Draft',
            title: 'Follow up with a new member',
            description: 'Reserve space for quick replies, attachments, and message metadata.',
          },
        ],
      },
    ],
  },
  profile: {
    eyebrow: 'Member profile',
    title: 'Shape a trusted identity',
    description: 'Show interests, contributions, and connection points for each member.',
    sections: [
      {
        title: 'Profile readiness',
        description: 'Use these cards as placeholders for onboarding and member context.',
        cards: [
          {
            eyebrow: 'Identity',
            title: 'Display name and avatar',
            description: 'Collect the core fields needed across feed, groups, and messages.',
          },
          {
            eyebrow: 'Interests',
            title: 'Topics and communities',
            description: 'Capture preferences that can personalize recommendations.',
          },
        ],
      },
    ],
  },
  settings: {
    eyebrow: 'Community controls',
    title: 'Notification and privacy defaults',
    description: 'Keep community preferences close to the member experience.',
  },
} as const;

export const creatorSocialContent = {
  studio: {
    eyebrow: 'Creator studio',
    title: 'Run your publishing workflow',
    description: 'Start from a dashboard for drafts, schedule, audience, and channel health.',
    sections: [
      {
        title: 'Today in studio',
        description: 'Surface the few creator actions that matter right now.',
        cards: [
          {
            eyebrow: 'Draft',
            title: 'Weekly field note',
            description: 'A ready placeholder for long-form or short-form publishing.',
          },
          {
            eyebrow: 'Schedule',
            title: 'Post window at 10:00',
            description: 'Reserve space for calendar and queue integrations.',
          },
        ],
      },
      {
        title: 'Channel health',
        description: 'Give the starter a place for engagement and account state.',
        cards: [
          {
            eyebrow: 'Reach',
            title: 'Audience growth',
            description: 'Track follower movement and high-performing content themes.',
          },
          {
            eyebrow: 'Quality',
            title: 'Publishing consistency',
            description: 'Show cadence, completion, and momentum without adding analytics wiring.',
          },
        ],
      },
    ],
  },
  posts: {
    eyebrow: 'Publishing',
    title: 'Drafts and published posts',
    description: 'Organize content from first draft through scheduled publication.',
    sections: [
      {
        title: 'Content queue',
        description: 'Use these rows to model draft, review, scheduled, and published states.',
        cards: [
          {
            eyebrow: 'Draft',
            title: 'Behind-the-scenes update',
            description: 'A sample draft with room for status, channel, and next action.',
          },
          {
            eyebrow: 'Published',
            title: 'Launch recap',
            description: 'A published post placeholder for performance and comments.',
          },
        ],
      },
    ],
  },
  audience: {
    eyebrow: 'Followers',
    title: 'Understand your audience',
    description: 'Segment members by interests, activity, and engagement patterns.',
    sections: [
      {
        title: 'Audience segments',
        description: 'Give creators a starting point for relationship management.',
        cards: [
          {
            eyebrow: 'Segment',
            title: 'New followers',
            description: 'Welcome and convert new followers into active subscribers.',
          },
          {
            eyebrow: 'Segment',
            title: 'Top commenters',
            description: 'Identify members who repeatedly start useful conversations.',
          },
        ],
      },
    ],
  },
  insights: {
    eyebrow: 'Analytics',
    title: 'Engagement snapshots',
    description: 'Summarize reach, interactions, and publishing momentum.',
    sections: [
      {
        title: 'Key signals',
        description: 'Keep metrics lightweight until real analytics are connected.',
        cards: [
          {
            eyebrow: 'Engagement',
            title: 'Comment quality',
            description: 'Track useful replies, questions, and community participation.',
          },
          {
            eyebrow: 'Momentum',
            title: 'Weekly publishing streak',
            description: 'Show consistency without requiring runtime analytics.',
          },
        ],
      },
    ],
  },
  settings: {
    eyebrow: 'Creator controls',
    title: 'Publishing and profile defaults',
    description: 'Keep channel settings, profile fields, and notification defaults in one place.',
  },
} as const;
