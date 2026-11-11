import type {
  AppManifest,
  BindingExpression,
  ComponentDataBindingRegistry,
  EventBinding,
  UiNode,
} from '@ankhorage/contracts';
import { DEFAULT_AUTH_FLOW } from '@ankhorage/contracts';

import { createValidatedManifest } from '../../../../internal/createValidatedManifest';
import { createLocalInfra } from '../../../../internal/defaults';

/*** Create the complete portable GrossMeister chess application manifest. */
export default function createAppManifest(): AppManifest {
  return createValidatedManifest(manifest);
}

/*** Build the shared Navy GrossMeister shell with an avatar slot and footer wordmark. */
function createShell(screenId: string, children: readonly UiNode[]): UiNode {
  return {
    id: `${screenId}-root`,
    type: 'Screen',
    props: { scroll: true, width: 'default' },
    children: [
      {
        id: `${screenId}-header`,
        type: 'View',
        props: {},
        style: { direction: 'row', align: 'center', justify: 'space-between', padding: 20 },
        children: [
          {
            id: `${screenId}-brand`,
            type: 'View',
            props: {},
            style: { direction: 'row', align: 'center', gap: 8 },
            children: [
              {
                id: `${screenId}-mark`,
                type: 'Icon',
                props: { source: { mediaId: 'grossmeister-mark' }, size: 36, color: '#161a49' },
              },
              {
                id: `${screenId}-name`,
                type: 'Heading',
                props: { text: 'GrossMeister', level: 2, size: 'h3' },
              },
            ],
          },
          {
            id: `${screenId}-avatar-slot`,
            type: 'View',
            props: { accessibilityLabel: 'Profilbild' },
            style: {
              width: 44,
              height: 44,
              radius: 'full',
              borderWidth: 1,
              borderColor: '#161a49',
            },
          },
        ],
      },
      ...children,
      {
        id: `${screenId}-footer`,
        type: 'View',
        props: {},
        style: { align: 'center', gap: 8, padding: 20 },
        children: [
          {
            id: `${screenId}-wordmark`,
            type: 'Image',
            props: { source: { mediaId: 'grossmeister-wordmark' }, alt: 'GrossMeister' },
            style: { width: 150, height: 50 },
          },
          {
            id: `${screenId}-footer-copy`,
            type: 'Text',
            props: { text: 'Schach neu gedacht', variant: 'caption', emphasis: 'muted' },
          },
        ],
      },
    ],
    style: { gap: 20 },
  };
}

/*** Create one portable navigation binding for an explicitly named route. */
function navigate(route: string): EventBinding {
  return {
    target: {
      capability: 'navigator.navigate',
      input: { route: { kind: 'literal', value: route } },
    },
  };
}

/*** Create a concise text node for the fixed Navy application screens. */
function text(
  id: string,
  value: string,
  variant: 'body' | 'bodySmall' | 'caption' = 'body',
): UiNode {
  return { id, type: 'Text', props: { text: value, variant } };
}

/*** Create a release-safe button with its visible label and minimum touch target. */
function button(
  id: string,
  label: string,
  variant: 'solid' | 'outline' | 'soft' = 'solid',
  disabled = false,
): UiNode {
  return {
    id,
    type: 'Button',
    props: { children: label, disabled, variant, size: 'l' },
    style: { minHeight: 44 },
  };
}

const boardDimensionOptions = Array.from({ length: 23 }, (_, index) => {
  const size = index + 2;
  return { value: `${size}`, label: `${size}` };
});

const previewPieces = [
  { color: 'white' as const, piece: 'k', cell: { column: 5, row: 1 } },
  { color: 'white' as const, piece: 'n', cell: { column: 3, row: 3 } },
  { color: 'black' as const, piece: 'k', cell: { column: 5, row: 8 } },
  { color: 'black' as const, piece: 'b', cell: { column: 6, row: 6 } },
];

/*** Read one persisted board dimension, retaining the authored eight-cell default before selection. */
function boardDimension(path: 'columns' | 'rows'): BindingExpression {
  return {
    kind: 'fallback',
    value: { capability: 'state.grossmeister', path: `board.${path}` },
    fallback: { kind: 'literal', value: 8 },
  };
}

/*** Set one persisted board dimension from the released Select event using the canonical numeric transform. */
function setBoardDimension(path: 'columns' | 'rows'): EventBinding {
  return {
    target: {
      capability: 'state.set',
      input: {
        path: { kind: 'literal', value: `grossmeister.board.${path}` },
        value: {
          kind: 'transform',
          value: { capability: 'select.valueChange', path: 'payload.value' },
          transforms: ['number'],
        },
      },
    },
  };
}

const boardBindings: ComponentDataBindingRegistry = {
  'play-board': {
    componentId: 'play-board',
    componentType: 'ChessBoard',
    props: {
      columns: { value: boardDimension('columns') },
      rows: { value: boardDimension('rows') },
    },
  },
  'play-board-columns': {
    componentId: 'play-board-columns',
    componentType: 'Select',
    events: { valueChange: [setBoardDimension('columns')] },
  },
  'play-board-rows': {
    componentId: 'play-board-rows',
    componentType: 'Select',
    events: { valueChange: [setBoardDimension('rows')] },
  },
};

const manifest: AppManifest = {
  metadata: {
    name: 'GrossMeister',
    slug: 'grossmeister',
    version: '1.0.0',
    category: 'games',
    themeId: 'grossmeister-navy',
  },
  themes: {
    'grossmeister-navy': {
      id: 'grossmeister-navy',
      name: 'GrossMeister Navy',
      light: { primaryColor: '#161a49', harmony: 'monochromatic' },
      dark: { primaryColor: '#161a49', harmony: 'monochromatic' },
      tokens: { radii: { none: 0, s: 6, m: 10, l: 16, full: 9999 } },
      recipes: {
        components: { Button: { color: 'primary', size: 'l' }, Card: { tone: 'outline' } },
      },
    },
  },
  activeThemeId: 'grossmeister-navy',
  activeThemeMode: 'light',
  infra: createLocalInfra({ ...DEFAULT_AUTH_FLOW, postSignInRoute: '/' }),
  settings: { localization: { defaultLocale: 'de', locales: ['de'] } },
  navigator: {
    type: 'stack',
    implementation: 'native',
    options: { headerShown: false },
    initialRouteName: '(tabs)',
    routes: [
      {
        name: '(tabs)',
        navigator: {
          type: 'tabs',
          implementation: 'headless',
          presentation: 'bottom',
          initialRouteName: 'play',
          routes: [
            { name: 'play', path: '/', label: 'Spielen', screenId: 'play' },
            { name: 'lobby', path: '/lobby', label: 'Lobby', screenId: 'lobby' },
          ],
        },
      },
      { name: 'waiting', screenId: 'waiting' },
      { name: 'coin', screenId: 'coin' },
      { name: 'match', screenId: 'match' },
      { name: 'result', screenId: 'result' },
      { name: 'sign-in', screenId: 'sign-in' },
      { name: 'sign-up', screenId: 'sign-up' },
    ],
  },
  screens: {
    play: {
      id: 'play',
      name: 'Spielen',
      title: 'Neue Partie',
      description: 'Konfiguriere zuerst dein Schachbrett.',
      root: createShell('play', [
        { id: 'play-title', type: 'Heading', props: { text: 'Neue Partie', level: 1, size: 'h1' } },
        text('play-copy', 'Wähle Reihen, Spalten und deine Figuren.'),
        {
          id: 'play-board',
          type: 'ChessBoard',
          props: {
            columns: 8,
            rows: 8,
            pieces: previewPieces,
            orientation: 'white',
            showCoordinates: true,
          },
        },
        {
          id: 'play-board-columns',
          type: 'Select',
          props: {
            label: 'Spalten',
            defaultValue: '8',
            options: boardDimensionOptions,
          },
        },
        {
          id: 'play-board-rows',
          type: 'Select',
          props: {
            label: 'Reihen',
            defaultValue: '8',
            options: boardDimensionOptions,
          },
        },
        {
          id: 'play-choice-coin',
          type: 'Card',
          props: {
            title: 'Choice Coin',
            description:
              'Das Brett unterstützt Choice Coins mit N/B und Free Choice mit P/N/B/R/Q/K. Jede Coin wird pro Spielenden einzeln gewählt und serverseitig gesperrt.',
            tone: 'outline',
          },
        },
        button('create-game', 'Partie erstellen', 'solid', true),
      ]),
    },
    lobby: {
      id: 'lobby',
      name: 'Lobby',
      title: 'Lobby',
      description: 'Finde offene Partien.',
      root: createShell('lobby', [
        { id: 'lobby-title', type: 'Heading', props: { text: 'Lobby', level: 1, size: 'h1' } },
        text('lobby-copy', 'Offene Partien erscheinen hier, sobald sie verfügbar sind.'),
        {
          id: 'lobby-api-card',
          type: 'Card',
          props: {
            title: 'Noch keine offene Partie',
            description: 'Beitreten ist zurzeit nicht verfügbar.',
            tone: 'outline',
          },
          children: [button('join-game', 'Beitreten', 'outline', true)],
        },
      ]),
    },
    waiting: {
      id: 'waiting',
      name: 'Warten',
      title: 'Warten auf Mitspielende',
      description: 'Die Partie wartet auf weitere Spielende.',
      root: createShell('waiting', [
        {
          id: 'waiting-title',
          type: 'Heading',
          props: { text: 'Warten auf Mitspielende', level: 1, size: 'h1' },
        },
        text('waiting-copy', 'Sobald alle bereit sind, geht es weiter.'),
        {
          id: 'waiting-status',
          type: 'Card',
          props: {
            title: 'Noch nicht bereit',
            description: 'Der Status wird geladen.',
            tone: 'outline',
          },
          children: [button('start-match', 'Partie starten', 'solid', true)],
        },
      ]),
    },
    coin: {
      id: 'coin',
      name: 'Choice Coin',
      title: 'Choice Coin',
      description: 'Wähle deine Figuren für Choice Coin.',
      root: createShell('coin', [
        { id: 'coin-title', type: 'Heading', props: { text: 'Choice Coin', level: 1, size: 'h1' } },
        text('coin-copy', 'Die verfügbaren Figuren hängen vom gewählten Engine-Preset ab.'),
        {
          id: 'coin-nb-preset',
          type: 'Card',
          props: {
            title: 'Choice Coin: N/B',
            description:
              'Jede Choice Coin bietet Springer (N) oder Läufer (B). Die Auswahl gilt je Coin und je Spielenden.',
            tone: 'outline',
          },
        },
        {
          id: 'coin-free-choice-preset',
          type: 'Card',
          props: {
            title: 'Free Choice Coin: P/N/B/R/Q/K',
            description:
              'P/N/B/R/Q/K: Jede Free Choice Coin bietet Bauer (P), Springer (N), Läufer (B), Turm (R), Königin (Q) oder König (K).',
            tone: 'outline',
          },
        },
        {
          id: 'coin-status',
          type: 'Card',
          props: {
            title: 'Auswahl noch nicht gesichert',
            description:
              'Dieses Template zeigt keine Coin-Auswahl oder Sperre. Die vollständigen Auswahlmengen und Sperren bleiben serverautoritativ.',
            tone: 'outline',
          },
        },
      ]),
    },
    match: {
      id: 'match',
      name: 'Partie',
      title: 'Partie',
      description: 'Die laufende Partie wird hier angezeigt.',
      root: createShell('match', [
        { id: 'match-title', type: 'Heading', props: { text: 'Partie', level: 1, size: 'h1' } },
        text('match-copy', 'Der Spielstand wird angezeigt, sobald die Partie läuft.'),
        {
          id: 'match-board',
          type: 'ChessBoard',
          props: {
            columns: 8,
            rows: 8,
            pieces: previewPieces,
            orientation: 'white',
            showCoordinates: true,
            disabled: true,
          },
        },
        {
          id: 'match-status',
          type: 'Card',
          props: {
            title: 'Partie noch nicht gestartet',
            description: 'Züge sind noch nicht verfügbar.',
            tone: 'outline',
          },
        },
        button('resign-match', 'Aufgeben', 'outline', true),
      ]),
    },
    result: {
      id: 'result',
      name: 'Ergebnis',
      title: 'Ergebnis',
      description: 'Das Ergebnis der Partie wird hier angezeigt.',
      root: createShell('result', [
        { id: 'result-title', type: 'Heading', props: { text: 'Ergebnis', level: 1, size: 'h1' } },
        text('result-copy', 'Das Ergebnis ist noch nicht verfügbar.'),
        {
          id: 'result-summary',
          type: 'Card',
          props: {
            title: 'Partie beendet',
            description: 'Das Ergebnis wird nach der Partie angezeigt.',
            tone: 'outline',
          },
        },
        button('result-new-game', 'Partie erstellen', 'solid', true),
      ]),
    },
    'sign-in': {
      id: 'sign-in',
      name: 'Anmelden',
      title: 'Anmelden',
      description: 'Melde dich an.',
      root: createShell('sign-in', [
        {
          id: 'sign-in-title',
          type: 'Heading',
          props: { text: 'Willkommen zurück', level: 1, size: 'h1' },
        },
        {
          id: 'sign-in-form',
          type: 'SignInForm',
          props: {
            identifiers: ['email'],
            identifierLabel: 'E-Mail',
            secretLabel: 'Passwort',
            submitLabel: 'Anmelden',
            signUpLabel: 'Konto erstellen',
          },
        },
      ]),
    },
    'sign-up': {
      id: 'sign-up',
      name: 'Registrieren',
      title: 'Konto erstellen',
      description: 'Erstelle ein Konto.',
      root: createShell('sign-up', [
        {
          id: 'sign-up-title',
          type: 'Heading',
          props: { text: 'Konto erstellen', level: 1, size: 'h1' },
        },
        {
          id: 'sign-up-form',
          type: 'SignUpForm',
          props: {
            fields: [
              { name: 'email', label: 'E-Mail', type: 'email', required: true },
              { name: 'password', label: 'Passwort', type: 'password', required: true },
            ],
            submitLabel: 'Registrieren',
            signInLabel: 'Anmelden',
          },
        },
      ]),
    },
  },
  dataBindings: {
    ...boardBindings,
    'sign-in-form': {
      componentId: 'sign-in-form',
      componentType: 'SignInForm',
      events: { signUp: [navigate('/sign-up')] },
    },
    'sign-up-form': {
      componentId: 'sign-up-form',
      componentType: 'SignUpForm',
      events: { signIn: [navigate('/sign-in')] },
    },
  },
  media: {
    assets: {
      'grossmeister-mark': {
        id: 'grossmeister-mark',
        name: 'GrossMeister Navy mark',
        kind: 'image',
        contentType: 'image/svg+xml',
        source: { kind: 'bundled', path: 'assets/images/svg/grossmeister-mark.svg' },
      },
      'grossmeister-wordmark': {
        id: 'grossmeister-wordmark',
        name: 'GrossMeister Navy wordmark',
        kind: 'image',
        contentType: 'image/svg+xml',
        source: { kind: 'bundled', path: 'assets/images/svg/grossmeister-wordmark.svg' },
      },
    },
  },
};
