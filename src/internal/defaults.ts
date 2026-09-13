import { type AppManifest, DEFAULT_AUTH_FLOW, type InfraManifest } from '@ankhorage/contracts';

export const DEFAULT_TEMPLATE_VERSION = '1.0.0';

export const BASE_INFRA: InfraManifest = {
  environments: {
    local: {
      deployment: {
        compute: { provider: 'local' },
        runtime: { provider: 'minikube' },
      },
      database: {
        provider: 'supabase',
        tier: 'dev',
      },
      objectStorage: {
        provider: 'supabase',
        buckets: ['media'],
      },
      secretStore: {
        provider: 'supabase-vault',
      },
      auth: {
        provider: 'supabase',
        scope: 'global',
        flow: { ...DEFAULT_AUTH_FLOW },
        signIn: {
          identifiers: ['email'],
        },
        signUp: {
          requiredFields: ['email', 'password'],
          optionalFields: ['firstName', 'lastName'],
          signUpPolicy: 'autoSignIn',
        },
        profile: {
          fields: ['email', 'firstName', 'lastName'],
        },
      },
    },
  },
  modules: [],
};

export const BASE_SETTINGS: AppManifest['settings'] = {
  localization: {
    defaultLocale: 'en',
    locales: ['en'],
  },
};
