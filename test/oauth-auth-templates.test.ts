import { describe, expect, test } from 'bun:test';

import {
  listOAuthFixtures,
  OAUTH_CALLBACK_ROUTE,
  OAUTH_FIXTURE_IDS,
  resolveOAuthFixture,
} from '../src/index';

const SECRET_SENTINEL = 'sentinel-template-secret-do-not-leak';

function serialize(value: unknown): string {
  return JSON.stringify(value);
}

describe('OAuth fixtures', () => {
  test('publishes deterministic Google, Apple, and combined fixtures', () => {
    expect(OAUTH_FIXTURE_IDS).toEqual(['google', 'apple', 'google-apple']);
    expect(listOAuthFixtures().map((fixture) => fixture.id)).toEqual([...OAUTH_FIXTURE_IDS]);
    expect(resolveOAuthFixture('google').oauth.providers.map((provider) => provider.id)).toEqual([
      'google',
    ]);
    expect(
      resolveOAuthFixture('google-apple').oauth.providers.map((provider) => provider.id),
    ).toEqual(['google', 'apple']);
  });

  test('uses the canonical callback and logical credential references', () => {
    for (const fixture of listOAuthFixtures()) {
      expect(fixture.oauth.callbackRoute).toBe(OAUTH_CALLBACK_ROUTE);
      for (const provider of fixture.oauth.providers) {
        expect(provider.credentialsRef).toBe(`auth/oauth/${provider.id}`);
      }
      expect(serialize(fixture)).not.toContain('clientSecret');
      expect(serialize(fixture)).not.toContain('privateKey');
    }
  });

  test('returns isolated fixture definitions', () => {
    const fixture = resolveOAuthFixture('google');
    const [provider] = fixture.oauth.providers;
    if (!provider) throw new Error('Expected Google fixture provider.');
    provider.label = SECRET_SENTINEL;

    expect(resolveOAuthFixture('google').oauth.providers[0]?.label).toBe('Continue with Google');
  });
});
