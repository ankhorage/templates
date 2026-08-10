import type { AppManifest } from '@ankhorage/contracts';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../../shared';
import type { TemplateSeed } from '../../../starter.types';
import { createNutritionCatalogScanBindings } from './bindings';
import { createNutritionCatalogScanDataSources } from './dataSources';
import { createNutritionCatalogScanGeneratedApi } from './generatedApi';
import { createNutritionCatalogScanNavigator, createNutritionCatalogScanScreenIds } from './routes';
import { createNutritionCatalogScanScreens } from './screens';

export function createNutritionCatalogScanStarterTemplate(seed: TemplateSeed): AppManifest {
  const idPrefix = `${seed.category}-nutrition-catalog-scan`;
  const theme = createTheme(seed);
  const screenIds = createNutritionCatalogScanScreenIds(idPrefix);
  const generatedApi = createNutritionCatalogScanGeneratedApi();
  const manifest = createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: createNutritionCatalogScanNavigator(screenIds),
    screens: createNutritionCatalogScanScreens(seed, idPrefix, screenIds),
  });

  return {
    ...manifest,
    generatedApis: { [generatedApi.id]: generatedApi },
    dataBindings: createNutritionCatalogScanBindings(idPrefix),
    dataSources: createNutritionCatalogScanDataSources(generatedApi),
    infra: {
      ...manifest.infra,
      auth: {
        scope: 'global',
        provider: 'supabase',
        flow: {
          signInRoute: 'sign-in',
          signUpRoute: 'sign-up',
          signOutRoute: 'sign-out',
          postSignInRoute: '/products',
          unauthorizedRoute: 'sign-in',
        },
        signIn: { identifiers: ['email'] },
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
  };
}
