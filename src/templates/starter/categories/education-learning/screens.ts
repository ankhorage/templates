import type { AppManifest } from '@ankhorage/contracts';

import { createStarterContentScreen, createStarterSettingsScreen } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { educationLearningContent } from './content';
import type { EducationLearningScreenIds } from './routes';

export function createEducationLearningScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: EducationLearningScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.courses]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.courses,
      name: 'Courses',
      content: educationLearningContent.courses,
    }),
    [screenIds.study]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.study,
      name: 'Study',
      content: educationLearningContent.study,
    }),
    [screenIds.practice]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.practice,
      name: 'Practice',
      content: educationLearningContent.practice,
    }),
    [screenIds.progress]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.progress,
      name: 'Progress',
      content: educationLearningContent.progress,
    }),
    [screenIds.profile]: createStarterSettingsScreen({
      idPrefix,
      screenId: screenIds.profile,
      name: 'Profile',
      header: educationLearningContent.profile,
      section: {
        title: 'Study defaults',
        description: 'Seed reminder cadence, pacing, and learning preferences.',
        rows: [
          {
            id: 'pace-row',
            title: 'Pacing',
            description: 'Daily sessions with optional weekend catch-up.',
            meta: 'daily',
          },
          {
            id: 'reminders-row',
            title: 'Reminders',
            description: 'A gentle reminder triggers after missed practice sessions.',
            meta: 'on',
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
