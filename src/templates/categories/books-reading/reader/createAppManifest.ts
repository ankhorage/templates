import type { AppManifest, ComponentDataBindingRegistry, UiNode } from '@ankhorage/contracts';
import { validateNavigatorManifest } from '@ankhorage/navigator';

import { BASE_INFRA } from '../../../../internal/defaults';

/*** Return the complete portable Reeda reading application manifest. */
export default function createAppManifest(): AppManifest {
  const diagnostics = validateNavigatorManifest(manifest.navigator, {
    platform: 'ios',
    expoRouterVersion: '57.0.18',
  });
  if (diagnostics.some((diagnostic) => diagnostic.severity === 'error')) {
    throw new Error(diagnostics.map((diagnostic) => diagnostic.message).join(' '));
  }
  return structuredClone(manifest);
}

/*** Create a semantic heading node with the shared reading-template hierarchy. */
function heading(id: string, text: string, level: 1 | 2 | 3 = 2): UiNode {
  return { id, type: 'Heading', props: { text, level, size: `h${level}` } };
}

/*** Create body copy without duplicating the owner-backed Text node shape. */
function text(id: string, value: string, variant: 'body' | 'bodySmall' | 'lead' = 'body'): UiNode {
  return { id, type: 'Text', props: { text: value, variant } };
}

/*** Create a routed primary action and retain one explicit binding owner for it. */
function action(id: string, label: string): UiNode {
  return { id, type: 'Button', props: { children: label, variant: 'solid', size: 'l' } };
}

/*** Render the reusable sample-book cover through canonical bundled media. */
function cover(id: string, alt: string): UiNode {
  return {
    id,
    type: 'Image',
    props: { source: { mediaId: 'my-tigers-cover' }, alt, fit: 'cover', aspectRatio: 2 / 3 },
  };
}

const bindings: ComponentDataBindingRegistry = {
  'home-featured-book': navigateBinding('home-featured-book', 'Card', '/book-details'),
  'home-read-sample': navigateBinding('home-read-sample', 'Button', '/reader'),
  'library-continue': navigateBinding('library-continue', 'Button', '/reader'),
  'library-my-tigers': navigateBinding(
    'library-my-tigers',
    'MediaExplorer',
    '/book-details',
    'activate',
  ),
  'discover-featured-book': navigateBinding('discover-featured-book', 'Button', '/book-details'),
  'discover-recommendations': navigateBinding(
    'discover-recommendations',
    'ContentRail',
    '/book-details',
    'controlPress',
  ),
  'profile-settings': navigateBinding('profile-settings', 'IconButton', '/settings'),
  'book-continue': navigateBinding('book-continue', 'Button', '/reader'),
  'book-back': navigateBinding('book-back', 'IconButton', '/'),
  'settings-back': navigateBinding('settings-back', 'IconButton', '/profile'),
  'reader-contents': {
    componentId: 'reader-contents',
    componentType: 'Reader',
    events: {
      openContents: [
        {
          target: {
            capability: 'navigator.navigate',
            input: { route: { kind: 'literal', value: '/book-details' } },
          },
        },
      ],
      openAppearance: [
        {
          target: {
            capability: 'navigator.navigate',
            input: { route: { kind: 'literal', value: '/settings' } },
          },
        },
      ],
    },
  },
};

/*** Bind a metadata-backed component interaction to a canonical Navigator route. */
function navigateBinding(
  componentId: string,
  componentType: string,
  route: string,
  event = 'press',
): ComponentDataBindingRegistry[string] {
  return {
    componentId,
    componentType,
    events: {
      [event]: [
        {
          target: {
            capability: 'navigator.navigate',
            input: { route: { kind: 'literal', value: route } },
          },
        },
      ],
    },
  };
}

const manifest = {
  metadata: {
    name: 'Reeda',
    slug: 'reader',
    version: '1.0.0',
    category: 'books_reading',
    themeId: 'reeda',
  },
  themes: {
    reeda: {
      id: 'reeda',
      name: 'Reeda',
      light: { primaryColor: '#8B4513', harmony: 'analogous' },
      dark: { primaryColor: '#8B4513', harmony: 'analogous' },
      tokens: {
        spacing: { none: 0, xs: 4, s: 8, m: 16, l: 24, xl: 32, xxl: 48 },
        radii: { none: 0, s: 8, m: 12, l: 20, full: 9999 },
      },
    },
  },
  activeThemeId: 'reeda',
  activeThemeMode: 'light',
  settings: { localization: { defaultLocale: 'en', locales: ['en'] } },
  infra: structuredClone(BASE_INFRA),
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
          initialRouteName: 'home',
          routes: [
            {
              name: 'home',
              path: '/',
              label: 'Home',
              screenId: 'home',
              icon: { source: { mediaId: 'nav-home' } },
            },
            {
              name: 'library',
              path: '/library',
              label: 'Library',
              screenId: 'library',
              icon: { source: { mediaId: 'nav-library' } },
            },
            {
              name: 'discover',
              path: '/discover',
              label: 'Discover',
              screenId: 'discover',
              icon: { source: { mediaId: 'nav-discover' } },
            },
            {
              name: 'profile',
              path: '/profile',
              label: 'Profile',
              screenId: 'profile',
              icon: { source: { mediaId: 'nav-profile' } },
            },
          ],
        },
      },
      { name: 'book-details', screenId: 'book-details' },
      { name: 'reader', screenId: 'reader' },
      { name: 'settings', screenId: 'settings' },
    ],
  },
  screens: {
    home: {
      id: 'home',
      name: 'Home',
      title: 'Good morning, Maya',
      description: 'Featured reading and recommendations.',
      root: {
        id: 'home-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('home-title', 'Good morning, Maya', 1),
          {
            id: 'home-search',
            type: 'SearchInput',
            props: { placeholder: 'Search books, authors, ISBN' },
          },
          {
            id: 'home-featured-book',
            type: 'Card',
            props: { title: 'My Tigers' },
            children: [
              cover('home-featured-cover', 'My Tigers cover'),
              text('home-featured-author', 'Elena Voss', 'lead'),
              action('home-read-sample', 'Read a sample'),
            ],
          },
          heading('home-made-for-you', 'Made for you'),
          {
            id: 'home-recommendations',
            type: 'ContentRail',
            props: {
              items: [
                {
                  id: 'wild-light',
                  title: 'The Wild Light',
                  image: { mediaId: 'my-tigers-cover' },
                },
                {
                  id: 'beneath-willow',
                  title: 'Beneath the Willow',
                  image: { mediaId: 'my-tigers-cover' },
                },
                {
                  id: 'four-winters',
                  title: 'Four Winters Left',
                  image: { mediaId: 'my-tigers-cover' },
                },
              ],
            },
          },
          heading('home-trending', 'Trending now'),
          text('home-trending-copy', 'The Paper Birds · 4.6    Echoes of Home · 4.5'),
        ],
      },
    },
    library: {
      id: 'library',
      name: 'Library',
      title: 'My Library',
      description: 'Progress, filters, and the owned reading collection.',
      root: {
        id: 'library-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('library-title', 'My Library', 1),
          {
            id: 'library-progress',
            type: 'ProgressRing',
            props: { value: 68, max: 100, label: '68% of your library read' },
          },
          text('library-metrics', '24 owned · 16 finished · 2 in progress'),
          heading('library-continue-title', 'Continue reading'),
          {
            id: 'library-continue-card',
            type: 'Card',
            props: { title: 'My Tigers' },
            children: [
              cover('library-continue-cover', 'My Tigers cover'),
              text('library-continue-progress', '42% complete'),
              action('library-continue', 'Continue'),
            ],
          },
          heading('library-all-books', 'All books'),
          {
            id: 'library-filter',
            type: 'ChipGroup',
            props: {
              value: 'all',
              options: [
                { value: 'all', label: 'All' },
                { value: 'reading', label: 'Reading' },
                { value: 'finished', label: 'Finished' },
                { value: 'unread', label: 'Unread' },
              ],
            },
          },
          {
            id: 'library-my-tigers',
            type: 'MediaExplorer',
            props: {
              selectionMode: 'single',
              tileSize: 148,
              items: [
                {
                  id: 'my-tigers',
                  label: 'My Tigers',
                  subtitle: 'Elena Voss · 42%',
                  source: { mediaId: 'my-tigers-cover' },
                },
                {
                  id: 'wild-light',
                  label: 'The Wild Light',
                  subtitle: 'Juno Harper · Finished',
                  source: { mediaId: 'my-tigers-cover' },
                },
                {
                  id: 'beneath-willow',
                  label: 'Beneath the Willow',
                  subtitle: 'Clara Devlin · 71%',
                  source: { mediaId: 'my-tigers-cover' },
                },
              ],
            },
          },
        ],
      },
    },
    discover: {
      id: 'discover',
      name: 'Discover',
      title: 'Discover',
      description: 'Search, filters, releases, and reading moods.',
      root: {
        id: 'discover-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('discover-title', 'Discover', 1),
          text('discover-lead', 'Find your next unforgettable book', 'lead'),
          {
            id: 'discover-search',
            type: 'SearchInput',
            props: { placeholder: 'Title, author, genre, ISBN' },
          },
          {
            id: 'discover-filters',
            type: 'ChipGroup',
            props: {
              value: 'for-you',
              options: [
                { value: 'for-you', label: 'For you' },
                { value: 'fiction', label: 'Fiction' },
                { value: 'mystery', label: 'Mystery' },
                { value: 'fantasy', label: 'Fantasy' },
                { value: 'history', label: 'History' },
              ],
            },
          },
          {
            id: 'discover-release',
            type: 'Card',
            props: { title: 'The Map of Quiet Rivers' },
            children: [
              cover('discover-release-cover', 'The Map of Quiet Rivers cover'),
              text('discover-release-author', 'Nora Bell · 4.8'),
              action('discover-featured-book', 'View book'),
            ],
          },
          heading('discover-because', 'Because you loved My Tigers'),
          {
            id: 'discover-recommendations',
            type: 'ContentRail',
            props: {
              items: [
                { id: 'ashwood', title: 'The Ashwood' },
                { id: 'golden-forest', title: 'The Golden Forest' },
                { id: 'ember-atlas', title: 'Ember Atlas' },
              ],
            },
          },
          heading('discover-moods', 'Browse by mood'),
          text('discover-moods-copy', 'Immersive · Hopeful · Wild · Thoughtful'),
        ],
      },
    },
    profile: {
      id: 'profile',
      name: 'Profile',
      title: 'Profile',
      description: 'Reading goal, taste, achievements, and settings.',
      root: {
        id: 'profile-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          {
            id: 'profile-settings',
            type: 'IconButton',
            props: { iconName: 'settings-outline', label: 'Open settings', variant: 'ghost' },
          },
          heading('profile-title', 'Maya Chen', 1),
          text('profile-handle', '@mayareads · Reeda member since 2023', 'lead'),
          {
            id: 'profile-goal',
            type: 'ProgressRing',
            props: { value: 16, max: 24, label: '2026 Reading Goal · 8 books to go' },
          },
          text('profile-metrics', '47 day streak · 1,284 pages · 31 highlights'),
          heading('profile-taste', 'Your reading taste'),
          text('profile-taste-chips', 'Literary fiction · Nature writing · Fantasy · History'),
          heading('profile-achievements', 'Recent achievements'),
          text('profile-achievement-copy', 'Night Reader · Book Voyager · Thoughtful Notes'),
        ],
      },
    },
    'book-details': {
      id: 'book-details',
      name: 'Book details',
      title: 'My Tigers',
      description: 'Book overview, reviews, details, and entry to reading.',
      root: {
        id: 'book-details-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          {
            id: 'book-back',
            type: 'IconButton',
            props: { iconName: 'chevron-back', label: 'Back', variant: 'ghost' },
          },
          heading('book-title', 'My Tigers', 1),
          {
            id: 'book-cover',
            type: 'Card',
            props: { title: 'My Tigers' },
            children: [
              cover('book-cover-image', 'My Tigers cover'),
              text('book-author', 'Elena Voss', 'lead'),
              text('book-facts', '4.7 · 2,418 ratings · 368 pages · Literary fantasy · 42% read'),
              action('book-continue', 'Continue reading'),
            ],
          },
          {
            id: 'book-tabs',
            type: 'Tabs',
            props: {
              value: 'overview',
              tabs: [
                { value: 'overview', label: 'Overview' },
                { value: 'reviews', label: 'Reviews' },
                { value: 'details', label: 'Details' },
              ],
            },
          },
          heading('book-about', 'About this book'),
          text(
            'book-synopsis',
            'Cartographer Mara Vale follows the last firetiger toward a forest that remembers every flame.',
          ),
          heading('book-reviews', 'Reader reviews'),
          text('book-review-copy', '“Beautifully written and deeply moving.” — Verified reader'),
        ],
      },
    },
    reader: {
      id: 'reader',
      name: 'Reader',
      title: 'My Tigers',
      description: 'Released ZORA Reader with the portable ebookReader requirement.',
      requires: { capabilities: { ebookReader: true } },
      root: {
        id: 'reader-root',
        type: 'Screen',
        props: { width: 'wide', scroll: false },
        children: [
          {
            id: 'reader-contents',
            type: 'Reader',
            props: {
              source: { mediaId: 'my-tigers-sample' },
              format: 'epub',
              status: 'ready',
              location: 'chapter-7',
              page: 126,
              pageCount: 368,
              progress: 0.42,
              canGoPrevious: true,
              canGoNext: true,
              title: 'My Tigers',
              subtitle: 'Elena Voss',
              chapterLabel: 'VII — The Ember Crossing',
              pageLabel: 'Chapter 7 of 18 · 42%',
              contentsLabel: 'Contents',
              appearanceLabel: 'Appearance',
              highlightLabel: 'Highlight',
              showChrome: true,
              readerColorScheme: 'sepia',
              fontScale: 1,
              lineHeight: 'relaxed',
            },
          },
        ],
      },
    },
    settings: {
      id: 'settings',
      name: 'Settings',
      title: 'Settings',
      description: 'Portable reading, download, notification, and account preferences.',
      root: {
        id: 'settings-root',
        type: 'Screen',
        props: { width: 'narrow', scroll: true },
        children: [
          {
            id: 'settings-back',
            type: 'IconButton',
            props: { iconName: 'chevron-back', label: 'Back to profile', variant: 'ghost' },
          },
          heading('settings-title', 'Settings', 1),
          heading('settings-reading', 'Reading'),
          {
            id: 'settings-awake',
            type: 'Switch',
            props: { children: 'Keep screen awake', checked: true },
          },
          {
            id: 'settings-progress',
            type: 'RadioGroup',
            props: {
              defaultValue: 'pages-percent',
              options: [
                { value: 'pages-percent', label: 'Pages & percent' },
                { value: 'percent', label: 'Percent only' },
              ],
            },
          },
          heading('settings-downloads', 'Downloads'),
          {
            id: 'settings-download',
            type: 'Switch',
            props: { children: 'Auto-download purchases', checked: true },
          },
          heading('settings-notifications', 'Notifications'),
          {
            id: 'settings-reminders',
            type: 'Switch',
            props: { children: 'Reading reminders', checked: true },
          },
          {
            id: 'settings-releases',
            type: 'Switch',
            props: { children: 'New releases from followed authors', checked: false },
          },
          heading('settings-privacy', 'Privacy & account'),
          text('settings-privacy-copy', 'Privacy controls · Payment methods · Restore purchases'),
          {
            id: 'settings-delete',
            type: 'Button',
            props: { children: 'Delete account', variant: 'outline', color: 'danger', size: 'l' },
          },
        ],
      },
    },
  },
  dataBindings: bindings,
  media: {
    assets: {
      'my-tigers-cover': {
        id: 'my-tigers-cover',
        name: 'My Tigers cover',
        kind: 'image',
        contentType: 'image/png',
        source: { kind: 'bundled', path: 'assets/images/my-tigers.png' },
        metadata: { width: 1024, height: 1536 },
      },
      'my-tigers-sample': {
        id: 'my-tigers-sample',
        name: 'My Tigers sample EPUB',
        kind: 'file',
        contentType: 'application/epub+zip',
        source: { kind: 'url', url: 'https://www.gutenberg.org/ebooks/236.epub3.images' },
      },
      'nav-home': {
        id: 'nav-home',
        name: 'Home navigation icon',
        kind: 'image',
        contentType: 'image/svg+xml',
        source: { kind: 'bundled', path: 'assets/images/svg/home.svg' },
      },
      'nav-library': {
        id: 'nav-library',
        name: 'Library navigation icon',
        kind: 'image',
        contentType: 'image/svg+xml',
        source: { kind: 'bundled', path: 'assets/images/svg/library.svg' },
      },
      'nav-discover': {
        id: 'nav-discover',
        name: 'Discover navigation icon',
        kind: 'image',
        contentType: 'image/svg+xml',
        source: { kind: 'bundled', path: 'assets/images/svg/discover.svg' },
      },
      'nav-profile': {
        id: 'nav-profile',
        name: 'Profile navigation icon',
        kind: 'image',
        contentType: 'image/svg+xml',
        source: { kind: 'bundled', path: 'assets/images/svg/profile.svg' },
      },
    },
  },
} satisfies AppManifest;
