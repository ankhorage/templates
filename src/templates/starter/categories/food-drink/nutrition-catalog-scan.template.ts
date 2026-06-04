import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { nutritionCatalogScanData } from './data.nutrition-catalog-scan';
import {
  createNutritionCatalogScanNavigator,
  createNutritionCatalogScanScreenIds,
} from './routes.nutrition-catalog-scan';
import { createNutritionCatalogScanScreens } from './screens.nutrition-catalog-scan';

export function createNutritionCatalogScanStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-nutrition-catalog-scan`;
  const theme = createTheme(seed);
  const screenIds = createNutritionCatalogScanScreenIds(idPrefix);
  const manifest = createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createNutritionCatalogScanNavigator(screenIds),
    screens: createNutritionCatalogScanScreens(seed, idPrefix, screenIds),
  });

  return {
    ...manifest,
    data: nutritionCatalogScanData,
    infra: {
      ...manifest.infra,
      auth: {
        scope: 'global',
        provider: 'supabase',
        authorization: {
          kind: 'RBAC',
          engine: 'native',
        },
        flow: {
          signInRoute: 'sign-in',
          signUpRoute: 'sign-up',
          signOutRoute: 'sign-out',
          postSignInRoute: 'challenge',
          unauthorizedRoute: 'sign-in',
        },
        signIn: {
          identifiers: ['email'],
        },
        signUp: {
          requiredFields: ['email', 'password', 'displayName'],
          signUpPolicy: 'requireVerification',
        },
        profile: {
          fields: ['email', 'displayName', 'avatarUrl'],
          table: 'profiles',
          primaryKey: 'authUserId',
          createStrategy: 'trigger',
          updateStrategy: 'api',
        },
      },
    },
    settings: {
      ...manifest.settings,
      authFlow: {
        signInRoute: 'sign-in',
        signUpRoute: 'sign-up',
        signOutRoute: 'sign-out',
        postSignInRoute: 'challenge',
        unauthorizedRoute: 'sign-in',
      },
    },
  };
}
