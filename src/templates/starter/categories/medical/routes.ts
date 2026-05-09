import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface MedicalScreenIds {
  appointments: string;
  careTeam: string;
  records: string;
  messages: string;
  profile: string;
}

export function createMedicalScreenIds(idPrefix: string): MedicalScreenIds {
  return {
    appointments: `${idPrefix}-appointments`,
    careTeam: `${idPrefix}-care-team`,
    records: `${idPrefix}-records`,
    messages: `${idPrefix}-messages`,
    profile: `${idPrefix}-profile`,
  };
}

export function createMedicalNavigator(screenIds: MedicalScreenIds): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.appointments,
        label: 'Appointments',
        icon: { provider: 'material-community', name: 'calendar-check-outline' },
      }),
      createRoute({
        name: 'care-team',
        screenId: screenIds.careTeam,
        label: 'Care Team',
        icon: { provider: 'material-community', name: 'account-heart-outline' },
      }),
      createRoute({
        name: 'records',
        screenId: screenIds.records,
        label: 'Records',
        icon: { provider: 'material-community', name: 'file-document-outline' },
      }),
      createRoute({
        name: 'messages',
        screenId: screenIds.messages,
        label: 'Messages',
        icon: { provider: 'material-community', name: 'message-processing-outline' },
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

