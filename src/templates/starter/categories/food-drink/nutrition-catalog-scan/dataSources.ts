import type { AppManifest, GeneratedApiDefinition } from '@ankhorage/contracts';
import { createGeneratedApiDataSource } from '@ankhorage/data-sources';

import { createNutritionCatalogScanExternalDataSource } from './externalDataSource';

export function createNutritionCatalogScanDataSources(
  generatedApi: GeneratedApiDefinition,
): NonNullable<AppManifest['dataSources']> {
  const generated = createGeneratedApiDataSource(generatedApi);
  if (!generated.ok) {
    const message = generated.diagnostics.map((diagnostic) => diagnostic.message).join('; ');
    throw new Error(`Invalid nutrition generated API: ${message}`);
  }

  return {
    [generatedApi.id]: generated.data,
    'nutrition-api': createNutritionCatalogScanExternalDataSource(),
  };
}
