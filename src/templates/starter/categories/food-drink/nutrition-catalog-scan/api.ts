import type { ExternalRestApiDefinition } from '@ankhorage/contracts/data';

import { nutritionApiEndpoints } from './apiEndpoints';
import { nutritionApiSchemas } from './apiSchemas';

export function createNutritionCatalogScanApi(): ExternalRestApiDefinition {
  return {
    id: 'nutrition',
    origin: 'external',
    protocol: 'rest',
    name: 'Nutrition API',
    description: 'Shared Nutrition catalog served by the Ankhorage API gateway.',
    baseUrl: 'https://api.ankhorage.com/v1/nutrition',
    openApi: {
      url: 'https://api.ankhorage.com/openapi.json',
    },
    schemas: nutritionApiSchemas,
    endpoints: nutritionApiEndpoints,
  };
}
