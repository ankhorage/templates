import { describe, expect, test } from 'bun:test';

import {
  findTemplatesCommandByStandaloneName,
  runTemplatesCommand,
  TEMPLATES_COMMANDS,
} from '../src/commands.js';
import { createCapturedContext } from './testSupport.js';

describe('templates commands', () => {
  test('exposes the small command surface', () => {
    expect(TEMPLATES_COMMANDS.map((command) => command.path.join(' '))).toEqual([
      'list',
      'inspect',
      'create',
    ]);
  });

  test('lists available standalone templates', async () => {
    const capture = createCapturedContext();
    const result = await runCommand('list', [], capture.context);

    expect(result.exitCode).toBe(0);
    expect(capture.readStdout()).toBe(
      'Available templates:\n\n  education_learning/sharkprey - SharkPrey\n  lifestyle/stillpath - Stillpath\n',
    );
  });

  test('rejects unknown selectors without a default fallback', async () => {
    const capture = createCapturedContext();
    const result = await runCommand('inspect', ['games/example'], capture.context);

    expect(result.exitCode).toBe(1);
    expect(capture.readStderr()).toContain('does not expose any templates');
  });

  test('rejects a bare template slug', async () => {
    const capture = createCapturedContext();
    const result = await runCommand('inspect', ['example'], capture.context);

    expect(result.exitCode).toBe(1);
    expect(capture.readStderr()).toContain('Use the canonical <category>/<slug> format');
  });
});

async function runCommand(
  commandName: 'create' | 'inspect' | 'list',
  argv: readonly string[],
  context: Parameters<typeof runTemplatesCommand>[0]['context'],
) {
  const command = findTemplatesCommandByStandaloneName(commandName);
  if (command === null) throw new Error(`Unknown command in test: ${commandName}`);

  return runTemplatesCommand({ argv, command, context });
}
