interface PokerPlayingCard {
  readonly rank: string;
  readonly suit: 'clubs' | 'diamonds' | 'hearts' | 'spades';
}

interface PokerSeatState {
  readonly id: string;
  readonly label: string;
  readonly sublabel?: string;
  readonly cards?: readonly PokerPlayingCard[];
  readonly faceDownCards?: number;
  readonly selected?: boolean;
  readonly muted?: boolean;
  readonly tokenLabel?: string;
  readonly accessibilityLabel?: string;
}

export interface PokerSituation {
  readonly id: string;
  readonly street: string;
  readonly blinds: string;
  readonly userPosition: string;
  readonly userCards: readonly PokerPlayingCard[];
  readonly pot: string;
  readonly level: string;
  readonly progress: number;
  readonly progressTotal: number;
  readonly score: string;
  readonly prompt: string;
  readonly availableActions: readonly string[];
  readonly correctAction: string;
  readonly explanation: string;
  readonly seats: readonly PokerSeatState[];
}

export const pokerSituation: PokerSituation = {
  id: 'preflop-user-btn-aa',
  street: 'Preflop',
  blinds: '400 / 800',
  userPosition: 'BTN',
  userCards: [
    { rank: 'A', suit: 'hearts' },
    { rank: 'A', suit: 'clubs' },
  ],
  pot: '3.6K',
  level: '400 / 800',
  progress: 7,
  progressTotal: 20,
  score: '84%',
  prompt: 'You are on the button with A♥ A♣. HJ opened to 2.4K, CO folded, and action is on you.',
  availableActions: ['Fold', 'Call', 'All-In'],
  correctAction: 'All-In',
  explanation:
    'Aces crush the button shoving range at this stack depth. Apply maximum pressure instead of flat-calling.',
  seats: [
    {
      id: 'seat-user',
      label: 'BTN',
      sublabel: '98K',
      cards: [
        { rank: 'A', suit: 'hearts' },
        { rank: 'A', suit: 'clubs' },
      ],
      selected: true,
      tokenLabel: 'User',
      accessibilityLabel: 'User on button with ace of hearts and ace of clubs',
    },
    {
      id: 'seat-small-blind',
      label: 'SB',
      sublabel: '100K',
      tokenLabel: '400',
      faceDownCards: 2,
    },
    {
      id: 'seat-big-blind',
      label: 'BB',
      sublabel: '99K',
      tokenLabel: '800',
      faceDownCards: 2,
    },
    {
      id: 'seat-hijack',
      label: 'HJ',
      sublabel: '96K',
      tokenLabel: '2.4K',
      faceDownCards: 2,
    },
    {
      id: 'seat-cutoff',
      label: 'CO',
      sublabel: '101K',
      muted: true,
      faceDownCards: 2,
    },
    {
      id: 'seat-middle',
      label: 'MP',
      sublabel: '104K',
      muted: true,
      faceDownCards: 2,
    },
  ],
};
