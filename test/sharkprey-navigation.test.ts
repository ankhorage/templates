import type { NavigatorNode, ScreenSpec, UiNode } from '@ankhorage/contracts';
import { describe, expect, test } from 'bun:test';

import { resolveTemplate } from '../src/index';

describe('SharkPrey navigation', () => {
  const manifest = resolveTemplate('education_learning', 'sharkprey').createAppManifest();

  test('preserves Train as the initial tab with its own public route', () => {
    expect(collectPublicScreenPaths(manifest.navigator)).toEqual([
      '/splash',
      '/onboarding',
      '/train',
      '/history',
      '/stats',
      '/learn',
      '/settings',
      '/decision-table',
      '/answer-explanation',
      '/session-summary',
    ]);

    const tabs = manifest.navigator.routes.find((route) => route.name === '(tabs)')?.navigator;
    expect(tabs).toMatchObject({
      type: 'tabs',
      implementation: 'headless',
      initialRouteName: 'train',
      routes: [
        {
          name: 'train',
          label: 'Train',
          path: '/train',
          screenId: 'training-setup',
        },
        { name: 'history', path: '/history' },
        { name: 'stats', path: '/stats' },
        { name: 'learn', path: '/learn' },
        { name: 'settings', path: '/settings' },
      ],
    });
    expect(tabs?.routes.find((route) => route.name === 'train')?.navigator).toBeUndefined();
  });

  test('targets only generated public screen paths', () => {
    const publicPaths = new Set(collectPublicScreenPaths(manifest.navigator));
    const navigationTargets = collectNavigationTargets(manifest.screens);

    expect(navigationTargets).toEqual([
      '/learn',
      '/train',
      '/decision-table',
      '/answer-explanation',
      '/decision-table',
      '/train',
      '/train',
    ]);
    expect(navigationTargets.every((target) => publicPaths.has(target))).toBe(true);
  });
});

/*** Collect concrete Expo Router screen paths while omitting layout-only route groups. */
function collectPublicScreenPaths(
  navigator: NavigatorNode,
  parentSegments: string[] = [],
): string[] {
  return navigator.routes.flatMap((route) => {
    const routeSegments =
      isLayoutGroup(route.name) || route.name === 'index'
        ? parentSegments
        : [...parentSegments, route.name];
    return [
      ...(route.screenId ? [`/${routeSegments.join('/')}`] : []),
      ...(route.navigator ? collectPublicScreenPaths(route.navigator, routeSegments) : []),
    ];
  });
}

/*** Collect normalized Expo Router targets from every authored navigate action. */
function collectNavigationTargets(screens: Readonly<Record<string, ScreenSpec>>): string[] {
  const targets: string[] = [];
  const visit = (node: UiNode) => {
    const target = readNavigationTarget(node);
    if (target) targets.push(target);
    node.children?.forEach(visit);
    node.repeat?.empty?.forEach(visit);
  };
  Object.values(screens).forEach((screen) => visit(screen.root));
  return targets;
}

/*** Read one normalized route from a canonical navigate action. */
function readNavigationTarget(node: UiNode): string | undefined {
  const action: unknown = Reflect.get(node.props ?? {}, 'onPress');
  if (typeof action !== 'object' || action === null || Reflect.get(action, 'type') !== 'navigate') {
    return undefined;
  }
  const payload: unknown = Reflect.get(action, 'payload');
  if (typeof payload !== 'object' || payload === null) return undefined;
  const route: unknown = Reflect.get(payload, 'route');
  if (typeof route !== 'string' || route.trim().length === 0) return undefined;
  return `/${route.trim().replace(/^\/+|\/+$/gu, '')}`;
}

/*** Return whether a route name is an Expo Router group that contributes no public segment. */
function isLayoutGroup(routeName: string): boolean {
  return /^\([^/]+\)$/u.test(routeName);
}
