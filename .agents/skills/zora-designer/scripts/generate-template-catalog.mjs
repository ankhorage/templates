#!/usr/bin/env bun

import { access, readdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import { APP_CATEGORIES } from '@ankhorage/contracts';

const CATEGORY_ROOT = 'src/templates/categories';

export async function generateTemplateCatalog(targetDirectory = process.cwd()) {
  const root = resolve(targetDirectory);
  const categoriesRoot = join(root, CATEGORY_ROOT);
  const definitions = [];

  for (const categoryEntry of await readDirectories(categoriesRoot)) {
    const category = categoryEntry.name.replaceAll('-', '_');
    if (!APP_CATEGORIES.includes(category)) {
      throw new Error(`Unknown app category directory: ${categoryEntry.name}`);
    }

    const categoryRoot = join(categoriesRoot, categoryEntry.name);
    for (const templateEntry of await readDirectories(categoryRoot)) {
      const manifestPath = join(categoryRoot, templateEntry.name, 'createAppManifest.ts');
      if (!(await pathExists(manifestPath))) continue;
      definitions.push({
        category,
        categoryDirectory: categoryEntry.name,
        slug: templateEntry.name,
      });
    }
  }

  definitions.sort((left, right) =>
    `${left.category}/${left.slug}`.localeCompare(`${right.category}/${right.slug}`),
  );

  const imports = definitions
    .map(
      (definition, index) =>
        `import createAppManifest${index} from './categories/${definition.categoryDirectory}/${definition.slug}/createAppManifest';`,
    )
    .join('\n');
  const entries = definitions
    .map(
      (definition, index) => `  {
    category: '${definition.category}',
    slug: '${definition.slug}',
    sourceRoot: '${CATEGORY_ROOT}/${definition.categoryDirectory}/${definition.slug}',
    createAppManifest: createAppManifest${index},
  },`,
    )
    .join('\n');

  const source = `${imports}${imports ? '\n\n' : ''}import type { TemplateDefinition } from './catalog';

export const TEMPLATE_DEFINITIONS = [
${entries}${entries ? '\n' : ''}] as const satisfies readonly TemplateDefinition[];
`;

  const outputPath = join(root, 'src/templates/catalog.generated.ts');
  await writeFile(outputPath, source, 'utf8');
  return { outputPath, templateCount: definitions.length };
}

async function readDirectories(directory) {
  return (await readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name));
}

async function pathExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

if (import.meta.main) {
  const targetDirectory = process.argv[2] ?? process.cwd();
  const result = await generateTemplateCatalog(targetDirectory);
  console.log(`Generated ${result.templateCount} template catalog entries.`);
}
