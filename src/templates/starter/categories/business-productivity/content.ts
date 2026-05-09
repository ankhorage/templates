export const businessProductivityContent = {
  dashboard: {
    eyebrow: 'Team dashboard',
    title: 'Weekly focus and momentum',
    description: 'Start with the operational summary a productivity app should surface first.',
    sections: [
      {
        title: 'Today priorities',
        description: 'Model how priorities, blockers, and check-ins fit together.',
        cards: [
          {
            eyebrow: 'Priority',
            title: 'Ship milestone draft',
            description: 'A placeholder work item with owner, due date, and status.',
          },
          {
            eyebrow: 'Blocker',
            title: 'Awaiting review',
            description: 'Use this slot for approvals, dependencies, and risks.',
          },
        ],
      },
    ],
  },
  projects: {
    eyebrow: 'Projects',
    title: 'Active workspaces',
    description: 'Keep multi-project context visible with owners and next actions.',
    sections: [
      {
        title: 'Project list',
        description: 'Seed project cards with stage, health, and recent activity.',
        cards: [
          {
            eyebrow: 'In flight',
            title: 'Launch readiness',
            description: 'A project card placeholder for status, scope, and stakeholders.',
          },
          {
            eyebrow: 'Planning',
            title: 'Next quarter initiative',
            description: 'Reserve this for goals, milestones, and resourcing assumptions.',
          },
        ],
      },
    ],
  },
  tasks: {
    eyebrow: 'Tasks',
    title: 'Assignment queue',
    description: 'Model task states, ownership, and execution cadence.',
    sections: [
      {
        title: 'Task states',
        description: 'Use realistic task types so routes remain meaningful after wiring data.',
        cards: [
          {
            eyebrow: 'Todo',
            title: 'Draft spec',
            description: 'A task placeholder with tags, estimate, and assignee.',
          },
          {
            eyebrow: 'In progress',
            title: 'Implement review notes',
            description: 'Reserve this for active work with a clear next step.',
          },
        ],
      },
    ],
  },
  calendar: {
    eyebrow: 'Calendar',
    title: 'Meetings and deadlines',
    description: 'Keep time-bound work visible and connected to projects and tasks.',
    sections: [
      {
        title: 'Upcoming schedule',
        description: 'A placeholder timeline for key meetings, reviews, and deliveries.',
        cards: [
          {
            eyebrow: 'Today',
            title: 'Weekly sync',
            description: 'Reserve for meeting agendas, notes, and action items.',
          },
          {
            eyebrow: 'Deadline',
            title: 'Milestone due',
            description: 'A calendar highlight for launches, cutoffs, and reporting.',
          },
        ],
      },
    ],
  },
  reports: {
    eyebrow: 'Reports',
    title: 'Progress snapshots',
    description: 'Provide space for metrics, outcomes, and weekly summaries.',
    sections: [
      {
        title: 'Reporting layers',
        description: 'Model the report types a team needs before instrumenting metrics.',
        cards: [
          {
            eyebrow: 'Status',
            title: 'Weekly update',
            description: 'A placeholder summary with wins, risks, and next steps.',
          },
          {
            eyebrow: 'Metrics',
            title: 'Delivery velocity',
            description: 'Reserve this for throughput, cycle time, and trend analysis.',
          },
        ],
      },
    ],
  },
  settings: {
    eyebrow: 'Operations',
    title: 'Workspace settings',
    description: 'Model the defaults that shape projects, tasks, and reporting.',
  },
} as const;

