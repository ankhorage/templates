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
    expect(capture.readStderr()).toBe('');
  });

  test('prints version', async () => {
    const capture = createCapturedContext({ version: packageJson.version });

    const result = await runCli(['--version'], { context: capture.context });

    expect(result.exitCode).toBe(0);
    expect(capture.readStdout()).toBe(`${packageJson.version}\n`);
  });

  test('lists templates through the shared command runner', async () => {
    const capture = createCapturedContext();

    const result = await runCli(['list'], { context: capture.context });

    expect(result.exitCode).toBe(0);
    expect(capture.readStdout()).toContain('Available templates:');
    expect(capture.readStdout()).toContain('games/chess');
    expect(capture.readStdout()).toContain('fallback/default');
  });

  test('delegates commands to the shared runner', async () => {
    const capture = createCapturedContext();
    const runCommandImpl = mock<RunTemplatesCommandImpl>(() => Promise.resolve({ exitCode: 9 }));

    const result = await runCli(['inspect', 'games/chess'], {
      context: capture.context,
      runCommandImpl,
    });

    expect(result.exitCode).toBe(9);
    expect(runCommandImpl.mock.calls).toHaveLength(1);
    expect(runCommandImpl.mock.calls[0]?.[0].command.path).toEqual(['inspect']);
    expect(runCommandImpl.mock.calls[0]?.[0].argv).toEqual(['games/chess']);
  });

  test('returns non-zero for unknown commands', async () => {
    const capture = createCapturedContext();

    const result = await runCli(['unknown'], { context: capture.context });

    expect(result.exitCode).toBe(1);
    expect(capture.readStderr()).toContain('Unknown templates command: unknown');
  });
});
