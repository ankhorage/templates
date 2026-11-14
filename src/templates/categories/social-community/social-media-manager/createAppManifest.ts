import type { AppManifest, ComponentDataBindingRegistry, UiNode } from '@ankhorage/contracts';

import { createValidatedManifest } from '../../../../internal/createValidatedManifest';
import { createLocalInfra } from '../../../../internal/defaults';

/*** Return the complete portable Social Media Manager manifest with local, session-only workflow state. */
export default function createAppManifest(): AppManifest {
  return createValidatedManifest(manifest);
}

/*** Create one semantic heading in the shared Studio-inspired visual hierarchy. */
function heading(id: string, text: string, level: 1 | 2 | 3 = 2): UiNode {
  return { id, type: 'Heading', props: { text, level, size: `h${level}` } };
}

/*** Create explanatory copy, including explicit provider and runtime limitations. */
function copy(id: string, text: string, variant: 'body' | 'bodySmall' | 'lead' = 'body'): UiNode {
  return { id, type: 'Text', props: { text, variant } };
}

/*** Create a touch-sized action without inventing a provider-backed result. */
function action(id: string, label: string, disabled = false): UiNode {
  return {
    id,
    type: 'Button',
    props: { children: label, variant: 'solid', size: 'l', disabled },
    style: { minHeight: 44 },
  };
}

/*** Create one consistent card for the light lavender Studio shell. */
function card(id: string, children: readonly UiNode[]): UiNode {
  return {
    id,
    type: 'Card',
    props: {},
    children: [...children],
    style: { borderRadius: 20, padding: 16, gap: 8 },
  };
}

/*** Bind a released Button or Card event to an authored Navigator route. */
function navigate(
  componentId: string,
  componentType: string,
  route: string,
): ComponentDataBindingRegistry[string] {
  return {
    componentId,
    componentType,
    events: {
      press: [
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

/*** Store one explicit session workflow snapshot through Runtime's released state capability. */
function setWorkflow(
  componentId: string,
  stage: 'draft' | 'preview' | 'approval' | 'scheduled',
  route: string,
): ComponentDataBindingRegistry[string] {
  return {
    componentId,
    componentType: 'Button',
    events: {
      press: [
        {
          target: {
            capability: 'state.set',
            input: {
              path: { kind: 'literal', value: 'social-media-manager.workflow' },
              value: {
                kind: 'literal',
                value: {
                  stage,
                  title: 'Design systems, in motion',
                  channels: ['Instagram', 'LinkedIn'],
                },
              },
            },
          },
        },
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

const bindings: ComponentDataBindingRegistry = {
  'onboarding-continue': navigate('onboarding-continue', 'Button', '/calendar'),
  'calendar-new-post': navigate('calendar-new-post', 'Button', '/composer'),
  'campaign-open-spring': navigate('campaign-open-spring', 'Card', '/composer'),
  'library-compose': navigate('library-compose', 'Button', '/composer'),
  'composer-save-draft': setWorkflow('composer-save-draft', 'draft', '/preview'),
  'preview-request-approval': setWorkflow('preview-request-approval', 'approval', '/approvals'),
  'approval-open-design': navigate('approval-open-design', 'Button', '/approvals/design-systems'),
  'approval-approve-design': setWorkflow('approval-approve-design', 'preview', '/schedule'),
  'schedule-confirm': setWorkflow('schedule-confirm', 'scheduled', '/queue'),
  'queue-open-composer': navigate('queue-open-composer', 'Button', '/composer'),
  'notifications-open-approval': navigate(
    'notifications-open-approval',
    'Button',
    '/approvals/design-systems',
  ),
  'analytics-open-audit': navigate('analytics-open-audit', 'Button', '/audit'),
};

const manifest = {
  metadata: {
    name: 'Social Media Manager',
    slug: 'social-media-manager',
    version: '1.0.0',
    category: 'social_community',
    themeId: 'studio-social',
  },
  themes: {
    'studio-social': {
      id: 'studio-social',
      name: 'Studio Social',
      light: { primaryColor: '#6D28D9', harmony: 'analogous' },
      dark: { primaryColor: '#6D28D9', harmony: 'analogous' },
      tokens: {
        spacing: { none: 0, xs: 4, s: 8, m: 16, l: 24, xl: 32, xxl: 48 },
        radii: { none: 0, s: 8, m: 14, l: 20, full: 9999 },
      },
    },
  },
  activeThemeId: 'studio-social',
  splashScreen: { backgroundColor: '#F7F4FF', dark: { backgroundColor: '#241334' } },
  infra: createLocalInfra({
    signInRoute: '/onboarding',
    signUpRoute: '/onboarding',
    postSignInRoute: '/calendar',
  }),
  state: { provider: 'legend', persistence: false },
  settings: { localization: { defaultLocale: 'en', locales: ['en'] } },
  navigator: {
    type: 'stack',
    implementation: 'native',
    options: { headerShown: false },
    initialRouteName: 'onboarding',
    routes: [
      { name: 'onboarding', path: '/onboarding', screenId: 'onboarding' },
      {
        name: '(workspace)',
        navigator: {
          type: 'tabs',
          implementation: 'headless',
          presentation: 'bottom',
          initialRouteName: 'calendar',
          routes: [
            { name: 'calendar', path: '/calendar', label: 'Calendar', screenId: 'calendar' },
            { name: 'campaigns', path: '/campaigns', label: 'Campaigns', screenId: 'campaigns' },
            { name: 'library', path: '/library', label: 'Library', screenId: 'library' },
            { name: 'approvals', path: '/approvals', label: 'Approvals', screenId: 'approvals' },
            { name: 'insights', path: '/insights', label: 'Insights', screenId: 'analytics' },
          ],
        },
      },
      { name: 'composer', path: '/composer', screenId: 'composer' },
      { name: 'preview', path: '/preview', screenId: 'preview' },
      { name: 'approval-detail', path: '/approvals/design-systems', screenId: 'approval-detail' },
      { name: 'schedule', path: '/schedule', screenId: 'schedule' },
      { name: 'queue', path: '/queue', screenId: 'queue' },
      { name: 'notifications', path: '/notifications', screenId: 'notifications' },
      { name: 'audit', path: '/audit', screenId: 'audit' },
      { name: 'automation', path: '/automation', screenId: 'automation' },
    ],
  },
  screens: {
    onboarding: {
      id: 'onboarding',
      name: 'Workspace onboarding',
      title: 'Set up your workspace',
      description: 'Local workspace setup without provider credentials in the manifest.',
      root: {
        id: 'onboarding-root',
        type: 'Screen',
        props: { scroll: true, width: 'narrow' },
        children: [
          heading('onboarding-title', 'Make every post feel on-brand', 1),
          copy(
            'onboarding-copy',
            'Start with a workspace, then connect publishing providers in your host application. No credentials are stored in this template.',
            'lead',
          ),
          {
            id: 'workspace-name',
            type: 'TextInput',
            props: { label: 'Workspace name', placeholder: 'Northstar Studio', value: '' },
          },
          {
            id: 'workspace-timezone',
            type: 'Select',
            props: {
              label: 'Timezone',
              value: 'Europe/Zurich',
              options: [
                { value: 'Europe/Zurich', label: 'Europe/Zurich' },
                { value: 'America/New_York', label: 'America/New York' },
              ],
            },
          },
          card('onboarding-accounts', [
            heading('onboarding-accounts-title', 'Channels', 2),
            copy(
              'onboarding-accounts-copy',
              'Instagram and LinkedIn previews are local examples. Connect accounts through a provider adapter before publishing.',
            ),
          ]),
          action('onboarding-continue', 'Open content calendar'),
        ],
      },
    },
    calendar: {
      id: 'calendar',
      name: 'Content calendar',
      title: 'Content calendar',
      description: 'Local calendar overview with day, week, and month planning states.',
      root: {
        id: 'calendar-root',
        type: 'Screen',
        props: { scroll: true, width: 'default' },
        children: [
          heading('calendar-title', 'Content calendar', 1),
          copy(
            'calendar-mobile-hint',
            'On touch devices, swipe between calendar ranges and use the bottom navigation to keep planning in reach.',
            'bodySmall',
          ),
          {
            id: 'calendar-range',
            type: 'Tabs',
            props: { defaultValue: 'week', accessibilityLabel: 'Calendar range' },
            children: [
              {
                id: 'calendar-range-list',
                type: 'TabList',
                props: { fill: true },
                children: [
                  { id: 'calendar-day-tab', type: 'Tab', props: { value: 'day', label: 'Day' } },
                  { id: 'calendar-week-tab', type: 'Tab', props: { value: 'week', label: 'Week' } },
                  {
                    id: 'calendar-month-tab',
                    type: 'Tab',
                    props: { value: 'month', label: 'Month' },
                  },
                ],
              },
              {
                id: 'calendar-day-panel',
                type: 'TabPanel',
                props: { value: 'day' },
                children: [
                  card('calendar-day-card', [
                    copy(
                      'calendar-day-copy',
                      'Tuesday 10:00 — Instagram carousel: Design systems, in motion.',
                    ),
                  ]),
                ],
              },
              {
                id: 'calendar-week-panel',
                type: 'TabPanel',
                props: { value: 'week' },
                children: [
                  card('calendar-week-card', [
                    copy(
                      'calendar-week-copy',
                      'Tue: approval review · Thu: LinkedIn post · Fri: campaign retrospective.',
                    ),
                  ]),
                ],
              },
              {
                id: 'calendar-month-panel',
                type: 'TabPanel',
                props: { value: 'month' },
                children: [
                  card('calendar-month-card', [
                    copy(
                      'calendar-month-copy',
                      'April contains 12 planned items; provider delivery states are not available.',
                    ),
                  ]),
                ],
              },
            ],
          },
          action('calendar-new-post', 'Create post'),
        ],
      },
    },
    campaigns: {
      id: 'campaigns',
      name: 'Campaigns',
      title: 'Campaign overview',
      description: 'Sample campaign board with no claimed delivery results.',
      root: {
        id: 'campaigns-root',
        type: 'Screen',
        props: { scroll: true, width: 'default' },
        children: [
          heading('campaigns-title', 'Campaign overview', 1),
          card('campaign-open-spring', [
            heading('campaign-spring-title', 'Spring product story', 2),
            copy(
              'campaign-spring-copy',
              '3 drafts · 1 awaiting approval · channel delivery requires a configured provider.',
            ),
          ]),
          card('campaign-community', [
            heading('campaign-community-title', 'Community pulse', 2),
            copy(
              'campaign-community-copy',
              'Brief ready. Performance data is unavailable until an analytics adapter is connected.',
            ),
          ]),
        ],
      },
    },
    library: {
      id: 'library',
      name: 'Media library',
      title: 'Media library',
      description: 'A local asset inventory with honest upload and provider limits.',
      root: {
        id: 'library-root',
        type: 'Screen',
        props: { scroll: true, width: 'default' },
        children: [
          heading('library-title', 'Media library', 1),
          card('library-empty', [
            heading('library-empty-title', 'No media connected', 2),
            copy(
              'library-empty-copy',
              'Your host can supply a media provider. This portable template does not pretend that uploads or remote assets exist.',
            ),
          ]),
          action('library-compose', 'Compose with local preview'),
        ],
      },
    },
    composer: {
      id: 'composer',
      name: 'Composer',
      title: 'Compose post',
      description: 'Draft content locally before any provider-backed publishing step.',
      root: {
        id: 'composer-root',
        type: 'Screen',
        props: { scroll: true, width: 'default' },
        children: [
          heading('composer-title', 'Compose post', 1),
          {
            id: 'composer-title-input',
            type: 'TextInput',
            props: { label: 'Internal title', value: 'Design systems, in motion' },
          },
          {
            id: 'composer-caption',
            type: 'TextInput',
            props: {
              label: 'Caption',
              value: 'A calmer way to coordinate every channel.',
              multiline: true,
              placeholder: 'Write your post',
            },
          },
          {
            id: 'composer-channels',
            type: 'Checkbox',
            props: { label: 'Instagram and LinkedIn selected', checked: true },
          },
          card('composer-provider-state', [
            copy(
              'composer-provider-copy',
              'Provider publishing is intentionally unavailable until your app configures owned account adapters.',
            ),
          ]),
          action('composer-save-draft', 'Save draft and preview'),
        ],
      },
    },
    preview: {
      id: 'preview',
      name: 'Channel preview',
      title: 'Review channel previews',
      description: 'Channel-specific local content preview.',
      root: {
        id: 'preview-root',
        type: 'Screen',
        props: { scroll: true, width: 'default' },
        children: [
          heading('preview-title', 'Review channel previews', 1),
          {
            id: 'preview-channels',
            type: 'Tabs',
            props: { defaultValue: 'instagram', accessibilityLabel: 'Channel previews' },
            children: [
              {
                id: 'preview-channel-list',
                type: 'TabList',
                props: { fill: true },
                children: [
                  {
                    id: 'preview-instagram-tab',
                    type: 'Tab',
                    props: { value: 'instagram', label: 'Instagram' },
                  },
                  {
                    id: 'preview-linkedin-tab',
                    type: 'Tab',
                    props: { value: 'linkedin', label: 'LinkedIn' },
                  },
                ],
              },
              {
                id: 'preview-instagram-panel',
                type: 'TabPanel',
                props: { value: 'instagram' },
                children: [
                  card('preview-instagram-card', [
                    heading('preview-instagram-handle', '@northstar.studio', 3),
                    copy('preview-instagram-copy', 'A calmer way to coordinate every channel.'),
                  ]),
                ],
              },
              {
                id: 'preview-linkedin-panel',
                type: 'TabPanel',
                props: { value: 'linkedin' },
                children: [
                  card('preview-linkedin-card', [
                    heading('preview-linkedin-name', 'Northstar Studio', 3),
                    copy('preview-linkedin-copy', 'A calmer way to coordinate every channel.'),
                  ]),
                ],
              },
            ],
          },
          action('preview-request-approval', 'Send for approval'),
        ],
      },
    },
    approvals: {
      id: 'approvals',
      name: 'Approval inbox',
      title: 'Approval inbox',
      description: 'Collaborative review queue with session-only state transitions.',
      root: {
        id: 'approvals-root',
        type: 'Screen',
        props: { scroll: true, width: 'default' },
        children: [
          heading('approvals-title', 'Approval inbox', 1),
          copy(
            'approvals-mobile-hint',
            'Touch review keeps the decision close: open an item, inspect both channel previews, then approve or request changes.',
            'bodySmall',
          ),
          card('approval-design-card', [
            heading('approval-design-title', 'Design systems, in motion', 2),
            copy(
              'approval-design-copy',
              'Requested by Maya · Instagram + LinkedIn · waiting for your decision.',
            ),
            action('approval-open-design', 'Review post'),
          ]),
        ],
      },
    },
    'approval-detail': {
      id: 'approval-detail',
      name: 'Approval detail',
      title: 'Review post',
      description: 'Collaborative approval detail with explicit external-delivery boundary.',
      root: {
        id: 'approval-detail-root',
        type: 'Screen',
        props: { scroll: true, width: 'narrow' },
        children: [
          heading('approval-detail-title', 'Design systems, in motion', 1),
          copy(
            'approval-detail-copy',
            'The author requested approval for Instagram and LinkedIn. Approval is recorded only for this runtime session.',
          ),
          {
            id: 'approval-comment',
            type: 'TextInput',
            props: {
              label: 'Comment',
              placeholder: 'Optional feedback',
              value: '',
              multiline: true,
            },
          },
          action('approval-approve-design', 'Approve and schedule'),
        ],
      },
    },
    schedule: {
      id: 'schedule',
      name: 'Schedule post',
      title: 'Schedule post',
      description: 'Local schedule selection; no provider publication is asserted.',
      root: {
        id: 'schedule-root',
        type: 'Screen',
        props: { scroll: true, width: 'narrow' },
        children: [
          heading('schedule-title', 'Schedule post', 1),
          {
            id: 'schedule-date',
            type: 'DatePicker',
            props: { label: 'Publish date', value: '2026-11-18' },
          },
          {
            id: 'schedule-time',
            type: 'TimePicker',
            props: { label: 'Publish time', value: '10:00' },
          },
          copy(
            'schedule-boundary',
            'This adds a session-only planned item. A channel provider must confirm any real delivery.',
          ),
          action('schedule-confirm', 'Add to scheduled queue'),
        ],
      },
    },
    queue: {
      id: 'queue',
      name: 'Scheduled queue',
      title: 'Scheduled queue',
      description: 'Session-local scheduled queue, not proof of remote publishing.',
      root: {
        id: 'queue-root',
        type: 'Screen',
        props: { scroll: true, width: 'default' },
        children: [
          heading('queue-title', 'Scheduled queue', 1),
          card('queue-design-card', [
            heading('queue-design-title', 'Tue 18 Nov · 10:00', 2),
            copy(
              'queue-design-copy',
              'Design systems, in motion · Instagram + LinkedIn · planned locally; delivery unconfirmed.',
            ),
          ]),
          action('queue-open-composer', 'Create another post'),
        ],
      },
    },
    notifications: {
      id: 'notifications',
      name: 'Notifications',
      title: 'Notifications',
      description: 'Local notification feed without invented remote events.',
      root: {
        id: 'notifications-root',
        type: 'Screen',
        props: { scroll: true, width: 'default' },
        children: [
          heading('notifications-title', 'Notifications', 1),
          card('notifications-approval-card', [
            copy(
              'notifications-approval-copy',
              'Maya requested your approval for “Design systems, in motion”.',
            ),
            action('notifications-open-approval', 'Open review'),
          ]),
        ],
      },
    },
    analytics: {
      id: 'analytics',
      name: 'Analytics',
      title: 'Analytics',
      description:
        'Analytics dashboard that distinguishes unavailable data from measured outcomes.',
      root: {
        id: 'analytics-root',
        type: 'Screen',
        props: { scroll: true, width: 'default' },
        children: [
          heading('analytics-title', 'Analytics', 1),
          {
            id: 'analytics-status',
            type: 'MetricCard',
            props: {
              label: 'Connected analytics',
              value: 'Unavailable',
              description: 'Connect a channel analytics adapter to read measured results.',
            },
          },
          {
            id: 'analytics-reach',
            type: 'MetricCard',
            props: { label: 'Reach', value: '—', description: 'No provider data configured.' },
          },
          action('analytics-open-audit', 'Open audit status'),
        ],
      },
    },
    audit: {
      id: 'audit',
      name: 'Audit status',
      title: 'Audit status',
      description: 'Honest portability and integration readiness record.',
      root: {
        id: 'audit-root',
        type: 'Screen',
        props: { scroll: true, width: 'default' },
        children: [
          heading('audit-title', 'Audit status', 1),
          card('audit-local-flow', [
            heading('audit-local-title', 'Local workflow', 2),
            copy(
              'audit-local-copy',
              'Draft → preview → approval → schedule is bound to released Runtime state and Navigator routes.',
            ),
          ]),
          card('audit-provider-gap', [
            heading('audit-provider-title', 'External providers', 2),
            copy(
              'audit-provider-copy',
              'Blocked until a host configures account, media, publishing, and analytics adapters. No successful publishing or metrics are shown.',
            ),
          ]),
          card('audit-flow-gap', [
            heading('audit-flow-title', 'Advanced automation', 2),
            copy(
              'audit-flow-copy',
              'The FlowCanvas view awaits the published @ankhorage/zora/flow owner API; no node graph is embedded in this template.',
            ),
          ]),
        ],
      },
    },
    automation: {
      id: 'automation',
      name: 'Automation',
      title: 'Advanced automation',
      description: 'Explicit future Flow integration boundary.',
      root: {
        id: 'automation-root',
        type: 'Screen',
        props: { scroll: true, width: 'default' },
        children: [
          heading('automation-title', 'Advanced automation', 1),
          copy(
            'automation-copy',
            'Automation authoring is unavailable until @ankhorage/zora/flow publishes its public FlowCanvas API. Everyday drafting, review, and scheduling do not require a graph.',
          ),
          action('automation-unavailable', 'FlowCanvas unavailable', true),
        ],
      },
    },
  },
  dataBindings: bindings,
} satisfies AppManifest;
