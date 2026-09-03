#!/usr/bin/env bun

import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

import { loadOwnerApis } from './owner-api.mjs';

/*** Validate and scaffold one ready authored manifest into the normal Templates variant layout. */
export async function scaffoldTemplate(input) {
  assertRecord(input, 'Scaffold input');
  for (const field of ['targetDirectory', 'category', 'templateId', 'label', 'description']) {
    assertNonEmptyString(input[field], field);
  }
  if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(input.templateId) ||
    ['default', 'starter'].includes(input.templateId)
  ) {
    throw new Error('templateId must be a non-reserved kebab-case identifier.');
  }
  assertRecord(input.manifest, 'manifest');

  const targetDirectory = resolve(input.targetDirectory);
  const packageManifest = JSON.parse(await readFile(join(targetDirectory, 'package.json'), 'utf8'));
  if (packageManifest.name !== '@ankhorage/templates') {
    throw new Error(
      'Template scaffolding is available only in the @ankhorage/templates repository.',
    );
  }
  if (input.manifest.metadata?.category !== input.category) {
    throw new Error('Scaffold category must match manifest.metadata.category.');
  }

  const owners = await loadOwnerApis(targetDirectory);
  const composition = owners.templates.validateTemplateManifest(input.manifest, 'release');
  if (composition.status !== 'ready') {
    throw new Error(
      `Manifest is not release-ready: ${composition.diagnostics.map((item) => item.message).join('; ')}`,
    );
  }
  const manifest = owners.templates.assertTemplateManifestReady(composition);
  const categoryDirectoryName = input.category.replaceAll('_', '-');
  const categoryDirectory = resolve(
    targetDirectory,
    'src/templates/starter/categories',
    categoryDirectoryName,
  );
  assertInside(targetDirectory, categoryDirectory);
  const variantDirectory = resolve(categoryDirectory, input.templateId);
  assertInside(categoryDirectory, variantDirectory);
  if (await pathExists(variantDirectory)) {
    throw new Error(
      `Template source already exists: ${relative(targetDirectory, variantDirectory)}`,
    );
  }

  const registryPath = resolve(targetDirectory, 'src/templates/starter/starter.registry.ts');
  const registrySource = await readFile(registryPath, 'utf8');
  const symbol = toPascalCase(input.templateId);
  const factoryBase = symbol.endsWith('Starter') ? symbol.slice(0, -'Starter'.length) : symbol;
  const factoryName = `create${factoryBase}StarterTemplate`;
  const registrySourceUpdated = updateRegistry(registrySource, {
    templateId: input.templateId,
    label: input.label,
    description: input.description,
    factoryName,
    category: input.category,
  });
  const files = createManifestSource({
    manifest,
    templateId: input.templateId,
    category: input.category,
    factoryName,
    symbol,
  });

  await mkdir(variantDirectory, { recursive: true });
  for (const [fileName, contents] of Object.entries(files)) {
    await writeFile(join(variantDirectory, fileName), contents);
  }
  await writeFile(registryPath, registrySourceUpdated);

  return {
    targetDirectory,
    registryPath: relative(targetDirectory, registryPath),
    createdFiles: Object.keys(files).map((fileName) =>
      relative(targetDirectory, join(variantDirectory, fileName)),
    ),
    factoryName,
  };
}

/*** Create standalone manifest source for one authored starter variant. */
function createManifestSource({ manifest, templateId, category, factoryName, symbol }) {
  const navigator = manifest.navigator;
  const screens = manifest.screens;
  const initialRouteName = navigator.initialRouteName || 'index';
  const routeNames = navigator.routes.map((route) => route.name);

  const screenIdProperties = routeNames.map((name) => `  ${name}: string;`).join('\n');
  const screenIdReturnValues = routeNames
    .map((name) => `    ${name}: \`\${idPrefix}-${name}\`,`)
    .join('\n');
  const routeFactories = navigator.routes
    .map(
      (route) => `      createRoute({
        name: '${escapeSingleQuoted(route.name)}',
        screenId: screenIds.${route.name},
        label: '${escapeSingleQuoted(route.label)}',
        icon: ${JSON.stringify(route.icon)},
      }),`,
    )
    .join('\n');

  const screenCreators = navigator.routes.map((route) => {
    const screen = screens[route.screenId];
    if (!screen) {
      throw new Error(`Screen not found for route: ${route.name} (${route.screenId})`);
    }

    const screenVar = `${route.name}Screen`;
    const rootId = `\`\${idPrefix}-${route.name}-screen\``;
    const childrenJson = JSON.stringify(screen.root.children, null, 2);
    const indentedChildren = childrenJson
      .split('\n')
      .map((line) => `      ${line}`)
      .join('\n');

    return `  const ${screenVar} = {
    id: screenIds.${route.name},
    name: ${JSON.stringify(screen.name)},
    title: ${JSON.stringify(screen.title)},
    description: ${JSON.stringify(screen.description)},
    root: {
      id: ${rootId},
      type: 'Screen',
      props: ${JSON.stringify(screen.root.props)},
      children: ${indentedChildren},
    },
  };`;
  });

  const screenReturns = routeNames
    .map((name) => `    [screenIds.${name}]: ${name}Screen,`)
    .join('\n');

  return `import type { AppManifest } from '@ankhorage/contracts';
import { resolveAuthFlow } from '@ankhorage/contracts/auth';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../../shared';
import { createRoute, createScreen, createScreenRoot, createZoraNode, type ZoraNode } from '../../../../shared';
import type { TemplateSeed } from '../../../starter.types';

export interface ${symbol}ScreenIds {
${screenIdProperties}
}

export function create${symbol}ScreenIds(idPrefix: string): ${symbol}ScreenIds {
  return {
${screenIdReturnValues}
  };
}

export function create${symbol}Navigator(
  screenIds: ${symbol}ScreenIds,
): AppManifest['navigator'] {
  return {
    type: '${navigator.type}',
    initialRouteName: '${navigator.initialRouteName}',
    routes: [
${routeFactories}
    ],
  };
}

export function create${symbol}Screens(
  idPrefix: string,
  screenIds: ${symbol}ScreenIds,
): AppManifest['screens'] {
${screenCreators.join('\n')}

  return {
${screenReturns}
  };
}

export function ${factoryName}(seed: TemplateSeed): AppManifest {
  const idPrefix = \`\${seed.category}-${templateId}\`;
  const theme = createTheme(seed);
  const screenIds = create${symbol}ScreenIds(idPrefix);
  const manifest = createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: create${symbol}Navigator(screenIds),
    screens: create${symbol}Screens(idPrefix, screenIds),
  });

  const auth = manifest.infra.auth;
  if (auth === undefined) {
    return manifest;
  }

  return {
    ...manifest,
    infra: {
      ...manifest.infra,
      auth: {
        ...auth,
        flow: {
          ...resolveAuthFlow(auth.flow),
          postSignInRoute: '${initialRouteName}',
        },
      },
    },
  };
}
`;
}

/*** Add one stable import and definition to the starter registry. */
function updateRegistry(source, definition) {
  const importLine = `import { ${definition.factoryName} } from './categories/${definition.category.replaceAll('_', '-')}/${definition.templateId}/manifest';`;
  if (source.includes(`id: '${definition.templateId}'`) || source.includes(importLine)) {
    throw new Error(`Template is already registered: ${definition.templateId}`);
  }
  const exportMarker = '\nexport const ';
  const exportIndex = source.indexOf(exportMarker);
  if (exportIndex < 0) {
    throw new Error('Registry does not expose its canonical template array.');
  }
  const prefixLines = source.slice(0, exportIndex).trimEnd().split('\n');
  const relativeImports = [
    ...prefixLines.filter((line) => /^import .* from '\.\//u.test(line)),
    importLine,
  ].sort((left, right) => left.localeCompare(right));
  const preservedPrefix = prefixLines.filter((line) => !/^import .* from '\.\//u.test(line));
  const withImport = `${[...preservedPrefix, ...relativeImports].join('\n')}\n${source.slice(exportIndex + 1)}`;
  const closeMarker = '] satisfies readonly CategoryStarterTemplateDefinition[];';
  const closeIndex = withImport.indexOf(closeMarker);
  if (closeIndex < 0) {
    throw new Error('Registry is missing its canonical definition-array terminator.');
  }
  const entry = `  {
    id: '${escapeSingleQuoted(definition.templateId)}',
    label: '${escapeSingleQuoted(definition.label)}',
    description: '${escapeSingleQuoted(definition.description)}',
    create: ${definition.factoryName},
  },
`;
  return `${withImport.slice(0, closeIndex)}${entry}${withImport.slice(closeIndex)}`;
}
function createZoraDesignerArtifact({ manifest, templateId, category, navigator }) {
  const theme = manifest.themes[0];
  const primaryColor = theme?.light?.primaryColor || theme?.dark?.primaryColor || '#000000';
  const harmony = theme?.light?.harmony || theme?.dark?.harmony || 'analogous';
  const routeNames = navigator.routes.map((route) => route.name);
  const evidenceEntries = routeNames
    .map(
      (name, index) => `          {
            'id': 'concept-${name}',
            'kind': 'generated',
            'path': 'concepts/${templateId}/${name}.png',
            'dimensions': [853, 1844],
            'order': ${index + 1},
          },`,
    )
    .join('\n');
  const screenEntries = routeNames
    .map(
      (name) => `      {
        'id': '${name}',
        'purpose': '${escapeSingleQuoted(manifest.screens[navigator.routes.find((r) => r.name === name)?.screenId]?.description || name)}',
        'evidenceId': 'concept-${name}',
        'route': '${name}',
      },`,
    )
    .join('\n');

  return `---
{
  'schema': 'zora-designer/v1',
  'documentKind': 'configuration',
  'status': 'resolved',
  'language': 'en',
  'source':
    {
      'mode': 'template',
      'inputs': ['interactive ${category.replaceAll('_', '-')} brief', 'generated concept screen series'],
      'evidence':
        [
${evidenceEntries}
        ],
      'capabilityLimitations': ['Concept images are not runtime captures.'],
    },
  'config':
    {
      'category': { 'requested': '${category}', 'resolved': '${category}', 'origin': 'user' },
      'intent': { 'value': '${escapeSingleQuoted(manifest.metadata?.name || templateId)}', 'origin': 'user' },
      'platform': { 'value': '${navigator.type === 'tabs' ? 'mobile' : 'responsive'}', 'origin': 'user' },
      'theme':
        {
          'primary': { 'value': '${primaryColor}', 'origin': 'user' },
          'harmony': { 'value': '${harmony}', 'origin': 'user' },
        },
      'advancedProfile':
        {
          'density': { 'value': 'compact', 'origin': 'category-default' },
          'shape': { 'value': 'neutral', 'origin': 'category-default' },
        },
    },
  'derivation':
    {
      'provenance': ['@ankhorage/templates', '@ankhorage/zora'],
      'diagnostics': [],
      'assumptions': [],
      'unsupported': [],
      'ownerRuntimeDrift': [],
    },
  'components':
    {
      'recipeDecisions':
        {
          'Screen': '${navigator.type === 'tabs' ? 'narrow scrollable mobile screen' : 'responsive screen'}',
          'SectionHeader': 'screen hierarchy',
          'Panel': 'grouped content surface',
          'Card': 'summary and activity item',
        },
      'stateRequirements':
        [
          'loading',
          'empty',
          'partial',
          'error',
          'offline',
          'success',
          'disabled',
          'pressed',
          'focus',
          'selected',
        ],
    },
  'screens':
    [
${screenEntries}
    ],
  'validation':
    {
      'scope': 'composition',
      'status': 'pass',
      'gates':
        [
          { 'name': 'owner-compilation', 'status': 'pass' },
          { 'name': 'manifest-validation', 'status': 'pass' },
          { 'name': 'metadata-elements', 'status': 'pass' },
        ],
      'applicationGate': 'pass',
      'ownerRuntimeDrift': [],
      'blockers': [],
    },
  'audit':
    {
      'status': 'not-run',
      'score': null,
      'coverage': null,
      'applicableWeight': null,
      'assessedWeight': null,
      'rounding': 'half-up',
      'confidence': { 'value': null, 'label': null },
      'possibleRange': { 'lower': null, 'upper': null },
      'releaseGate': 'not-assessable',
      'releaseGateCriteria': [],
      'ruleResults': [],
      'findings': [],
      'risks': [],
      'passedRules': [],
      'notAssessable': [],
    },
  'openDecisions': [],
}
---

# ZORA Designer

## Design direction

## Resolved decisions and origins

## Color system

## Typography

## Layout, shape, elevation, and motion

## Component and interaction states

## Screen specifications

## Accessibility and validation

## Audit summary

## Findings and remediation

## Risks needing verification

## Not assessable

## Open decisions

## User notes

${manifest.metadata?.name || templateId} ${navigator.type} starter: ${navigator.routes.map((r) => r.label).join(', ')}.
`;
}

/*** Create standalone manifest source for one authored starter variant. */
function createManifestSource({ manifest, templateId, category, factoryName, symbol }) {
  const navigator = manifest.navigator;
  const screens = manifest.screens;
  const initialRouteName = navigator.initialRouteName || 'index';
  const routeNames = navigator.routes.map((route) => route.name);

  const screenIdProperties = routeNames.map((name) => `  ${name}: string;`).join('\n');
  const screenIdReturnValues = routeNames
    .map((name) => `    ${name}: \`\${idPrefix}-${name}\`,`)
    .join('\n');
  const routeFactories = navigator.routes
    .map(
      (route) => `      createRoute({
        name: '${escapeSingleQuoted(route.name)}',
        screenId: screenIds.${route.name},
        label: '${escapeSingleQuoted(route.label)}',
        icon: ${JSON.stringify(route.icon)},
      }),`,
    )
    .join('\n');

  const screenCreators = navigator.routes.map((route) => {
    const screen = screens[route.screenId];
    if (!screen) {
      throw new Error(`Screen not found for route: ${route.name} (${route.screenId})`);
    }

    const screenVar = `${route.name}Screen`;
    const rootId = `\`\${idPrefix}-${route.name}-screen\``;
    const childrenJson = JSON.stringify(screen.root.children, null, 2);
    const indentedChildren = childrenJson
      .split('\n')
      .map((line) => `      ${line}`)
      .join('\n');

    return `  const ${screenVar} = {
    id: screenIds.${route.name},
    name: ${JSON.stringify(screen.name)},
    title: ${JSON.stringify(screen.title)},
    description: ${JSON.stringify(screen.description)},
    root: {
      id: ${rootId},
      type: 'Screen',
      props: ${JSON.stringify(screen.root.props)},
      children: ${indentedChildren},
    },
  };`;
  });

  const screenReturns = routeNames
    .map((name) => `    [screenIds.${name}]: ${name}Screen,`)
    .join('\n');

  return `import type { AppManifest } from '@ankhorage/contracts';
import { resolveAuthFlow } from '@ankhorage/contracts/auth';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../../shared';
import { createRoute, createScreen, createScreenRoot, createZoraNode, type ZoraNode } from '../../../../shared';
import type { TemplateSeed } from '../../../starter.types';

export interface ${symbol}ScreenIds {
${screenIdProperties}
}

export function create${symbol}ScreenIds(idPrefix: string): ${symbol}ScreenIds {
  return {
${screenIdReturnValues}
  };
}

export function create${symbol}Navigator(
  screenIds: ${symbol}ScreenIds,
): AppManifest['navigator'] {
  return {
    type: '${navigator.type}',
    initialRouteName: '${navigator.initialRouteName}',
    routes: [
${routeFactories}
    ],
  };
}

export function create${symbol}Screens(
  idPrefix: string,
  screenIds: ${symbol}ScreenIds,
): AppManifest['screens'] {
${screenCreators.join('\n')}

  return {
${screenReturns}
  };
}

export function ${factoryName}(seed: TemplateSeed): AppManifest {
  const idPrefix = \`\${seed.category}-${templateId}\`;
  const theme = createTheme(seed);
  const screenIds = create${symbol}ScreenIds(idPrefix);
  const manifest = createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: create${symbol}Navigator(screenIds),
    screens: create${symbol}Screens(idPrefix, screenIds),
  });

  const auth = manifest.infra.auth;
  if (auth === undefined) {
    return manifest;
  }

  return {
    ...manifest,
    infra: {
      ...manifest.infra,
      auth: {
        ...auth,
        flow: {
          ...resolveAuthFlow(auth.flow),
          postSignInRoute: '${initialRouteName}',
        },
      },
    },
  };
}
`;
}

function buildScreenIdMap(routes, templateId, category) {
  const map = new Map();
  for (const route of routes) {
    if (route.screenId) {
      map.set(route.screenId, route.name);
    }
  }
  return map;
}

function createRoutesSource({ navigator, screenIdMap, symbol }) {
  const routeNames = navigator.routes.map((route) => route.name);
  const screenIdProperties = routeNames.map((name) => `  ${name}: string;`).join('\n');
  const screenIdReturnValues = routeNames
    .map((name) => `    ${name}: \`\${idPrefix}-${name}\`,`)
    .join('\n');
  const routeFactories = navigator.routes
    .map(
      (route) => `      createRoute({
        name: '${escapeSingleQuoted(route.name)}',
        screenId: screenIds.${route.name},
        label: '${escapeSingleQuoted(route.label)}',
        icon: ${JSON.stringify(route.icon)},
      }),`,
    )
    .join('\n');

  return `import type { AppManifest } from '@ankhorage/contracts';

import { createRoute } from '../../../../shared';

export interface ${symbol}ScreenIds {
${screenIdProperties}
}

export function create${symbol}ScreenIds(idPrefix: string): ${symbol}ScreenIds {
  return {
${screenIdReturnValues}
  };
}

export function create${symbol}Navigator(
  screenIds: ${symbol}ScreenIds,
): AppManifest['navigator'] {
  return {
    type: '${navigator.type}',
    initialRouteName: '${navigator.initialRouteName}',
    routes: [
${routeFactories}
    ],
  };
}
`;
}

function createScreensSource({ manifest, navigator, screenIdMap, symbol, templateId }) {
  const routeNames = navigator.routes.map((route) => route.name);
  const screenProperties = routeNames.map((name) => `  ${name}: string;`).join('\n');

  const screenCreators = navigator.routes.map((route) => {
    const screen = manifest.screens[route.screenId];
    if (!screen) {
      throw new Error(`Screen not found for route: ${route.name} (${route.screenId})`);
    }

    const screenVar = `${route.name}Screen`;
    const rootId = `\`\${idPrefix}-${route.name}-screen\``;
    const childrenJson = JSON.stringify(screen.root.children, null, 2);
    const indentedChildren = childrenJson
      .split('\n')
      .map((line) => `      ${line}`)
      .join('\n');

    return `  const ${screenVar} = {
    id: screenIds.${route.name},
    name: ${JSON.stringify(screen.name)},
    title: ${JSON.stringify(screen.title)},
    description: ${JSON.stringify(screen.description)},
    root: {
      id: ${rootId},
      type: 'Screen',
      props: ${JSON.stringify(screen.root.props)},
      children: ${indentedChildren},
    },
  };`;
  });

  const screenReturns = routeNames
    .map((name) => `    [screenIds.${name}]: ${name}Screen,`)
    .join('\n');

  return `import type { AppManifest } from '@ankhorage/contracts';

export function create${symbol}Screens(
  idPrefix: string,
  screenIds: {
${screenProperties}
  },
): AppManifest['screens'] {
${screenCreators.join('\n')}

  return {
${screenReturns}
  };
}
`;
}

function createTemplateSource({ manifest, navigator, templateId, category, factoryName, symbol }) {
  const initialRouteName = navigator.initialRouteName || 'index';

  return `import type { AppManifest } from '@ankhorage/contracts';
import { resolveAuthFlow } from '@ankhorage/contracts/auth';

import { DEFAULT_TEMPLATE_VERSION } from '../../../../../internal/defaults';
import { createManifestShell, createTheme } from '../../../../shared';
import type { TemplateSeed } from '../../../starter.types';
import type { ${symbol}ScreenIds } from './routes';
import { create${symbol}Navigator, create${symbol}ScreenIds } from './routes';
import { create${symbol}Screens } from './screens';

export function ${factoryName}(seed: TemplateSeed): AppManifest {
  const idPrefix = \`\${seed.category}-${templateId}\`;
  const theme = createTheme(seed);
  const screenIds = create${symbol}ScreenIds(idPrefix);
  const manifest = createManifestShell({
    seed,
    theme,
    version: seed.version ?? DEFAULT_TEMPLATE_VERSION,
    navigator: create${symbol}Navigator(screenIds),
    screens: create${symbol}Screens(idPrefix, screenIds),
  });

  const auth = manifest.infra.auth;
  if (auth === undefined) {
    return manifest;
  }

  return {
    ...manifest,
    infra: {
      ...manifest.infra,
      auth: {
        ...auth,
        flow: {
          ...resolveAuthFlow(auth.flow),
          postSignInRoute: '${initialRouteName}',
        },
      },
    },
  };
}
`;
}

/*** Add one stable import and definition to an existing category registry. */
function updateCategoryRegistry(source, definition) {
  const importLine = `import { ${definition.factoryName} } from './${definition.templateId}';`;
  if (source.includes(`id: '${definition.templateId}'`) || source.includes(importLine)) {
    throw new Error(`Template is already registered: ${definition.templateId}`);
  }
  const exportMarker = '\nexport const ';
  const exportIndex = source.indexOf(exportMarker);
  if (exportIndex < 0) {
    throw new Error('Category registry does not expose its canonical template array.');
  }
  const prefixLines = source.slice(0, exportIndex).trimEnd().split('\n');
  const relativeImports = [
    ...prefixLines.filter((line) => /^import .* from '\.\//u.test(line)),
    importLine,
  ].sort((left, right) => left.localeCompare(right));
  const preservedPrefix = prefixLines.filter((line) => !/^import .* from '\.\//u.test(line));
  const withImport = `${[...preservedPrefix, ...relativeImports].join('\n')}\n${source.slice(exportIndex + 1)}`;
  const closeMarker = '] satisfies readonly CategoryStarterTemplateDefinition[];';
  const closeIndex = withImport.indexOf(closeMarker);
  if (closeIndex < 0) {
    throw new Error('Category registry is missing its canonical definition-array terminator.');
  }
  const entry = `  {
    id: '${escapeSingleQuoted(definition.templateId)}',
    label: '${escapeSingleQuoted(definition.label)}',
    description: '${escapeSingleQuoted(definition.description)}',
    create: ${definition.factoryName},
  },
`;
  return `${withImport.slice(0, closeIndex)}${entry}${withImport.slice(closeIndex)}`;
}

/*** Convert kebab-case identifiers to a PascalCase source symbol. */
function toPascalCase(value) {
  return value
    .split('-')
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))
    .join('');
}

/*** Escape content placed in generated single-quoted TypeScript strings. */
function escapeSingleQuoted(value) {
  return value.replaceAll('\\', '\\\\').replaceAll("'", "\\'");
}

/*** Assert that a resolved output remains inside its declared owner directory. */
function assertInside(parentDirectory, childPath) {
  const relativePath = relative(parentDirectory, childPath);
  if (relativePath === '' || relativePath.startsWith(`..${sep}`) || relativePath === '..') {
    throw new Error(`Scaffold path escapes its owner directory: ${childPath}`);
  }
}

/*** Return whether a filesystem path already exists. */
async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return false;
    throw error;
  }
}

/*** Require a non-array object input. */
function assertRecord(value, label) {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
}

/*** Require a non-empty string input field. */
function assertNonEmptyString(value, label) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

/*** Run deterministic Templates source scaffolding from one JSON input. */
async function main() {
  const [inputPath] = process.argv.slice(2);
  if (!inputPath) throw new Error('Usage: scaffold-template.mjs <scaffold-input.json>');
  const input = JSON.parse(await readFile(inputPath, 'utf8'));
  console.log(JSON.stringify(await scaffoldTemplate(input), null, 2));
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
