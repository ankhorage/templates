import { APP_CATEGORIES, type AppCategory } from '@ankhorage/contracts';

export interface ParsedTemplateSelector {
  readonly category: AppCategory;
  readonly slug: string;
  readonly selector: string;
}

const SLUG_PATTERN = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/u;

export function parseTemplateCategory(value: string): AppCategory {
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
    throw new Error(`Invalid template selector "${value}". Use the canonical <category>/<slug> format.`);
  }

  const [rawCategory, rawSlug] = segments;
  if (rawCategory === undefined || rawSlug === undefined) {
    throw new Error(`Invalid template selector "${value}". Use the canonical <category>/<slug> format.`);
  }
  if (!SLUG_PATTERN.test(rawSlug)) {
    throw new Error(`Invalid template slug "${rawSlug}". Use lowercase kebab-case.`);
  }

  const category = parseTemplateCategory(rawCategory);

  return {
    category,
    slug: rawSlug,
    selector: createTemplateSelector(category, rawSlug),
  };
}

export function parseProjectSlug(value: string): string {
  const normalizedValue = value.trim();

  if (normalizedValue.length === 0) {
    throw new Error('Project slug is required.');
  }

  if (!SLUG_PATTERN.test(normalizedValue)) {
    throw new Error(`Invalid project slug "${value}". Use a single lowercase slug like "my-app".`);
  }

  return normalizedValue;
}

export function createTemplateSelector(category: AppCategory, slug: string): string {
  return `${category}/${slug}`;
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
