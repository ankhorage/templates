import type { AppManifest, ComponentDataBindingRegistry, UiNode } from '@ankhorage/contracts';

import { BASE_INFRA } from '../../../../internal/defaults';

/*** Return the one portable, draft-stage Acquisition app manifest. */
export default function createAppManifest(): AppManifest {
  return structuredClone(manifest);
}

type CompanyRecord = {
  readonly id: string;
  readonly legalForm: string;
  readonly location: string;
  readonly name: string;
  readonly status: string;
  readonly uid: string;
  readonly website: string;
};

type ContactRecord = {
  readonly companyId: string;
  readonly email: string;
  readonly name: string;
  readonly phone: string;
  readonly role: string;
};

type HistoryRecord = {
  readonly companyId: string;
  readonly date: string;
  readonly description: string;
  readonly title: string;
};

const COMPANY_RECORDS: readonly CompanyRecord[] = [
  {
    id: 'wetzikon-technik',
    name: 'Wetzikon Technik AG',
    uid: 'CHE-412.987.654',
    location: 'Wetzikon (ZH)',
    website: 'wetzikon-technik.ch',
    legalForm: 'AG',
    status: 'Prospect',
  },
  {
    id: 'alpenblick-digital',
    name: 'Alpenblick Digital GmbH',
    uid: 'CHE-208.041.118',
    location: 'Zürich (ZH)',
    website: 'alpenblick-digital.ch',
    legalForm: 'GmbH',
    status: 'Prospect',
  },
  {
    id: 'seeblick-architektur',
    name: 'Seeblick Architektur AG',
    uid: 'CHE-355.109.712',
    location: 'Rapperswil (SG)',
    website: 'seeblick-architektur.ch',
    legalForm: 'AG',
    status: 'New',
  },
];

const CONTACT_RECORDS: readonly ContactRecord[] = [
  {
    companyId: 'wetzikon-technik',
    name: 'Thomas Meier',
    role: 'CEO',
    email: 't.meier@wetzikon-technik.ch',
    phone: '+41 44 972 31 20',
  },
  {
    companyId: 'wetzikon-technik',
    name: 'Sandra Keller',
    role: 'Head of Sales',
    email: 's.keller@wetzikon-technik.ch',
    phone: '+41 44 972 31 25',
  },
];

const HISTORY_RECORDS: readonly HistoryRecord[] = [
  {
    companyId: 'wetzikon-technik',
    title: 'Added to acquisition list',
    date: '15 Jan 2025, 09:14',
    description: 'Local demo event.',
  },
  {
    companyId: 'wetzikon-technik',
    title: 'First call attempt — Not reached',
    date: '15 Jan 2025, 14:37',
    description: 'Local demo event.',
  },
];

const selectedCompany = COMPANY_RECORDS[0];
if (!selectedCompany) throw new Error('Acquisition demo data must include a selected company.');

/*** Create a semantic heading from a released manifest node. */
function heading(id: string, text: string, level: 1 | 2 | 3 = 2): UiNode {
  return { id, type: 'Heading', props: { text, level, size: `h${level}` } };
}

/*** Create body copy without adding a template-owned presentation primitive. */
function copy(id: string, text: string, variant: 'body' | 'bodySmall' | 'lead' = 'body'): UiNode {
  return { id, type: 'Text', props: { text, variant } };
}

/*** Declare an owner-backed gap as a visible draft-only manifest element. */
function blocked(id: string, requestedCapability: string, reason: string): UiNode {
  return {
    id,
    type: 'MissingElement',
    props: { requestedCapability, reason, minimumWidth: 240, minimumHeight: 160 },
  };
}

/*** Bind a released interactive event to a concrete route without inventing host capabilities. */
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

/*** Present locally authored contacts separately from company discovery records. */
function contactCards(companyId: string): UiNode[] {
  return CONTACT_RECORDS.filter((contact) => contact.companyId === companyId).map((contact) => ({
    id: `contact-${contact.name.toLowerCase().replaceAll(' ', '-')}`,
    type: 'Card',
    props: {
      title: contact.name,
      eyebrow: contact.role,
      description: `${contact.email} · ${contact.phone}`,
      tone: 'subtle',
      compact: true,
    },
  }));
}

const bindings: ComponentDataBindingRegistry = {
  'acquisition-open-company': navigateBinding(
    'acquisition-open-company',
    'Button',
    '/companies/wetzikon-technik',
  ),
  'company-back': navigateBinding('company-back', 'Button', '/'),
};

const manifest = {
  metadata: {
    name: 'Acquisition',
    slug: 'acquisition',
    version: '1.0.0',
    category: 'business_productivity',
    themeId: 'acquisition',
  },
  themes: {
    acquisition: {
      id: 'acquisition',
      name: 'Acquisition',
      light: { primaryColor: '#7C3AED', harmony: 'analogous' },
      dark: { primaryColor: '#A78BFA', harmony: 'analogous' },
      tokens: {
        spacing: { none: 0, xs: 4, s: 8, m: 16, l: 24, xl: 32, xxl: 48 },
        radii: { none: 0, s: 8, m: 16, l: 24, full: 9999 },
      },
    },
  },
  activeThemeId: 'acquisition',
  activeThemeMode: 'light',
  settings: { localization: { defaultLocale: 'en', locales: ['en'] } },
  infra: structuredClone(BASE_INFRA),
  media: {
    assets: {
      'acquisition-target': {
        id: 'acquisition-target',
        name: 'Acquisition target mark',
        kind: 'image',
        source: { kind: 'bundled', path: 'assets/images/svg/acquisition-target.svg' },
        contentType: 'image/svg+xml',
      },
    },
  },
  navigator: {
    type: 'stack',
    implementation: 'native',
    options: { headerShown: false },
    initialRouteName: 'acquisition',
    routes: [
      { name: 'acquisition', path: '/', label: 'Companies', screenId: 'acquisition' },
      {
        name: 'company-detail',
        path: '/companies/wetzikon-technik',
        label: selectedCompany.name,
        screenId: 'company-detail',
      },
    ],
  },
  screens: {
    acquisition: {
      id: 'acquisition',
      name: 'Acquisition list',
      title: 'Acquisition',
      description: 'Local demo company discovery without live Zefix or CRM access.',
      root: {
        id: 'acquisition-root',
        type: 'Screen',
        props: { width: 'wide', scroll: true },
        children: [
          {
            id: 'acquisition-mark',
            type: 'Icon',
            props: { source: { mediaId: 'acquisition-target' }, accessibilityLabel: 'Acquisition' },
          },
          heading('acquisition-title', 'Acquisition', 1),
          copy(
            'acquisition-lead',
            'Find companies, manage your acquisition list, and record call results.',
            'lead',
          ),
          {
            id: 'company-search',
            type: 'SearchInput',
            props: { value: '', placeholder: 'Search company (e.g. name, UID)', clearable: true },
          },
          {
            id: 'company-filters',
            type: 'View',
            props: {
              direction: 'row',
              wrap: true,
              gap: 's',
              accessibilityLabel: 'Company filters',
            },
            children: [
              {
                id: 'filter-canton',
                type: 'Select',
                props: { label: 'Canton', placeholder: 'All cantons', options: [] },
              },
              {
                id: 'filter-legal-form',
                type: 'Select',
                props: { label: 'Legal form', placeholder: 'All legal forms', options: [] },
              },
              {
                id: 'filter-status',
                type: 'Select',
                props: { label: 'Status', placeholder: 'All statuses', options: [] },
              },
            ],
          },
          heading('acquisition-list-heading', 'Acquisition List', 2),
          blocked(
            'acquisition-data-table',
            'Rich selectable acquisition DataTable',
            'ZORA #1307 must publish serializable checkbox selection, row activation, and rich logo/bold/link cells.',
          ),
          {
            id: 'acquisition-sample-route',
            type: 'Card',
            props: {
              title: selectedCompany.name,
              eyebrow: 'Demo company route',
              description: `${selectedCompany.location} · ${selectedCompany.website}`,
              tone: 'subtle',
            },
            children: [
              copy(
                'acquisition-sample-route-note',
                'The complete company collection remains separate demo data until the table owner API is released.',
                'bodySmall',
              ),
              {
                id: 'acquisition-open-company',
                type: 'Button',
                props: { children: `Open ${selectedCompany.name}`, variant: 'outline', size: 'm' },
              },
            ],
          },
        ],
      },
    },
    'company-detail': {
      id: 'company-detail',
      name: 'Company detail',
      title: selectedCompany.name,
      description: 'Local demo company detail with no backend persistence.',
      root: {
        id: 'company-detail-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          {
            id: 'company-back',
            type: 'Button',
            props: { children: 'Back to companies', variant: 'ghost' },
          },
          {
            id: 'company-mark',
            type: 'Image',
            props: {
              source: { mediaId: 'acquisition-target' },
              alt: 'Generic Acquisition company mark',
              width: 64,
              height: 64,
              radius: 'm',
            },
          },
          heading('company-title', selectedCompany.name, 1),
          copy(
            'company-meta',
            `UID ${selectedCompany.uid} · ${selectedCompany.location} · ${selectedCompany.website}`,
            'bodySmall',
          ),
          {
            id: 'company-status',
            type: 'Badge',
            props: { label: selectedCompany.status, color: 'primary' },
          },
          {
            id: 'company-actions',
            type: 'View',
            props: {
              direction: 'row',
              wrap: true,
              gap: 's',
              accessibilityLabel: 'Company actions',
            },
            children: [
              { id: 'company-call', type: 'Button', props: { children: 'Call', variant: 'solid' } },
              {
                id: 'company-email',
                type: 'Button',
                props: { children: 'Email', variant: 'outline' },
              },
              {
                id: 'company-follow-up',
                type: 'Button',
                props: { children: 'Schedule follow-up', variant: 'outline' },
              },
            ],
          },
          heading('company-overview', 'Overview', 2),
          {
            id: 'company-basics',
            type: 'Card',
            props: { title: 'Company Basics', tone: 'default' },
            children: [
              copy('company-name-field', `Company name: ${selectedCompany.name}`),
              copy('company-uid-field', `UID: ${selectedCompany.uid}`),
              copy('company-location-field', `Location: ${selectedCompany.location}`),
              copy('company-website-field', `Website: ${selectedCompany.website}`),
              copy('company-status-field', `Status: ${selectedCompany.status}`),
            ],
          },
          {
            id: 'company-contacts',
            type: 'Card',
            props: {
              title: 'Contacts',
              description:
                'Local demo contact records. They are not Zefix data and are not persisted.',
            },
            children: contactCards(selectedCompany.id),
          },
          heading('company-history-heading', 'History', 2),
          blocked(
            'company-history',
            'Serializable Timeline items and markers',
            `ZORA #1308 must publish a Timeline manifest boundary for ${HISTORY_RECORDS.length} local demo events.`,
          ),
          {
            id: 'company-next-step',
            type: 'Card',
            props: {
              title: 'Next Step',
              description: 'A local draft only. No call outcome or date is persisted.',
            },
            children: [
              {
                id: 'company-follow-up-date',
                type: 'DatePicker',
                props: { label: 'Current action', value: '2025-01-22', required: false },
              },
              {
                id: 'company-call-result',
                type: 'RadioGroup',
                props: {
                  value: 'follow-up',
                  orientation: 'horizontal',
                  presentation: 'card',
                  options: [
                    { value: 'not-reached', label: 'Not reached' },
                    { value: 'interested', label: 'Interested' },
                    { value: 'follow-up', label: 'Follow-up' },
                    { value: 'no-need', label: 'No need' },
                  ],
                },
              },
            ],
          },
          blocked(
            'company-responsive-projection',
            'Responsive desktop master-detail projection',
            'ZORA #1309 must publish one-manifest web split and compact native stack projection. The current Stack route is the portable mobile-safe route only.',
          ),
        ],
      },
    },
  },
  dataBindings: bindings,
} satisfies AppManifest;
