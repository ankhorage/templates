import type { AppManifest, UiNode } from '@ankhorage/contracts';
import { describe, expect, test } from 'bun:test';

import { createCategoryAppManifest } from '../src/index';

function collectNodes(node: UiNode): UiNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function createOauthManifest() {
  return createCategoryAppManifest('developer_tools', 'starter', {
    infra: {
      auth: {
        oauth: {
          enabled: true,
          callbackRoute: '/auth/callback',
          providers: [
            {
              id: 'google',
              label: 'Google',
              enabled: true,
              icon: { provider: 'FontAwesome', name: 'google' },
            },
            {
              id: 'github',
              label: 'GitHub',
              enabled: false,
              icon: { provider: 'FontAwesome', name: 'github' },
            },
            {
              id: 'custom-sso',
              label: 'Custom SSO',
              enabled: true,
            },
          ],
        },
      },
    },
  });
}

describe('OAuth auth template generation', () => {
  test('adds an OAuth provider entry screen outside navigation when enabled', () => {
    const manifest = createOauthManifest();
    const signInRoute = manifest.settings.authFlow.signInRoute;
    const screen = manifest.screens[signInRoute];

    expect(screen).toBeDefined();
    expect(manifest.navigator.routes.map((route) => route.name)).not.toContain(signInRoute);

    const nodes = screen ? collectNodes(screen.root) : [];
    const providerList = nodes.find((node) => node.type === 'OAuthProviderList');

    expect(providerList?.props).toEqual({
      providers: [
        {
          id: 'google',
          label: 'Google',
          icon: { provider: 'FontAwesome', name: 'google' },
        },
        {
          id: 'custom-sso',
          label: 'Custom SSO',
        },
      ],
      layout: 'stack',
      fullWidth: true,
    });
  });

  test('does not add an OAuth provider entry screen when OAuth is disabled', () => {
    const manifest = createCategoryAppManifest('developer_tools', 'starter', {
      infra: {
        auth: {
          oauth: {
            enabled: false,
            callbackRoute: '/auth/callback',
            providers: [{ id: 'google', label: 'Google' }],
          },
        },
      },
    });

    expect(manifest.screens[manifest.settings.authFlow.signInRoute]).toBeUndefined();
  });

  test('does not add an OAuth provider entry screen when all providers are disabled', () => {
    const manifest: AppManifest = createCategoryAppManifest('developer_tools', 'starter', {
      infra: {
        auth: {
          oauth: {
            enabled: true,
            callbackRoute: '/auth/callback',
            providers: [
              { id: 'google', label: 'Google', enabled: false },
              { id: 'github', label: 'GitHub', enabled: false },
            ],
          },
        },
      },
    });

    expect(manifest.screens[manifest.settings.authFlow.signInRoute]).toBeUndefined();
  });
});
