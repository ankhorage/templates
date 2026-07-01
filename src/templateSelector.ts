import { APP_CATEGORIES, type AppCategory } from '@ankhorage/contracts';

import { FALLBACK_TEMPLATE_CATEGORY, type StarterTemplateCategory } from './templates/starter';

export interface ParsedTemplateSelector {
  readonly category: StarterTemplateCategory;
  readonly templateId: string;
  readonly selector: string;
}

const PROJECT_SLUG_PATTERN = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/u;

export function parseTemplateCategory(value: string): StarterTemplateCategory {
  if (value === FALLBACK_TEMPLATE_CATEGORY) {
    return value;
  }

  if (isAppCategory(value)) {
    return value;
  }

  throw new Error(
    `Unknown template category "${value}". Run ankhorage-templates list to see available selectors.`,
  );
}

export function parseTemplateSelector(value: string): ParsedTemplateSelector {
  const normalizedValue = value.trim();
  const segments = normalizedValue.split('/');

  if (segments.length !== 2 || segments.some((segment) => segment.length === 0)) {
    throw new Error(
      `Invalid template selector "${value}". Use the canonical <category>/<templateId> format.`,
    );
  }

  const [rawCategory, rawTemplateId] = segments;
  if (rawCategory === undefined || rawTemplateId === undefined) {
    throw new Error(
      `Invalid template selector "${value}". Use the canonical <category>/<templateId> format.`,
    );
  }

  const category = parseTemplateCategory(rawCategory);

  return {
    category,
    templateId: rawTemplateId,
    selector: createTemplateSelector(category, rawTemplateId),
  };
}

export function parseProjectSlug(value: string): string {
  const normalizedValue = value.trim();

  if (normalizedValue.length === 0) {
    throw new Error('Project slug is required.');
  }

  if (
    normalizedValue === '.' ||
    normalizedValue === '..' ||
    normalizedValue.startsWith('.') ||
    normalizedValue.includes('/') ||
    normalizedValue.includes('\\')
  ) {
    throw new Error(`Invalid project slug "${value}". Use a single lowercase slug like "my-app".`);
  }

  if (!PROJECT_SLUG_PATTERN.test(normalizedValue)) {
    throw new Error(`Invalid project slug "${value}". Use a single lowercase slug like "my-app".`);
  }

  return normalizedValue;
}

export function createTemplateSelector(
  category: StarterTemplateCategory,
  templateId: string,
): string {
  return `${category}/${templateId}`;
}

export function deriveDisplayNameFromSlug(projectSlug: string): string {
  return projectSlug
    .split('-')
    .filter((segment) => segment.length > 0)
    .map((segment) => `${segment[0]?.toUpperCase() ?? ''}${segment.slice(1)}`)
    .join(' ');
}

function isAppCategory(value: string): value is AppCategory {
  return APP_CATEGORIES.some((category) => category === value);
}
