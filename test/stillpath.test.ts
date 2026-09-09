import type {
  NavigatorResponsiveSize,
  NavigatorRuntimePlatform,
} from '@ankhorage/contracts/navigator';
import { createNavigatorPlan, generateNavigator, getNavigatorCatalog } from '@ankhorage/navigator';
import { expect, test } from 'bun:test';

import { validateTemplateManifest } from '../src/index';
import createAppManifest from '../src/templates/categories/lifestyle/stillpath/createAppManifest';

const expoRouterRange = getNavigatorCatalog()
  .capabilities.flatMap((capability) => capability.dependencies)
  .find((dependency) => dependency.packageName === 'expo-router')?.versionRange;
const expoRouterVersion = expoRouterRange?.match(/\d+\.\d+\.\d+/u)?.[0];
if (!expoRouterVersion)
  throw new Error('Navigator must declare an Expo Router version requirement.');

const platforms: NavigatorRuntimePlatform[] = ['android', 'ios', 'web'];
const sizes: NavigatorResponsiveSize[] = ['compact', 'medium', 'expanded'];

for (const platform of platforms) {
  for (const responsiveSize of sizes) {
    test(`Stillpath generates valid ${platform} navigation at ${responsiveSize} size`, () => {
      const manifest = createAppManifest();
      const plan = createNavigatorPlan(manifest.navigator, {
        platform,
        responsiveSize,
        expoRouterVersion,
      });
      const result = generateNavigator(plan, {
        screens: Object.fromEntries(
          Object.keys(manifest.screens).map((screenId) => [
            screenId,
            { module: `@/screens/${screenId}`, exportName: 'default' },
          ]),
        ),
        guards: {},
        iconSourceResolver: { module: '@/media', exportName: 'resolveIconSource' },
      });
      expect(result.support).toBe('supported');
      expect(result.diagnostics).toEqual([]);
      expect(result.files.some((file) => file.path === 'src/app/index.tsx')).toBe(true);
      expect(result.files.filter((file) => file.path.endsWith('.tsx'))).toHaveLength(5);
    });
  }
}

test('Stillpath keeps every bound navigation action within its four reviewed routes', () => {
  const manifest = createAppManifest();
  const routes = new Set(manifest.navigator.routes.map((route) => route.path));
  for (const binding of Object.values(manifest.dataBindings ?? {})) {
    for (const events of Object.values(binding.events ?? {})) {
      for (const event of events) {
        if (event.target.kind !== 'action' || event.target.type !== 'navigate') continue;
        const route = event.input?.route;
        expect(route?.kind).toBe('literal');
        if (route?.kind === 'literal') {
          expect(typeof route.value).toBe('string');
          if (typeof route.value === 'string') expect(routes.has(route.value)).toBe(true);
        }
      }
    }
  }
  expect(validateTemplateManifest(manifest, 'release').diagnostics).toEqual([]);
  expect(validateTemplateManifest(manifest, 'release').status).toBe('ready');
});
