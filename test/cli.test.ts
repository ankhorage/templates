import { describe, expect, mock, test } from 'bun:test';

import packageJson from '../package.json';
import { runCli } from '../src/cli/standalone.js';
import type { RunTemplatesCommandImpl } from '../src/commands.js';
import { createCapturedContext } from './testSupport.js';

describe('standalone cli', () => {
  test('prints help with no args', async () => {
    const capture = createCapturedContext();
    const result = await runCli([], { context: capture.context });

    expect(result.exitCode).toBe(0);
    expect(capture.readStdout()).toContain('@ankhorage/templates');
    expect(capture.readStdout()).toContain('ankhorage-templates <command>');
  });

  test('prints version', async () => {
    const capture = createCapturedContext({ version: packageJson.version });
    const result = await runCli(['--version'], { context: capture.context });

    expect(result.exitCode).toBe(0);
    expect(capture.readStdout()).toBe(`${packageJson.version}\n`);
  });

  test('lists the currently empty standalone catalog', async () => {
    const capture = createCapturedContext();
    const result = await runCli(['list'], { context: capture.context });

    expect(result.exitCode).toBe(0);
    expect(capture.readStdout()).toContain('Available templates:');
    expect(capture.readStdout()).not.toContain('/default');
  });

  test('delegates commands to the shared runner', async () => {
    const capture = createCapturedContext();
    const runCommandImpl = mock<RunTemplatesCommandImpl>(() => Promise.resolve({ exitCode: 9 }));
    const result = await runCli(['inspect', 'games/example'], {
      context: capture.context,
      runCommandImpl,
    });

    expect(result.exitCode).toBe(9);
    expect(runCommandImpl.mock.calls[0]?.[0].command.path).toEqual(['inspect']);
  });
});
