import type { AppManifest, InfraManifest } from '@ankhorage/contracts';

export const DEFAULT_TEMPLATE_VERSION = '1.0.0';
export const DEFAULT_THEME_ID = 'default';
export const DEFAULT_THEME_NAME = 'Default';

export const BASE_INFRA: InfraManifest = {
  database: {
    provider: 'supabase',
    tier: 'dev',
  },
  deployment: {
    target: 'minikube',
    monitoring: false,
  },
  auth: {
    provider: 'supabase',
    scope: 'global',
    authorization: {
      kind: 'ABAC',
      engine: 'cerbos',
    },
    login: {
      identifiers: ['email'],
    },
    registration: {
      requiredFields: ['email', 'password'],
      optionalFields: ['firstName', 'lastName'],
      signupPolicy: 'autoSignIn',
    },
    profile: {
      fields: ['email', 'firstName', 'lastName'],
    },
  },
  networking: {
    cdn: false,
  },
  plugins: [],
};

export const BASE_SETTINGS: AppManifest['settings'] = {
  authFlow: {
    unauthorizedRoute: 'login',
    loginRoute: 'login',
    postLoginRoute: 'index',
  },
  localization: {
    defaultLocale: 'en',
    locales: ['en'],
  },
};
