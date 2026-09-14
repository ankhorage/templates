import type {
  NavigatorResponsiveSize,
  NavigatorRuntimePlatform,
} from '@ankhorage/contracts/navigator';
import { createNavigatorPlan, getNavigatorCatalog } from '@ankhorage/navigator';
import { expect, test } from 'bun:test';

import { listTemplates } from '../src/index';

const expoRouterRange = getNavigatorCatalog()
  .capabilities.flatMap((capability) => capability.dependencies)
  .find((dependency) => dependency.packageName === 'expo-router')?.versionRange;
const expoRouterVersion = expoRouterRange?.match(/\d+\.\d+\.\d+/u)?.[0];
if (!expoRouterVersion)
  throw new Error('Navigator must declare an Expo Router version requirement.');

const platforms: readonly NavigatorRuntimePlatform[] = ['android', 'ios', 'web'];
const responsiveSizes: readonly NavigatorResponsiveSize[] = ['compact', 'medium', 'expanded'];

test('every published template plans navigation at every supported responsive size', () => {
  for (const template of listTemplates()) {
    const manifest = template.createAppManifest();
    for (const platform of platforms) {
      for (const responsiveSize of responsiveSizes) {
        const plan = createNavigatorPlan(manifest.navigator, {
          expoRouterVersion,
          platform,
          responsiveSize,
        });
        expect(plan.diagnostics.filter(({ severity }) => severity === 'error')).toEqual([]);
      }
    }
  }
});

test('every published screen declares its deliberate content width', () => {
  const widths = Object.fromEntries(
    listTemplates().map((template) => [
      template.selector,
      Object.fromEntries(
        Object.entries(template.createAppManifest().screens).map(([screenId, screen]) => [
          screenId,
          screen.root.props?.width,
        ]),
      ),
    ]),
  );

  expect(widths).toEqual({
    'education_learning/sharkprey': {
      onboarding: 'narrow',
      'training-setup': 'default',
      'decision-table': 'wide',
      'answer-explanation': 'wide',
      'session-summary': 'default',
      'hand-history': 'default',
      stats: 'default',
      learn: 'default',
      settings: 'narrow',
    },
    'lifestyle/stillpath': {
      'stillpath-home': 'default',
      'stillpath-journal': 'default',
      'stillpath-rituals': 'default',
      'stillpath-profile': 'default',
    },
    'social_community/chat': {
      friends: 'default',
      chats: 'default',
      direct: 'default',
    },
  });
});
