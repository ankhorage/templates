import type { AppManifest } from '@ankhorage/contracts';

/*** Return the complete Stillpath design with responsive owner-backed navigation and bundled media. */
export default function createAppManifest(): AppManifest {
  return structuredClone(manifest);
}

const manifest = {
  metadata: {
    name: 'Stillpath',
    slug: 'stillpath',
    version: '1.0.0',
    category: 'lifestyle',
    themeId: 'stillpath',
  },
  themes: [
    {
      id: 'stillpath',
      name: 'Stillpath',
      light: {
        primaryColor: '#9274A8',
        harmony: 'analogous',
      },
      dark: {
        primaryColor: '#C8B1D8',
        harmony: 'analogous',
      },
      tokens: {
        spacing: {
          none: 0,
          xs: 4,
          s: 8,
          m: 8,
          l: 16,
          xl: 14,
          xxl: 48,
        },
        radii: {
          none: 0,
          s: 8,
          m: 24,
          l: 24,
          full: 9999,
        },
        typography: {
          headings: {
            '1': {
              weight: 'regular',
            },
            '2': {
              weight: 'regular',
            },
            '3': {
              weight: 'regular',
            },
          },
        },
      },
    },
  ],
  activeThemeId: 'stillpath',
  activeThemeMode: 'light',
  media: {
    assets: {
      home: {
        id: 'home',
        name: 'home',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/home.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      journal: {
        id: 'journal',
        name: 'journal',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/journal.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      rituals: {
        id: 'rituals',
        name: 'rituals',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/rituals.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      profile: {
        id: 'profile',
        name: 'profile',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/profile.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      sun: {
        id: 'sun',
        name: 'sun',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/sun.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      fabio: {
        id: 'fabio',
        name: 'fabio',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/fabio.png',
        },
        contentType: 'image/png',
        metadata: {
          width: 1254,
          height: 1254,
        },
      },
      sprig: {
        id: 'sprig',
        name: 'sprig',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/sprig.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'home-hero': {
        id: 'home-hero',
        name: 'home hero',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/home-hero.png',
        },
        contentType: 'image/png',
        metadata: {
          width: 1536,
          height: 1024,
        },
      },
      bookmark: {
        id: 'bookmark',
        name: 'bookmark',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/bookmark.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      mood: {
        id: 'mood',
        name: 'mood',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/mood.png',
        },
        contentType: 'image/png',
        metadata: {
          width: 1254,
          height: 1254,
        },
      },
      smile: {
        id: 'smile',
        name: 'smile',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/smile.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      clock: {
        id: 'clock',
        name: 'clock',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/clock.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      breath: {
        id: 'breath',
        name: 'breath',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/breath.png',
        },
        contentType: 'image/png',
        metadata: {
          width: 1254,
          height: 1254,
        },
      },
      wind: {
        id: 'wind',
        name: 'wind',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/wind.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      sleep: {
        id: 'sleep',
        name: 'sleep',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/sleep.png',
        },
        contentType: 'image/png',
        metadata: {
          width: 1536,
          height: 1024,
        },
      },
      moon: {
        id: 'moon',
        name: 'moon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/moon.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      focus: {
        id: 'focus',
        name: 'focus',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/focus.png',
        },
        contentType: 'image/png',
        metadata: {
          width: 1536,
          height: 1024,
        },
      },
      target: {
        id: 'target',
        name: 'target',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/target.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'ocean-release': {
        id: 'ocean-release',
        name: 'ocean release',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/ocean-release.png',
        },
        contentType: 'image/png',
        metadata: {
          width: 1536,
          height: 1024,
        },
      },
      leaf: {
        id: 'leaf',
        name: 'leaf',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/leaf.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      calendar: {
        id: 'calendar',
        name: 'calendar',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/calendar.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      cloud: {
        id: 'cloud',
        name: 'cloud',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/cloud.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      heart: {
        id: 'heart',
        name: 'heart',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/heart.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      waves: {
        id: 'waves',
        name: 'waves',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/waves.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      photo: {
        id: 'photo',
        name: 'photo',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/photo.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      microphone: {
        id: 'microphone',
        name: 'microphone',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/microphone.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'reflection-rest': {
        id: 'reflection-rest',
        name: 'reflection rest',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/reflection-rest.png',
        },
        contentType: 'image/png',
        metadata: {
          width: 1536,
          height: 1024,
        },
      },
      'chevron-right': {
        id: 'chevron-right',
        name: 'chevron right',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/chevron-right.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'reflection-mountains': {
        id: 'reflection-mountains',
        name: 'reflection mountains',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/reflection-mountains.png',
        },
        contentType: 'image/png',
        metadata: {
          width: 1536,
          height: 1024,
        },
      },
      'reflection-stones': {
        id: 'reflection-stones',
        name: 'reflection stones',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/reflection-stones.png',
        },
        contentType: 'image/png',
        metadata: {
          width: 1536,
          height: 1024,
        },
      },
      'ritual-hero': {
        id: 'ritual-hero',
        name: 'ritual hero',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/ritual-hero.png',
        },
        contentType: 'image/png',
        metadata: {
          width: 1536,
          height: 1024,
        },
      },
      level: {
        id: 'level',
        name: 'level',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/level.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      headphones: {
        id: 'headphones',
        name: 'headphones',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/headphones.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      sunrise: {
        id: 'sunrise',
        name: 'sunrise',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/sunrise.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      settings: {
        id: 'settings',
        name: 'settings',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/settings.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      flame: {
        id: 'flame',
        name: 'flame',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/flame.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'evening-reset': {
        id: 'evening-reset',
        name: 'evening reset',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/evening-reset.png',
        },
        contentType: 'image/png',
        metadata: {
          width: 1536,
          height: 1024,
        },
      },
      palette: {
        id: 'palette',
        name: 'palette',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/palette.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      bell: {
        id: 'bell',
        name: 'bell',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/bell.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
    },
  },
  infra: {
    database: {
      provider: 'supabase',
      tier: 'dev',
    },
    storage: {
      provider: 'auto',
      buckets: ['media'],
    },
    secretStore: {
      provider: 'supabase-vault',
    },
    deployment: {
      target: 'minikube',
      monitoring: false,
    },
    auth: {
      provider: 'supabase',
      scope: 'global',
      flow: {
        signInRoute: 'sign-in',
        signUpRoute: 'sign-up',
        signOutRoute: 'sign-out',
        postSignInRoute: '/',
        unauthorizedRoute: 'sign-in',
      },
      signIn: {
        identifiers: ['email'],
      },
      signUp: {
        requiredFields: ['email', 'password'],
        optionalFields: ['firstName', 'lastName'],
        signUpPolicy: 'autoSignIn',
      },
      profile: {
        fields: ['email', 'firstName', 'lastName'],
      },
    },
    networking: {
      cdn: false,
    },
    modules: [],
  },
  navigator: {
    type: 'tabs',
    implementation: 'headless',
    presentation: 'responsive',
    responsive: {
      compact: 'bottom',
      medium: 'rail',
      expanded: 'sidebar',
    },
    initialRouteName: 'index',
    routes: [
      {
        name: 'index',
        path: '/',
        label: 'Home',
        screenId: 'stillpath-home',
        icon: {
          source: {
            mediaId: 'home',
          },
        },
      },
      {
        name: 'journal',
        path: '/journal',
        label: 'Journal',
        screenId: 'stillpath-journal',
        icon: {
          source: {
            mediaId: 'journal',
          },
        },
      },
      {
        name: 'rituals',
        path: '/rituals',
        label: 'Rituals',
        screenId: 'stillpath-rituals',
        icon: {
          source: {
            mediaId: 'rituals',
          },
        },
      },
      {
        name: 'profile',
        path: '/profile',
        label: 'Profile',
        screenId: 'stillpath-profile',
        icon: {
          source: {
            mediaId: 'profile',
          },
        },
      },
    ],
  },
  screens: {
    'stillpath-home': {
      id: 'stillpath-home',
      name: 'Home',
      root: {
        id: 'stillpath-home-root',
        type: 'Screen',
        props: {
          width: 'default',
          scroll: true,
        },
        children: [
          {
            id: 'stillpath-home-root-content',
            type: 'Box',
            style: {
              gap: 12,
              paddingHorizontal: 0,
              paddingBottom: 16,
            },
            children: [
              {
                id: 'home-greeting',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                },
                children: [
                  {
                    id: 'home-hello',
                    type: 'Text',
                    props: {
                      text: 'Good morning, Fabio',
                    },
                    style: {
                      fontSize: 15,
                      flexShrink: 1,
                    },
                  },
                  {
                    id: 'home-sun',
                    type: 'Icon',
                    props: {
                      source: {
                        mediaId: 'sun',
                      },
                      size: 23,
                      color: '#EC950E',
                    },
                  },
                  {
                    id: 'home-spacer',
                    type: 'Box',
                    style: {
                      flex: 1,
                    },
                    children: [],
                  },
                  {
                    id: 'home-avatar',
                    type: 'Image',
                    props: {
                      source: {
                        mediaId: 'fabio',
                      },
                      alt: 'Fabio',
                    },
                    style: {
                      width: 42,
                      height: 42,
                      borderRadius: 21,
                    },
                  },
                ],
              },
              {
                id: 'home-title-block',
                type: 'Box',
                style: {
                  gap: 12,
                },
                children: [
                  {
                    id: 'home-title-row',
                    type: 'Box',
                    style: {
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    },
                    children: [
                      {
                        id: 'home-sprig',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'sprig',
                          },
                          size: 45,
                          color: '#AD98B9',
                        },
                      },
                      {
                        id: 'home-title',
                        type: 'Heading',
                        props: {
                          text: 'Stillpath',
                          level: 1,
                          weight: 'regular',
                        },
                        style: {
                          fontFamily: 'Georgia',
                          fontSize: 54,
                          lineHeight: 62.099999999999994,
                          fontWeight: '400',
                        },
                      },
                    ],
                  },
                  {
                    id: 'home-subtitle',
                    type: 'Text',
                    props: {
                      text: 'A gentle ritual for today',
                    },
                    style: {
                      fontSize: 16,
                      lineHeight: 24,
                      paddingLeft: 40,
                    },
                  },
                ],
              },
              {
                id: 'home-hero',
                type: 'Box',
                style: {
                  borderRadius: 18,
                  overflow: 'hidden',
                },
                children: [
                  {
                    id: 'home-hero-image',
                    type: 'Image',
                    props: {
                      source: {
                        mediaId: 'home-hero',
                      },
                      alt: 'Meditation above a lake at sunrise',
                    },
                    style: {
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    },
                  },
                  {
                    id: 'home-hero-content',
                    type: 'Box',
                    style: {
                      padding: 22,
                      gap: 12,
                      minHeight: 245,
                      justifyContent: 'space-between',
                    },
                    children: [
                      {
                        id: 'home-hero-title',
                        type: 'Heading',
                        props: {
                          text: 'Morning\nGrounding',
                          level: 2,
                          weight: 'regular',
                        },
                        style: {
                          fontFamily: 'Georgia',
                          fontSize: 28,
                          lineHeight: 32.199999999999996,
                          fontWeight: '400',
                          color: '#373135',
                          maxWidth: '55%',
                          whiteSpace: 'pre-line',
                        },
                      },
                      {
                        id: 'home-hero-rule',
                        type: 'Box',
                        style: {
                          width: 28,
                          height: 2,
                          backgroundColor: '#AD98B9',
                        },
                        children: [],
                      },
                      {
                        id: 'home-hero-description',
                        type: 'Text',
                        props: {
                          text: 'Set a calm foundation\nand move through\nyour day with presence.',
                        },
                        style: {
                          fontSize: 14,
                          lineHeight: 21,
                          color: '#524A4C',
                          maxWidth: '56%',
                          whiteSpace: 'pre-line',
                        },
                      },
                      {
                        id: 'home-hero-actions',
                        type: 'Box',
                        style: {
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 8,
                          flexWrap: 'wrap',
                          marginTop: 8,
                        },
                        children: [
                          {
                            id: 'home-begin-wrap',
                            type: 'Box',
                            style: {
                              minWidth: 120,
                              flexGrow: 1,
                            },
                            children: [
                              {
                                id: 'home-begin',
                                type: 'Button',
                                props: {
                                  children: '  Begin ritual',
                                  variant: 'solid',
                                  color: 'primary',
                                  size: 'l',
                                },
                                style: {
                                  minHeight: 44,
                                  borderRadius: 999,
                                  paddingLeft: 35,
                                  flex: 1,
                                },
                              },
                              {
                                id: 'home-begin-icon',
                                type: 'Box',
                                style: {
                                  position: 'absolute',
                                  left: 20,
                                  top: 14,
                                  pointerEvents: 'none',
                                },
                                children: [
                                  {
                                    id: 'home-begin-glyph',
                                    type: 'Icon',
                                    props: {
                                      source: {
                                        mediaId: 'sprig',
                                      },
                                      size: 20,
                                      color: '#FFFFFF',
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            id: 'home-save-wrap',
                            type: 'Box',
                            style: {
                              minWidth: 120,
                              flexGrow: 1,
                            },
                            children: [
                              {
                                id: 'home-save',
                                type: 'Button',
                                props: {
                                  children: '  Save for later',
                                  variant: 'soft',
                                  color: 'primary',
                                  size: 'l',
                                },
                                style: {
                                  minHeight: 44,
                                  borderRadius: 999,
                                  paddingLeft: 35,
                                  flex: 1,
                                },
                              },
                              {
                                id: 'home-save-icon',
                                type: 'Box',
                                style: {
                                  position: 'absolute',
                                  left: 20,
                                  top: 14,
                                  pointerEvents: 'none',
                                },
                                children: [
                                  {
                                    id: 'home-save-glyph',
                                    type: 'Icon',
                                    props: {
                                      source: {
                                        mediaId: 'bookmark',
                                      },
                                      size: 20,
                                      color: '#9274A8',
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: 'home-today',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  justifyContent: 'space-between',
                },
                children: [
                  {
                    id: 'home-today-title',
                    type: 'Heading',
                    props: {
                      text: 'Today',
                      level: 2,
                      weight: 'regular',
                    },
                    style: {
                      fontFamily: 'Georgia',
                      fontSize: 24,
                      lineHeight: 27.599999999999998,
                      fontWeight: '400',
                    },
                  },
                  {
                    id: 'home-today-action',
                    type: 'Button',
                    props: {
                      children: 'View all  ›',
                      variant: 'ghost',
                      color: 'primary',
                      size: 'l',
                    },
                    style: {
                      minHeight: 44,
                      borderRadius: 999,
                      paddingRight: 0,
                    },
                  },
                ],
              },
              {
                id: 'home-today-cards',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'stretch',
                  gap: 12,
                  flexWrap: 'wrap',
                },
                children: [
                  {
                    id: 'home-mood',
                    type: 'Box',
                    style: {
                      flexBasis: 160,
                      flexGrow: 1,
                      borderRadius: 16,
                      overflow: 'hidden',
                    },
                    children: [
                      {
                        id: 'home-mood-image',
                        type: 'Image',
                        props: {
                          source: {
                            mediaId: 'mood',
                          },
                          alt: 'Mood check-in',
                        },
                        style: {
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                        },
                      },
                      {
                        id: 'home-mood-content',
                        type: 'Box',
                        style: {
                          padding: 13,
                          gap: 8,
                          minHeight: 190,
                        },
                        children: [
                          {
                            id: 'home-mood-badge',
                            type: 'Box',
                            style: {
                              width: 42,
                              height: 42,
                              borderRadius: 21,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#FAF7F2',
                            },
                            children: [
                              {
                                id: 'home-mood-icon',
                                type: 'Icon',
                                props: {
                                  source: {
                                    mediaId: 'smile',
                                  },
                                  size: 24,
                                  color: '#9274A8',
                                },
                              },
                            ],
                          },
                          {
                            id: 'home-mood-title',
                            type: 'Heading',
                            props: {
                              text: 'Mood check-in',
                              level: 2,
                              weight: 'regular',
                            },
                            style: {
                              fontFamily: 'Georgia',
                              fontSize: 20,
                              lineHeight: 23,
                              fontWeight: '400',
                            },
                          },
                          {
                            id: 'home-mood-description',
                            type: 'Text',
                            props: {
                              text: 'Pause and notice how\nyou’re feeling.',
                            },
                            style: {
                              fontSize: 13,
                              lineHeight: 19,
                              color: '#524D4B',
                              whiteSpace: 'pre-line',
                            },
                          },
                          {
                            id: 'home-mood-duration',
                            type: 'Box',
                            style: {
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 5,
                              marginTop: 10,
                            },
                            children: [
                              {
                                id: 'home-mood-clock',
                                type: 'Icon',
                                props: {
                                  source: {
                                    mediaId: 'clock',
                                  },
                                  size: 16,
                                  color: '#9274A8',
                                },
                              },
                              {
                                id: 'home-mood-minutes',
                                type: 'Text',
                                props: {
                                  text: '2 min',
                                },
                                style: {
                                  fontSize: 13,
                                  color: '#80658F',
                                },
                              },
                            ],
                          },
                          {
                            id: 'home-mood-open',
                            type: 'Button',
                            props: {
                              children: 'Check in',
                              variant: 'ghost',
                              color: 'primary',
                              size: 'l',
                            },
                            style: {
                              minHeight: 44,
                              borderRadius: 999,
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 'home-breath',
                    type: 'Box',
                    style: {
                      flexBasis: 160,
                      flexGrow: 1,
                      borderRadius: 16,
                      overflow: 'hidden',
                    },
                    children: [
                      {
                        id: 'home-breath-image',
                        type: 'Image',
                        props: {
                          source: {
                            mediaId: 'breath',
                          },
                          alt: 'Breath practice',
                        },
                        style: {
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                        },
                      },
                      {
                        id: 'home-breath-content',
                        type: 'Box',
                        style: {
                          padding: 13,
                          gap: 8,
                          minHeight: 190,
                        },
                        children: [
                          {
                            id: 'home-breath-badge',
                            type: 'Box',
                            style: {
                              width: 42,
                              height: 42,
                              borderRadius: 21,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#FAF7F2',
                            },
                            children: [
                              {
                                id: 'home-breath-icon',
                                type: 'Icon',
                                props: {
                                  source: {
                                    mediaId: 'wind',
                                  },
                                  size: 24,
                                  color: '#417A78',
                                },
                              },
                            ],
                          },
                          {
                            id: 'home-breath-title',
                            type: 'Heading',
                            props: {
                              text: 'Breath practice',
                              level: 2,
                              weight: 'regular',
                            },
                            style: {
                              fontFamily: 'Georgia',
                              fontSize: 20,
                              lineHeight: 23,
                              fontWeight: '400',
                            },
                          },
                          {
                            id: 'home-breath-description',
                            type: 'Text',
                            props: {
                              text: 'Three mindful minutes\nto reset and breathe.',
                            },
                            style: {
                              fontSize: 13,
                              lineHeight: 19,
                              color: '#524D4B',
                              whiteSpace: 'pre-line',
                            },
                          },
                          {
                            id: 'home-breath-duration',
                            type: 'Box',
                            style: {
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 5,
                              marginTop: 10,
                            },
                            children: [
                              {
                                id: 'home-breath-clock',
                                type: 'Icon',
                                props: {
                                  source: {
                                    mediaId: 'clock',
                                  },
                                  size: 16,
                                  color: '#9274A8',
                                },
                              },
                              {
                                id: 'home-breath-minutes',
                                type: 'Text',
                                props: {
                                  text: '3 min',
                                },
                                style: {
                                  fontSize: 13,
                                  color: '#80658F',
                                },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: 'home-explore',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  justifyContent: 'space-between',
                },
                children: [
                  {
                    id: 'home-explore-title',
                    type: 'Heading',
                    props: {
                      text: 'Explore',
                      level: 2,
                      weight: 'regular',
                    },
                    style: {
                      fontFamily: 'Georgia',
                      fontSize: 24,
                      lineHeight: 27.599999999999998,
                      fontWeight: '400',
                    },
                  },
                  {
                    id: 'home-explore-action',
                    type: 'Button',
                    props: {
                      children: 'See all  ›',
                      variant: 'ghost',
                      color: 'primary',
                      size: 'l',
                    },
                    style: {
                      minHeight: 44,
                      borderRadius: 999,
                      paddingRight: 0,
                    },
                  },
                ],
              },
              {
                id: 'home-explore-cards',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'stretch',
                  gap: 12,
                  flexWrap: 'wrap',
                },
                children: [
                  {
                    id: 'home-sleep',
                    type: 'Box',
                    style: {
                      borderRadius: 16,
                      overflow: 'hidden',
                      backgroundColor: 'rgba(173,152,185,0.10)',
                      flexBasis: 110,
                      flexGrow: 1,
                      minWidth: 105,
                    },
                    children: [
                      {
                        id: 'home-sleep-media',
                        type: 'Box',
                        style: {
                          overflow: 'hidden',
                        },
                        children: [
                          {
                            id: 'home-sleep-image',
                            type: 'Image',
                            props: {
                              source: {
                                mediaId: 'sleep',
                              },
                              alt: 'Sleep',
                            },
                            style: {
                              width: '100%',
                              aspectRatio: 1.5,
                            },
                          },
                          {
                            id: 'home-sleep-badge',
                            type: 'Box',
                            style: {
                              position: 'absolute',
                              top: 10,
                              left: 10,
                              borderRadius: 999,
                              padding: 9,
                              backgroundColor: '#FAF7F2',
                            },
                            children: [
                              {
                                id: 'home-sleep-icon',
                                type: 'Icon',
                                props: {
                                  source: {
                                    mediaId: 'moon',
                                  },
                                  size: 23,
                                  color: '#9274A8',
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: 'home-sleep-body',
                        type: 'Box',
                        style: {
                          padding: 12,
                          gap: 5,
                        },
                        children: [
                          {
                            id: 'home-sleep-title',
                            type: 'Heading',
                            props: {
                              text: 'Sleep',
                              level: 2,
                              weight: 'regular',
                            },
                            style: {
                              fontFamily: 'Georgia',
                              fontSize: 19,
                              lineHeight: 21.849999999999998,
                              fontWeight: '400',
                            },
                          },
                          {
                            id: 'home-sleep-description',
                            type: 'Text',
                            props: {
                              text: 'Rest deeply\nand wake restored.',
                            },
                            style: {
                              fontSize: 13,
                              lineHeight: 20,
                              whiteSpace: 'pre-line',
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 'home-focus',
                    type: 'Box',
                    style: {
                      borderRadius: 16,
                      overflow: 'hidden',
                      backgroundColor: 'rgba(173,152,185,0.10)',
                      flexBasis: 110,
                      flexGrow: 1,
                      minWidth: 105,
                    },
                    children: [
                      {
                        id: 'home-focus-media',
                        type: 'Box',
                        style: {
                          overflow: 'hidden',
                        },
                        children: [
                          {
                            id: 'home-focus-image',
                            type: 'Image',
                            props: {
                              source: {
                                mediaId: 'focus',
                              },
                              alt: 'Focus',
                            },
                            style: {
                              width: '100%',
                              aspectRatio: 1.5,
                            },
                          },
                          {
                            id: 'home-focus-badge',
                            type: 'Box',
                            style: {
                              position: 'absolute',
                              top: 10,
                              left: 10,
                              borderRadius: 999,
                              padding: 9,
                              backgroundColor: '#FAF7F2',
                            },
                            children: [
                              {
                                id: 'home-focus-icon',
                                type: 'Icon',
                                props: {
                                  source: {
                                    mediaId: 'target',
                                  },
                                  size: 23,
                                  color: '#9274A8',
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: 'home-focus-body',
                        type: 'Box',
                        style: {
                          padding: 12,
                          gap: 5,
                        },
                        children: [
                          {
                            id: 'home-focus-title',
                            type: 'Heading',
                            props: {
                              text: 'Focus',
                              level: 2,
                              weight: 'regular',
                            },
                            style: {
                              fontFamily: 'Georgia',
                              fontSize: 19,
                              lineHeight: 21.849999999999998,
                              fontWeight: '400',
                            },
                          },
                          {
                            id: 'home-focus-description',
                            type: 'Text',
                            props: {
                              text: 'Cultivate clarity\nand steady attention.',
                            },
                            style: {
                              fontSize: 13,
                              lineHeight: 20,
                              whiteSpace: 'pre-line',
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 'home-release',
                    type: 'Box',
                    style: {
                      borderRadius: 16,
                      overflow: 'hidden',
                      backgroundColor: 'rgba(173,152,185,0.10)',
                      flexBasis: 110,
                      flexGrow: 1,
                      minWidth: 105,
                    },
                    children: [
                      {
                        id: 'home-release-media',
                        type: 'Box',
                        style: {
                          overflow: 'hidden',
                        },
                        children: [
                          {
                            id: 'home-release-image',
                            type: 'Image',
                            props: {
                              source: {
                                mediaId: 'ocean-release',
                              },
                              alt: 'Release',
                            },
                            style: {
                              width: '100%',
                              aspectRatio: 1.5,
                            },
                          },
                          {
                            id: 'home-release-badge',
                            type: 'Box',
                            style: {
                              position: 'absolute',
                              top: 10,
                              left: 10,
                              borderRadius: 999,
                              padding: 9,
                              backgroundColor: '#FAF7F2',
                            },
                            children: [
                              {
                                id: 'home-release-icon',
                                type: 'Icon',
                                props: {
                                  source: {
                                    mediaId: 'leaf',
                                  },
                                  size: 23,
                                  color: '#9274A8',
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: 'home-release-body',
                        type: 'Box',
                        style: {
                          padding: 12,
                          gap: 5,
                        },
                        children: [
                          {
                            id: 'home-release-title',
                            type: 'Heading',
                            props: {
                              text: 'Release',
                              level: 2,
                              weight: 'regular',
                            },
                            style: {
                              fontFamily: 'Georgia',
                              fontSize: 19,
                              lineHeight: 21.849999999999998,
                              fontWeight: '400',
                            },
                          },
                          {
                            id: 'home-release-description',
                            type: 'Text',
                            props: {
                              text: 'Let go, soften,\nand create space.',
                            },
                            style: {
                              fontSize: 13,
                              lineHeight: 20,
                              whiteSpace: 'pre-line',
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    'stillpath-journal': {
      id: 'stillpath-journal',
      name: 'Journal',
      root: {
        id: 'stillpath-journal-root',
        type: 'Screen',
        props: {
          width: 'default',
          scroll: true,
        },
        children: [
          {
            id: 'stillpath-journal-root-content',
            type: 'Box',
            style: {
              gap: 12,
              paddingHorizontal: 0,
              paddingBottom: 16,
            },
            children: [
              {
                id: 'journal-greeting',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                },
                children: [
                  {
                    id: 'journal-hello',
                    type: 'Text',
                    props: {
                      text: 'Good morning, Fabio',
                    },
                    style: {
                      fontSize: 15,
                      flexShrink: 1,
                    },
                  },
                  {
                    id: 'journal-sun',
                    type: 'Icon',
                    props: {
                      source: {
                        mediaId: 'sun',
                      },
                      size: 23,
                      color: '#EC950E',
                    },
                  },
                  {
                    id: 'journal-spacer',
                    type: 'Box',
                    style: {
                      flex: 1,
                    },
                    children: [],
                  },
                  {
                    id: 'journal-avatar',
                    type: 'Image',
                    props: {
                      source: {
                        mediaId: 'fabio',
                      },
                      alt: 'Fabio',
                    },
                    style: {
                      width: 42,
                      height: 42,
                      borderRadius: 21,
                    },
                  },
                ],
              },
              {
                id: 'journal-heading',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                },
                children: [
                  {
                    id: 'journal-title-block',
                    type: 'Box',
                    style: {
                      gap: 12,
                    },
                    children: [
                      {
                        id: 'journal-title-row',
                        type: 'Box',
                        style: {
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 8,
                        },
                        children: [
                          {
                            id: 'journal-sprig',
                            type: 'Icon',
                            props: {
                              source: {
                                mediaId: 'sprig',
                              },
                              size: 45,
                              color: '#AD98B9',
                            },
                          },
                          {
                            id: 'journal-title',
                            type: 'Heading',
                            props: {
                              text: 'Journal',
                              level: 1,
                              weight: 'regular',
                            },
                            style: {
                              fontFamily: 'Georgia',
                              fontSize: 48,
                              lineHeight: 55.199999999999996,
                              fontWeight: '400',
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 'journal-date-wrap',
                    type: 'Box',
                    style: {
                      minWidth: 120,
                      flexGrow: 1,
                    },
                    children: [
                      {
                        id: 'journal-date',
                        type: 'Button',
                        props: {
                          children: '  Today  ⌄',
                          variant: 'outline',
                          color: 'primary',
                          size: 'l',
                        },
                        style: {
                          minHeight: 44,
                          borderRadius: 999,
                          paddingLeft: 35,
                          flex: 1,
                        },
                      },
                      {
                        id: 'journal-date-icon',
                        type: 'Box',
                        style: {
                          position: 'absolute',
                          left: 20,
                          top: 14,
                          pointerEvents: 'none',
                        },
                        children: [
                          {
                            id: 'journal-date-glyph',
                            type: 'Icon',
                            props: {
                              source: {
                                mediaId: 'calendar',
                              },
                              size: 20,
                              color: '#9274A8',
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: 'journal-subtitle',
                type: 'Text',
                props: {
                  text: 'Notice what is present and give it words.',
                },
                style: {
                  fontSize: 16,
                  lineHeight: 24,
                },
              },
              {
                id: 'journal-mood',
                type: 'RadioGroup',
                props: {
                  defaultValue: 'calm',
                  options: [
                    {
                      value: 'calm',
                      label: 'Calm',
                      iconSource: {
                        mediaId: 'smile',
                      },
                    },
                    {
                      value: 'heavy',
                      label: 'Heavy',
                      iconSource: {
                        mediaId: 'cloud',
                      },
                    },
                    {
                      value: 'grateful',
                      label: 'Grateful',
                      iconSource: {
                        mediaId: 'heart',
                      },
                    },
                    {
                      value: 'restless',
                      label: 'Restless',
                      iconSource: {
                        mediaId: 'waves',
                      },
                    },
                  ],
                  orientation: 'horizontal',
                  presentation: 'card',
                  contentOrientation: 'horizontal',
                  columns: 2,
                  gap: 's',
                  size: 's',
                },
              },
              {
                id: 'journal-prompt',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  padding: 16,
                  borderRadius: 18,
                  backgroundColor: 'rgba(173,152,185,0.12)',
                  borderWidth: 1,
                  borderColor: 'rgba(173,152,185,0.22)',
                },
                children: [
                  {
                    id: 'journal-prompt-badge',
                    type: 'Box',
                    style: {
                      padding: 12,
                      backgroundColor: 'rgba(255,255,255,0.45)',
                      borderRadius: 999,
                    },
                    children: [
                      {
                        id: 'journal-prompt-icon',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'sprig',
                          },
                          size: 32,
                          color: '#9274A8',
                        },
                      },
                    ],
                  },
                  {
                    id: 'journal-prompt-copy',
                    type: 'Box',
                    style: {
                      flex: 1,
                      gap: 6,
                    },
                    children: [
                      {
                        id: 'journal-prompt-title',
                        type: 'Heading',
                        props: {
                          text: 'What would feel supportive today?',
                          level: 2,
                          weight: 'regular',
                        },
                        style: {
                          fontFamily: 'Georgia',
                          fontSize: 21,
                          lineHeight: 24.15,
                          fontWeight: '400',
                        },
                      },
                      {
                        id: 'journal-prompt-description',
                        type: 'Text',
                        props: {
                          text: 'There’s no right or wrong answer.',
                        },
                        style: {
                          fontSize: 14,
                          lineHeight: 21,
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: 'journal-editor',
                type: 'Box',
                style: {
                  padding: 18,
                  gap: 14,
                  borderWidth: 1,
                  borderColor: 'rgba(168,145,126,0.28)',
                  borderRadius: 18,
                },
                children: [
                  {
                    id: 'journal-entry',
                    type: 'TextInput',
                    props: {
                      multiline: true,
                      value:
                        'This morning feels quiet and spacious.\n\nI’m grateful for the slow start and the sunlight coming through the window.\n\nI want to be present with what matters and let go of what doesn’t.',
                      readOnly: true,
                      size: 'l',
                    },
                    style: {
                      fontFamily: 'Georgia',
                      fontSize: 18,
                      lineHeight: 28,
                      minHeight: 230,
                      borderWidth: 0,
                      backgroundColor: 'transparent',
                      padding: 0,
                    },
                  },
                  {
                    id: 'journal-status',
                    type: 'Box',
                    style: {
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12,
                    },
                    children: [
                      {
                        id: 'journal-status-icon',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'sprig',
                          },
                          size: 17,
                          color: '#A49BA2',
                        },
                      },
                      {
                        id: 'journal-save-status',
                        type: 'Text',
                        props: {
                          text: 'Sample reflection',
                          emphasis: 'muted',
                        },
                        style: {
                          fontSize: 12,
                        },
                      },
                      {
                        id: 'journal-status-spacer',
                        type: 'Box',
                        style: {
                          flex: 1,
                        },
                        children: [],
                      },
                      {
                        id: 'journal-word-count',
                        type: 'Text',
                        props: {
                          text: '33 words',
                          color: 'primary',
                        },
                        style: {
                          fontSize: 12,
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: 'journal-attachments',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  flexWrap: 'wrap',
                },
                children: [
                  {
                    id: 'journal-photo-wrap',
                    type: 'Box',
                    style: {
                      minWidth: 120,
                      flexGrow: 1,
                    },
                    children: [
                      {
                        id: 'journal-photo',
                        type: 'Button',
                        props: {
                          children: '  Add photo',
                          variant: 'outline',
                          color: 'primary',
                          size: 'l',
                        },
                        style: {
                          minHeight: 44,
                          borderRadius: 999,
                          paddingLeft: 35,
                          flex: 1,
                        },
                      },
                      {
                        id: 'journal-photo-icon',
                        type: 'Box',
                        style: {
                          position: 'absolute',
                          left: 20,
                          top: 14,
                          pointerEvents: 'none',
                        },
                        children: [
                          {
                            id: 'journal-photo-glyph',
                            type: 'Icon',
                            props: {
                              source: {
                                mediaId: 'photo',
                              },
                              size: 20,
                              color: '#9274A8',
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 'journal-voice-wrap',
                    type: 'Box',
                    style: {
                      minWidth: 120,
                      flexGrow: 1,
                    },
                    children: [
                      {
                        id: 'journal-voice',
                        type: 'Button',
                        props: {
                          children: '  Voice note',
                          variant: 'outline',
                          color: 'primary',
                          size: 'l',
                        },
                        style: {
                          minHeight: 44,
                          borderRadius: 999,
                          paddingLeft: 35,
                          flex: 1,
                        },
                      },
                      {
                        id: 'journal-voice-icon',
                        type: 'Box',
                        style: {
                          position: 'absolute',
                          left: 20,
                          top: 14,
                          pointerEvents: 'none',
                        },
                        children: [
                          {
                            id: 'journal-voice-glyph',
                            type: 'Icon',
                            props: {
                              source: {
                                mediaId: 'microphone',
                              },
                              size: 20,
                              color: '#9274A8',
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: 'journal-recent',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  justifyContent: 'space-between',
                },
                children: [
                  {
                    id: 'journal-recent-title',
                    type: 'Heading',
                    props: {
                      text: 'Recent reflections',
                      level: 2,
                      weight: 'regular',
                    },
                    style: {
                      fontFamily: 'Georgia',
                      fontSize: 24,
                      lineHeight: 27.599999999999998,
                      fontWeight: '400',
                    },
                  },
                  {
                    id: 'journal-recent-action',
                    type: 'Button',
                    props: {
                      children: 'See all  ›',
                      variant: 'ghost',
                      color: 'primary',
                      size: 'l',
                    },
                    style: {
                      minHeight: 44,
                      borderRadius: 999,
                      paddingRight: 0,
                    },
                  },
                ],
              },
              {
                id: 'journal-reflection-rest',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: 'rgba(168,145,126,0.15)',
                  paddingRight: 10,
                },
                children: [
                  {
                    id: 'journal-reflection-rest-image',
                    type: 'Image',
                    props: {
                      source: {
                        mediaId: 'reflection-rest',
                      },
                      alt: 'Reflection: rest',
                    },
                    style: {
                      width: 90,
                      height: 84,
                      borderRadius: 14,
                    },
                  },
                  {
                    id: 'journal-reflection-rest-text',
                    type: 'Text',
                    props: {
                      text: 'A gentle reminder that rest\nis productive too. I’m learning\nto slow down with more trust.',
                    },
                    style: {
                      fontSize: 13,
                      lineHeight: 20,
                      flex: 1,
                      whiteSpace: 'pre-line',
                    },
                  },
                  {
                    id: 'journal-reflection-rest-date',
                    type: 'Text',
                    props: {
                      text: 'Yesterday\n9:18 PM',
                      emphasis: 'muted',
                    },
                    style: {
                      fontSize: 11,
                      lineHeight: 19,
                      textAlign: 'right',
                      whiteSpace: 'pre-line',
                    },
                  },
                  {
                    id: 'journal-reflection-rest-chevron',
                    type: 'Icon',
                    props: {
                      source: {
                        mediaId: 'chevron-right',
                      },
                      size: 14,
                      color: '#9B9699',
                    },
                  },
                ],
              },
              {
                id: 'journal-reflection-mountains',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: 'rgba(168,145,126,0.15)',
                  paddingRight: 10,
                },
                children: [
                  {
                    id: 'journal-reflection-mountains-image',
                    type: 'Image',
                    props: {
                      source: {
                        mediaId: 'reflection-mountains',
                      },
                      alt: 'Reflection: mountains',
                    },
                    style: {
                      width: 90,
                      height: 84,
                      borderRadius: 14,
                    },
                  },
                  {
                    id: 'journal-reflection-mountains-text',
                    type: 'Text',
                    props: {
                      text: 'Felt scattered in the morning\nbut a short walk helped\nme come back to myself.',
                    },
                    style: {
                      fontSize: 13,
                      lineHeight: 20,
                      flex: 1,
                      whiteSpace: 'pre-line',
                    },
                  },
                  {
                    id: 'journal-reflection-mountains-date',
                    type: 'Text',
                    props: {
                      text: 'Yesterday\n7:02 AM',
                      emphasis: 'muted',
                    },
                    style: {
                      fontSize: 11,
                      lineHeight: 19,
                      textAlign: 'right',
                      whiteSpace: 'pre-line',
                    },
                  },
                  {
                    id: 'journal-reflection-mountains-chevron',
                    type: 'Icon',
                    props: {
                      source: {
                        mediaId: 'chevron-right',
                      },
                      size: 14,
                      color: '#9B9699',
                    },
                  },
                ],
              },
              {
                id: 'journal-reflection-stones',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: 'rgba(168,145,126,0.15)',
                  paddingRight: 10,
                },
                children: [
                  {
                    id: 'journal-reflection-stones-image',
                    type: 'Image',
                    props: {
                      source: {
                        mediaId: 'reflection-stones',
                      },
                      alt: 'Reflection: stones',
                    },
                    style: {
                      width: 90,
                      height: 84,
                      borderRadius: 14,
                    },
                  },
                  {
                    id: 'journal-reflection-stones-text',
                    type: 'Text',
                    props: {
                      text: 'Letting go of the need to control\neverything. Breathing helps\nme return to what’s real.',
                    },
                    style: {
                      fontSize: 13,
                      lineHeight: 20,
                      flex: 1,
                      whiteSpace: 'pre-line',
                    },
                  },
                  {
                    id: 'journal-reflection-stones-date',
                    type: 'Text',
                    props: {
                      text: 'Jun 8\n8:45 PM',
                      emphasis: 'muted',
                    },
                    style: {
                      fontSize: 11,
                      lineHeight: 19,
                      textAlign: 'right',
                      whiteSpace: 'pre-line',
                    },
                  },
                  {
                    id: 'journal-reflection-stones-chevron',
                    type: 'Icon',
                    props: {
                      source: {
                        mediaId: 'chevron-right',
                      },
                      size: 14,
                      color: '#9B9699',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    'stillpath-rituals': {
      id: 'stillpath-rituals',
      name: 'Rituals',
      root: {
        id: 'stillpath-rituals-root',
        type: 'Screen',
        props: {
          width: 'default',
          scroll: true,
        },
        children: [
          {
            id: 'stillpath-rituals-root-content',
            type: 'Box',
            style: {
              gap: 12,
              paddingHorizontal: 0,
              paddingBottom: 16,
            },
            children: [
              {
                id: 'rituals-greeting',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                },
                children: [
                  {
                    id: 'rituals-back',
                    type: 'Button',
                    props: {
                      children: '←',
                      variant: 'ghost',
                      color: 'primary',
                      size: 'l',
                    },
                    style: {
                      minHeight: 44,
                      borderRadius: 999,
                      width: 44,
                      padding: 0,
                    },
                  },
                  {
                    id: 'rituals-hello',
                    type: 'Text',
                    props: {
                      text: 'Good morning, Fabio',
                    },
                    style: {
                      fontSize: 15,
                      flexShrink: 1,
                    },
                  },
                  {
                    id: 'rituals-sun',
                    type: 'Icon',
                    props: {
                      source: {
                        mediaId: 'sun',
                      },
                      size: 23,
                      color: '#EC950E',
                    },
                  },
                  {
                    id: 'rituals-spacer',
                    type: 'Box',
                    style: {
                      flex: 1,
                    },
                    children: [],
                  },
                  {
                    id: 'rituals-avatar',
                    type: 'Image',
                    props: {
                      source: {
                        mediaId: 'fabio',
                      },
                      alt: 'Fabio',
                    },
                    style: {
                      width: 42,
                      height: 42,
                      borderRadius: 21,
                    },
                  },
                ],
              },
              {
                id: 'rituals-title-block',
                type: 'Box',
                style: {
                  gap: 12,
                },
                children: [
                  {
                    id: 'rituals-title-row',
                    type: 'Box',
                    style: {
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    },
                    children: [
                      {
                        id: 'rituals-sprig',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'sprig',
                          },
                          size: 45,
                          color: '#AD98B9',
                        },
                      },
                      {
                        id: 'rituals-title',
                        type: 'Heading',
                        props: {
                          text: 'Rituals',
                          level: 1,
                          weight: 'regular',
                        },
                        style: {
                          fontFamily: 'Georgia',
                          fontSize: 44,
                          lineHeight: 50.599999999999994,
                          fontWeight: '400',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: 'rituals-hero',
                type: 'Box',
                style: {
                  borderRadius: 20,
                  overflow: 'hidden',
                },
                children: [
                  {
                    id: 'rituals-hero-image',
                    type: 'Image',
                    props: {
                      source: {
                        mediaId: 'ritual-hero',
                      },
                      alt: 'Journal and tea overlooking a mountain lake at sunrise',
                    },
                    style: {
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    },
                  },
                  {
                    id: 'rituals-hero-title-block',
                    type: 'Box',
                    style: {
                      padding: 26,
                      minHeight: 235,
                      justifyContent: 'center',
                      gap: 16,
                    },
                    children: [
                      {
                        id: 'rituals-hero-title',
                        type: 'Heading',
                        props: {
                          text: 'Morning\nGrounding',
                          level: 2,
                          weight: 'regular',
                        },
                        style: {
                          fontFamily: 'Georgia',
                          fontSize: 33,
                          lineHeight: 37.949999999999996,
                          fontWeight: '400',
                          color: '#FFFFFF',
                          whiteSpace: 'pre-line',
                        },
                      },
                      {
                        id: 'rituals-hero-rule',
                        type: 'Box',
                        style: {
                          width: 30,
                          height: 2,
                          backgroundColor: '#AD98B9',
                        },
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: 'rituals-description',
                type: 'Text',
                props: {
                  text: 'A simple morning ritual to help you slow down, connect with your breath, and set a grounded intention for the day.',
                },
                style: {
                  fontSize: 16,
                  lineHeight: 24,
                  paddingHorizontal: 10,
                },
              },
              {
                id: 'rituals-details',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  flexWrap: 'wrap',
                },
                children: [
                  {
                    id: 'rituals-time',
                    type: 'Box',
                    style: {
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                      paddingHorizontal: 13,
                      minHeight: 40,
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: 'rgba(168,145,126,0.22)',
                      flexGrow: 1,
                      justifyContent: 'center',
                    },
                    children: [
                      {
                        id: 'rituals-time-icon',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'clock',
                          },
                          size: 18,
                          color: '#9274A8',
                        },
                      },
                      {
                        id: 'rituals-time-label',
                        type: 'Text',
                        props: {
                          text: '7 min',
                        },
                        style: {
                          fontSize: 13,
                        },
                      },
                    ],
                  },
                  {
                    id: 'rituals-level',
                    type: 'Box',
                    style: {
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                      paddingHorizontal: 13,
                      minHeight: 40,
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: 'rgba(168,145,126,0.22)',
                      flexGrow: 1,
                      justifyContent: 'center',
                    },
                    children: [
                      {
                        id: 'rituals-level-icon',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'level',
                          },
                          size: 18,
                          color: '#9274A8',
                        },
                      },
                      {
                        id: 'rituals-level-label',
                        type: 'Text',
                        props: {
                          text: 'Beginner',
                        },
                        style: {
                          fontSize: 13,
                        },
                      },
                    ],
                  },
                  {
                    id: 'rituals-audio',
                    type: 'Box',
                    style: {
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                      paddingHorizontal: 13,
                      minHeight: 40,
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: 'rgba(168,145,126,0.22)',
                      flexGrow: 1,
                      justifyContent: 'center',
                    },
                    children: [
                      {
                        id: 'rituals-audio-icon',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'headphones',
                          },
                          size: 18,
                          color: '#9274A8',
                        },
                      },
                      {
                        id: 'rituals-audio-label',
                        type: 'Text',
                        props: {
                          text: 'Audio guided',
                        },
                        style: {
                          fontSize: 13,
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: 'rituals-steps-title',
                type: 'Heading',
                props: {
                  text: 'Steps',
                  level: 2,
                  weight: 'regular',
                },
                style: {
                  fontFamily: 'Georgia',
                  fontSize: 24,
                  lineHeight: 27.599999999999998,
                  fontWeight: '400',
                },
              },
              {
                id: 'rituals-step-arrive',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: 'rgba(168,145,126,0.14)',
                  borderRadius: 16,
                },
                children: [
                  {
                    id: 'rituals-step-arrive-number-wrap',
                    type: 'Box',
                    style: {
                      backgroundColor: 'rgba(173,152,185,0.10)',
                      borderRadius: 999,
                      width: 38,
                      height: 38,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    children: [
                      {
                        id: 'rituals-step-arrive-number',
                        type: 'Heading',
                        props: {
                          text: '1',
                          level: 3,
                          weight: 'regular',
                        },
                        style: {
                          fontFamily: 'Georgia',
                          fontSize: 25,
                          lineHeight: 28.749999999999996,
                          fontWeight: '400',
                          color: '#9274A8',
                        },
                      },
                    ],
                  },
                  {
                    id: 'rituals-step-arrive-icon',
                    type: 'Icon',
                    props: {
                      source: {
                        mediaId: 'sprig',
                      },
                      size: 30,
                      color: '#9274A8',
                    },
                  },
                  {
                    id: 'rituals-step-arrive-copy',
                    type: 'Box',
                    style: {
                      flex: 1,
                      gap: 4,
                    },
                    children: [
                      {
                        id: 'rituals-step-arrive-title',
                        type: 'Heading',
                        props: {
                          text: 'Arrive',
                          level: 3,
                          weight: 'regular',
                        },
                        style: {
                          fontFamily: 'Georgia',
                          fontSize: 21,
                          lineHeight: 24.15,
                          fontWeight: '400',
                        },
                      },
                      {
                        id: 'rituals-step-arrive-description',
                        type: 'Text',
                        props: {
                          text: 'Settle in a comfortable position and take a moment to arrive in your body.',
                        },
                        style: {
                          fontSize: 13,
                          lineHeight: 19,
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: 'rituals-step-breathe',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: 'rgba(168,145,126,0.14)',
                  borderRadius: 16,
                },
                children: [
                  {
                    id: 'rituals-step-breathe-number-wrap',
                    type: 'Box',
                    style: {
                      backgroundColor: 'rgba(173,152,185,0.10)',
                      borderRadius: 999,
                      width: 38,
                      height: 38,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    children: [
                      {
                        id: 'rituals-step-breathe-number',
                        type: 'Heading',
                        props: {
                          text: '2',
                          level: 3,
                          weight: 'regular',
                        },
                        style: {
                          fontFamily: 'Georgia',
                          fontSize: 25,
                          lineHeight: 28.749999999999996,
                          fontWeight: '400',
                          color: '#9274A8',
                        },
                      },
                    ],
                  },
                  {
                    id: 'rituals-step-breathe-icon',
                    type: 'Icon',
                    props: {
                      source: {
                        mediaId: 'wind',
                      },
                      size: 30,
                      color: '#9274A8',
                    },
                  },
                  {
                    id: 'rituals-step-breathe-copy',
                    type: 'Box',
                    style: {
                      flex: 1,
                      gap: 4,
                    },
                    children: [
                      {
                        id: 'rituals-step-breathe-title',
                        type: 'Heading',
                        props: {
                          text: 'Breathe',
                          level: 3,
                          weight: 'regular',
                        },
                        style: {
                          fontFamily: 'Georgia',
                          fontSize: 21,
                          lineHeight: 24.15,
                          fontWeight: '400',
                        },
                      },
                      {
                        id: 'rituals-step-breathe-description',
                        type: 'Text',
                        props: {
                          text: 'Follow the breath with gentle awareness and soften any tension.',
                        },
                        style: {
                          fontSize: 13,
                          lineHeight: 19,
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: 'rituals-step-intention',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: 'rgba(168,145,126,0.14)',
                  borderRadius: 16,
                },
                children: [
                  {
                    id: 'rituals-step-intention-number-wrap',
                    type: 'Box',
                    style: {
                      backgroundColor: 'rgba(173,152,185,0.10)',
                      borderRadius: 999,
                      width: 38,
                      height: 38,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    children: [
                      {
                        id: 'rituals-step-intention-number',
                        type: 'Heading',
                        props: {
                          text: '3',
                          level: 3,
                          weight: 'regular',
                        },
                        style: {
                          fontFamily: 'Georgia',
                          fontSize: 25,
                          lineHeight: 28.749999999999996,
                          fontWeight: '400',
                          color: '#9274A8',
                        },
                      },
                    ],
                  },
                  {
                    id: 'rituals-step-intention-icon',
                    type: 'Icon',
                    props: {
                      source: {
                        mediaId: 'heart',
                      },
                      size: 30,
                      color: '#9274A8',
                    },
                  },
                  {
                    id: 'rituals-step-intention-copy',
                    type: 'Box',
                    style: {
                      flex: 1,
                      gap: 4,
                    },
                    children: [
                      {
                        id: 'rituals-step-intention-title',
                        type: 'Heading',
                        props: {
                          text: 'Intention',
                          level: 3,
                          weight: 'regular',
                        },
                        style: {
                          fontFamily: 'Georgia',
                          fontSize: 21,
                          lineHeight: 24.15,
                          fontWeight: '400',
                        },
                      },
                      {
                        id: 'rituals-step-intention-description',
                        type: 'Text',
                        props: {
                          text: 'Invite a grounding intention to guide your mind and heart today.',
                        },
                        style: {
                          fontSize: 13,
                          lineHeight: 19,
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: 'rituals-step-close',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: 'rgba(168,145,126,0.14)',
                  borderRadius: 16,
                },
                children: [
                  {
                    id: 'rituals-step-close-number-wrap',
                    type: 'Box',
                    style: {
                      backgroundColor: 'rgba(173,152,185,0.10)',
                      borderRadius: 999,
                      width: 38,
                      height: 38,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    children: [
                      {
                        id: 'rituals-step-close-number',
                        type: 'Heading',
                        props: {
                          text: '4',
                          level: 3,
                          weight: 'regular',
                        },
                        style: {
                          fontFamily: 'Georgia',
                          fontSize: 25,
                          lineHeight: 28.749999999999996,
                          fontWeight: '400',
                          color: '#9274A8',
                        },
                      },
                    ],
                  },
                  {
                    id: 'rituals-step-close-icon',
                    type: 'Icon',
                    props: {
                      source: {
                        mediaId: 'sunrise',
                      },
                      size: 30,
                      color: '#9274A8',
                    },
                  },
                  {
                    id: 'rituals-step-close-copy',
                    type: 'Box',
                    style: {
                      flex: 1,
                      gap: 4,
                    },
                    children: [
                      {
                        id: 'rituals-step-close-title',
                        type: 'Heading',
                        props: {
                          text: 'Close',
                          level: 3,
                          weight: 'regular',
                        },
                        style: {
                          fontFamily: 'Georgia',
                          fontSize: 21,
                          lineHeight: 24.15,
                          fontWeight: '400',
                        },
                      },
                      {
                        id: 'rituals-step-close-description',
                        type: 'Text',
                        props: {
                          text: 'Take one more deep breath and move forward with presence.',
                        },
                        style: {
                          fontSize: 13,
                          lineHeight: 19,
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: 'rituals-start-wrap',
                type: 'Box',
                style: {
                  minWidth: 120,
                  flexGrow: 1,
                },
                children: [
                  {
                    id: 'rituals-start',
                    type: 'Button',
                    props: {
                      children: '  Start session',
                      variant: 'solid',
                      color: 'primary',
                      size: 'l',
                    },
                    style: {
                      minHeight: 44,
                      borderRadius: 999,
                      paddingLeft: 35,
                      flex: 1,
                    },
                  },
                  {
                    id: 'rituals-start-icon',
                    type: 'Box',
                    style: {
                      position: 'absolute',
                      left: 20,
                      top: 14,
                      pointerEvents: 'none',
                    },
                    children: [
                      {
                        id: 'rituals-start-glyph',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'sprig',
                          },
                          size: 20,
                          color: '#FFFFFF',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: 'rituals-save-wrap',
                type: 'Box',
                style: {
                  minWidth: 120,
                  flexGrow: 1,
                },
                children: [
                  {
                    id: 'rituals-save',
                    type: 'Button',
                    props: {
                      children: '  Save ritual',
                      variant: 'outline',
                      color: 'primary',
                      size: 'l',
                    },
                    style: {
                      minHeight: 44,
                      borderRadius: 999,
                      paddingLeft: 35,
                      flex: 1,
                    },
                  },
                  {
                    id: 'rituals-save-icon',
                    type: 'Box',
                    style: {
                      position: 'absolute',
                      left: 20,
                      top: 14,
                      pointerEvents: 'none',
                    },
                    children: [
                      {
                        id: 'rituals-save-glyph',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'bookmark',
                          },
                          size: 20,
                          color: '#9274A8',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    'stillpath-profile': {
      id: 'stillpath-profile',
      name: 'Profile',
      root: {
        id: 'stillpath-profile-root',
        type: 'Screen',
        props: {
          width: 'default',
          scroll: true,
        },
        children: [
          {
            id: 'stillpath-profile-root-content',
            type: 'Box',
            style: {
              gap: 12,
              paddingHorizontal: 0,
              paddingBottom: 16,
            },
            children: [
              {
                id: 'profile-greeting',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                },
                children: [
                  {
                    id: 'profile-hello',
                    type: 'Text',
                    props: {
                      text: 'Good morning, Fabio',
                    },
                    style: {
                      fontSize: 15,
                      flexShrink: 1,
                    },
                  },
                  {
                    id: 'profile-sun',
                    type: 'Icon',
                    props: {
                      source: {
                        mediaId: 'sun',
                      },
                      size: 23,
                      color: '#EC950E',
                    },
                  },
                  {
                    id: 'profile-spacer',
                    type: 'Box',
                    style: {
                      flex: 1,
                    },
                    children: [],
                  },
                  {
                    id: 'profile-settings',
                    type: 'Box',
                    style: {
                      width: 44,
                      height: 44,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    children: [
                      {
                        id: 'profile-settings-icon',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'settings',
                          },
                          size: 25,
                          color: '#686365',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: 'profile-identity',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 20,
                },
                children: [
                  {
                    id: 'profile-photo',
                    type: 'Image',
                    props: {
                      source: {
                        mediaId: 'fabio',
                      },
                      alt: 'Fabio',
                    },
                    style: {
                      width: 82,
                      height: 82,
                      borderRadius: 41,
                    },
                  },
                  {
                    id: 'profile-identity-copy',
                    type: 'Box',
                    style: {
                      gap: 9,
                    },
                    children: [
                      {
                        id: 'profile-name',
                        type: 'Heading',
                        props: {
                          text: 'Fabio',
                          level: 1,
                          weight: 'regular',
                        },
                        style: {
                          fontFamily: 'Georgia',
                          fontSize: 42,
                          lineHeight: 48.3,
                          fontWeight: '400',
                        },
                      },
                      {
                        id: 'profile-subtitle',
                        type: 'Text',
                        props: {
                          text: '7-day return to stillness',
                        },
                        style: {
                          fontSize: 16,
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: 'profile-progress-card',
                type: 'Box',
                style: {
                  borderRadius: 22,
                  padding: 16,
                  backgroundColor: 'rgba(213,193,166,0.16)',
                },
                children: [
                  {
                    id: 'profile-progress-content',
                    type: 'Box',
                    style: {
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 14,
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                    },
                    children: [
                      {
                        id: 'profile-ring-wrap',
                        type: 'Box',
                        style: {
                          width: 145,
                          height: 145,
                        },
                        children: [
                          {
                            id: 'profile-week-progress',
                            type: 'ProgressRing',
                            props: {
                              value: 78,
                              max: 100,
                              size: 145,
                              thickness: 7,
                              color: 'primary',
                              trackColor: 'neutral',
                              accessibilityLabel: 'Weekly practice goal',
                              accessibilityValueText: '78 percent of this week’s goal',
                            },
                          },
                          {
                            id: 'profile-ring-center',
                            type: 'Box',
                            style: {
                              position: 'absolute',
                              top: 30,
                              left: 0,
                              width: 145,
                              alignItems: 'center',
                              gap: 4,
                            },
                            children: [
                              {
                                id: 'profile-percent',
                                type: 'Heading',
                                props: {
                                  text: '78%',
                                  level: 2,
                                  weight: 'regular',
                                },
                                style: {
                                  fontFamily: 'Georgia',
                                  fontSize: 42,
                                  lineHeight: 48.3,
                                  fontWeight: '400',
                                },
                              },
                              {
                                id: 'profile-ring-label',
                                type: 'Text',
                                props: {
                                  text: 'This week',
                                },
                                style: {
                                  fontSize: 14,
                                },
                              },
                              {
                                id: 'profile-ring-leaf',
                                type: 'Icon',
                                props: {
                                  source: {
                                    mediaId: 'sprig',
                                  },
                                  size: 29,
                                  color: '#9274A8',
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: 'profile-habits',
                        type: 'Box',
                        style: {
                          flexGrow: 1,
                          flexBasis: 160,
                          minWidth: 150,
                        },
                        children: [
                          {
                            id: 'profile-habit-heading',
                            type: 'Heading',
                            props: {
                              text: 'You’re building a\nbeautiful habit.',
                              level: 2,
                              weight: 'regular',
                            },
                            style: {
                              fontFamily: 'Georgia',
                              fontSize: 22,
                              lineHeight: 25.299999999999997,
                              fontWeight: '400',
                              whiteSpace: 'pre-line',
                            },
                          },
                          {
                            id: 'profile-habit-rule',
                            type: 'Box',
                            style: {
                              width: 30,
                              height: 2,
                              backgroundColor: '#AD98B9',
                              marginTop: 10,
                            },
                            children: [],
                          },
                          {
                            id: 'profile-streak',
                            type: 'Box',
                            style: {
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 10,
                              paddingVertical: 12,
                              borderBottomWidth: 1,
                              borderColor: 'rgba(168,145,126,0.2)',
                            },
                            children: [
                              {
                                id: 'profile-streak-icon',
                                type: 'Icon',
                                props: {
                                  source: {
                                    mediaId: 'flame',
                                  },
                                  size: 21,
                                  color: '#80658F',
                                },
                              },
                              {
                                id: 'profile-streak-label',
                                type: 'Text',
                                props: {
                                  text: 'Current streak',
                                },
                                style: {
                                  fontSize: 14,
                                  flex: 1,
                                },
                              },
                              {
                                id: 'profile-streak-value',
                                type: 'Text',
                                props: {
                                  text: '7 days',
                                },
                                style: {
                                  fontSize: 14,
                                  color: '#80658F',
                                },
                              },
                            ],
                          },
                          {
                            id: 'profile-minutes',
                            type: 'Box',
                            style: {
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 10,
                              paddingVertical: 12,
                              borderBottomWidth: 1,
                              borderColor: 'rgba(168,145,126,0.2)',
                            },
                            children: [
                              {
                                id: 'profile-minutes-icon',
                                type: 'Icon',
                                props: {
                                  source: {
                                    mediaId: 'clock',
                                  },
                                  size: 21,
                                  color: '#417A78',
                                },
                              },
                              {
                                id: 'profile-minutes-label',
                                type: 'Text',
                                props: {
                                  text: 'Minutes practiced',
                                },
                                style: {
                                  fontSize: 14,
                                  flex: 1,
                                },
                              },
                              {
                                id: 'profile-minutes-value',
                                type: 'Text',
                                props: {
                                  text: '126 min',
                                },
                                style: {
                                  fontSize: 14,
                                  color: '#417A78',
                                },
                              },
                            ],
                          },
                          {
                            id: 'profile-journal-days',
                            type: 'Box',
                            style: {
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 10,
                              paddingVertical: 12,
                              borderBottomWidth: 1,
                              borderColor: 'rgba(168,145,126,0.2)',
                            },
                            children: [
                              {
                                id: 'profile-journal-days-icon',
                                type: 'Icon',
                                props: {
                                  source: {
                                    mediaId: 'journal',
                                  },
                                  size: 21,
                                  color: '#80658F',
                                },
                              },
                              {
                                id: 'profile-journal-days-label',
                                type: 'Text',
                                props: {
                                  text: 'Journal days',
                                },
                                style: {
                                  fontSize: 14,
                                  flex: 1,
                                },
                              },
                              {
                                id: 'profile-journal-days-value',
                                type: 'Text',
                                props: {
                                  text: '5 days',
                                },
                                style: {
                                  fontSize: 14,
                                  color: '#80658F',
                                },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 'profile-progress-caption',
                    type: 'Text',
                    props: {
                      text: 'Small moments. Lasting change.',
                    },
                    style: {
                      fontSize: 14,
                      marginTop: 18,
                    },
                  },
                ],
              },
              {
                id: 'profile-collections',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  justifyContent: 'space-between',
                },
                children: [
                  {
                    id: 'profile-collections-title',
                    type: 'Heading',
                    props: {
                      text: 'Saved collections',
                      level: 2,
                      weight: 'regular',
                    },
                    style: {
                      fontFamily: 'Georgia',
                      fontSize: 24,
                      lineHeight: 27.599999999999998,
                      fontWeight: '400',
                    },
                  },
                  {
                    id: 'profile-collections-action',
                    type: 'Button',
                    props: {
                      children: 'View all  ›',
                      variant: 'ghost',
                      color: 'primary',
                      size: 'l',
                    },
                    style: {
                      minHeight: 44,
                      borderRadius: 999,
                      paddingRight: 0,
                    },
                  },
                ],
              },
              {
                id: 'profile-saved',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'stretch',
                  gap: 14,
                  flexWrap: 'wrap',
                },
                children: [
                  {
                    id: 'profile-evening',
                    type: 'Box',
                    style: {
                      borderRadius: 16,
                      overflow: 'hidden',
                      backgroundColor: 'rgba(173,152,185,0.10)',
                      flexBasis: 110,
                      flexGrow: 1,
                      minWidth: 105,
                    },
                    children: [
                      {
                        id: 'profile-evening-media',
                        type: 'Box',
                        style: {
                          overflow: 'hidden',
                        },
                        children: [
                          {
                            id: 'profile-evening-image',
                            type: 'Image',
                            props: {
                              source: {
                                mediaId: 'evening-reset',
                              },
                              alt: 'Evening reset',
                            },
                            style: {
                              width: '100%',
                              aspectRatio: 1.5,
                            },
                          },
                          {
                            id: 'profile-evening-badge',
                            type: 'Box',
                            style: {
                              position: 'absolute',
                              top: 10,
                              left: 10,
                              borderRadius: 999,
                              padding: 9,
                              backgroundColor: '#FAF7F2',
                            },
                            children: [
                              {
                                id: 'profile-evening-icon',
                                type: 'Icon',
                                props: {
                                  source: {
                                    mediaId: 'moon',
                                  },
                                  size: 23,
                                  color: '#9274A8',
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: 'profile-evening-body',
                        type: 'Box',
                        style: {
                          padding: 12,
                          gap: 5,
                        },
                        children: [
                          {
                            id: 'profile-evening-title',
                            type: 'Heading',
                            props: {
                              text: 'Evening reset',
                              level: 2,
                              weight: 'regular',
                            },
                            style: {
                              fontFamily: 'Georgia',
                              fontSize: 19,
                              lineHeight: 21.849999999999998,
                              fontWeight: '400',
                              paddingRight: 25,
                            },
                          },
                          {
                            id: 'profile-evening-description',
                            type: 'Text',
                            props: {
                              text: 'Wind down and let go',
                            },
                            style: {
                              fontSize: 13,
                              lineHeight: 20,
                            },
                          },
                          {
                            id: 'profile-evening-save-decoration',
                            type: 'Box',
                            style: {
                              position: 'absolute',
                              right: 12,
                              top: 14,
                            },
                            children: [
                              {
                                id: 'profile-evening-save-icon',
                                type: 'Icon',
                                props: {
                                  source: {
                                    mediaId: 'bookmark',
                                  },
                                  size: 20,
                                  color: '#9274A8',
                                },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 'profile-ocean',
                    type: 'Box',
                    style: {
                      borderRadius: 16,
                      overflow: 'hidden',
                      backgroundColor: 'rgba(173,152,185,0.10)',
                      flexBasis: 110,
                      flexGrow: 1,
                      minWidth: 105,
                    },
                    children: [
                      {
                        id: 'profile-ocean-media',
                        type: 'Box',
                        style: {
                          overflow: 'hidden',
                        },
                        children: [
                          {
                            id: 'profile-ocean-image',
                            type: 'Image',
                            props: {
                              source: {
                                mediaId: 'ocean-release',
                              },
                              alt: 'Ocean release',
                            },
                            style: {
                              width: '100%',
                              aspectRatio: 1.5,
                            },
                          },
                          {
                            id: 'profile-ocean-badge',
                            type: 'Box',
                            style: {
                              position: 'absolute',
                              top: 10,
                              left: 10,
                              borderRadius: 999,
                              padding: 9,
                              backgroundColor: '#FAF7F2',
                            },
                            children: [
                              {
                                id: 'profile-ocean-icon',
                                type: 'Icon',
                                props: {
                                  source: {
                                    mediaId: 'waves',
                                  },
                                  size: 23,
                                  color: '#9274A8',
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: 'profile-ocean-body',
                        type: 'Box',
                        style: {
                          padding: 12,
                          gap: 5,
                        },
                        children: [
                          {
                            id: 'profile-ocean-title',
                            type: 'Heading',
                            props: {
                              text: 'Ocean release',
                              level: 2,
                              weight: 'regular',
                            },
                            style: {
                              fontFamily: 'Georgia',
                              fontSize: 19,
                              lineHeight: 21.849999999999998,
                              fontWeight: '400',
                              paddingRight: 25,
                            },
                          },
                          {
                            id: 'profile-ocean-description',
                            type: 'Text',
                            props: {
                              text: 'Release tension and soften',
                            },
                            style: {
                              fontSize: 13,
                              lineHeight: 20,
                            },
                          },
                          {
                            id: 'profile-ocean-save-decoration',
                            type: 'Box',
                            style: {
                              position: 'absolute',
                              right: 12,
                              top: 14,
                            },
                            children: [
                              {
                                id: 'profile-ocean-save-icon',
                                type: 'Icon',
                                props: {
                                  source: {
                                    mediaId: 'bookmark',
                                  },
                                  size: 20,
                                  color: '#9274A8',
                                },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: 'profile-preferences-title',
                type: 'Heading',
                props: {
                  text: 'Preferences',
                  level: 2,
                  weight: 'regular',
                },
                style: {
                  fontFamily: 'Georgia',
                  fontSize: 24,
                  lineHeight: 27.599999999999998,
                  fontWeight: '400',
                },
              },
              {
                id: 'profile-preferences',
                type: 'Box',
                style: {
                  paddingHorizontal: 18,
                  borderWidth: 1,
                  borderColor: 'rgba(168,145,126,0.18)',
                  borderRadius: 20,
                },
                children: [
                  {
                    id: 'profile-theme',
                    type: 'Box',
                    style: {
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 16,
                      paddingVertical: 12,
                    },
                    children: [
                      {
                        id: 'profile-theme-icon',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'palette',
                          },
                          size: 23,
                          color: '#9274A8',
                        },
                      },
                      {
                        id: 'profile-theme-label',
                        type: 'Text',
                        props: {
                          text: 'Theme',
                        },
                        style: {
                          fontSize: 16,
                          flex: 1,
                        },
                      },
                      {
                        id: 'profile-theme-toggle',
                        type: 'ThemeModeToggle',
                        props: {
                          size: 'm',
                        },
                      },
                    ],
                  },
                  {
                    id: 'profile-notifications',
                    type: 'Box',
                    style: {
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 16,
                      borderTopWidth: 1,
                      borderColor: 'rgba(168,145,126,0.23)',
                    },
                    children: [
                      {
                        id: 'profile-notifications-icon',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'bell',
                          },
                          size: 23,
                          color: '#417A78',
                        },
                      },
                      {
                        id: 'profile-notifications-content',
                        type: 'Box',
                        style: {
                          flex: 1,
                        },
                        children: [
                          {
                            id: 'profile-notifications-setting',
                            type: 'SettingsRow',
                            props: {
                              title: 'Notifications',
                              meta: 'Gentle',
                            },
                          },
                        ],
                      },
                      {
                        id: 'profile-notifications-chevron',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'chevron-right',
                          },
                          size: 15,
                          color: '#9274A8',
                        },
                      },
                    ],
                  },
                  {
                    id: 'profile-reminder',
                    type: 'Box',
                    style: {
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 16,
                      borderTopWidth: 1,
                      borderColor: 'rgba(168,145,126,0.23)',
                    },
                    children: [
                      {
                        id: 'profile-reminder-icon',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'clock',
                          },
                          size: 23,
                          color: '#9274A8',
                        },
                      },
                      {
                        id: 'profile-reminder-content',
                        type: 'Box',
                        style: {
                          flex: 1,
                        },
                        children: [
                          {
                            id: 'profile-reminder-setting',
                            type: 'SettingsRow',
                            props: {
                              title: 'Daily reminder',
                              meta: '8:00 AM',
                            },
                          },
                        ],
                      },
                      {
                        id: 'profile-reminder-chevron',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'chevron-right',
                          },
                          size: 15,
                          color: '#9274A8',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: 'profile-footer',
                type: 'Box',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  paddingHorizontal: 12,
                },
                children: [
                  {
                    id: 'profile-footer-copy',
                    type: 'Text',
                    props: {
                      text: 'Consistency is kind. Show up gently.',
                    },
                    style: {
                      fontSize: 13,
                    },
                  },
                  {
                    id: 'profile-footer-heart',
                    type: 'Icon',
                    props: {
                      source: {
                        mediaId: 'heart',
                      },
                      size: 14,
                      color: '#9274A8',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },
  settings: {
    localization: {
      defaultLocale: 'en',
      locales: ['en'],
    },
  },
  dataBindings: {
    'home-begin': {
      componentId: 'home-begin',
      componentType: 'Button',
      events: {
        press: [
          {
            target: {
              kind: 'action',
              type: 'navigate',
            },
            input: {
              route: {
                kind: 'literal',
                value: '/rituals',
              },
            },
          },
        ],
      },
    },
    'home-mood-open': {
      componentId: 'home-mood-open',
      componentType: 'Button',
      events: {
        press: [
          {
            target: {
              kind: 'action',
              type: 'navigate',
            },
            input: {
              route: {
                kind: 'literal',
                value: '/journal',
              },
            },
          },
        ],
      },
    },
    'rituals-back': {
      componentId: 'rituals-back',
      componentType: 'Button',
      events: {
        press: [
          {
            target: {
              kind: 'action',
              type: 'navigate',
            },
            input: {
              route: {
                kind: 'literal',
                value: '/',
              },
            },
          },
        ],
      },
    },
  },
} satisfies AppManifest;
