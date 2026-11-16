import type { AppManifest, ComponentDataBindingRegistry, UiNode } from '@ankhorage/contracts';
import { validateNavigatorManifest } from '@ankhorage/navigator';

import { BASE_INFRA } from '../../../../internal/defaults';

/*** Return the portable Flow authoring manifest without implementing a Flow executor or editor. */
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

/*** Create a semantic heading for one Flow screen section. */
function heading(id: string, value: string, level: 1 | 2 | 3 = 2): UiNode {
  return { id, type: 'Heading', props: { text: value, level, size: `h${level}` } };
}

/*** Create plain explanatory copy using the released Text manifest node. */
function copy(id: string, value: string, variant: 'body' | 'bodySmall' | 'lead' = 'body'): UiNode {
  return { id, type: 'Text', props: { text: value, variant } };
}

/*** Create a route-backed button without claiming an unavailable Flow operation completed. */
function action(id: string, label: string, disabled = false): UiNode {
  return {
    id,
    type: 'Button',
    props: { children: label, variant: 'solid', size: 'l', disabled },
  };
}

/*** Bind an installed Runtime Navigator event to a manifest route. */
function navigateBinding(
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

const bindings: ComponentDataBindingRegistry = {
  'workflows-create': navigateBinding('workflows-create', 'Button', '/workflows/new'),
  'workflow-release-notice': navigateBinding('workflow-release-notice', 'Button', '/versions'),
  'workflow-versions': navigateBinding('workflow-versions', 'Button', '/versions'),
  'workflow-runs': navigateBinding('workflow-runs', 'Button', '/runs'),
  'versions-back': navigateBinding('versions-back', 'Button', '/workflows/order-intake'),
  'runs-detail': navigateBinding('runs-detail', 'Button', '/runs/run-20261116-01'),
  'run-back': navigateBinding('run-back', 'Button', '/runs'),
  'approvals-detail': navigateBinding('approvals-detail', 'Button', '/runs/run-20261116-01'),
  'schedule-workflow': navigateBinding('schedule-workflow', 'Button', '/workflows/order-intake'),
  'credentials-workflow': navigateBinding(
    'credentials-workflow',
    'Button',
    '/workflows/order-intake',
  ),
};

const manifest = {
  metadata: {
    name: 'Ankhorage Flow',
    slug: 'flow',
    version: '1.0.0',
    category: 'developer_tools',
    themeId: 'ankhorage-flow',
  },
  themes: {
    'ankhorage-flow': {
      id: 'ankhorage-flow',
      name: 'Ankhorage Flow',
      light: { primaryColor: '#3159C6', harmony: 'analogous' },
      dark: { primaryColor: '#7E9CFF', harmony: 'analogous' },
      tokens: {
        spacing: { none: 0, xs: 4, s: 8, m: 16, l: 24, xl: 32, xxl: 48 },
        radii: { none: 0, s: 8, m: 14, l: 20, full: 9999 },
      },
    },
  },
  activeThemeId: 'ankhorage-flow',
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
          initialRouteName: 'workflows',
          routes: [
            { name: 'workflows', path: '/', label: 'Workflows', screenId: 'workflows' },
            { name: 'runs', path: '/runs', label: 'Runs', screenId: 'runs' },
            { name: 'approvals', path: '/approvals', label: 'Approvals', screenId: 'approvals' },
            { name: 'schedules', path: '/schedules', label: 'Schedules', screenId: 'schedules' },
            { name: 'settings', path: '/settings', label: 'Settings', screenId: 'settings' },
          ],
        },
      },
      { name: 'workflow-new', path: '/workflows/new', screenId: 'workflow-new' },
      { name: 'workflow-editor', path: '/workflows/order-intake', screenId: 'workflow-editor' },
      { name: 'versions', path: '/versions', screenId: 'versions' },
      { name: 'run-detail', path: '/runs/run-20261116-01', screenId: 'run-detail' },
      { name: 'credentials', path: '/credentials', screenId: 'credentials' },
    ],
  },
  screens: {
    workflows: {
      id: 'workflows',
      name: 'Workflows',
      title: 'Workflows',
      description:
        'Published-contract workflow inventory with a local fake API acceptance dataset.',
      root: {
        id: 'workflows-root',
        type: 'Screen',
        props: { width: 'wide', scroll: true },
        children: [
          heading('workflows-title', 'Workflows', 1),
          copy('workflows-lead', 'Create, inspect, and publish immutable workflow revisions.'),
          action('workflows-create', 'Create workflow'),
          {
            id: 'workflow-order-intake',
            type: 'Card',
            props: {
              title: 'Order intake',
              eyebrow: 'Version 3 · Published',
              description: 'Manual trigger · 3 nodes · latest run succeeded 12 minutes ago',
            },
            children: [action('workflow-release-notice', 'Inspect editor availability')],
          },
          {
            id: 'workflow-vendor-sync',
            type: 'Card',
            props: {
              title: 'Vendor sync',
              eyebrow: 'Version 7 · Draft',
              description: 'Schedule trigger · awaiting review before a publish operation exists.',
            },
          },
          {
            id: 'workflows-fake-api',
            type: 'Card',
            props: {
              title: 'Fake API acceptance data',
              tone: 'subtle',
              description:
                'This standalone screen uses serializable Flow DTO examples only. It does not connect to a host, secret store, or executor.',
            },
          },
        ],
      },
    },
    'workflow-new': {
      id: 'workflow-new',
      name: 'Create workflow',
      title: 'Create workflow',
      description: 'The initial metadata screen before Flow authoring is released.',
      root: {
        id: 'workflow-new-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('workflow-new-title', 'Create workflow', 1),
          copy(
            'workflow-new-copy',
            'Define a title and purpose. Graph editing is intentionally unavailable in this release.',
          ),
          {
            id: 'workflow-new-title-input',
            type: 'TextInput',
            props: { label: 'Workflow title', value: 'Vendor sync', readOnly: true },
          },
          {
            id: 'workflow-new-description-input',
            type: 'TextInput',
            props: {
              label: 'Purpose',
              value: 'Keep vendor data current',
              multiline: true,
              readOnly: true,
            },
          },
          {
            id: 'workflow-new-note',
            type: 'Card',
            props: {
              title: 'No local executor',
              description:
                'A generated app must bind published Flow API capabilities before it can create or persist a workflow.',
            },
          },
        ],
      },
    },
    'workflow-editor': {
      id: 'workflow-editor',
      name: 'Workflow editor',
      title: 'Order intake',
      description: 'Flow graph authoring boundary and mobile outline fallback status.',
      root: {
        id: 'workflow-editor-root',
        type: 'Screen',
        props: { width: 'wide', scroll: true },
        children: [
          heading('workflow-editor-title', 'Order intake', 1),
          copy(
            'workflow-editor-version',
            'Draft revision 4 · based on published version 3',
            'lead',
          ),
          {
            id: 'flow-canvas-release-gate',
            type: 'Card',
            props: {
              title: 'Visual editor release gate',
              eyebrow: 'ZORA #1108 and #1109 pending',
              description:
                'FlowCanvas, the mobile outline, node palette, and inspector are not exported by the installed ZORA release. This template deliberately does not recreate them.',
            },
            children: [action('workflow-versions', 'View immutable versions')],
          },
          heading('workflow-outline-title', 'Mobile outline preview'),
          {
            id: 'workflow-outline-preview',
            type: 'Card',
            props: {
              title: '1. Receive order',
              description: 'templates.order.receive · output: order',
            },
            children: [
              copy('workflow-outline-arrow', '↓', 'lead'),
              {
                id: 'workflow-outline-validate',
                type: 'Card',
                props: {
                  title: '2. Validate order',
                  description: 'rules.validate · output: approved order',
                },
              },
              copy('workflow-outline-arrow-two', '↓', 'lead'),
              {
                id: 'workflow-outline-notify',
                type: 'Card',
                props: {
                  title: '3. Notify fulfilment',
                  description: 'notifications.send · credential reference only',
                },
              },
            ],
          },
          action('workflow-runs', 'View runs'),
        ],
      },
    },
    versions: {
      id: 'versions',
      name: 'Versions',
      title: 'Workflow versions',
      description: 'Immutable FlowDefinition revision metadata.',
      root: {
        id: 'versions-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('versions-title', 'Workflow versions', 1),
          {
            id: 'version-four',
            type: 'Card',
            props: {
              title: 'Version 4',
              eyebrow: 'Draft',
              description:
                'Three nodes · one manual trigger · unpublishable until Flow API #8 is released.',
            },
          },
          {
            id: 'version-three',
            type: 'Card',
            props: {
              title: 'Version 3',
              eyebrow: 'Published example',
              description: 'Immutable reference used by the sample run history.',
            },
          },
          {
            id: 'version-publish',
            type: 'Button',
            props: { children: 'Publish version', variant: 'solid', size: 'l', disabled: true },
          },
          copy(
            'version-publish-note',
            'Publishing requires a released Flow API capability. No local publish state is fabricated.',
            'bodySmall',
          ),
          action('versions-back', 'Back to workflow'),
        ],
      },
    },
    runs: {
      id: 'runs',
      name: 'Runs',
      title: 'Runs',
      description: 'Portable FlowRunSnapshot status examples.',
      root: {
        id: 'runs-root',
        type: 'Screen',
        props: { width: 'wide', scroll: true },
        children: [
          heading('runs-title', 'Runs', 1),
          {
            id: 'run-current',
            type: 'Card',
            props: {
              title: 'run-20261116-01',
              eyebrow: 'Waiting for approval',
              description: 'Order intake · version 3 · started 09:14 UTC · step 2 paused',
            },
            children: [action('runs-detail', 'Inspect run')],
          },
          {
            id: 'run-success',
            type: 'Card',
            props: {
              title: 'run-20261115-04',
              eyebrow: 'Succeeded',
              description: 'Order intake · version 3 · completed in 4 seconds',
            },
          },
          {
            id: 'run-failed',
            type: 'Card',
            props: {
              title: 'run-20261115-02',
              eyebrow: 'Failed',
              description: 'Vendor sync · version 7 · retryable provider error',
            },
          },
          copy(
            'runs-status-note',
            'Run status is represented by the published FlowExecutionStatus union; no execution takes place in this template.',
            'bodySmall',
          ),
        ],
      },
    },
    'run-detail': {
      id: 'run-detail',
      name: 'Run detail',
      title: 'run-20261116-01',
      description: 'Event and step trace presentation for a serializable FlowRunSnapshot.',
      root: {
        id: 'run-detail-root',
        type: 'Screen',
        props: { width: 'wide', scroll: true },
        children: [
          heading('run-detail-title', 'run-20261116-01', 1),
          {
            id: 'run-status',
            type: 'Card',
            props: {
              title: 'Waiting for approval',
              description: 'Order intake · version 3 · manual trigger',
            },
          },
          heading('run-steps-title', 'Steps'),
          {
            id: 'run-step-receive',
            type: 'Card',
            props: {
              title: 'Receive order · succeeded',
              description: 'Attempt 1 · output redacted to the DTO reference.',
            },
          },
          {
            id: 'run-step-validate',
            type: 'Card',
            props: {
              title: 'Validate order · waiting for approval',
              description: 'Attempt 1 · approval request apr-118 is pending.',
            },
          },
          heading('run-events-title', 'Events'),
          {
            id: 'run-event-created',
            type: 'Card',
            props: { title: '09:14:02 · info', description: 'Manual trigger received.' },
          },
          {
            id: 'run-event-paused',
            type: 'Card',
            props: {
              title: '09:14:04 · info',
              description: 'Execution paused for approval; no credential material is displayed.',
            },
          },
          action('run-back', 'Back to runs'),
        ],
      },
    },
    approvals: {
      id: 'approvals',
      name: 'Approvals',
      title: 'Approval inbox',
      description: 'Pending FlowApprovalRequest metadata without a resolution adapter.',
      root: {
        id: 'approvals-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('approvals-title', 'Approval inbox', 1),
          {
            id: 'approval-pending',
            type: 'Card',
            props: {
              title: 'Approve order ORD-421',
              eyebrow: 'Pending · expires 10:14 UTC',
              description: 'Order intake · run-20261116-01 · requested by workflow',
            },
            children: [action('approvals-detail', 'Inspect associated run')],
          },
          {
            id: 'approval-unavailable',
            type: 'Card',
            props: {
              title: 'Resolution unavailable',
              tone: 'subtle',
              description:
                'Approve and reject operations require the released Flow API. This template preserves the inbox state but does not fake a decision.',
            },
          },
        ],
      },
    },
    schedules: {
      id: 'schedules',
      name: 'Schedules',
      title: 'Schedules',
      description: 'FlowTrigger schedule metadata with no scheduler implementation.',
      root: {
        id: 'schedules-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('schedules-title', 'Schedules', 1),
          {
            id: 'schedule-vendor-sync',
            type: 'Card',
            props: {
              title: 'Vendor sync',
              eyebrow: '0 9 * * 1-5 · Europe/Zurich',
              description:
                'Weekdays at 09:00. The POSIX cron expression is an example FlowTrigger; no scheduler runs locally.',
            },
            children: [action('schedule-workflow', 'View workflow')],
          },
          {
            id: 'schedule-manual',
            type: 'Card',
            props: {
              title: 'Order intake',
              eyebrow: 'Manual trigger',
              description: 'A manual trigger starts only through a host-bound Flow API.',
            },
          },
        ],
      },
    },
    credentials: {
      id: 'credentials',
      name: 'Credentials',
      title: 'Credentials',
      description: 'Secret reference metadata, never secret material.',
      root: {
        id: 'credentials-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('credentials-title', 'Credentials', 1),
          {
            id: 'credential-fulfilment',
            type: 'Card',
            props: {
              title: 'fulfilment-api-token',
              eyebrow: 'Secret reference',
              description:
                'Referenced by Notify fulfilment. The token value is not present in the manifest, fake data, trace, or UI.',
            },
            children: [action('credentials-workflow', 'View workflow')],
          },
          {
            id: 'credential-note',
            type: 'Card',
            props: {
              title: 'Host-managed storage required',
              tone: 'subtle',
              description:
                'Credential creation and rotation belong to the generated app host and its configured secret store.',
            },
          },
        ],
      },
    },
    settings: {
      id: 'settings',
      name: 'Settings',
      title: 'Settings',
      description: 'Flow template release and integration boundary status.',
      root: {
        id: 'settings-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('settings-title', 'Settings', 1),
          {
            id: 'settings-flow-api',
            type: 'Card',
            props: {
              title: 'Flow API #8',
              description:
                'Not released. A generated app must supply published Runtime/Data Source bindings before persistence, runs, approvals, or schedules are operable.',
            },
          },
          {
            id: 'settings-zora',
            type: 'Card',
            props: {
              title: 'ZORA #1108 / #1109',
              description:
                'Not released. FlowCanvas, mobile outline, palette, and inspector will be consumed from the owner package once public.',
            },
          },
          {
            id: 'settings-start',
            type: 'Card',
            props: {
              title: 'Standalone start path',
              description:
                'Run `bunx @ankhorage/templates create flow-demo --template developer_tools/flow` to materialize an ankh.config.json seed. No generated-app owner or localhost server command exists here, so no port can truthfully be documented.',
            },
          },
        ],
      },
    },
  },
  dataBindings: bindings,
} satisfies AppManifest;
