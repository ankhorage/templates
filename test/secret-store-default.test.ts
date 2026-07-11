import { describe, expect, test } from 'bun:test';

import { APP_CATEGORIES } from '@ankhorage/contracts';

import { createCategoryAppManifest } from '../src/generators/create-category-app';
import { BASE_INFRA } from '../src/internal/defaults';

describe('canonical secret-store template default', () => {
  test('owns the Supabase Vault selection in one shared infra preset', () => {
    expect(BASE_INFRA.secretStore).toEqual({ provider: 'supabase-vault' });
  });

  test('serializes the provider explicitly in every first-party category manifest', () => {
    for (const category of APP_CATEGORIES) {
      const manifest = createCategoryAppManifest(category);
      expect(manifest.infra.secretStore).toEqual({ provider: 'supabase-vault' });
    }
  });

  test('keeps OAuth credentials as logical references only', () => {
    const manifest = createCategoryAppManifest('business_productivity', 'starter', {
      infra: {
        auth: {
          oauth: {
            enabled: true,
            callbackRoute: '/auth/callback',
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

    expect(manifest.infra.auth?.oauth?.providers[0]?.credentialsRef).toBe(
      'auth/oauth/google',
    );

    const serialized = JSON.stringify(manifest);
    expect(serialized).not.toContain('clientSecret');
    expect(serialized).not.toContain('privateKey');
    expect(serialized).not.toContain('serviceRoleKey');
  });
});
