import type { AppCategory } from '@ankhorage/contracts';

import { fallbackStarterTemplates } from './categories/fallback';
import { foodDrinkStarterTemplates } from './categories/food-drink';
import { healthFitnessStarterTemplates } from './categories/health-fitness';
import { shoppingCommerceStarterTemplates } from './categories/shopping-commerce';
import { socialCommunityStarterTemplates } from './categories/social-community';
import type { CategoryStarterTemplateDefinition, TemplateSeed } from './starter.types';

const STARTER_TEMPLATE_REGISTRY: Partial<
  Record<AppCategory, readonly CategoryStarterTemplateDefinition[]>
> = {
  food_drink: foodDrinkStarterTemplates,
  health_fitness: healthFitnessStarterTemplates,
  shopping_commerce: shoppingCommerceStarterTemplates,
  social_community: socialCommunityStarterTemplates,
};

function resolveFallbackTemplate(): CategoryStarterTemplateDefinition {
  const fallbackDefault = fallbackStarterTemplates.find((template) => template.id === 'default');

  if (!fallbackDefault) {
    throw new Error('Fallback starter template registry is missing default template.');
  }

  return fallbackDefault;
}

export function resolveStarterTemplate(
  seed: TemplateSeed,
  templateId = 'default',
): CategoryStarterTemplateDefinition {
  const categoryTemplates = STARTER_TEMPLATE_REGISTRY[seed.category];
  const selected = categoryTemplates?.find((template) => template.id === templateId);
  const categoryDefault = categoryTemplates?.find((template) => template.id === 'default');

  return selected ?? categoryDefault ?? resolveFallbackTemplate();
}

export function listStarterTemplates(
  category?: AppCategory,
): readonly CategoryStarterTemplateDefinition[] {
  if (category) {
    return STARTER_TEMPLATE_REGISTRY[category] ?? fallbackStarterTemplates;
  }

  const registeredTemplates = Object.values(STARTER_TEMPLATE_REGISTRY)
    .filter(
      (templates): templates is readonly CategoryStarterTemplateDefinition[] =>
        templates !== undefined,
    )
    .flatMap((templates) => templates);

  return [...fallbackStarterTemplates, ...registeredTemplates];
}
