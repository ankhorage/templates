export const musicAudioContent = {
  home: {
    eyebrow: 'Featured mixes',
    title: 'Start listening',
    description: 'Seed the home surface with mixes, recent listening, and creator highlights.',
    sections: [
      {
        title: 'Featured',
        description: 'Model the cards that belong on a music home screen.',
        cards: [
          {
            eyebrow: 'Mix',
            title: 'Daily mix',
            description: 'A placeholder mix card with genre tags and mood context.',
          },
          {
            eyebrow: 'Artist',
            title: 'Creator spotlight',
            description: 'Reserve for featured artist releases and tour announcements.',
          },
        ],
      },
    ],
  },
  search: {
    eyebrow: 'Search',
    title: 'Find songs, artists, and podcasts',
    description: 'Start with a search surface and category chips before wiring the catalog.',
  },
  library: {
    eyebrow: 'Library',
    title: 'Your saved audio',
    description: 'Organize playlists, liked tracks, and downloads into predictable sections.',
    sections: [
      {
        title: 'Collections',
        description: 'Model library collections before implementing persistence.',
        cards: [
          {
            eyebrow: 'Playlist',
            title: 'Liked songs',
            description: 'A placeholder playlist with count, last updated, and mood tags.',
          },
          {
            eyebrow: 'Collection',
            title: 'Downloads',
            description: 'Reserve for offline content and storage settings.',
          },
        ],
      },
    ],
  },
  player: {
    eyebrow: 'Now playing',
    title: 'Playback surface',
    description: 'Model playback state, queue, and quick actions without implementing audio engines.',
    sections: [
      {
        title: 'Playback states',
        description: 'Seed the player layout with a queue and next up slots.',
        cards: [
          {
            eyebrow: 'Queue',
            title: 'Up next',
            description: 'A placeholder for next track, skip, and repeat toggles.',
          },
          {
            eyebrow: 'Context',
            title: 'From playlist',
            description: 'Reserve for album, playlist, and radio context.',
          },
        ],
      },
    ],
  },
  profile: {
    eyebrow: 'Listener profile',
    title: 'Preferences and defaults',
    description: 'Model playback quality, downloads, and notification defaults.',
  },
} as const;

