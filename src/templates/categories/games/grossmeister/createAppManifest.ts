import type { AppManifest, EventBinding, UiNode } from '@ankhorage/contracts';
import { DEFAULT_AUTH_FLOW } from '@ankhorage/contracts';

import { createValidatedManifest } from '../../../../internal/createValidatedManifest';
import { createLocalInfra } from '../../../../internal/defaults';

/*** Create the complete portable GrossMeister chess application manifest. */
export default function createAppManifest(): AppManifest {
  return createValidatedManifest(manifest);
}

/*** Build the shared Navy GrossMeister shell with a future-avatar slot and footer wordmark. */
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
            props: { accessibilityLabel: 'Future signed-in avatar' },
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
): UiNode {
  return {
    id,
    type: 'Button',
    props: { children: label, variant, size: 'l' },
    style: { minHeight: 44 },
  };
}

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
      description: 'Configure and offer a portable chess match.',
      root: createShell('play', [
        { id: 'play-title', type: 'Heading', props: { text: 'Neue Partie', level: 1, size: 'h1' } },
        text('play-copy', 'Stelle deine Partie zusammen und lade einen Gegner ein.'),
        {
          id: 'play-board-size',
          type: 'Select',
          props: {
            label: 'Brett',
            defaultValue: '8x8',
            options: [{ value: '8x8', label: '8 × 8' }],
          },
        },
        {
          id: 'play-time',
          type: 'Select',
          props: {
            label: 'Bedenkzeit',
            defaultValue: '10',
            options: [
              { value: '10', label: '10 Minuten' },
              { value: '15', label: '15 Minuten' },
            ],
          },
        },
        {
          id: 'play-color',
          type: 'RadioGroup',
          props: {
            defaultValue: 'choice',
            presentation: 'card',
            options: [
              { value: 'choice', label: 'Choice Coin' },
              { value: 'white', label: 'Weiss' },
              { value: 'black', label: 'Schwarz' },
            ],
          },
        },
        button('create-game', 'Partie erstellen'),
      ]),
    },
    lobby: {
      id: 'lobby',
      name: 'Lobby',
      title: 'Lobby',
      description: 'Waiting games with explicit join actions.',
      root: createShell('lobby', [
        { id: 'lobby-title', type: 'Heading', props: { text: 'Lobby', level: 1, size: 'h1' } },
        text('lobby-copy', 'Offene Partien warten auf einen Gegner.'),
        {
          id: 'waiting-game-card',
          type: 'Card',
          props: {
            title: 'Anna · 10 Minuten',
            description: '8 × 8 · Choice Coin',
            tone: 'outline',
          },
          children: [button('join-game', 'Beitreten', 'outline')],
        },
      ]),
    },
    waiting: {
      id: 'waiting',
      name: 'Warten',
      title: 'Warte auf Gegner',
      description: 'Waiting-game offer state.',
      root: createShell('waiting', [
        {
          id: 'waiting-title',
          type: 'Heading',
          props: { text: 'Warte auf Gegner', level: 1, size: 'h1' },
        },
        text(
          'waiting-copy',
          'Deine Partie ist offen. Wir benachrichtigen dich, sobald jemand beitritt.',
        ),
        button('back-lobby', 'Zur Lobby', 'outline'),
      ]),
    },
    coin: {
      id: 'coin',
      name: 'Choice Coin',
      title: 'Choice Coin',
      description: 'Color selection state.',
      root: createShell('coin', [
        { id: 'coin-title', type: 'Heading', props: { text: 'Choice Coin', level: 1, size: 'h1' } },
        text('coin-copy', 'Die Münze entscheidet, wer die Farbe wählt.'),
        {
          id: 'coin-choice',
          type: 'RadioGroup',
          props: {
            defaultValue: 'white',
            presentation: 'card',
            options: [
              { value: 'white', label: 'Weiss spielen' },
              { value: 'black', label: 'Schwarz spielen' },
            ],
          },
        },
        button('start-match', 'Partie starten'),
      ]),
    },
    match: {
      id: 'match',
      name: 'Partie',
      title: 'Deine Partie',
      description: 'Active board presentation; legal game operations remain owner-provided.',
      root: createShell('match', [
        {
          id: 'match-title',
          type: 'Heading',
          props: { text: 'Deine Partie', level: 1, size: 'h1' },
        },
        text('match-status', 'Weiss ist am Zug', 'bodySmall'),
        {
          id: 'match-board',
          type: 'ChessBoard',
          props: { columns: 8, rows: 8, pieces: [], orientation: 'white', showCoordinates: true },
        },
        button('resign-match', 'Aufgeben', 'outline'),
      ]),
    },
    result: {
      id: 'result',
      name: 'Ergebnis',
      title: 'Partie beendet',
      description: 'Game result state.',
      root: createShell('result', [
        {
          id: 'result-title',
          type: 'Heading',
          props: { text: 'Partie beendet', level: 1, size: 'h1' },
        },
        {
          id: 'result-card',
          type: 'Card',
          props: {
            title: 'Remis',
            description: 'Eine spannende Partie auf Augenhöhe.',
            tone: 'outline',
          },
        },
        button('result-lobby', 'Zur Lobby'),
      ]),
    },
    'sign-in': {
      id: 'sign-in',
      name: 'Anmelden',
      title: 'Anmelden',
      description: 'Canonical authentication sign-in screen.',
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
      description: 'Canonical registration screen.',
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
    'create-game': {
      componentId: 'create-game',
      componentType: 'Button',
      events: { press: [navigate('/waiting')] },
    },
    'join-game': {
      componentId: 'join-game',
      componentType: 'Button',
      events: { press: [navigate('/coin')] },
    },
    'back-lobby': {
      componentId: 'back-lobby',
      componentType: 'Button',
      events: { press: [navigate('/lobby')] },
    },
    'start-match': {
      componentId: 'start-match',
      componentType: 'Button',
      events: { press: [navigate('/match')] },
    },
    'resign-match': {
      componentId: 'resign-match',
      componentType: 'Button',
      events: { press: [navigate('/result')] },
    },
    'result-lobby': {
      componentId: 'result-lobby',
      componentType: 'Button',
      events: { press: [navigate('/lobby')] },
    },
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
