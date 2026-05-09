import type { CategoryStarterTemplateDefinition } from '../../starter.types';
import { createNavigationTravelStarterTemplate } from './default.template';

export { createNavigationTravelStarterTemplate } from './default.template';

export const navigationTravelStarterTemplates = [
  {
    id: 'default',
    label: 'Trip planner',
    description: 'A destinations, itinerary, bookings, map, and profile starter for travel apps.',
    create: createNavigationTravelStarterTemplate,
  },
] satisfies readonly CategoryStarterTemplateDefinition[];
