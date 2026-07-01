import type { AppManifest } from '@ankhorage/contracts';
import type { AnkhCapabilityId, AnkhCommandDescriptor } from '@ankhorage/contracts/cli';

import {
  createManifestForSelector,
  listTemplateCatalog,
  resolveTemplateCatalogEntry,
  type TemplateCatalogEntry,
} from './catalog.js';
import type { TemplatesCommandContext, TemplatesCommandRunResult } from './commandContext.js';
import {
  TEMPLATES_CAPABILITIES,
  TEMPLATES_COMMAND_CATEGORY,
  TEMPLATES_PACKAGE_NAME,
  TEMPLATES_PACKAGE_VERSION,
} from './packageMetadata.js';
import {
  createProjectSeed,
  type CreateProjectSeedRequest,
  type ProjectSeedDependencies,
} from './projectSeed.js';
import type { StarterTemplateCategory } from './templates/starter/index.js';
import {
  deriveDisplayNameFromSlug,
  parseProjectSlug,
  parseTemplateCategory,
  parseTemplateSelector,
} from './templateSelector.js';

type TemplatesCommandName = 'create' | 'inspect' | 'list';

interface TemplatesCommandRunRequest {
  readonly context: TemplatesCommandContext;
}

type TemplatesCommandImplementation = (
  request: TemplatesCommandRunRequest,
  services: TemplatesCommandServices,
  argv: readonly string[],
) => Promise<TemplatesCommandRunResult>;

export interface TemplatesCommandDefinition {
  readonly capability: AnkhCapabilityId;
  readonly path: readonly [TemplatesCommandName];
  readonly standaloneName: TemplatesCommandName;
  readonly summary: string;
  readonly run: TemplatesCommandImplementation;
}

export interface TemplatesCommandInvocation {
  readonly argv: readonly string[];
  readonly command: TemplatesCommandDefinition;
  readonly context: TemplatesCommandContext;
}

interface TemplatesCommandServices {
  readonly createManifestForSelector: typeof createManifestForSelector;
  readonly createProjectSeed: (
    request: CreateProjectSeedRequest,
    dependencies?: Partial<ProjectSeedDependencies>,
  ) => Promise<{ readonly projectPath: string }>;
  readonly listTemplateCatalog: (
    category?: StarterTemplateCategory,
  ) => readonly TemplateCatalogEntry[];
  readonly resolveTemplateCatalogEntry: typeof resolveTemplateCatalogEntry;
}

export interface RunTemplatesCommandOptions {
  readonly services?: Partial<TemplatesCommandServices>;
  readonly runCommandImpl?: RunTemplatesCommandImpl;
}

export type RunTemplatesCommandImpl = (
  request: TemplatesCommandInvocation,
  options?: RunTemplatesCommandOptions,
) => Promise<TemplatesCommandRunResult>;

const COMMAND_CAPABILITIES = {
  list: TEMPLATES_CAPABILITIES[0],
  inspect: TEMPLATES_CAPABILITIES[1],
  create: TEMPLATES_CAPABILITIES[2],
} as const satisfies Record<TemplatesCommandName, AnkhCapabilityId>;

export const TEMPLATES_COMMANDS = [
  {
    standaloneName: 'list',
    path: ['list'],
    capability: COMMAND_CAPABILITIES.list,
    summary: 'List canonical template selectors from the published template catalog.',
    run: runListCommand,
  },
  {
    standaloneName: 'inspect',
    path: ['inspect'],
    capability: COMMAND_CAPABILITIES.inspect,
    summary: 'Inspect one canonical template selector and print its manifest metadata.',
    run: runInspectCommand,
  },
  {
    standaloneName: 'create',
    path: ['create'],
    capability: COMMAND_CAPABILITIES.create,
    summary: 'Create a manifest-first project seed from one canonical template selector.',
    run: runCreateCommand,
  },
] as const satisfies readonly TemplatesCommandDefinition[];

export async function runTemplatesCommand(
  request: TemplatesCommandInvocation,
  options: RunTemplatesCommandOptions = {},
): Promise<TemplatesCommandRunResult> {
  const services = createTemplatesCommandServices(options.services);
  const [firstArg] = request.argv;

  try {
    if (request.argv.length === 1 && firstArg !== undefined && isHelpToken(firstArg)) {
      request.context.writeStdout(renderCommandHelp(request.command));
      return { exitCode: 0 };
    }

    return await request.command.run(request, services, request.argv);
  } catch (error) {
    request.context.writeStderr(renderCommandFailure(request.command.standaloneName, error));
    return { exitCode: 1 };
  }
}

export function createProviderCommandDescriptors(): readonly AnkhCommandDescriptor[] {
  return TEMPLATES_COMMANDS.map((command) => ({
    capability: command.capability,
    path: command.path,
    summary: command.summary,
  }));
}

export function findTemplatesCommandByStandaloneName(
  value: string,
): TemplatesCommandDefinition | null {
  return TEMPLATES_COMMANDS.find((command) => command.standaloneName === value) ?? null;
}

export function renderRootHelp(version: string): string {
  const commandLines = TEMPLATES_COMMANDS.map(
    (command) => `  ${command.standaloneName.padEnd(8, ' ')} ${command.summary}`,
  ).join('\n');

  return [
    `@ankhorage/templates v${version}`,
    '',
    'Usage:',
    '  ankhorage-templates <command> [options]',
    `  ankh ${TEMPLATES_COMMAND_CATEGORY} <command> [options]`,
    '',
    'Commands:',
    commandLines,
    '',
    'Selector syntax:',
    '  Use canonical template selectors shaped as <category>/<templateId>.',
    '',
    'Project creation:',
    '  Create writes manifest-first project seeds only.',
    '',
  ].join('\n');
}

export function renderUnknownCommand(value: string): string {
  return [`Unknown templates command: ${value}`, '', 'Run ankhorage-templates --help', ''].join(
    '\n',
  );
}

function renderCommandHelp(command: TemplatesCommandDefinition): string {
  const usageLine =
    command.standaloneName === 'create'
      ? `  ankhorage-templates create <projectSlug> --template <category>/<templateId>`
      : command.standaloneName === 'inspect'
        ? `  ankhorage-templates inspect <category>/<templateId>`
        : '  ankhorage-templates list [--category <category>]';
  const ankhUsageLine =
    command.standaloneName === 'create'
      ? `  ankh ${TEMPLATES_COMMAND_CATEGORY} create <projectSlug> --template <category>/<templateId>`
      : command.standaloneName === 'inspect'
        ? `  ankh ${TEMPLATES_COMMAND_CATEGORY} inspect <category>/<templateId>`
        : `  ankh ${TEMPLATES_COMMAND_CATEGORY} list [--category <category>]`;

  return [
    command.summary,
    '',
    'Usage:',
    usageLine,
    ankhUsageLine,
    '',
    'Selector syntax:',
    '  Use canonical template selectors shaped as <category>/<templateId>.',
    '',
  ].join('\n');
}

function createTemplatesCommandServices(
  overrides: Partial<TemplatesCommandServices> = {},
): TemplatesCommandServices {
  return {
    createManifestForSelector: overrides.createManifestForSelector ?? createManifestForSelector,
    createProjectSeed: overrides.createProjectSeed ?? createProjectSeed,
    listTemplateCatalog: overrides.listTemplateCatalog ?? listTemplateCatalog,
    resolveTemplateCatalogEntry:
      overrides.resolveTemplateCatalogEntry ?? resolveTemplateCatalogEntry,
  };
}

function runListCommand(
  request: TemplatesCommandRunRequest,
  services: TemplatesCommandServices,
  argv: readonly string[],
): Promise<TemplatesCommandRunResult> {
  const category = parseListArguments(argv);
  const entries = services.listTemplateCatalog(category);

  request.context.writeStdout(renderTemplateList(entries));
  return Promise.resolve({ exitCode: 0 });
}

function runInspectCommand(
  request: TemplatesCommandRunRequest,
  services: TemplatesCommandServices,
  argv: readonly string[],
): Promise<TemplatesCommandRunResult> {
  const selector = parseInspectArguments(argv);
  const entry = services.resolveTemplateCatalogEntry(selector);
  const manifest = services.createManifestForSelector({
    selector,
    projectSlug: 'template-preview',
    displayName: 'Template Preview',
  });

  request.context.writeStdout(renderTemplateInspection(entry, manifest));
  return Promise.resolve({ exitCode: 0 });
}

async function runCreateCommand(
  request: TemplatesCommandRunRequest,
  services: TemplatesCommandServices,
  argv: readonly string[],
): Promise<TemplatesCommandRunResult> {
  const { projectSlug, selector } = parseCreateArguments(argv);
  const entry = services.resolveTemplateCatalogEntry(selector);
  const displayName = deriveDisplayNameFromSlug(projectSlug);
  const manifest = services.createManifestForSelector({
    selector,
    projectSlug,
    displayName,
  });
  const readmeText = createSeedReadme({
    displayName,
    projectSlug,
    selector: entry.selector,
  });

  const result = await services.createProjectSeed({
    cwd: request.context.cwd,
    projectSlug,
    readmeText,
    metadata: {
      package: TEMPLATES_PACKAGE_NAME,
      version: TEMPLATES_PACKAGE_VERSION,
      projectSlug,
      displayName,
      category: entry.category,
      templateId: entry.templateId,
      selector: entry.selector,
    },
    manifest,
  });

  request.context.writeStdout(renderCreateSuccess(result.projectPath));
  return { exitCode: 0 };
}

function parseListArguments(argv: readonly string[]): StarterTemplateCategory | undefined {
  if (argv.length === 0) {
    return undefined;
  }

  if (argv.length === 2 && argv[0] === '--category') {
    return parseTemplateCategory(argv[1] ?? '');
  }

  throw new Error('Templates list accepts only the optional --category <category> flag.');
}

function parseInspectArguments(argv: readonly string[]) {
  if (argv.length !== 1) {
    throw new Error('Templates inspect requires exactly one <category>/<templateId> selector.');
  }

  return parseTemplateSelector(argv[0] ?? '');
}

function parseCreateArguments(argv: readonly string[]): {
  readonly projectSlug: string;
  readonly selector: ReturnType<typeof parseTemplateSelector>;
} {
  const [rawProjectSlug, firstFlag, rawSelector] = argv;

  if (rawProjectSlug === undefined) {
    throw new Error(
      'Templates create requires <projectSlug> and --template <category>/<templateId>.',
    );
  }

  if (argv.length !== 3 || firstFlag !== '--template' || rawSelector === undefined) {
    throw new Error(
      'Templates create requires <projectSlug> and --template <category>/<templateId>.',
    );
  }

  return {
    projectSlug: parseProjectSlug(rawProjectSlug),
    selector: parseTemplateSelector(rawSelector),
  };
}

function renderTemplateList(entries: readonly TemplateCatalogEntry[]): string {
  const lines = entries.map(
    (entry) => `  ${entry.selector} - ${entry.label}: ${entry.description}`,
  );

  return ['Available templates:', '', ...lines, ''].join('\n');
}

function renderTemplateInspection(entry: TemplateCatalogEntry, manifest: AppManifest): string {
  return `${JSON.stringify(
    {
      selector: entry.selector,
      category: entry.category,
      templateId: entry.templateId,
      label: entry.label,
      description: entry.description,
      manifestVersion: manifest.metadata.version,
      manifest,
    },
    null,
    2,
  )}\n`;
}

function renderCreateSuccess(projectPath: string): string {
  return [
    `Created manifest-first project seed at ${projectPath}`,
    '',
    'Files:',
    '  ankh.config.json',
    '  ankh.template.json',
    '  README.md',
    '',
  ].join('\n');
}

function createSeedReadme(args: {
  readonly displayName: string;
  readonly projectSlug: string;
  readonly selector: string;
}): string {
  return [
    `# ${args.displayName}`,
    '',
    `Generated from \`@ankhorage/templates\` template \`${args.selector}\`.`,
    '',
    'This is a manifest-first Ankhorage project seed.',
    '',
    'Next extraction step: runnable app/workspace scaffolding.',
    '',
    `Project slug: \`${args.projectSlug}\``,
    '',
  ].join('\n');
}

function renderCommandFailure(commandName: TemplatesCommandName, error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  return [`Templates ${commandName} failed: ${message}`, ''].join('\n');
}

function isHelpToken(value: string): boolean {
  return value === '--help' || value === '-h' || value === 'help';
}
