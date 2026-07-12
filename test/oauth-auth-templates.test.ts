import { APP_CATEGORIES, resolveAuthFlow } from '@ankhorage/contracts';
import { describe, expect, test } from 'bun:test';

import {
  createCategoryAppManifest,
  createOAuthFixtureManifest,
  listOAuthFixtures,
  OAUTH_CALLBACK_ROUTE,
  OAUTH_FIXTURE_IDS,
  resolveOAuthFixture,
} from '../src/index';

const SECRET_SENTINEL = 'sentinel-phase3-template-secret-do-not-leak';

function serialize(value: unknown): string {
  return JSON.stringify(value);
}

describe('canonical OAuth template fixtures', () => {
  test('does not create template-owned OAuth auth screens', () => {
    const manifest = createCategoryAppManifest('developer_tools', 'starter', {
      infra: {
        auth: {
          oauth: {
            enabled: true,
            callbackRoute: OAUTH_CALLBACK_ROUTE,
            providers: [
              {
                id: 'google',
                enabled: true,
                credentialsRef: 'auth/oauth/google',
              },
            ],
          },
        },
      },
    });
    const { signInRoute } = resolveAuthFlow(manifest.infra.auth?.flow);

    expect(manifest.screens[signInRoute]).toBeUndefined();
    expect(manifest.navigator.routes.map((route) => route.name)).not.toContain(signInRoute);
    expect(serialize(manifest)).not.toContain('OAuthProviderList');
  });

  test('publishes deterministic Google, Apple, and combined fixtures', () => {
    expect(OAUTH_FIXTURE_IDS).toEqual(['google', 'apple', 'google-apple']);
    expect(listOAuthFixtures().map((fixture) => fixture.id)).toEqual([...OAUTH_FIXTURE_IDS]);
    expect(resolveOAuthFixture('google').oauth.providers.map((provider) => provider.id)).toEqual([
      'google',
    ]);
    expect(resolveOAuthFixture('apple').oauth.providers.map((provider) => provider.id)).toEqual([
      'apple',
    ]);
    expect(
      resolveOAuthFixture('google-apple').oauth.providers.map((provider) => provider.id),
    ).toEqual(['google', 'apple']);
  });

  test('uses one canonical callback and logical credential references only', () => {
    for (const fixture of listOAuthFixtures()) {
      expect(fixture.oauth.enabled).toBe(true);
      expect(fixture.oauth.callbackRoute).toBe('auth/callback');
      expect(fixture.oauth.callbackRoute.startsWith('/')).toBe(false);
      expect(fixture.oauth.providers.length).toBeGreaterThan(0);

      for (const provider of fixture.oauth.providers) {
        expect(['google', 'apple']).toContain(provider.id);
        expect(provider.enabled).toBe(true);
        expect(provider.credentialsRef).toBe(`auth/oauth/${provider.id}`);
        expect(provider.label).toBe(
          `Continue with ${provider.id === 'google' ? 'Google' : 'Apple'}`,
        );
      }

      const serialized = serialize(fixture);
      expect(serialized).not.toContain(SECRET_SENTINEL);
      expect(serialized).not.toContain('clientSecret');
      expect(serialized).not.toContain('privateKey');
      expect(serialized).not.toContain('serviceRoleKey');
      expect(serialized).not.toContain('accessToken');
      expect(serialized).not.toContain('refreshToken');
    }
  });

  test('creates OAuth fixture manifests without changing canonical auth flow', () => {
    for (const category of APP_CATEGORIES) {
      const manifest = createOAuthFixtureManifest({
        category,
        fixture: 'google-apple',
      });
      const flow = resolveAuthFlow(manifest.infra.auth?.flow);

      expect(flow.signInRoute).toBe('sign-in');
      expect(flow.signUpRoute).toBe('sign-up');
      expect(flow.signOutRoute).toBe('sign-out');
      expect(flow.postSignInRoute).toBe('/');
      expect(manifest.infra.auth?.oauth?.callbackRoute).toBe(OAUTH_CALLBACK_ROUTE);
      expect(manifest.infra.auth?.oauth?.providers.map((provider) => provider.id)).toEqual([
        'google',
        'apple',
      ]);
      expect(serialize(manifest)).not.toContain('OAuthProviderList');
    }
  });

  test('returns isolated fixture definitions', () => {
    const fixture = resolveOAuthFixture('google');
    const [provider] = fixture.oauth.providers;
    if (!provider) {
      throw new Error('Expected the Google OAuth fixture to contain one provider.');
    }
    provider.label = SECRET_SENTINEL;

    expect(resolveOAuthFixture('google').oauth.providers[0]?.label).toBe('Continue with Google');
    expect(serialize(listOAuthFixtures())).not.toContain(SECRET_SENTINEL);
  });
});
