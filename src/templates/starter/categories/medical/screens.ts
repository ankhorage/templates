import type { AppManifest } from '@ankhorage/contracts';

import { createStarterContentScreen, createStarterSettingsScreen } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { medicalContent } from './content';
import type { MedicalScreenIds } from './routes';

export function createMedicalScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: MedicalScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.appointments]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.appointments,
      name: 'Appointments',
      content: medicalContent.appointments,
    }),
    [screenIds.careTeam]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.careTeam,
      name: 'Care Team',
      content: medicalContent.careTeam,
    }),
    [screenIds.records]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.records,
      name: 'Records',
      content: medicalContent.records,
    }),
    [screenIds.messages]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.messages,
      name: 'Messages',
      content: medicalContent.messages,
    }),
    [screenIds.profile]: createStarterSettingsScreen({
      idPrefix,
      screenId: screenIds.profile,
      name: 'Profile',
      header: medicalContent.profile,
      section: {
        title: 'Patient defaults',
        description: 'Seed intake preferences and communication defaults without overbuilding.',
        rows: [
          {
            id: 'contact-row',
            title: 'Preferred contact',
            description: 'Secure messaging is the default, with email as a fallback.',
            meta: 'message',
          },
          {
            id: 'privacy-row',
            title: 'Privacy',
            description: 'Sensitive data stays private until shared with care providers.',
            meta: 'protected',
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
