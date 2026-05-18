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
  boardSettings: {
    eyebrow: 'Board',
    title: 'Chess board & settings',
    description: 'Prepare board display controls and study preferences for a chess app.',
    sections: [
      {
        title: 'Board placeholder',
        description:
          'Use this area for a future ChessBoard integration and board-specific controls.',
        cards: [
          {
            eyebrow: 'Board',
            title: 'Interactive board slot',
            description:
              'A placeholder ready for @ankhorage/zora-chess once app dependencies are wired.',
          },
          {
            eyebrow: 'Controls',
            title: 'Orientation and coordinates',
            description:
              'Reserve controls for white/black orientation, coordinates, and study mode.',
          },
        ],
      },
    ],
  },
} as const;
