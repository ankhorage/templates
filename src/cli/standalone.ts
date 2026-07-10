#!/usr/bin/env bun

import type { TemplatesCommandContext, TemplatesCommandRunResult } from '../commandContext.js';
import { createDefaultCommandContext } from '../commandContext.js';
import {
  findTemplatesCommandByStandaloneName,
  renderRootHelp,
  renderUnknownCommand,
  runTemplatesCommand,
  type RunTemplatesCommandImpl,
  type RunTemplatesCommandOptions,
} from '../commands.js';

export interface TemplatesCliOptions extends Omit<RunTemplatesCommandOptions, 'runCommandImpl'> {
  readonly context?: TemplatesCommandContext;
  readonly runCommandImpl?: RunTemplatesCommandImpl;
}

export async function runCli(
  argv: readonly string[],
  options: TemplatesCliOptions = {},
): Promise<TemplatesCommandRunResult> {
  const context = options.context ?? createDefaultCommandContext();
  const runCommand = options.runCommandImpl ?? runTemplatesCommand;
  const [firstToken, ...restTokens] = argv;

  if (firstToken === undefined || isHelpToken(firstToken)) {
    context.writeStdout(renderRootHelp(context.version));
    return { exitCode: 0 };
  }

  if (isVersionToken(firstToken)) {
    context.writeStdout(`${context.version}\n`);
    return { exitCode: 0 };
  }

  const command = findTemplatesCommandByStandaloneName(firstToken);
  if (command === null) {
    context.writeStderr(renderUnknownCommand(firstToken));
    return { exitCode: 1 };
  }

  return runCommand(
    {
      argv: restTokens,
      command,
      context,
    },
    options,
  );
}

function isHelpToken(value: string): boolean {
  return value === '--help' || value === '-h' || value === 'help';
}

function isVersionToken(value: string): boolean {
  return value === '--version' || value === '-v' || value === 'version';
}

if (import.meta.main) {
  const result = await runCli(process.argv.slice(2));
  process.exit(result.exitCode);
}
