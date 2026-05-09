import type { AppManifest } from '@ankhorage/contracts';

import { createStarterContentScreen, createStarterSettingsScreen } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { businessProductivityContent } from './content';
import type { BusinessProductivityScreenIds } from './routes';

export function createBusinessProductivityScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: BusinessProductivityScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.dashboard]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.dashboard,
      name: 'Dashboard',
      content: businessProductivityContent.dashboard,
    }),
    [screenIds.projects]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.projects,
      name: 'Projects',
      content: businessProductivityContent.projects,
    }),
    [screenIds.tasks]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.tasks,
      name: 'Tasks',
      content: businessProductivityContent.tasks,
    }),
    [screenIds.calendar]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.calendar,
      name: 'Calendar',
      content: businessProductivityContent.calendar,
    }),
    [screenIds.reports]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.reports,
      name: 'Reports',
      content: businessProductivityContent.reports,
    }),
    [screenIds.settings]: createStarterSettingsScreen({
      idPrefix,
      screenId: screenIds.settings,
      name: 'Settings',
      header: businessProductivityContent.settings,
      section: {
        title: 'Workspace defaults',
        description: 'Keep these settings deterministic until runtime preferences are wired.',
        rows: [
          {
            id: 'cadence-row',
            title: 'Planning cadence',
            description: 'Weekly planning with a mid-week checkpoint.',
            meta: 'weekly',
          },
          {
            id: 'notifications-row',
            title: 'Notification cadence',
            description: 'Daily digest with instant mentions and assignment alerts.',
            meta: 'daily',
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
