import type { TemplatesCommandContext } from '../src/commandContext.js';

export interface CapturedContext {
  readonly context: TemplatesCommandContext;
  readStdout(): string;
  readStderr(): string;
}

export function createCapturedContext(
  args: {
    readonly cwd?: string;
    readonly version?: string;
  } = {},
): CapturedContext {
  let stdout = '';
  let stderr = '';

  return {
    context: {
      cwd: args.cwd ?? process.cwd(),
      env: process.env,
      version: args.version ?? 'test-version',
      writeStdout(text: string) {
        stdout += text;
      },
      writeStderr(text: string) {
        stderr += text;
      },
    },
    readStdout() {
      return stdout;
    },
    readStderr() {
      return stderr;
    },
  };
}
