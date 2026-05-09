import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface EducationLearningScreenIds {
  courses: string;
  study: string;
  practice: string;
  progress: string;
  profile: string;
}

export function createEducationLearningScreenIds(idPrefix: string): EducationLearningScreenIds {
  return {
    courses: `${idPrefix}-courses`,
    study: `${idPrefix}-study`,
    practice: `${idPrefix}-practice`,
    progress: `${idPrefix}-progress`,
    profile: `${idPrefix}-profile`,
  };
}

export function createEducationLearningNavigator(
  screenIds: EducationLearningScreenIds,
): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.courses,
        label: 'Courses',
        icon: { provider: 'material-community', name: 'book-education-outline' },
      }),
      createRoute({
        name: 'study',
        screenId: screenIds.study,
        label: 'Study',
        icon: { provider: 'material-community', name: 'school-outline' },
      }),
      createRoute({
        name: 'practice',
        screenId: screenIds.practice,
        label: 'Practice',
        icon: { provider: 'material-community', name: 'pencil-box-outline' },
      }),
      createRoute({
        name: 'progress',
        screenId: screenIds.progress,
        label: 'Progress',
        icon: { provider: 'material-community', name: 'chart-line' },
      }),
      createRoute({
        name: 'profile',
        screenId: screenIds.profile,
        label: 'Profile',
        icon: { provider: 'material-community', name: 'account-circle-outline' },
      }),
    ],
  };
}

