import type {
  AnkhCommandExecutionContext,
  AnkhCommandExecutionRequest,
  AnkhRuntimeCommandProvider,
} from '@ankhorage/ankh';
import { describe, expect, mock, test } from 'bun:test';

import provider, { createTemplatesRuntimeProvider } from '../src/cli/index.js';
import { type RunTemplatesCommandImpl, TEMPLATES_COMMANDS } from '../src/commands.js';
import {
  TEMPLATES_CAPABILITIES,
  TEMPLATES_COMMAND_CATEGORY,
  TEMPLATES_PACKAGE_NAME,
  TEMPLATES_PACKAGE_VERSION,
} from '../src/packageMetadata.js';
import { createCapturedContext } from './testSupport.js';

describe('ankh provider', () => {
  test('publishes the expected runtime provider shape', () => {
    const expectedProvider = createTemplatesRuntimeProvider() satisfies AnkhRuntimeCommandProvider;

    expect(expectedProvider.id).toBe(TEMPLATES_PACKAGE_NAME);
    expect(expectedProvider.category).toBe(TEMPLATES_COMMAND_CATEGORY);
    expect(expectedProvider.version).toBe(TEMPLATES_PACKAGE_VERSION);
    expect(expectedProvider.capabilities).toEqual([...TEMPLATES_CAPABILITIES]);
    expect(expectedProvider.commands).toEqual(createRuntimeCommandDescriptors());
    expect(expectedProvider.handlers?.map((handler) => handler.path.join(' '))).toEqual(
      TEMPLATES_COMMANDS.map((command) => command.path.join(' ')),
    );
    expect(expectedProvider.handlers).toHaveLength(expectedProvider.commands.length);

    for (const command of expectedProvider.commands) {
      expect(
        expectedProvider.handlers?.filter(
          (handler) => handler.path.join(' ') === command.path.join(' '),
        ),
      ).toHaveLength(1);
    }

    for (const handler of expectedProvider.handlers ?? []) {
      expect(
        expectedProvider.commands.filter(
          (command) => command.path.join(' ') === handler.path.join(' '),
        ),
      ).toHaveLength(1);
    }
  });

  test('default export is the runtime provider', () => {
    expect(provider.category).toBe('templates');
    expect(provider.commands).toHaveLength(3);
    expect(provider.handlers).toHaveLength(3);
  });

  test('handlers delegate to the shared command runner', async () => {
    const runCommandImpl = mock<RunTemplatesCommandImpl>(() => Promise.resolve({ exitCode: 17 }));
    const runtimeProvider = createTemplatesRuntimeProvider({ runCommandImpl });
    const { context } = createCapturedContext();

    for (const command of TEMPLATES_COMMANDS) {
      const handler = runtimeProvider.handlers?.find(
        (candidate) => candidate.path.join(' ') === command.path.join(' '),
      );

      expect(handler).toBeDefined();
      if (handler === undefined) {
        throw new Error(`Missing handler for ${command.path.join(' ')}`);
      }

      const result = await handler.handler(
        createExecutionRequest({
          argv: command.path[0] === 'list' ? [] : ['games/chess'],
          category: runtimeProvider.category,
          capability: command.capability,
          context: {
            ...context,
            packageRegistry: {
              findByCategory() {
                return null;
              },
              hasCategory() {
                return false;
              },
              listPackages() {
                return [];
              },
            },
            providerRegistry: {
              findAllByCategory() {
                return [];
              },
              findByCategory() {
                return null;
              },
              hasCategory() {
                return false;
              },
              listCommands() {
                return [];
              },
              listProviders() {
                return [];
              },
              resolveCommand() {
                return null;
              },
            },
          },
          path: command.path,
          providerId: runtimeProvider.id,
          summary: command.summary,
        }),
      );

      expect(result?.exitCode).toBe(17);
    }

    expect(runCommandImpl.mock.calls).toHaveLength(TEMPLATES_COMMANDS.length);
    expect(runCommandImpl.mock.calls.map(([call]) => call.command.path.join(' '))).toEqual(
      TEMPLATES_COMMANDS.map((command) => command.path.join(' ')),
    );
  });
});

function createRuntimeCommandDescriptors() {
  return TEMPLATES_COMMANDS.map((command) => ({
    capability: command.capability,
    path: command.path,
    summary: command.summary,
  }));
}

function createExecutionRequest(args: {
  readonly argv: readonly string[];
  readonly category: string;
  readonly capability: (typeof TEMPLATES_CAPABILITIES)[number];
  readonly context: AnkhCommandExecutionContext;
  readonly path: readonly [string];
  readonly providerId: string;
  readonly summary: string;
}): AnkhCommandExecutionRequest {
  return {
    argv: args.argv,
    command: {
      category: args.category,
      capability: args.capability,
      packageName: TEMPLATES_PACKAGE_NAME,
      path: args.path,
      providerId: args.providerId,
      summary: args.summary,
    },
    provider: {
      discoveredPackage: {
        packageName: TEMPLATES_PACKAGE_NAME,
        packageJsonPath: '/tmp/package.json',
        packageRoot: '/tmp',
        source: 'workspace',
        metadata: {
          category: args.category,
          provider: './dist/cli/index.js',
          capabilities: [...TEMPLATES_CAPABILITIES],
        },
      },
      manifest: {
        id: args.providerId,
        category: args.category,
        version: TEMPLATES_PACKAGE_VERSION,
        capabilities: [...TEMPLATES_CAPABILITIES],
        commands: createRuntimeCommandDescriptors(),
      },
      providerModulePath: '/tmp/dist/cli/index.js',
      providerModuleUrl: 'file:///tmp/dist/cli/index.js',
      providerModuleDefaultExport: provider,
    },
    context: args.context,
  };
}
