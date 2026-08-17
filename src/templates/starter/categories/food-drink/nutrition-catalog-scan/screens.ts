import type { AppManifest } from '@ankhorage/contracts';

import type { TemplateSeed } from '../../../starter.types';
import { createNutritionCatalogBody } from './catalogScreenBody';
import { nutritionCatalogScanContent } from './content';
import { createNutritionContentScreen } from './contentScreen';
import { createNutritionProductCreateBody } from './productCreateScreenBody';
import {
  createNutritionProductDetailBody,
  nutritionProductDetailOperation,
} from './productDetailScreenBody';
import type { NutritionCatalogScanScreenIds } from './routes';
import { createNutritionScanBody } from './scanScreenBody';
import { createNutritionSettingsScreen } from './settingsScreen';

export function createNutritionCatalogScanScreens(
  seed: TemplateSeed,
  idPrefix: string,
  screenIds: NutritionCatalogScanScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.catalog]: createNutritionContentScreen({
      idPrefix,
      screenId: screenIds.catalog,
      name: 'Products',
      content: nutritionCatalogScanContent.catalog,
      body: createNutritionCatalogBody(idPrefix),
    }),
    [screenIds.scan]: createNutritionContentScreen({
      idPrefix,
      screenId: screenIds.scan,
      name: 'Scan',
      content: nutritionCatalogScanContent.scan,
      body: createNutritionScanBody(idPrefix),
      requires: {
        permissions: [{ permission: 'camera' }],
        capabilities: [{ capability: 'barcodeScanner' }],
      },
    }),
    [screenIds.stats]: createNutritionContentScreen({
      idPrefix,
      screenId: screenIds.stats,
      name: 'Stats',
      content: nutritionCatalogScanContent.stats,
    }),
    [screenIds.profile]: createNutritionContentScreen({
      idPrefix,
      screenId: screenIds.profile,
      name: 'Profile',
      content: nutritionCatalogScanContent.profile,
    }),
    [screenIds.detail]: createNutritionContentScreen({
      idPrefix,
      screenId: screenIds.detail,
      name: 'Product Detail',
      content: nutritionCatalogScanContent.detail,
      body: createNutritionProductDetailBody(idPrefix),
      dataLoaders: [
        {
          kind: 'operation',
          id: 'product-detail',
          operation: nutritionProductDetailOperation,
          input: {
            id: {
              kind: 'source',
              source: { kind: 'context', path: 'route.params.id' },
            },
          },
        },
      ],
    }),
    [screenIds.create]: createNutritionContentScreen({
      idPrefix,
      screenId: screenIds.create,
      name: 'Create',
      content: nutritionCatalogScanContent.create,
      body: createNutritionProductCreateBody(idPrefix),
    }),
    [screenIds.signIn]: createNutritionContentScreen({
      idPrefix,
      screenId: screenIds.signIn,
      name: 'Sign In',
      content: nutritionCatalogScanContent.signIn,
    }),
    [screenIds.signUp]: createNutritionContentScreen({
      idPrefix,
      screenId: screenIds.signUp,
      name: 'Sign Up',
      content: nutritionCatalogScanContent.signUp,
    }),
    [screenIds.settings]: createNutritionSettingsScreen({
      seed,
      idPrefix,
      screenId: screenIds.settings,
    }),
  };
}
