import type { AppManifest } from '@ankhorage/contracts';
import { validateNavigatorManifest } from '@ankhorage/navigator';

/*** Return the portable Close social and direct-chat design with owner-validated mobile navigation. */
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

const manifest: AppManifest = {
  metadata: {
    name: 'Close',
    slug: 'chat',
    version: '1.0.0',
    category: 'social_community',
    themeId: 'close',
  },
  themes: [
    {
      id: 'close',
      name: 'Close',
      light: {
        primaryColor: '#4F46E5',
        harmony: 'analogous',
      },
      dark: {
        primaryColor: '#4F46E5',
        harmony: 'analogous',
      },
      tokens: {
        spacing: {
          none: 0,
          xs: 4,
          s: 8,
          m: 16,
          l: 24,
          xl: 32,
          xxl: 48,
        },
        radii: {
          none: 0,
          s: 8,
          m: 12,
          l: 24,
          full: 9999,
        },
      },
    },
  ],
  activeThemeId: 'close',
  splashScreen: {
    backgroundColor: '#4F46E5',
    dark: {
      backgroundColor: '#4F46E5',
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
        forgotPasswordRoute: 'forgot-password',
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
  settings: {
    localization: {
      defaultLocale: 'en',
      locales: ['en'],
    },
  },
  navigator: {
    type: 'stack',
    implementation: 'native',
    options: {
      headerShown: false,
    },
    initialRouteName: '(tabs)',
    routes: [
      {
        name: '(tabs)',
        navigator: {
          type: 'tabs',
          implementation: 'headless',
          presentation: 'bottom',
          initialRouteName: 'friends',
          routes: [
            {
              name: 'friends',
              label: 'Friends',
              screenId: 'friends',
              icon: {
                source: {
                  mediaId: 'friends',
                },
              },
              path: '/',
            },
            {
              name: 'chats',
              path: '/chats',
              label: 'Chats',
              screenId: 'chats',
              icon: {
                source: {
                  mediaId: 'chats',
                },
              },
            },
          ],
        },
      },
      {
        name: 'chat-maya',
        screenId: 'direct',
        stackOptions: {
          headerShown: false,
        },
      },
    ],
  },
  screens: {
    friends: {
      id: 'friends',
      name: 'Friends',
      title: 'Friends',
      description:
        'Friends-only wall. Sample posts; publishing and likes are visibly unbound pending owned operations.',
      root: {
        id: 'friends-root',
        type: 'Screen',
        props: {
          scroll: true,
        },
        children: [
          {
            id: 'wall-eyebrow',
            type: 'Text',
            props: {
              text: 'YOUR PEOPLE, A LITTLE CLOSER',
              variant: 'eyebrow',
            },
          },
          {
            id: 'wall-title',
            type: 'Heading',
            props: {
              text: 'Friends',
              level: 1,
              size: 'h1',
            },
          },
          {
            id: 'wall-subtitle',
            type: 'Text',
            props: {
              text: 'Little moments. Good company.',
              variant: 'body',
            },
          },
          {
            id: 'post-composer',
            type: 'Box',
            children: [
              {
                id: 'post-draft',
                type: 'TextInput',
                props: {
                  placeholder: 'What\u2019s on your mind?',
                  value: '',
                },
              },
              {
                id: 'publish-post',
                type: 'Button',
                props: {
                  children: 'Share a moment',
                  variant: 'soft',
                  size: 'm',
                },
                style: {
                  minHeight: 44,
                },
              },
            ],
            style: {
              gap: 8,
              padding: 16,
              borderRadius: 24,
            },
          },
          {
            id: 'maya-post',
            type: 'PostCard',
            props: {
              author: {
                name: 'Maya Chen',
                subtitle: '1 hour ago \u00b7 Friends',
              },
              text: 'Found our spot for Saturday. Who\u2019s in?',
              tone: 'subtle',
            },
            children: [
              {
                id: 'lake-post',
                type: 'Image',
                props: {
                  source: {
                    mediaId: 'lake',
                  },
                  alt: 'Turquoise alpine lake with a wooden picnic jetty',
                },
                style: {
                  width: '100%',
                  height: 196,
                  borderRadius: 12,
                },
              },
              {
                id: 'post-likes',
                type: 'Text',
                props: {
                  text: '12 friends liked this',
                  variant: 'bodySmall',
                },
              },
              {
                id: 'post-actions',
                type: 'Stack',
                children: [
                  {
                    id: 'like-post',
                    type: 'Button',
                    props: {
                      children: 'Like \u00b7 12',
                      variant: 'soft',
                      size: 'm',
                    },
                    style: {
                      minHeight: 44,
                    },
                  },
                  {
                    id: 'message-maya',
                    type: 'Button',
                    props: {
                      children: 'Message Maya',
                      variant: 'soft',
                      size: 'm',
                    },
                    style: {
                      minHeight: 44,
                    },
                  },
                ],
                style: {
                  flexDirection: 'row',
                  gap: 8,
                },
              },
            ],
          },
          {
            id: 'leo-post',
            type: 'PostCard',
            props: {
              author: {
                name: 'Leo Martin',
                subtitle: '2 hours ago \u00b7 Friends',
              },
              text: 'Slow mornings, strong coffee. That\u2019s the plan.',
              tone: 'subtle',
            },
          },
        ],
        style: {
          padding: 20,
          gap: 16,
        },
      },
    },
    chats: {
      id: 'chats',
      name: 'Chats',
      title: 'Chats',
      description:
        'Direct-message overview. Maya opens through a supported Button; row press and search await metadata support.',
      root: {
        id: 'chats-root',
        type: 'Screen',
        props: {
          scroll: true,
        },
        children: [
          {
            id: 'chats-eyebrow',
            type: 'Text',
            props: {
              text: 'KEEP THE CONVERSATION GOING',
              variant: 'eyebrow',
            },
          },
          {
            id: 'chats-title',
            type: 'Heading',
            props: {
              text: 'Chats',
              level: 1,
              size: 'h1',
            },
          },
          {
            id: 'chats-subtitle',
            type: 'Text',
            props: {
              text: 'Good friends are one message away.',
              variant: 'body',
            },
          },
          {
            id: 'chat-search',
            type: 'TextInput',
            props: {
              placeholder: 'Search conversations',
              value: '',
            },
          },
          {
            id: 'maya-row',
            type: 'ChatListItem',
            props: {
              title: 'Maya Chen',
              preview: 'Perfect! See you at 9?',
              timestamp: '9:41',
              unread: true,
              unreadCount: '2',
            },
          },
          {
            id: 'open-maya',
            type: 'Button',
            props: {
              children: 'Open conversation with Maya',
              variant: 'soft',
              size: 'm',
            },
            style: {
              minHeight: 44,
            },
          },
          {
            id: 'leo-row',
            type: 'ChatListItem',
            props: {
              title: 'Leo Martin',
              preview: 'You: Coffee on Sunday?',
              timestamp: '8:32',
            },
          },
          {
            id: 'nina-row',
            type: 'ChatListItem',
            props: {
              title: 'Nina Patel',
              preview: 'That photo is so good!',
              timestamp: 'Yesterday',
            },
          },
          {
            id: 'sam-row',
            type: 'ChatListItem',
            props: {
              title: 'Sam Rivera',
              preview: 'Thanks for a lovely evening.',
              timestamp: 'Yesterday',
            },
          },
          {
            id: 'ella-row',
            type: 'ChatListItem',
            props: {
              title: 'Ella Brooks',
              preview: 'See you next week',
              timestamp: 'Monday',
            },
          },
        ],
        style: {
          padding: 20,
          gap: 16,
        },
      },
    },
    direct: {
      id: 'direct',
      name: 'Maya',
      title: 'Maya',
      description:
        'One-to-one conversation with Maya. Reuses the wall photo. Composer and send remain unbound; keyboard avoidance and pinned composer require owner support.',
      root: {
        id: 'direct-root',
        type: 'Screen',
        props: {
          scroll: true,
        },
        children: [
          {
            id: 'back-chats',
            type: 'Button',
            props: {
              children: 'Back to chats',
              variant: 'soft',
              size: 'm',
            },
            style: {
              minHeight: 44,
            },
          },
          {
            id: 'direct-title',
            type: 'Heading',
            props: {
              text: 'Maya',
              level: 1,
              size: 'h1',
            },
          },
          {
            id: 'direct-subtitle',
            type: 'Text',
            props: {
              text: 'Maya Chen \u00b7 Your friend',
              variant: 'bodySmall',
            },
          },
          {
            id: 'day-divider',
            type: 'Text',
            props: {
              text: 'TODAY',
              variant: 'label',
            },
          },
          {
            id: 'message-1',
            type: 'MessageBubble',
            props: {
              direction: 'incoming',
              text: 'Saturday by the lake? I found the perfect spot.',
              timestamp: '9:32',
            },
          },
          {
            id: 'message-2',
            type: 'MessageBubble',
            props: {
              direction: 'outgoing',
              text: 'Yes! Send me a little preview.',
              timestamp: '9:33',
              status: 'read',
            },
          },
          {
            id: 'message-3',
            type: 'MessageBubble',
            props: {
              direction: 'incoming',
              text: 'Morning coffee here?',
              timestamp: '9:34',
            },
            children: [
              {
                id: 'lake-message',
                type: 'Image',
                props: {
                  source: {
                    mediaId: 'lake',
                  },
                  alt: 'The same lakeside picnic spot Maya shared with friends',
                },
                style: {
                  width: 240,
                  height: 128,
                  borderRadius: 12,
                },
              },
            ],
          },
          {
            id: 'message-4',
            type: 'MessageBubble',
            props: {
              direction: 'outgoing',
              text: 'I\u2019m in. I\u2019ll bring the pastries.',
              timestamp: '9:40',
              status: 'read',
            },
          },
          {
            id: 'message-5',
            type: 'MessageBubble',
            props: {
              direction: 'incoming',
              text: 'Perfect! See you at 9?',
              timestamp: '9:41',
            },
          },
          {
            id: 'message-composer',
            type: 'Box',
            children: [
              {
                id: 'message-draft',
                type: 'TextInput',
                props: {
                  placeholder: 'Message Maya\u2026',
                  value: '',
                },
              },
              {
                id: 'send-message',
                type: 'Button',
                props: {
                  children: 'Send',
                  variant: 'soft',
                  size: 'm',
                },
                style: {
                  minHeight: 44,
                },
              },
            ],
            style: {
              padding: 12,
              gap: 8,
              borderRadius: 24,
            },
          },
        ],
        style: {
          padding: 20,
          gap: 16,
        },
      },
    },
  },
  dataBindings: {
    'message-maya': {
      componentId: 'message-maya',
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
                value: '/chat-maya',
              },
            },
          },
        ],
      },
    },
    'open-maya': {
      componentId: 'open-maya',
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
                value: '/chat-maya',
              },
            },
          },
        ],
      },
    },
    'back-chats': {
      componentId: 'back-chats',
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
                value: '/chats',
              },
            },
          },
        ],
      },
    },
  },
  activeThemeMode: 'light',
  media: {
    assets: {
      lake: {
        id: 'lake',
        name: 'Maya\u2019s lakeside picnic spot',
        kind: 'image',
        contentType: 'image/png',
        source: {
          kind: 'bundled',
          path: 'assets/images/lake.png',
        },
      },
      friends: {
        id: 'friends',
        name: 'Friends navigation',
        kind: 'image',
        contentType: 'image/svg+xml',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/friends.svg',
        },
      },
      chats: {
        id: 'chats',
        name: 'Chats navigation',
        kind: 'image',
        contentType: 'image/svg+xml',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/chats.svg',
        },
      },
    },
  },
};
