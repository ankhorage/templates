import type {
  AppManifest,
  BindingExpression,
  ComponentDataBindingRegistry,
  EventBinding,
  ScreenSpec,
  UiNode,
} from '@ankhorage/contracts';

import { BASE_INFRA } from '../../../../internal/defaults';

/*** Return the one portable, draft-stage Acquisition app manifest. */
export default function createAppManifest(): AppManifest {
  return structuredClone(manifest);
}

type CompanyRecord = {
  readonly id: string;
  readonly legalForm: string;
  readonly location: string;
  readonly logo: string;
  readonly name: string;
  readonly route: string;
  readonly status: string;
  readonly uid: string;
  readonly website: string;
  readonly websiteUrl: string;
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
  readonly id: string;
  readonly status: 'info' | 'primary' | 'success' | 'warning';
  readonly title: string;
};

const GENERIC_COMPANY_LOGO =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"%3E%3Crect width="64" height="64" rx="12" fill="%237C3AED"/%3E%3Cpath d="M18 44V24l14-8 14 8v20H18Zm8-4h4v-8h4v8h4V24l-6-3-6 3v16Z" fill="white"/%3E%3C/svg%3E';

const COMPANY_RECORDS: readonly CompanyRecord[] = [
  {
    id: 'wetzikon-technik',
    name: 'Wetzikon Technik AG',
    uid: 'CHE-412.987.654',
    location: 'Wetzikon (ZH)',
    logo: GENERIC_COMPANY_LOGO,
    website: 'wetzikon-technik.ch',
    websiteUrl: 'https://wetzikon-technik.ch',
    route: '/companies/wetzikon-technik',
    legalForm: 'AG',
    status: 'Prospect',
  },
  {
    id: 'alpenblick-digital',
    name: 'Alpenblick Digital GmbH',
    uid: 'CHE-208.041.118',
    location: 'Zürich (ZH)',
    logo: GENERIC_COMPANY_LOGO,
    website: 'alpenblick-digital.ch',
    websiteUrl: 'https://alpenblick-digital.ch',
    route: '/companies/alpenblick-digital',
    legalForm: 'GmbH',
    status: 'Prospect',
  },
  {
    id: 'seeblick-architektur',
    name: 'Seeblick Architektur AG',
    uid: 'CHE-355.109.712',
    location: 'Rapperswil (SG)',
    logo: GENERIC_COMPANY_LOGO,
    website: 'seeblick-architektur.ch',
    websiteUrl: 'https://seeblick-architektur.ch',
    route: '/companies/seeblick-architektur',
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
    id: 'added-to-acquisition',
    companyId: 'wetzikon-technik',
    title: 'Added to acquisition list',
    date: '15 Jan 2025, 09:14',
    description: 'Local demo event.',
    status: 'success',
  },
  {
    id: 'first-call-attempt',
    companyId: 'wetzikon-technik',
    title: 'First call attempt — Not reached',
    date: '15 Jan 2025, 14:37',
    description: 'Local demo event.',
    status: 'warning',
  },
  {
    id: 'follow-up-scheduled',
    companyId: 'wetzikon-technik',
    title: 'Follow-up scheduled',
    date: '22 Jan 2025, 10:00',
    description: 'Local demo follow-up. It is not persisted.',
    status: 'primary',
  },
  {
    id: 'note-added',
    companyId: 'wetzikon-technik',
    title: 'Note added',
    date: '22 Jan 2025, 10:05',
    description: 'Interested in a product demo. Call again next week.',
    status: 'info',
  },
];

/*** Resolve the deterministic demo company used for the initial controlled selection. */
function resolveSelectedCompany(): CompanyRecord {
  const company = COMPANY_RECORDS[0];
  if (!company) throw new Error('Acquisition demo data must include a selected company.');
  return company;
}

const selectedCompany = resolveSelectedCompany();

/*** Create a semantic heading from a released manifest node. */
function heading(id: string, text: string, level: 1 | 2 | 3 = 2): UiNode {
  return { id, type: 'Heading', props: { text, level, size: `h${level}` } };
}

/*** Create body copy without adding a template-owned presentation primitive. */
function copy(id: string, text: string, variant: 'body' | 'bodySmall' | 'lead' = 'body'): UiNode {
  return { id, type: 'Text', props: { text, variant } };
}

/*** Read the local Runtime selection while retaining the deterministic first-row selection. */
function selectedCompanyRoutes(): BindingExpression {
  return {
    kind: 'fallback',
    value: { capability: 'state.acquisition', path: 'selectedCompanyRoutes' },
    fallback: { kind: 'literal', value: [selectedCompany.route] },
  };
}

/*** Persist the controlled checkbox selection only in the active Runtime session. */
function setSelectedCompanyRoutes(): EventBinding {
  return {
    target: {
      capability: 'state.set',
      input: {
        path: { kind: 'literal', value: 'acquisition.selectedCompanyRoutes' },
        value: { capability: 'dataTable.selectionChange', path: 'payload.selectedRowIds' },
      },
    },
  };
}

/*** Navigate from the released DataTable activation payload without coupling selection to routing. */
function activateCompanyRoute(): EventBinding {
  return {
    target: {
      capability: 'navigator.navigate',
      input: { route: { capability: 'dataTable.rowActivate', path: 'payload.rowId' } },
    },
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

/*** Build reusable detail content for both the responsive pane and Stack-routed detail screen. */
function companyDetailNodes(company: CompanyRecord, includeBack: boolean): UiNode[] {
  const history = HISTORY_RECORDS.filter((record) => record.companyId === company.id).map(
    ({ date, description, id, status, title }) => ({
      id,
      title,
      description,
      meta: date,
      status,
      marker: { mediaId: 'acquisition-target' },
      markerAlt: 'Acquisition target marker',
    }),
  );

  return [
    ...(includeBack
      ? [
          {
            id: `company-back-${company.id}`,
            type: 'Button',
            props: { children: 'Back to companies', variant: 'ghost' },
          } satisfies UiNode,
        ]
      : []),
    {
      id: `company-mark-${company.id}`,
      type: 'Image',
      props: {
        source: { mediaId: 'acquisition-target' },
        alt: 'Generic Acquisition company mark',
        width: 64,
        height: 64,
        radius: 'm',
      },
    },
    heading(`company-title-${company.id}`, company.name, 1),
    copy(
      `company-meta-${company.id}`,
      `UID ${company.uid} · ${company.location} · ${company.website}`,
      'bodySmall',
    ),
    {
      id: `company-status-${company.id}`,
      type: 'Badge',
      props: { label: company.status, color: 'primary' },
    },
    {
      id: `company-actions-${company.id}`,
      type: 'View',
      props: {
        direction: 'row',
        wrap: true,
        gap: 's',
        accessibilityLabel: 'Company actions',
      },
      children: [
        {
          id: `company-call-${company.id}`,
          type: 'Button',
          props: { children: 'Call', variant: 'solid' },
        },
        {
          id: `company-email-${company.id}`,
          type: 'Button',
          props: { children: 'Email', variant: 'outline' },
        },
        {
          id: `company-follow-up-${company.id}`,
          type: 'Button',
          props: { children: 'Schedule follow-up', variant: 'outline' },
        },
      ],
    },
    heading(`company-overview-${company.id}`, 'Overview', 2),
    {
      id: `company-basics-${company.id}`,
      type: 'Card',
      props: { title: 'Company Basics', tone: 'default' },
      children: [
        copy(`company-name-field-${company.id}`, `Company name: ${company.name}`),
        copy(`company-uid-field-${company.id}`, `UID: ${company.uid}`),
        copy(`company-location-field-${company.id}`, `Location: ${company.location}`),
        copy(`company-website-field-${company.id}`, `Website: ${company.website}`),
        copy(`company-status-field-${company.id}`, `Status: ${company.status}`),
      ],
    },
    {
      id: `company-contacts-${company.id}`,
      type: 'Card',
      props: {
        title: 'Contacts',
        description: 'Local demo contact records. They are not Zefix data and are not persisted.',
      },
      children: contactCards(company.id),
    },
    heading(`company-history-heading-${company.id}`, 'History', 2),
    {
      id: `company-history-${company.id}`,
      type: 'Timeline',
      props: { items: history, compact: false },
    },
    {
      id: `company-next-step-${company.id}`,
      type: 'Card',
      props: {
        title: 'Next Step',
        description: 'A local draft only. No call outcome or date is persisted.',
      },
      children: [
        {
          id: `company-follow-up-date-${company.id}`,
          type: 'DatePicker',
          props: { label: 'Current action', value: '2025-01-22', required: false },
        },
        {
          id: `company-call-result-${company.id}`,
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
  ];
}

/*** Build one local company detail screen for a deterministically routed demo row. */
function companyDetailScreen(company: CompanyRecord): ScreenSpec {
  return {
    id: `company-detail-${company.id}`,
    name: `${company.name} detail`,
    title: company.name,
    description: 'Local demo company detail with no backend persistence.',
    root: {
      id: `company-detail-root-${company.id}`,
      type: 'Screen',
      props: { width: 'default', scroll: true },
      children: companyDetailNodes(company, true),
    },
  };
}

const bindings: ComponentDataBindingRegistry = {
  'acquisition-data-table': {
    componentId: 'acquisition-data-table',
    componentType: 'DataTable',
    props: { selectedRowIds: { value: selectedCompanyRoutes() } },
    events: {
      selectionChange: [setSelectedCompanyRoutes()],
      rowActivate: [activateCompanyRoute()],
    },
  },
  ...Object.fromEntries(
    COMPANY_RECORDS.map((company) => [
      `company-back-${company.id}`,
      navigateBinding(`company-back-${company.id}`, 'Button', '/'),
    ]),
  ),
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
      ...COMPANY_RECORDS.map((company) => ({
        name: `company-detail-${company.id}`,
        path: company.route,
        label: company.name,
        screenId: `company-detail-${company.id}`,
      })),
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
        props: { width: 'wide', scroll: false },
        children: [
          {
            id: 'acquisition-master-detail',
            type: 'MasterDetail',
            props: { activePane: 'master', desktopMode: 'split', masterWidth: 30 },
            children: [
              {
                id: 'acquisition-master-pane',
                type: 'View',
                props: { flex: 1, p: 'm', accessibilityLabel: 'Company list' },
                children: [
                  {
                    id: 'acquisition-mark',
                    type: 'Icon',
                    props: {
                      source: { mediaId: 'acquisition-target' },
                      accessibilityLabel: 'Acquisition',
                    },
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
                    props: {
                      value: '',
                      placeholder: 'Search company (e.g. name, UID)',
                      clearable: true,
                    },
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
                        props: {
                          label: 'Legal form',
                          placeholder: 'All legal forms',
                          options: [],
                        },
                      },
                      {
                        id: 'filter-status',
                        type: 'Select',
                        props: { label: 'Status', placeholder: 'All statuses', options: [] },
                      },
                    ],
                  },
                  heading('acquisition-list-heading', 'Acquisition List', 2),
                  {
                    id: 'acquisition-data-table',
                    type: 'DataTable',
                    props: {
                      rows: COMPANY_RECORDS,
                      rowKey: 'route',
                      density: 'compact',
                      columns: [
                        {
                          id: 'company',
                          header: 'Company',
                          minWidth: 240,
                          cell: {
                            kind: 'stack',
                            direction: 'row',
                            align: 'center',
                            gap: 's',
                            children: [
                              { kind: 'image', source: 'logo', alt: 'name' },
                              {
                                kind: 'stack',
                                direction: 'column',
                                gap: 'xxs',
                                children: [
                                  { kind: 'text', value: 'name', weight: 'bold' },
                                  {
                                    kind: 'link',
                                    href: 'websiteUrl',
                                    label: 'website',
                                    variant: 'caption',
                                  },
                                ],
                              },
                            ],
                          },
                        },
                        { id: 'location', header: 'Location', accessor: 'location', minWidth: 140 },
                        { id: 'status', header: 'Status', accessor: 'status', minWidth: 100 },
                      ],
                    },
                  },
                ],
              },
              {
                id: 'acquisition-detail-pane',
                type: 'View',
                props: { flex: 1, p: 'm', accessibilityLabel: 'Selected company detail' },
                children: companyDetailNodes(selectedCompany, false),
              },
            ],
          },
        ],
      },
    },
    ...Object.fromEntries(
      COMPANY_RECORDS.map((company) => [
        `company-detail-${company.id}`,
        companyDetailScreen(company),
      ]),
    ),
  },
  dataBindings: bindings,
} satisfies AppManifest;
