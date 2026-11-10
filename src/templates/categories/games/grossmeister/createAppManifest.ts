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
  disabled = false,
): UiNode {
  return {
    id,
    type: 'Button',
    props: { children: label, disabled, variant, size: 'l' },
    style: { minHeight: 44 },
  };
}

const boardSizeOptions = Array.from({ length: 23 }, (_, index) => {
  const size = index + 2;
  return { value: `${size}x${size}`, label: `${size} × ${size}` };
});

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
      { name: 'sign-in', screenId: 'sign-in' },
      { name: 'sign-up', screenId: 'sign-up' },
    ],
  },
  screens: {
    play: {
      id: 'play',
      name: 'Spielen',
      title: 'Neue Partie',
      description: 'Board-first multiplayer configuration pending the server-owned chess API.',
      root: createShell('play', [
        { id: 'play-title', type: 'Heading', props: { text: 'Neue Partie', level: 1, size: 'h1' } },
        text(
          'play-copy',
          'Konfiguriere Brett und Figuren. Erstellen, Sperren und Starten werden erst durch API Gateway #70 möglich.',
        ),
        {
          id: 'play-board',
          type: 'ChessBoard',
          props: {
            columns: 8,
            rows: 8,
            pieces: [
              { color: 'white', piece: 'k', cell: { column: 5, row: 1 } },
              { color: 'white', piece: 'n', cell: { column: 3, row: 3 } },
              { color: 'black', piece: 'k', cell: { column: 5, row: 8 } },
              { color: 'black', piece: 'b', cell: { column: 6, row: 6 } },
            ],
            orientation: 'white',
            showCoordinates: true,
            disabled: true,
          },
        },
        {
          id: 'play-board-size',
          type: 'Select',
          props: {
            label: 'Brettgröße',
            defaultValue: '8x8',
            options: boardSizeOptions,
            disabled: true,
          },
        },
        {
          id: 'play-custom-pieces',
          type: 'RadioGroup',
          props: {
            defaultValue: 'queen',
            presentation: 'card',
            options: [
              { value: 'queen', label: 'Königin' },
              { value: 'rook', label: 'Turm' },
              { value: 'knight', label: 'Springer' },
              { value: 'bishop', label: 'Läufer' },
            ],
            disabled: true,
          },
        },
        {
          id: 'play-choice-coin',
          type: 'Card',
          props: {
            title: 'Choice Coin',
            description:
              'Choice Coins stehen für konfigurierbare Schachfiguren, nicht für die Wahl einer Farbe. Beide Spielenden wählen und sperren ihre Figuren serverseitig.',
            tone: 'outline',
          },
        },
        button('create-game', 'Mehrspieler-API erforderlich', 'solid', true),
      ]),
    },
    lobby: {
      id: 'lobby',
      name: 'Lobby',
      title: 'Lobby',
      description: 'Server-owned multiplayer lobby placeholder.',
      root: createShell('lobby', [
        { id: 'lobby-title', type: 'Heading', props: { text: 'Lobby', level: 1, size: 'h1' } },
        text(
          'lobby-copy',
          'Offene Partien, Beitreten und Sitzzuordnung werden von API Gateway #70 bereitgestellt.',
        ),
        {
          id: 'lobby-api-card',
          type: 'Card',
          props: {
            title: 'Mehrspieler-Lobby nicht verbunden',
            description: 'API Gateway #70 muss die Lobby lesen und den Beitritt atomar ausführen.',
            tone: 'outline',
          },
          children: [button('join-game', 'Beitreten nicht verfügbar', 'outline', true)],
        },
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
