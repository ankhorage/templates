import type { AnkhRuntimeCommandProvider } from '@ankhorage/ankh';

import {
  runTemplatesCommand,
  type RunTemplatesCommandImpl,
  type RunTemplatesCommandOptions,
  TEMPLATES_COMMANDS,
} from '../commands.js';
import {
  TEMPLATES_CAPABILITIES,
  TEMPLATES_COMMAND_CATEGORY,
  TEMPLATES_PACKAGE_NAME,
  TEMPLATES_PACKAGE_VERSION,
} from '../packageMetadata.js';

export interface CreateTemplatesRuntimeProviderOptions extends Omit<
  RunTemplatesCommandOptions,
  'runCommandImpl'
> {
  readonly runCommandImpl?: RunTemplatesCommandImpl;
}

export function createTemplatesRuntimeProvider(
  options: CreateTemplatesRuntimeProviderOptions = {},
): AnkhRuntimeCommandProvider {
  const runCommandImpl = options.runCommandImpl ?? runTemplatesCommand;

  return {
    id: TEMPLATES_PACKAGE_NAME,
    category: TEMPLATES_COMMAND_CATEGORY,
    version: TEMPLATES_PACKAGE_VERSION,
    capabilities: [...TEMPLATES_CAPABILITIES],
    commands: TEMPLATES_COMMANDS.map((command) => ({
      capability: command.capability,
      path: command.path,
      summary: command.summary,
    })),
    handlers: TEMPLATES_COMMANDS.map((command) => ({
      path: command.path,
      handler(request) {
        return runCommandImpl(
          {
            argv: request.argv,
            command,
            context: request.context,
          },
          options,
        );
      },
    })),
  } satisfies AnkhRuntimeCommandProvider;
}

const provider = createTemplatesRuntimeProvider();

export default provider;
