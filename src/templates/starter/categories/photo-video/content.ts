export const photoVideoContent = {
  capture: {
    eyebrow: 'Capture',
    title: 'Start a new capture',
    description: 'Seed the capture screen with modes, presets, and quick actions.',
    sections: [
      {
        title: 'Capture modes',
        description: 'Model capture modes without implementing camera engines.',
        cards: [
          {
            eyebrow: 'Mode',
            title: 'Photo',
            description: 'A placeholder for photo mode with timer and grid toggles.',
          },
          {
            eyebrow: 'Mode',
            title: 'Video',
            description: 'Reserve for recording presets and stabilization options.',
          },
        ],
      },
    ],
  },
  library: {
    eyebrow: 'Library',
    title: 'Recent captures',
    description: 'Organize recent media into collections and projects.',
    sections: [
      {
        title: 'Collections',
        description: 'Model albums and projects before wiring storage and sync.',
        cards: [
          {
            eyebrow: 'Album',
            title: 'Recent',
            description: 'A placeholder for the most recent captures and edits.',
          },
          {
            eyebrow: 'Album',
            title: 'Favorites',
            description: 'Reserve for saved shots, highlights, and pinned projects.',
          },
        ],
      },
    ],
  },
  edit: {
    eyebrow: 'Edit',
    title: 'Adjust and refine',
    description: 'Seed an editing surface with presets, history, and export placeholders.',
    sections: [
      {
        title: 'Editing tools',
        description: 'Model edits without implementing the full editor.',
        cards: [
          {
            eyebrow: 'Preset',
            title: 'Color grade',
            description: 'A placeholder for presets, intensity, and before/after toggles.',
          },
          {
            eyebrow: 'Tool',
            title: 'Crop & rotate',
            description: 'Reserve for framing, aspect ratios, and guides.',
          },
        ],
      },
    ],
  },
  share: {
    eyebrow: 'Share',
    title: 'Publish and export',
    description: 'Model destinations and export formats without implementing network flows.',
    sections: [
      {
        title: 'Share targets',
        description: 'Seed share destinations and export presets.',
        cards: [
          {
            eyebrow: 'Export',
            title: 'High quality',
            description: 'A placeholder export preset with format and size options.',
          },
          {
            eyebrow: 'Destination',
            title: 'Social',
            description: 'Reserve for publish queues and caption tooling.',
          },
        ],
      },
    ],
  },
  profile: {
    eyebrow: 'Creator profile',
    title: 'Preferences and defaults',
    description: 'Model quality, storage, and publishing defaults.',
  },
} as const;
