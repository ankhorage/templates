import type { AppManifest } from '@ankhorage/contracts';

import { createScreen, createZoraNode } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import type { FallbackScreenIds } from './routes';

const DEFAULT_FOCUS_AREAS = [
  'Primary experience',
  'Supporting content',
  'Operational settings',
] as const;

export function createFallbackScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: FallbackScreenIds,
): AppManifest['screens'] {
  const focusAreas = seed.focusAreas ?? DEFAULT_FOCUS_AREAS;

  return {
    [screenIds.home]: createScreen({
      id: screenIds.home,
      name: 'Home',
      title: seed.appName,
      description: `Starter experience for ${seed.categoryLabel}.`,
      root: createZoraNode(
        `${idPrefix}-home-screen`,
        'Screen',
        { width: 'wide', testID: `${idPrefix}-home-screen` },
        [
          createZoraNode(`${idPrefix}-home-header`, 'SectionHeader', {
            eyebrow: seed.categoryLabel,
            title: seed.appName,
            description: `Starter experience for ${seed.summary}.`,
          }),
          createZoraNode(
            `${idPrefix}-home-section`,
            'ScreenSection',
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
                    color: 'primary',
                  }),
                  createZoraNode(`${idPrefix}-focus-card-1`, 'Card', {
                    eyebrow: 'Focus area',
                    title: focusAreas[0],
                    description: `Use this panel to shape the primary ${seed.categoryLabel.toLowerCase()} flow.`,
                    tone: 'outline',
                  }),
                  createZoraNode(`${idPrefix}-focus-card-2`, 'Card', {
                    eyebrow: 'Focus area',
                    title: focusAreas[1],
                    description:
                      'Add the supporting content, filters, and state to match your product.',
                    tone: 'outline',
                  }),
                  createZoraNode(`${idPrefix}-focus-card-3`, 'Card', {
                    eyebrow: 'Focus area',
                    title: focusAreas[2],
                    description:
                      'Keep the third block flexible for analytics, recommendations, or community features.',
                    tone: 'outline',
                  }),
                  createZoraNode(`${idPrefix}-overview-button`, 'Button', {
                    children: 'Customize this starter',
                    color: 'primary',
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
    }),
    [screenIds.details]: createScreen({
      id: screenIds.details,
      name: 'Details',
      title: 'Details',
      description: 'Secondary informational screen for the starter template.',
      root: createZoraNode(`${idPrefix}-details-screen`, 'Screen', { width: 'default' }, [
        createZoraNode(`${idPrefix}-details-header`, 'SectionHeader', {
          eyebrow: 'Starter module',
          title: 'Detail screen',
          description: 'Use this route for previews, drill-downs, or richer storytelling.',
        }),
        createZoraNode(
          `${idPrefix}-details-section`,
          'ScreenSection',
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
    }),
    [screenIds.settings]: createScreen({
      id: screenIds.settings,
      name: 'Settings',
      title: 'Settings',
      description: 'Configuration screen for starter defaults.',
      root: createZoraNode(`${idPrefix}-settings-screen`, 'Screen', { width: 'default' }, [
        createZoraNode(`${idPrefix}-settings-header`, 'SectionHeader', {
          eyebrow: 'Operations',
          title: 'Settings',
          description: 'Starter defaults for localization, auth flow, and deployment assumptions.',
        }),
        createZoraNode(
          `${idPrefix}-settings-section`,
          'ScreenSection',
          {
            title: 'Manifest defaults',
            description: 'These rows mirror the baseline config shipped with the template package.',
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
    }),
  };
}
