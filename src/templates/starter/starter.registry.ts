import type { AppCategory } from '@ankhorage/contracts';

import { createUrbanWaterMonitorStarterTemplate } from './categories/business-productivity/urban-water-monitor/manifest';
import { createEbankingMobileStarterTemplate } from './categories/finance-money/ebanking-mobile/manifest';
import type {
  CategoryStarterTemplateDefinition,
  StarterTemplateSummary,
  TemplateSeed,
} from './starter.types';

const STARTER_TEMPLATE_REGISTRY: Partial<
  Record<AppCategory, readonly CategoryStarterTemplateDefinition[]>
> = {
  business_productivity: [
    {
      id: 'urban-water-monitor',
      label: 'Urban Water Monitor',
      description:
        'An event-based urban water quality monitoring and field-campaign concept starter.',
      create: createUrbanWaterMonitorStarterTemplate,
    },
  ],
  finance_money: [
    {
      id: 'ebanking-mobile',
      label: 'E-banking mobile',
      description:
        'A five-tab mobile e-banking starter with balances, assets, payments, investing, and secure account settings.',
      create: createEbankingMobileStarterTemplate,
    },
  ],
};

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
  const categoryFirst = categoryTemplates?.[0];

  const resolved = selected ?? categoryDefault ?? categoryFirst;
  if (!resolved) throw new Error(`Category "${seed.category}" has no registered starter template.`);
  return resolved;
}

export function listStarterTemplates(
  category?: AppCategory,
): readonly CategoryStarterTemplateDefinition[] {
  if (category) {
    return STARTER_TEMPLATE_REGISTRY[category] ?? [];
  }

  const registeredTemplates = Object.values(STARTER_TEMPLATE_REGISTRY)
    .filter(
      (templates): templates is readonly CategoryStarterTemplateDefinition[] =>
        templates !== undefined,
    )
    .flatMap((templates) => templates);

  return registeredTemplates;
}

export function listStarterTemplatesByCategory(
  category?: AppCategory,
): readonly StarterTemplateSummary[] {
  if (category) {
    return listStarterTemplates(category).map((template) =>
      createTemplateSummary(category, template),
    );
  }

  return listStarterTemplateSummaries();
}

export function listStarterTemplateSummaries(): readonly StarterTemplateSummary[] {
  return Object.entries(STARTER_TEMPLATE_REGISTRY).flatMap(([category, templates]) => {
    if (templates === undefined) {
      return [];
    }

    return templates.map((template) => createTemplateSummary(category as AppCategory, template));
  });
}
