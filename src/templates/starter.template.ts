import type { AppCategory, AppManifest, ThemeConfig } from '@ankhorage/contracts';

import {
  BASE_INFRA,
  BASE_SETTINGS,
  DEFAULT_TEMPLATE_VERSION,
  DEFAULT_THEME_ID,
  DEFAULT_THEME_NAME,
} from '../internal/defaults';
import { createZoraNode } from '../internal/zora-nodes';

export const TEMPLATE_KINDS = ['starter'] as const;

export type TemplateKind = (typeof TEMPLATE_KINDS)[number];

export interface TemplateSeed {
  category: AppCategory;
  categoryLabel: string;
  appName: string;
  slug: string;
  summary: string;
  focusAreas: readonly [string, string, string];
  primaryColor: string;
  harmony: ThemeConfig['light']['harmony'];
  systemTone: ThemeConfig['light']['systemTone'];
  version?: string;
  themeId?: string;
  themeName?: string;
}

function createTheme(seed: TemplateSeed): ThemeConfig {
  const themeId = seed.themeId ?? DEFAULT_THEME_ID;

  return {
    id: themeId,
    name: seed.themeName ?? DEFAULT_THEME_NAME,
    light: {
      primaryColor: seed.primaryColor,
      harmony: seed.harmony,
      systemTone: seed.systemTone,
    },
    dark: {
      primaryColor: seed.primaryColor,
      harmony: seed.harmony,
      systemTone: seed.systemTone,
    },
  };
}

export function createStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-starter`;
  const theme = createTheme(seed);
  const themeId = theme.id;
  const version = seed.version ?? DEFAULT_TEMPLATE_VERSION;

  const homeScreenId = `${idPrefix}-home`;
  const detailsScreenId = `${idPrefix}-details`;
  const settingsScreenId = `${idPrefix}-settings`;
  const loginScreenId = `${idPrefix}-login`;

  return {
    metadata: {
      name: seed.appName,
      slug: seed.slug,
      version,
      themeId,
    },
    themes: [theme],
    activeThemeId: themeId,
    infra: structuredClone(BASE_INFRA),
    settings: structuredClone(BASE_SETTINGS),
    navigator: {
      type: 'stack',
      initialRouteName: 'index',
      routes: [
        { name: 'index', screenId: homeScreenId, label: 'Home' },
        { name: 'details', screenId: detailsScreenId, label: 'Details' },
        { name: 'settings', screenId: settingsScreenId, label: 'Settings' },
        { name: 'login', screenId: loginScreenId, label: 'Login' },
      ],
    },
    screens: {
      [homeScreenId]: {
        id: homeScreenId,
        name: 'Home',
        title: seed.appName,
        description: `Starter experience for ${seed.categoryLabel}.`,
        root: createZoraNode(
          `${idPrefix}-home-page`,
          'Page',
          { width: 'wide', testID: `${idPrefix}-home-page` },
          [
            createZoraNode(`${idPrefix}-home-header`, 'PageHeader', {
              eyebrow: seed.categoryLabel,
              title: seed.appName,
              description: `Starter experience for ${seed.summary}.`,
            }),
            createZoraNode(
              `${idPrefix}-home-section`,
              'PageSection',
              {
                title: 'Launch surface',
                description:
                  'Use this starter as the base for navigation, content modules, and onboarding.',
              },
              [
                createZoraNode(
                  `${idPrefix}-overview-panel`,
                  'Panel',
                  {
                    title: 'Preset-driven structure',
                    description:
                      'Templates define layout and flows. Presets inject category branding and defaults.',
                    tone: 'subtle',
                  },
                  [
                    createZoraNode(`${idPrefix}-overview-notice`, 'Notice', {
                      title: 'ZORA-first authoring',
                      description:
                        'This screen uses ZORA layout and pattern nodes instead of legacy Surface-only trees.',
                      tone: 'primary',
                    }),
                    createZoraNode(`${idPrefix}-focus-card-1`, 'Card', {
                      eyebrow: 'Focus area',
                      title: seed.focusAreas[0],
                      description: `Use this panel to shape the primary ${seed.categoryLabel.toLowerCase()} flow.`,
                      tone: 'outline',
                    }),
                    createZoraNode(`${idPrefix}-focus-card-2`, 'Card', {
                      eyebrow: 'Focus area',
                      title: seed.focusAreas[1],
                      description:
                        'Add the supporting content, filters, and state to match your product.',
                      tone: 'outline',
                    }),
                    createZoraNode(`${idPrefix}-focus-card-3`, 'Card', {
                      eyebrow: 'Focus area',
                      title: seed.focusAreas[2],
                      description:
                        'Keep the third block flexible for analytics, recommendations, or community features.',
                      tone: 'outline',
                    }),
                    createZoraNode(`${idPrefix}-overview-button`, 'Button', {
                      children: 'Customize this starter',
                      tone: 'primary',
                      emphasis: 'solid',
                      size: 'm',
                      fullWidth: true,
                    }),
                  ],
                ),
              ],
            ),
          ],
        ),
      },
      [detailsScreenId]: {
        id: detailsScreenId,
        name: 'Details',
        title: 'Details',
        description: 'Secondary informational screen for the starter template.',
        root: createZoraNode(`${idPrefix}-details-page`, 'Page', { width: 'default' }, [
          createZoraNode(`${idPrefix}-details-header`, 'PageHeader', {
            eyebrow: 'Starter module',
            title: 'Detail screen',
            description: 'Use this route for previews, drill-downs, or richer storytelling.',
          }),
          createZoraNode(
            `${idPrefix}-details-section`,
            'PageSection',
            {
              title: 'Placeholder state',
              description:
                'Replace the placeholder with ZORA cards, panels, or task-specific layouts.',
            },
            [
              createZoraNode(`${idPrefix}-details-empty`, 'EmptyState', {
                eyebrow: seed.categoryLabel,
                title: 'Ready for detail content',
                description:
                  'The starter keeps a secondary route available so navigation can evolve without structural rewrites.',
              }),
            ],
          ),
        ]),
      },
      [settingsScreenId]: {
        id: settingsScreenId,
        name: 'Settings',
        title: 'Settings',
        description: 'Configuration screen for starter defaults.',
        root: createZoraNode(`${idPrefix}-settings-page`, 'Page', { width: 'default' }, [
          createZoraNode(`${idPrefix}-settings-header`, 'PageHeader', {
            eyebrow: 'Operations',
            title: 'Settings',
            description:
              'Starter defaults for localization, auth flow, and deployment assumptions.',
          }),
          createZoraNode(
            `${idPrefix}-settings-section`,
            'PageSection',
            {
              title: 'Manifest defaults',
              description:
                'These rows mirror the baseline config shipped with the template package.',
            },
            [
              createZoraNode(`${idPrefix}-settings-header-row`, 'SectionHeader', {
                title: 'Initial configuration',
                description: 'Tune these values or override them at generation time.',
              }),
              createZoraNode(`${idPrefix}-settings-row-locale`, 'SettingsRow', {
                title: 'Default locale',
                description: 'Localization starts with a single default locale.',
                meta: 'en',
              }),
              createZoraNode(`${idPrefix}-settings-row-auth`, 'SettingsRow', {
                title: 'Auth scope',
                description: 'Global auth is enabled in the base infra profile.',
                meta: 'global',
              }),
              createZoraNode(`${idPrefix}-settings-row-deploy`, 'SettingsRow', {
                title: 'Deployment target',
                description: 'The starter ships with a local minikube deployment target.',
                meta: 'minikube',
              }),
            ],
          ),
        ]),
      },
      [loginScreenId]: {
        id: loginScreenId,
        name: 'Login',
        title: 'Login',
        description: 'Authentication entrypoint for the starter template.',
        root: createZoraNode(
          `${idPrefix}-auth-layout`,
          'AuthLayout',
          {
            eyebrow: seed.categoryLabel,
            title: `Sign in to ${seed.appName}`,
            description:
              'This starter includes a ZORA-based auth shell that matches the default global auth flow.',
            footer:
              'Swap provider-specific wiring in CLI or Studio while preserving the manifest structure.',
          },
          [
            createZoraNode(`${idPrefix}-auth-notice`, 'Notice', {
              title: 'Authentication placeholder',
              description:
                'Replace inputs and actions with your runtime binding once auth is connected.',
              tone: 'neutral',
            }),
            createZoraNode(
              `${idPrefix}-auth-email-field`,
              'FormField',
              {
                label: 'Email',
                description: 'Primary identifier',
                required: true,
              },
              [
                createZoraNode(`${idPrefix}-auth-email-input`, 'Input', {
                  placeholder: 'you@example.com',
                  autoCapitalize: 'none',
                  keyboardType: 'email-address',
                }),
              ],
            ),
            createZoraNode(
              `${idPrefix}-auth-password-field`,
              'FormField',
              {
                label: 'Password',
                helperText: 'Use a secure password manager in production.',
                required: true,
              },
              [
                createZoraNode(`${idPrefix}-auth-password-input`, 'Input', {
                  placeholder: 'Password',
                  secureTextEntry: true,
                }),
              ],
            ),
            createZoraNode(`${idPrefix}-auth-submit`, 'Button', {
              children: 'Continue',
              tone: 'primary',
              emphasis: 'solid',
              size: 'm',
              fullWidth: true,
            }),
          ],
        ),
      },
    },
  };
}
