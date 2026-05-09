export const developerToolsContent = {
  dashboard: {
    eyebrow: 'Engineering ops',
    title: 'Reliability at a glance',
    description: 'Combine builds, incidents, and environment health into a single surface.',
    sections: [
      {
        title: 'Status overview',
        description: 'Keep the current state visible and easy to scan.',
        cards: [
          {
            eyebrow: 'Build',
            title: 'Main pipeline green',
            description: 'A placeholder for the last successful build and queued runs.',
          },
          {
            eyebrow: 'Incident',
            title: 'No active incidents',
            description: 'Reserve this for incident severity, ownership, and next update time.',
          },
        ],
      },
    ],
  },
  builds: {
    eyebrow: 'CI/CD',
    title: 'Build pipelines and releases',
    description: 'Model the build history, stage status, and artifact readiness.',
    sections: [
      {
        title: 'Recent builds',
        description: 'Use cards to represent builds, checks, and ownership.',
        cards: [
          {
            eyebrow: 'Release',
            title: 'v1.0.0 candidate',
            description: 'A placeholder for checks, duration, and artifact signing.',
          },
          {
            eyebrow: 'PR',
            title: 'Feature branch build',
            description: 'Reserve this for preview builds and review state.',
          },
        ],
      },
    ],
  },
  incidents: {
    eyebrow: 'Response',
    title: 'Incidents and on-call',
    description: 'Prepare a queue for triage, ownership, and comms updates.',
    sections: [
      {
        title: 'Active queue',
        description: 'Model severity, impact, and the communication timeline.',
        cards: [
          {
            eyebrow: 'SEV2',
            title: 'Elevated error rate',
            description: 'A placeholder incident card with status, owner, and next update.',
          },
          {
            eyebrow: 'SEV3',
            title: 'Latency regression',
            description: 'Reserve for postmortem links, mitigations, and tags.',
          },
        ],
      },
    ],
  },
  environments: {
    eyebrow: 'Environments',
    title: 'Runtime surfaces',
    description: 'Track where deployments live and how each environment behaves.',
    sections: [
      {
        title: 'Environment health',
        description: 'Keep status, versions, and uptime placeholders visible.',
        cards: [
          {
            eyebrow: 'Production',
            title: 'Stable',
            description: 'A placeholder environment status card with version and region.',
          },
          {
            eyebrow: 'Staging',
            title: 'Preview ready',
            description: 'Reserve this for feature flags, migrations, and drift checks.',
          },
        ],
      },
    ],
  },
  deployments: {
    eyebrow: 'Deployments',
    title: 'Release delivery',
    description: 'Create space for rollout steps, approvals, and deployment history.',
    sections: [
      {
        title: 'Rollout actions',
        description: 'Model the steps a release needs without implementing the engine.',
        cards: [
          {
            eyebrow: 'Step',
            title: 'Canary rollout',
            description: 'A placeholder for a staged rollout, pause, and health verification.',
          },
          {
            eyebrow: 'Approval',
            title: 'Change window',
            description: 'Reserve this for approval gates and scheduling context.',
          },
        ],
      },
    ],
  },
  settings: {
    eyebrow: 'Operations',
    title: 'Tooling settings',
    description: 'Model alert routing, environments, and on-call defaults.',
  },
} as const;
