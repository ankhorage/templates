export const utilitiesToolsContent = {
  dashboard: {
    eyebrow: 'Utilities',
    title: 'Quick actions',
    description: 'Seed a dashboard with primary utilities and recently used actions.',
    sections: [
      {
        title: 'Quick access',
        description: 'Model shortcuts and utilities without implementing the tools themselves.',
        cards: [
          {
            eyebrow: 'Shortcut',
            title: 'Run utility',
            description: 'A placeholder quick action card with status and recent runs.',
          },
          {
            eyebrow: 'Shortcut',
            title: 'Saved workflow',
            description: 'Reserve for automations and pinned utility sets.',
          },
        ],
      },
    ],
  },
  tools: {
    eyebrow: 'Tools',
    title: 'Utility modules',
    description: 'Model the tool collection that belongs in a utilities suite.',
    sections: [
      {
        title: 'Tool set',
        description: 'Seed tool tiles without implementing domain logic.',
        cards: [
          {
            eyebrow: 'Tool',
            title: 'Converter',
            description: 'A placeholder tool module with inputs and outputs.',
          },
          {
            eyebrow: 'Tool',
            title: 'Scanner',
            description: 'Reserve for device sensors and permission gating.',
          },
        ],
      },
    ],
  },
  shortcuts: {
    eyebrow: 'Shortcuts',
    title: 'Saved automations',
    description: 'Keep saved workflows visible and deterministic.',
    sections: [
      {
        title: 'Automation slots',
        description: 'Model shortcut cards with triggers and actions.',
        cards: [
          {
            eyebrow: 'Shortcut',
            title: 'Morning setup',
            description: 'A placeholder shortcut with trigger and actions list.',
          },
          {
            eyebrow: 'Shortcut',
            title: 'Travel mode',
            description: 'Reserve for location-aware triggers and device toggles.',
          },
        ],
      },
    ],
  },
  storage: {
    eyebrow: 'Storage',
    title: 'Files and cache',
    description: 'Model storage and cleanup sections before wiring to a filesystem.',
    sections: [
      {
        title: 'Cleanup',
        description: 'Seed cleanup actions and cache details placeholders.',
        cards: [
          {
            eyebrow: 'Cache',
            title: 'App cache',
            description: 'A placeholder for cache size and cleanup actions.',
          },
          {
            eyebrow: 'Downloads',
            title: 'Saved files',
            description: 'Reserve for downloads, exports, and backups.',
          },
        ],
      },
    ],
  },
  diagnostics: {
    eyebrow: 'Diagnostics',
    title: 'Health and status',
    description: 'Provide space for system checks, connectivity status, and logs.',
    sections: [
      {
        title: 'Checks',
        description: 'Model diagnostic cards without implementing device APIs.',
        cards: [
          {
            eyebrow: 'Network',
            title: 'Connectivity',
            description: 'A placeholder for network status and troubleshooting steps.',
          },
          {
            eyebrow: 'System',
            title: 'Device status',
            description: 'Reserve for battery, storage, and permission checks.',
          },
        ],
      },
    ],
  },
  settings: {
    eyebrow: 'Settings',
    title: 'Utilities settings',
    description: 'Model automation, permissions, and defaults.',
  },
} as const;

