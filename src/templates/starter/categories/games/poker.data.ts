import type { AppManifest, DataContractValue } from '@ankhorage/contracts';

export interface PokerPlayingCard {
  readonly rank: string;
  readonly suit: 'clubs' | 'diamonds' | 'hearts' | 'spades';
}

export interface PokerSeatState {
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
  readonly heroPosition: string;
  readonly heroCards: readonly PokerPlayingCard[];
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
  id: 'preflop-btn-aa',
  street: 'Preflop',
  blinds: '400 / 800',
  heroPosition: 'BTN',
  heroCards: [
    { rank: 'A', suit: 'hearts' },
    { rank: 'A', suit: 'clubs' },
  ],
  pot: '3.6K',
  level: '400 / 800',
  progress: 7,
  progressTotal: 20,
  score: '84%',
  prompt:
    'Hero is on the button with A♥ A♣. HJ opened to 2.4K, CO folded, and action is on you.',
  availableActions: ['Fold', 'Call', 'All-In'],
  correctAction: 'All-In',
  explanation:
    'Aces crush the button shoving range at this stack depth. Apply maximum pressure instead of flat-calling.',
  seats: [
    {
      id: 'seat-button',
      label: 'BTN',
      sublabel: '98K',
      cards: [
        { rank: 'A', suit: 'hearts' },
        { rank: 'A', suit: 'clubs' },
      ],
      selected: true,
      tokenLabel: 'Hero',
      accessibilityLabel: 'Hero on button with ace of hearts and ace of clubs',
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

export const pokerTrainerData: AppManifest['data'] = {
  apis: {
    poker_situations: {
      id: 'poker_situations',
      kind: 'generated',
      preset: 'crud',
      label: 'Poker situations',
      description: 'Generated card-trainer scenario records for the poker starter.',
      basePath: '/poker-situations',
      endpoints: [
        {
          id: 'list-poker-situations',
          label: 'List poker situations',
          method: 'GET',
          path: '/',
          intent: 'list',
        },
        {
          id: 'read-poker-situation',
          label: 'Read poker situation',
          method: 'GET',
          path: '/:id',
          intent: 'read',
        },
      ],
      resource: {
        kind: 'collection',
        collection: {
          name: 'poker_situations',
          primaryKey: 'id',
          fields: [
            { name: 'id', type: 'text', required: true, unique: true },
            { name: 'street', type: 'text', required: true },
            { name: 'blinds', type: 'text', required: true },
            { name: 'heroPosition', type: 'text', required: true },
            { name: 'heroCards', type: 'json', required: true },
            { name: 'pot', type: 'text', required: true },
            { name: 'seats', type: 'json', required: true },
            { name: 'availableActions', type: 'json', required: true },
            { name: 'correctAction', type: 'text', required: true },
            { name: 'prompt', type: 'text', required: true },
            { name: 'explanation', type: 'text', required: true },
          ],
        },
        seed: [toPokerSeedRecord(pokerSituation)],
      },
    },
  },
};

function toPokerSeedRecord(situation: PokerSituation): Readonly<Record<string, DataContractValue>> {
  return {
    id: situation.id,
    street: situation.street,
    blinds: situation.blinds,
    heroPosition: situation.heroPosition,
    heroCards: situation.heroCards.map(toCardRecord),
    pot: situation.pot,
    level: situation.level,
    progress: situation.progress,
    progressTotal: situation.progressTotal,
    score: situation.score,
    prompt: situation.prompt,
    availableActions: [...situation.availableActions],
    correctAction: situation.correctAction,
    explanation: situation.explanation,
    seats: situation.seats.map(toSeatRecord),
  };
}

function toCardRecord(card: PokerPlayingCard): Readonly<Record<string, DataContractValue>> {
  return {
    rank: card.rank,
    suit: card.suit,
  };
}

function toSeatRecord(seat: PokerSeatState): Readonly<Record<string, DataContractValue>> {
  return {
    id: seat.id,
    label: seat.label,
    ...(seat.sublabel ? { sublabel: seat.sublabel } : {}),
    ...(seat.cards ? { cards: seat.cards.map(toCardRecord) } : {}),
    ...(seat.faceDownCards !== undefined ? { faceDownCards: seat.faceDownCards } : {}),
    ...(seat.selected !== undefined ? { selected: seat.selected } : {}),
    ...(seat.muted !== undefined ? { muted: seat.muted } : {}),
    ...(seat.tokenLabel ? { tokenLabel: seat.tokenLabel } : {}),
    ...(seat.accessibilityLabel ? { accessibilityLabel: seat.accessibilityLabel } : {}),
  };
}
