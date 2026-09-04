import type { AppManifest } from '@ankhorage/contracts';

export const OAUTH_CALLBACK_ROUTE = 'auth/callback';
export const OAUTH_FIXTURE_IDS = ['google', 'apple', 'google-apple'] as const;

export type OAuthFixtureId = (typeof OAUTH_FIXTURE_IDS)[number];

type OAuthConfig = NonNullable<NonNullable<AppManifest['infra']['auth']>['oauth']>;
type OAuthProviderConfig = OAuthConfig['providers'][number];

export interface OAuthFixtureDefinition {
  readonly id: OAuthFixtureId;
  readonly label: string;
  readonly description: string;
  readonly oauth: OAuthConfig;
}

function createOAuthConfig(providers: readonly OAuthProviderConfig[]): OAuthConfig {
  return {
    enabled: true,
    callbackRoute: OAUTH_CALLBACK_ROUTE,
    providers: providers.map((provider) => structuredClone(provider)),
  };
}

const GOOGLE_PROVIDER: OAuthProviderConfig = {
  id: 'google',
  label: 'Continue with Google',
  enabled: true,
  credentialsRef: 'auth/oauth/google',
  scopes: ['openid', 'email', 'profile'],
  queryParams: {
    prompt: 'select_account',
  },
  icon: {
    provider: 'FontAwesome',
    name: 'google',
  },
};

const APPLE_PROVIDER: OAuthProviderConfig = {
  id: 'apple',
  label: 'Continue with Apple',
  enabled: true,
  credentialsRef: 'auth/oauth/apple',
  scopes: ['name', 'email'],
  icon: {
    provider: 'FontAwesome',
    name: 'apple',
  },
};

const FIXTURES: Record<OAuthFixtureId, OAuthFixtureDefinition> = {
  google: {
    id: 'google',
    label: 'Google OAuth',
    description: 'Canonical Google authorization-code-with-PKCE fixture.',
    oauth: createOAuthConfig([GOOGLE_PROVIDER]),
  },
  apple: {
    id: 'apple',
    label: 'Apple OAuth',
    description: 'Canonical Apple authorization-code-with-PKCE fixture.',
    oauth: createOAuthConfig([APPLE_PROVIDER]),
  },
  'google-apple': {
    id: 'google-apple',
    label: 'Google and Apple OAuth',
    description: 'Canonical combined Google and Apple authorization-code-with-PKCE fixture.',
    oauth: createOAuthConfig([GOOGLE_PROVIDER, APPLE_PROVIDER]),
  },
};

export function listOAuthFixtures(): OAuthFixtureDefinition[] {
  return OAUTH_FIXTURE_IDS.map((id) => structuredClone(FIXTURES[id]));
}

export function resolveOAuthFixture(id: OAuthFixtureId): OAuthFixtureDefinition {
  return structuredClone(FIXTURES[id]);
}
