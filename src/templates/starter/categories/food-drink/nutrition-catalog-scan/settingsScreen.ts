import type { AppManifest } from '@ankhorage/contracts';

import {
  createScreen,
  createScreenRoot,
  createSettingsSection,
  createZoraNode,
} from '../../../../shared';
import type { TemplateSeed } from '../../../starter.types';
import { nutritionCatalogScanContent } from './content';

export function createNutritionSettingsScreen(args: {
  readonly seed: TemplateSeed;
  readonly idPrefix: string;
  readonly screenId: string;
}): AppManifest['screens'][string] {
  return createScreen({
    id: args.screenId,
    name: 'Settings',
    title: nutritionCatalogScanContent.settings.title,
    description: nutritionCatalogScanContent.settings.description,
    root: createScreenRoot(`${args.idPrefix}-settings-screen`, { width: 'default' }, [
      createZoraNode(`${args.idPrefix}-settings-header`, 'SectionHeader', {
        eyebrow: nutritionCatalogScanContent.settings.eyebrow,
        title: nutritionCatalogScanContent.settings.title,
        description: nutritionCatalogScanContent.settings.description,
      }),
      createSettingsSection(
        `${args.idPrefix}-settings-api`,
        'Nutrition API',
        'Runtime product lookup and CRUD use one canonical external Nutrition API.',
        [
          {
            id: 'base-url-row',
            title: 'API base URL',
            description: 'https://api.ankhorage.com/v1/nutrition',
            meta: 'runtime',
          },
          {
            id: 'health-row',
            title: 'Health check',
            description: 'GET /health verifies that the Nutrition API is reachable.',
            meta: 'health',
          },
          {
            id: 'product-create-row',
            title: 'Product create endpoint',
            description: 'POST /products creates a product through the shared API.',
            meta: 'create',
          },
          {
            id: 'client-row',
            title: 'Client defaults',
            description: `${args.seed.appName} uses de-CH locale and canonical API bindings.`,
            meta: 'de-CH',
          },
        ],
      ),
    ]),
  });
}
