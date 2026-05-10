import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createWeatherStarterTemplate } from './default.template';

export const weatherStarterTemplates = [
  {
    id: 'default',
    label: 'Forecast dashboard',
    description: 'A now, forecast, alerts, and locations starter for weather apps.',
    create: createWeatherStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
