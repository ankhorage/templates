import type { AppManifest, ComponentDataBindingRegistry, UiNode } from '@ankhorage/contracts';
import { validateNavigatorManifest } from '@ankhorage/navigator';

import { BASE_INFRA } from '../../../../internal/defaults';

/*** Return the complete portable Urban Water Monitor demonstration manifest. */
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

/*** Create a semantic heading in the shared screen hierarchy. */
function heading(id: string, text: string, level: 1 | 2 | 3 = 2): UiNode {
  return { id, type: 'Heading', props: { text, level, size: `h${level}` } };
}

/*** Create concise copy using the released Text manifest node. */
function copy(id: string, text: string, variant: 'body' | 'bodySmall' | 'lead' = 'body'): UiNode {
  return { id, type: 'Text', props: { text, variant } };
}

/*** Create a primary route-backed action without implying a remote operation. */
function action(id: string, label: string): UiNode {
  return { id, type: 'Button', props: { children: label, variant: 'solid', size: 'l' } };
}

/*** Render the static map asset through the portable runtime media contract. */
function mapImage(id: string): UiNode {
  return {
    id,
    type: 'Image',
    props: {
      source: { mediaId: 'urban-water-map' },
      alt: 'Static illustration of monitoring sites, watercourses, streets, and green spaces.',
      fit: 'cover',
      aspectRatio: 1.5,
      radius: 'm',
    },
  };
}

/*** Bind one owner-supported event to a route in the local Navigator. */
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

const bindings: ComponentDataBindingRegistry = {
  'dashboard-map': navigateBinding('dashboard-map', 'Button', '/map'),
  'dashboard-capture': navigateBinding('dashboard-capture', 'Button', '/capture'),
  'dashboard-campaigns': navigateBinding('dashboard-campaigns', 'Button', '/campaigns'),
  'dashboard-results': navigateBinding('dashboard-results', 'Button', '/results'),
  'map-site-details': navigateBinding('map-site-details', 'Button', '/map/riverside-park'),
  'map-events': navigateBinding('map-events', 'Button', '/events'),
  'site-capture': navigateBinding('site-capture', 'Button', '/capture'),
  'events-riverside': navigateBinding('events-riverside', 'Button', '/events/riverside-clean-up'),
  'event-campaigns': navigateBinding('event-campaigns', 'Button', '/campaigns'),
  'campaign-cleaner-rivers': navigateBinding(
    'campaign-cleaner-rivers',
    'Button',
    '/campaigns/cleaner-rivers',
  ),
  'campaign-plastic-free': navigateBinding(
    'campaign-plastic-free',
    'Button',
    '/campaigns/plastic-free',
  ),
  'campaign-detail-events': navigateBinding('campaign-detail-events', 'Button', '/events'),
  'capture-review': navigateBinding('capture-review', 'Button', '/capture/review'),
  'capture-confirm': navigateBinding('capture-confirm', 'Button', '/capture/confirmed'),
  'capture-confirmed-home': navigateBinding('capture-confirmed-home', 'Button', '/'),
  'results-site': navigateBinding('results-site', 'Button', '/map/riverside-park'),
  'profile-reports': navigateBinding('profile-reports', 'Button', '/results'),
  'profile-events': navigateBinding('profile-events', 'Button', '/events'),
  'profile-campaigns': navigateBinding('profile-campaigns', 'Button', '/campaigns'),
};

const manifest = {
  metadata: {
    name: 'Urban Water Monitor',
    slug: 'urban-water-monitor',
    version: '1.0.0',
    category: 'business_productivity',
    themeId: 'urban-water-monitor',
  },
  themes: {
    'urban-water-monitor': {
      id: 'urban-water-monitor',
      name: 'Urban Water Monitor',
      light: { primaryColor: '#0A72E8', harmony: 'analogous' },
      dark: { primaryColor: '#52A7FF', harmony: 'analogous' },
      tokens: {
        spacing: { none: 0, xs: 4, s: 8, m: 16, l: 24, xl: 32, xxl: 48 },
        radii: { none: 0, s: 8, m: 16, l: 24, full: 9999 },
      },
    },
  },
  activeThemeId: 'urban-water-monitor',
  activeThemeMode: 'light',
  settings: { localization: { defaultLocale: 'en', locales: ['en'] } },
  infra: structuredClone(BASE_INFRA),
  media: {
    assets: {
      'urban-water-map': {
        id: 'urban-water-map',
        name: 'Urban water monitoring map',
        kind: 'image',
        source: { kind: 'bundled', path: 'assets/images/urban-water-map.png' },
        contentType: 'image/png',
        metadata: { width: 1536, height: 1024 },
      },
    },
  },
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
          initialRouteName: 'dashboard',
          routes: [
            { name: 'dashboard', path: '/', label: 'Dashboard', screenId: 'dashboard' },
            { name: 'map', path: '/map', label: 'Map', screenId: 'map' },
            { name: 'capture', path: '/capture', label: 'Report', screenId: 'field-capture' },
            { name: 'campaigns', path: '/campaigns', label: 'Campaigns', screenId: 'campaigns' },
            { name: 'profile', path: '/profile', label: 'Profile', screenId: 'profile' },
          ],
        },
      },
      { name: 'events', path: '/events', screenId: 'events' },
      { name: 'event-riverside', path: '/events/riverside-clean-up', screenId: 'event-detail' },
      { name: 'results', path: '/results', screenId: 'results' },
      { name: 'site-riverside', path: '/map/riverside-park', screenId: 'site-detail' },
      {
        name: 'campaign-cleaner-rivers',
        path: '/campaigns/cleaner-rivers',
        screenId: 'campaign-detail',
      },
      {
        name: 'campaign-plastic-free',
        path: '/campaigns/plastic-free',
        screenId: 'campaign-detail',
      },
      { name: 'capture-review', path: '/capture/review', screenId: 'capture-review' },
      { name: 'capture-confirmed', path: '/capture/confirmed', screenId: 'capture-confirmed' },
    ],
  },
  screens: {
    dashboard: {
      id: 'dashboard',
      name: 'Dashboard',
      title: 'Good morning, Taylor',
      description: 'A truthful operational summary for the local demo dataset.',
      root: {
        id: 'dashboard-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('dashboard-title', 'Good morning, Taylor', 1),
          copy('dashboard-lead', 'Clean water starts with documented evidence.', 'lead'),
          {
            id: 'dashboard-health',
            type: 'Card',
            props: {
              title: 'City water health: good',
              eyebrow: 'Demo summary',
              description:
                'Based on 12 verified field or laboratory records in this deterministic starter dataset.',
              tone: 'subtle',
            },
            children: [
              {
                id: 'dashboard-sites',
                type: 'MetricCard',
                props: {
                  label: 'Sites monitored',
                  value: '12',
                  description: 'demo locations',
                  compact: true,
                },
              },
              {
                id: 'dashboard-issues',
                type: 'MetricCard',
                props: {
                  label: 'Open issues',
                  value: '2',
                  description: 'field observations',
                  compact: true,
                },
              },
              {
                id: 'dashboard-standard',
                type: 'MetricCard',
                props: {
                  label: 'Within reference range',
                  value: '96%',
                  description: 'verified results only',
                  compact: true,
                },
              },
            ],
          },
          heading('dashboard-activity', 'Recent activity'),
          {
            id: 'dashboard-activity-sample',
            type: 'Card',
            props: {
              title: 'Water sample received',
              description: 'Riverside Park · laboratory result · 2 hours ago',
              compact: true,
            },
          },
          {
            id: 'dashboard-activity-issue',
            type: 'Card',
            props: {
              title: 'Issue documented',
              description: 'Storm-drain overflow observation · 5 hours ago',
              compact: true,
            },
          },
          action('dashboard-map', 'Explore monitoring map'),
          action('dashboard-capture', 'Create field report'),
          action('dashboard-campaigns', 'View campaigns'),
          action('dashboard-results', 'Review verified results'),
        ],
      },
    },
    map: {
      id: 'map',
      name: 'Map',
      title: 'Water map',
      description: 'A static visual preview of monitoring context.',
      root: {
        id: 'map-root',
        type: 'Screen',
        props: { width: 'wide', scroll: true },
        children: [
          heading('map-title', 'Water map', 1),
          copy(
            'map-static-note',
            'Static demo map: markers, search, and filters are visual only. Interactive maps follow after ZORA #981 is released.',
            'bodySmall',
          ),
          {
            id: 'map-search',
            type: 'SearchInput',
            props: {
              value: '',
              placeholder: 'Search locations, sites, or areas',
              readOnly: true,
              disabled: true,
            },
          },
          {
            id: 'map-filters',
            type: 'ChipGroup',
            props: {
              items: [
                { value: 'all', label: 'All' },
                { value: 'monitoring', label: 'Monitoring' },
                { value: 'issues', label: 'Issues' },
                { value: 'projects', label: 'Projects' },
              ],
              disabled: true,
              size: 's',
              wrap: true,
            },
          },
          mapImage('map-image'),
          {
            id: 'map-site-summary',
            type: 'Card',
            props: {
              title: 'Riverside Park',
              eyebrow: 'Selected demo site',
              description: 'Field observation · updated 2 hours ago · visual selection only.',
            },
            children: [
              {
                id: 'map-ph',
                type: 'MetricCard',
                props: {
                  label: 'pH',
                  value: '7.1',
                  description: 'field observation',
                  compact: true,
                },
              },
              {
                id: 'map-turbidity',
                type: 'MetricCard',
                props: {
                  label: 'Turbidity',
                  value: '2.4 NTU',
                  description: 'sensor measurement',
                  compact: true,
                },
              },
              {
                id: 'map-nitrate',
                type: 'MetricCard',
                props: {
                  label: 'Nitrate',
                  value: '1.2 mg/L',
                  description: 'laboratory result',
                  compact: true,
                },
              },
            ],
          },
          action('map-site-details', 'View Riverside Park evidence'),
          action('map-events', 'View community events'),
        ],
      },
    },
    events: {
      id: 'events',
      name: 'Events',
      title: 'Events',
      description: 'Demo community events for the campaign journey.',
      root: {
        id: 'events-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('events-title', 'Events', 1),
          copy('events-note', 'Upcoming and past filters are static in this starter.'),
          {
            id: 'events-filters',
            type: 'ChipGroup',
            props: {
              items: [
                { value: 'upcoming', label: 'Upcoming' },
                { value: 'past', label: 'Past' },
              ],
              disabled: true,
              size: 's',
            },
          },
          {
            id: 'events-riverside-card',
            type: 'Card',
            props: {
              title: 'Riverside Clean-Up Day',
              eyebrow: 'APR 26',
              description: 'Saturday, 9:00 AM · Riverside Park · community action',
            },
          },
          {
            id: 'events-workshop-card',
            type: 'Card',
            props: {
              title: 'Water Quality Workshop',
              eyebrow: 'MAY 10',
              description: 'Saturday, 10:00 AM · Civic Library · monitoring literacy',
            },
          },
          {
            id: 'events-walk-card',
            type: 'Card',
            props: {
              title: 'Community Monitoring Walk',
              eyebrow: 'JUN 7',
              description: 'Saturday, 7:00 PM · Lakeside Park · guided observation',
            },
          },
          action('events-riverside', 'View Riverside event'),
          action('event-campaigns', 'View campaigns'),
        ],
      },
    },
    campaigns: {
      id: 'campaigns',
      name: 'Campaigns',
      title: 'Campaigns',
      description: 'Civic action tied to documented water monitoring.',
      root: {
        id: 'campaigns-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('campaigns-title', 'Campaigns', 1),
          {
            id: 'campaign-filters',
            type: 'ChipGroup',
            props: {
              items: [
                { value: 'all', label: 'All' },
                { value: 'active', label: 'Active' },
                { value: 'past', label: 'Past' },
              ],
              disabled: true,
              size: 's',
              wrap: true,
            },
          },
          {
            id: 'campaign-cleaner-card',
            type: 'Card',
            props: {
              title: 'Cleaner Rivers, Brighter Cities',
              eyebrow: 'Active · 256 participants',
              description:
                'Community action for healthier waterways. Monitoring records remain separate from campaign claims.',
            },
          },
          {
            id: 'campaign-drain-card',
            type: 'Card',
            props: {
              title: 'Adopt a Storm Drain',
              eyebrow: 'Active · 184 participants',
              description:
                'Keep neighbourhood drains clear; observations are submitted as local demo records.',
            },
          },
          {
            id: 'campaign-plastic-card',
            type: 'Card',
            props: {
              title: 'Plastic-Free Waterways',
              eyebrow: 'Upcoming · 92 participants',
              description: 'Reduce plastic and protect habitats through documented local action.',
            },
          },
          action('campaign-cleaner-rivers', 'View Cleaner Rivers campaign'),
          action('campaign-plastic-free', 'View Plastic-Free campaign'),
        ],
      },
    },
    'field-capture': {
      id: 'field-capture',
      name: 'Field Capture',
      title: 'Report / capture',
      description: 'A local-only report demonstration with explicit trust classes.',
      root: {
        id: 'field-capture-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('field-capture-title', 'Report / capture', 1),
          copy(
            'field-capture-note',
            'This starter never submits to a live service. Review creates only a local demo confirmation.',
            'bodySmall',
          ),
          {
            id: 'capture-modes',
            type: 'Tabs',
            props: { defaultValue: 'observation' },
            children: [
              {
                id: 'capture-tab-list',
                type: 'TabList',
                props: { fill: true },
                children: [
                  {
                    id: 'capture-observation-tab',
                    type: 'Tab',
                    props: { value: 'observation', label: 'Observation' },
                  },
                  {
                    id: 'capture-issue-tab',
                    type: 'Tab',
                    props: { value: 'issue', label: 'Issue' },
                  },
                  {
                    id: 'capture-sample-tab',
                    type: 'Tab',
                    props: { value: 'sample', label: 'Sample' },
                  },
                ],
              },
              {
                id: 'capture-observation-panel',
                type: 'TabPanel',
                props: { value: 'observation' },
                children: [
                  copy(
                    'capture-observation-copy',
                    'Trust class: field observation. Record what was seen; it is not a sensor or laboratory measurement.',
                  ),
                ],
              },
              {
                id: 'capture-issue-panel',
                type: 'TabPanel',
                props: { value: 'issue' },
                children: [
                  copy(
                    'capture-issue-copy',
                    'Trust class: field observation. An issue is a documented condition, not a confirmed pollution result.',
                  ),
                ],
              },
              {
                id: 'capture-sample-panel',
                type: 'TabPanel',
                props: { value: 'sample' },
                children: [
                  copy(
                    'capture-sample-copy',
                    'Trust class: sample. It becomes a laboratory result only after documented analysis and provenance.',
                  ),
                ],
              },
            ],
          },
          {
            id: 'capture-location',
            type: 'Card',
            props: {
              title: 'Riverside Park',
              eyebrow: 'Selected demo location',
              description: '321 Riverfront Ave · location is fixed in this starter.',
            },
          },
          {
            id: 'capture-evidence',
            type: 'Card',
            props: {
              title: 'Photo evidence',
              description:
                'Media attachment is deliberately unavailable in this offline demo. No file is uploaded.',
            },
          },
          {
            id: 'capture-details',
            type: 'Card',
            props: {
              title: 'Observation details',
              description:
                'Demo record: clear water, light debris near drain inlet, no live sensor connection.',
            },
          },
          action('capture-review', 'Review local demo report'),
        ],
      },
    },
    results: {
      id: 'results',
      name: 'Results',
      title: 'Results',
      description: 'Verified evidence is kept distinct from modelled decision support.',
      root: {
        id: 'results-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('results-title', 'Results', 1),
          {
            id: 'results-modes',
            type: 'Tabs',
            props: { defaultValue: 'quality' },
            children: [
              {
                id: 'results-tab-list',
                type: 'TabList',
                props: { fill: true },
                children: [
                  {
                    id: 'results-quality-tab',
                    type: 'Tab',
                    props: { value: 'quality', label: 'Water quality' },
                  },
                  {
                    id: 'results-trends-tab',
                    type: 'Tab',
                    props: { value: 'trends', label: 'Trends' },
                  },
                  {
                    id: 'results-insights-tab',
                    type: 'Tab',
                    props: { value: 'insights', label: 'Insights' },
                  },
                ],
              },
              {
                id: 'results-quality-panel',
                type: 'TabPanel',
                props: { value: 'quality' },
                children: [
                  copy(
                    'results-quality-copy',
                    'Verified field and laboratory evidence for the selected demo site.',
                  ),
                ],
              },
              {
                id: 'results-trends-panel',
                type: 'TabPanel',
                props: { value: 'trends' },
                children: [
                  copy(
                    'results-trends-copy',
                    'Trend view is static demo content; no analytical claim is computed.',
                  ),
                ],
              },
              {
                id: 'results-insights-panel',
                type: 'TabPanel',
                props: { value: 'insights' },
                children: [
                  copy(
                    'results-insights-copy',
                    'Modelled estimates are decision-support context and never appear as verified measurements.',
                  ),
                ],
              },
            ],
          },
          {
            id: 'results-site-card',
            type: 'Card',
            props: {
              title: 'Riverside Park',
              eyebrow: 'Monitoring site',
              description: 'Last updated: 2026-04-24 10:30 · static starter fixture',
            },
          },
          {
            id: 'results-status',
            type: 'Card',
            props: {
              title: 'Overall status: good',
              description:
                'Basis: verified laboratory and field records within stated reference ranges.',
              tone: 'subtle',
            },
          },
          {
            id: 'results-ph',
            type: 'MetricCard',
            props: {
              label: 'pH',
              value: '7.1',
              description: 'reference 6.5–8.5 · field observation',
              compact: true,
            },
          },
          {
            id: 'results-turbidity',
            type: 'MetricCard',
            props: {
              label: 'Turbidity',
              value: '2.4 NTU',
              description: 'reference <5.0 · sensor measurement',
              compact: true,
            },
          },
          {
            id: 'results-nitrate',
            type: 'MetricCard',
            props: {
              label: 'Nitrate',
              value: '1.2 mg/L',
              description: 'reference <10.0 · laboratory result',
              compact: true,
            },
          },
          {
            id: 'results-modelled',
            type: 'Card',
            props: {
              title: 'Modelled runoff risk: contextual',
              description:
                'Modelled estimate · decision support only · not a verified pollution measurement.',
              tone: 'outline',
            },
          },
          action('results-site', 'View site evidence'),
        ],
      },
    },
    profile: {
      id: 'profile',
      name: 'Profile',
      title: 'Profile',
      description: 'Operational preferences and local starter summaries.',
      root: {
        id: 'profile-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('profile-title', 'Profile', 1),
          {
            id: 'profile-identity',
            type: 'Card',
            props: {
              title: 'Taylor Kim',
              eyebrow: 'City volunteer',
              description: 'Demo identity; no account or personal data is stored.',
            },
          },
          {
            id: 'profile-reports-summary',
            type: 'MetricCard',
            props: {
              label: 'Reports',
              value: '12',
              description: 'local demo summary',
              compact: true,
            },
          },
          {
            id: 'profile-events-summary',
            type: 'MetricCard',
            props: {
              label: 'Events',
              value: '8',
              description: 'local demo summary',
              compact: true,
            },
          },
          {
            id: 'profile-campaigns-summary',
            type: 'MetricCard',
            props: {
              label: 'Campaigns',
              value: '3',
              description: 'local demo summary',
              compact: true,
            },
          },
          action('profile-reports', 'My reports and results'),
          action('profile-events', 'My events'),
          action('profile-campaigns', 'My campaigns'),
          {
            id: 'profile-saved',
            type: 'Card',
            props: {
              title: 'Saved locations',
              description: 'Static demo preference; location syncing is not configured.',
              compact: true,
            },
          },
          {
            id: 'profile-preferences',
            type: 'Card',
            props: {
              title: 'Notifications and preferences',
              description: 'Static demo settings; no notification service is configured.',
              compact: true,
            },
          },
          {
            id: 'profile-privacy',
            type: 'Card',
            props: {
              title: 'Privacy and data controls',
              description: 'This portable starter contains deterministic demo data only.',
              compact: true,
            },
          },
        ],
      },
    },
    'site-detail': {
      id: 'site-detail',
      name: 'Riverside Park',
      title: 'Riverside Park evidence',
      description: 'Provenance-aware detail for one deterministic site.',
      root: {
        id: 'site-detail-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('site-detail-title', 'Riverside Park', 1),
          mapImage('site-detail-map'),
          copy(
            'site-detail-provenance',
            'Location context is a static visual. pH is a field observation; turbidity is a sensor measurement; nitrate is a laboratory result.',
          ),
          action('site-capture', 'Create field report'),
        ],
      },
    },
    'event-detail': {
      id: 'event-detail',
      name: 'Riverside Clean-Up Day',
      title: 'Riverside Clean-Up Day',
      description: 'Static event detail with a campaign path.',
      root: {
        id: 'event-detail-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('event-detail-title', 'Riverside Clean-Up Day', 1),
          copy(
            'event-detail-copy',
            'Saturday, 9:00 AM at Riverside Park. Participation is a static demonstration; no registration is sent.',
          ),
          action('event-campaigns', 'Explore related campaigns'),
        ],
      },
    },
    'campaign-detail': {
      id: 'campaign-detail',
      name: 'Campaign detail',
      title: 'Campaign detail',
      description: 'Static civic-action context.',
      root: {
        id: 'campaign-detail-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('campaign-detail-title', 'Campaign detail', 1),
          copy(
            'campaign-detail-copy',
            'Participation counts and goals are deterministic demo content. Campaign activity does not alter evidence records.',
          ),
          action('campaign-detail-events', 'See community events'),
        ],
      },
    },
    'capture-review': {
      id: 'capture-review',
      name: 'Review local demo report',
      title: 'Review report',
      description: 'Offline review before local confirmation.',
      root: {
        id: 'capture-review-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('capture-review-title', 'Review local demo report', 1),
          copy(
            'capture-review-copy',
            'Observation at Riverside Park. Trust class: field observation. This confirms a local demo state only and does not transmit data.',
          ),
          action('capture-confirm', 'Confirm local demo report'),
        ],
      },
    },
    'capture-confirmed': {
      id: 'capture-confirmed',
      name: 'Local demo report confirmed',
      title: 'Demo report confirmed',
      description: 'A truthful local-only confirmation state.',
      root: {
        id: 'capture-confirmed-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('capture-confirmed-title', 'Demo report confirmed', 1),
          {
            id: 'capture-confirmed-card',
            type: 'Card',
            props: {
              title: 'Saved only in this demo flow',
              description: 'No network request, live report, or laboratory result was created.',
              tone: 'subtle',
            },
          },
          action('capture-confirmed-home', 'Return to dashboard'),
        ],
      },
    },
  },
  dataBindings: bindings,
} satisfies AppManifest;
