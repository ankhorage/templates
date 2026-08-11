import type { NavigatorSpec, NavigatorType } from '@ankhorage/contracts';
import { describe, expect, test } from 'bun:test';

import { createRoute } from '../src/templates/shared/route';

function createPrimaryNavigator(type: Extract<NavigatorType, 'tabs' | 'drawer'>): NavigatorSpec {
  return {
    type,
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        path: '/',
        screenId: 'home-screen',
      }),
      createRoute({
        name: 'details',
        path: '/details',
        screenId: 'details-screen',
        showInPrimaryNavigation: false,
      }),
    ],
  };
}

describe('createRoute', () => {
  test.each(['tabs', 'drawer'] as const)(
    'preserves hidden-but-routable routes in %s navigation',
    (type) => {
      const navigator = createPrimaryNavigator(type);
      const visibleRoutes = navigator.routes.filter(
        (route) => route.showInPrimaryNavigation !== false,
      );
      const hiddenRoute = navigator.routes.find((route) => route.name === 'details');

      expect(visibleRoutes.map((route) => route.name)).toEqual(['index']);
      expect(hiddenRoute).toEqual({
        name: 'details',
        path: '/details',
        screenId: 'details-screen',
        showInPrimaryNavigation: false,
      });
      expect(navigator.routes.map((route) => route.name)).toContain('details');
      expect(navigator.initialRouteName).toBe('index');
    },
  );

  test('omits default visibility and emits explicit visibility values canonically', () => {
    const defaultRoute = createRoute({ name: 'index', screenId: 'home-screen' });
    const explicitlyVisibleRoute = createRoute({
      name: 'settings',
      screenId: 'settings-screen',
      showInPrimaryNavigation: true,
    });

    expect(defaultRoute).not.toHaveProperty('showInPrimaryNavigation');
    expect(explicitlyVisibleRoute.showInPrimaryNavigation).toBe(true);
  });
});
