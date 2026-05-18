import type { AppCategory } from '@ankhorage/contracts';

import { fallbackStarterTemplates } from './categories/fallback';
import { booksReadingStarterTemplates } from './categories/books-reading';
import { businessProductivityStarterTemplates } from './categories/business-productivity';
import { developerToolsStarterTemplates } from './categories/developer-tools';
import { educationLearningStarterTemplates } from './categories/education-learning';
import { entertainmentMediaStarterTemplates } from './categories/entertainment-media';
import { financeMoneyStarterTemplates } from './categories/finance-money';
import { foodDrinkStarterTemplates } from './categories/food-drink';
import { gamesStarterTemplates } from './categories/games';
import { graphicsDesignStarterTemplates } from './categories/graphics-design';
import { healthFitnessStarterTemplates } from './categories/health-fitness';
import { kidsFamilyStarterTemplates } from './categories/kids-family';
import { lifestyleStarterTemplates } from './categories/lifestyle';
import { medicalStarterTemplates } from './categories/medical';
import { musicAudioStarterTemplates } from './categories/music-audio';
import { navigationTravelStarterTemplates } from './categories/navigation-travel';
import { newsMagazinesStarterTemplates } from './categories/news-magazines';
import { photoVideoStarterTemplates } from './categories/photo-video';
import { referenceStarterTemplates } from './categories/reference';
import { shoppingCommerceStarterTemplates } from './categories/shopping-commerce';
import { socialCommunityStarterTemplates } from './categories/social-community';
import { sportsStarterTemplates } from './categories/sports';
import { utilitiesToolsStarterTemplates } from './categories/utilities-tools';
import { weatherStarterTemplates } from './categories/weather';
import type {
  CategoryStarterTemplateDefinition,
  StarterTemplateSummary,
  TemplateSeed,
} from './starter.types';

const STARTER_TEMPLATE_REGISTRY: Partial<
  Record<AppCategory, readonly CategoryStarterTemplateDefinition[]>
> = {
  books_reading: booksReadingStarterTemplates,
  business_productivity: businessProductivityStarterTemplates,
  developer_tools: developerToolsStarterTemplates,
  education_learning: educationLearningStarterTemplates,
  entertainment_media: entertainmentMediaStarterTemplates,
  finance_money: financeMoneyStarterTemplates,
  food_drink: foodDrinkStarterTemplates,
  games: gamesStarterTemplates,
  graphics_design: graphicsDesignStarterTemplates,
  health_fitness: healthFitnessStarterTemplates,
  kids_family: kidsFamilyStarterTemplates,
  lifestyle: lifestyleStarterTemplates,
  medical: medicalStarterTemplates,
  music_audio: musicAudioStarterTemplates,
  navigation_travel: navigationTravelStarterTemplates,
  news_magazines: newsMagazinesStarterTemplates,
  photo_video: photoVideoStarterTemplates,
  reference: referenceStarterTemplates,
  shopping_commerce: shoppingCommerceStarterTemplates,
  social_community: socialCommunityStarterTemplates,
  sports: sportsStarterTemplates,
  utilities_tools: utilitiesToolsStarterTemplates,
  weather: weatherStarterTemplates,
};

function resolveFallbackTemplate(): CategoryStarterTemplateDefinition {
  const fallbackDefault = fallbackStarterTemplates.find((template) => template.id === 'default');

  if (!fallbackDefault) {
    throw new Error('Fallback starter template registry is missing default template.');
  }

  return fallbackDefault;
}

function createTemplateSummary(
  category: AppCategory,
  template: CategoryStarterTemplateDefinition,
): StarterTemplateSummary {
  return {
    category,
    description: template.description,
    id: template.id,
    label: template.label,
  };
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

export function listStarterTemplatesByCategory(
  category: AppCategory,
): readonly StarterTemplateSummary[] {
  return listStarterTemplates(category).map((template) => createTemplateSummary(category, template));
}

export function listStarterTemplateSummaries(): readonly StarterTemplateSummary[] {
  return Object.entries(STARTER_TEMPLATE_REGISTRY).flatMap(([category, templates]) => {
    if (templates === undefined) {
      return [];
    }

    return templates.map((template) => createTemplateSummary(category as AppCategory, template));
  });
}
