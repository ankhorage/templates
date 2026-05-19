export const chessContent = {
  home: {
    eyebrow: 'Chess',
    title: 'Your next move',
    description: 'A compact home screen for study continuity, current position, and quick play.',
    sections: [
      {
        title: 'Study snapshot',
        description:
          'Keep the current position and next action visible without building a full trainer.',
        cards: [
          {
            eyebrow: 'Position',
            title: 'Continue from the board',
            description:
              'Reserve this card for the current FEN, side to move, and last move summary.',
          },
          {
            eyebrow: 'Focus',
            title: 'Practice one line',
            description:
              'A placeholder for a short study goal such as a variation or opening idea.',
          },
        ],
      },
    ],
  },
  settings: {
    eyebrow: 'Settings',
    title: 'Settings',
    description: 'Prepare board display controls and study preferences for a chess app.',
    sections: [
      {
        title: 'Board preferences',
        description:
          'Use this area for board-specific controls and future ChessBoard integration settings.',
        cards: [
          {
            eyebrow: 'Board',
            title: 'Orientation',
            description:
              'Reserve controls for white/black orientation and board display preferences.',
          },
          {
            eyebrow: 'Controls',
            title: 'Coordinates and study mode',
            description:
              'Reserve controls for coordinates, interaction behavior, and study mode.',
          },
        ],
      },
    ],
  },
} as const;
