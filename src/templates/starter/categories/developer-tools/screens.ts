import type { AppManifest } from '@ankhorage/contracts';

import { createStarterContentScreen, createStarterSettingsScreen } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { developerToolsContent } from './content';
import type { DeveloperToolsScreenIds } from './routes';

export function createDeveloperToolsScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: DeveloperToolsScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.dashboard]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.dashboard,
      name: 'Dashboard',
      content: developerToolsContent.dashboard,
    }),
    [screenIds.builds]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.builds,
      name: 'Builds',
      content: developerToolsContent.builds,
    }),
    [screenIds.incidents]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.incidents,
      name: 'Incidents',
      content: developerToolsContent.incidents,
    }),
    [screenIds.environments]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.environments,
      name: 'Environments',
      content: developerToolsContent.environments,
    }),
    [screenIds.deployments]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.deployments,
      name: 'Deployments',
      content: developerToolsContent.deployments,
    }),
    [screenIds.settings]: createStarterSettingsScreen({
      idPrefix,
      screenId: screenIds.settings,
      name: 'Settings',
      header: developerToolsContent.settings,
      section: {
        title: 'On-call defaults',
        description: 'Keep routing deterministic until runtime preferences are wired.',
        rows: [
          {
            id: 'alerts-row',
            title: 'Alert routing',
            description: 'Incidents page is the default landing for critical alerts.',
            meta: 'incidents',
          },
          {
            id: 'environments-row',
            title: 'Environment naming',
            description: 'Seed production/staging/development labels for dashboards.',
            meta: 'stable',
          },
          {
            id: 'auth-row',
            title: 'Auth scope',
            description: `${seed.categoryLabel} inherits the manifest infra auth setting.`,
            meta: 'global',
          },
        ],
      },
    }),
  };
}

