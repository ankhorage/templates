import type { AppManifest } from '@ankhorage/contracts';

import { createStarterContentScreen } from '../../../shared';
import type { TemplateSeed } from '../../starter.types';
import { weatherContent } from './content';
import type { WeatherScreenIds } from './routes';

export function createWeatherScreens(
  _seed: TemplateSeed,
  idPrefix: string,
  screenIds: WeatherScreenIds,
): AppManifest['screens'] {
  return {
    [screenIds.now]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.now,
      name: 'Now',
      content: weatherContent.now,
    }),
    [screenIds.forecast]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.forecast,
      name: 'Forecast',
      content: weatherContent.forecast,
    }),
    [screenIds.alerts]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.alerts,
      name: 'Alerts',
      content: weatherContent.alerts,
    }),
    [screenIds.locations]: createStarterContentScreen({
      idPrefix,
      screenId: screenIds.locations,
      name: 'Locations',
      content: weatherContent.locations,
    }),
  };
}

