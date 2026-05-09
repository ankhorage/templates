import type { AppManifest } from '@ankhorage/contracts';

import { createStarterContentScreen, createStarterSettingsScreen } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { utilitiesToolsContent } from './content';
import type { UtilitiesToolsScreenIds } from './routes';

export function createUtilitiesToolsScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: UtilitiesToolsScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.dashboard]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.dashboard,
      name: 'Dashboard',
      content: utilitiesToolsContent.dashboard,
    }),
    [screenIds.tools]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.tools,
      name: 'Tools',
      content: utilitiesToolsContent.tools,
    }),
    [screenIds.shortcuts]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.shortcuts,
      name: 'Shortcuts',
      content: utilitiesToolsContent.shortcuts,
    }),
    [screenIds.storage]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.storage,
      name: 'Storage',
      content: utilitiesToolsContent.storage,
    }),
    [screenIds.diagnostics]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.diagnostics,
      name: 'Diagnostics',
      content: utilitiesToolsContent.diagnostics,
    }),
    [screenIds.settings]: createStarterSettingsScreen({
      idPrefix,
      screenId: screenIds.settings,
      name: 'Settings',
      header: utilitiesToolsContent.settings,
      section: {
        title: 'Defaults',
        description: 'Seed automation and permissions defaults for a utility suite.',
        rows: [
          {
            id: 'permissions-row',
            title: 'Permissions',
            description: 'Permissions stay opt-in until enabled by the user.',
            meta: 'opt-in',
          },
          {
            id: 'automation-row',
            title: 'Automation',
            description: 'Shortcuts remain manual until triggers are configured.',
            meta: 'manual',
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

