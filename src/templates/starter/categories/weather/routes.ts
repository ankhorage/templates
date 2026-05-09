import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../shared';

export interface WeatherScreenIds {
  now: string;
  forecast: string;
  alerts: string;
  locations: string;
}

export function createWeatherScreenIds(idPrefix: string): WeatherScreenIds {
  return {
    now: `${idPrefix}-now`,
    forecast: `${idPrefix}-forecast`,
    alerts: `${idPrefix}-alerts`,
    locations: `${idPrefix}-locations`,
  };
}

export function createWeatherNavigator(screenIds: WeatherScreenIds): AppManifest['navigator'] {
  return {
    type: 'tabs',
    initialRouteName: 'index',
    routes: [
      createRoute({
        name: 'index',
        screenId: screenIds.now,
        label: 'Now',
        icon: { provider: 'material-community', name: 'weather-partly-cloudy' },
      }),
      createRoute({
        name: 'forecast',
        screenId: screenIds.forecast,
        label: 'Forecast',
        icon: { provider: 'material-community', name: 'weather-cloudy-clock' },
      }),
      createRoute({
        name: 'alerts',
        screenId: screenIds.alerts,
        label: 'Alerts',
        icon: { provider: 'material-community', name: 'weather-cloudy-alert' },
      }),
      createRoute({
        name: 'locations',
        screenId: screenIds.locations,
        label: 'Locations',
        icon: { provider: 'material-community', name: 'map-marker-outline' },
      }),
    ],
  };
}
