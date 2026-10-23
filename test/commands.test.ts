import { describe, expect, mock, test } from 'bun:test';

import type { CreateProjectSeedRequest } from '../src/projectSeed.js';
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
      'Available templates:\n\n  books_reading/reader - Reeda\n  education_learning/sharkprey - SharkPrey\n  lifestyle/stillpath - Stillpath\n  social_community/chat - Close\n',
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

  test('creates project display names with every slug word capitalized', async () => {
    const capture = createCapturedContext();
    const createProjectSeed = mock(async (request: CreateProjectSeedRequest) => {
      expect(request.metadata.displayName).toBe('Chess Trainer');
      expect(request.readmeText).toContain('# Chess Trainer');
      return { projectPath: '/projects/chess-trainer', createdFiles: [] };
    });
    const command = findTemplatesCommandByStandaloneName('create');
    if (command === null) throw new Error('Create command is unavailable.');

    const result = await runTemplatesCommand(
      {
        argv: ['chess-trainer', '--template', 'social_community/chat'],
        command,
        context: capture.context,
      },
      { services: { createProjectSeed } },
    );

    expect(result.exitCode).toBe(0);
    expect(createProjectSeed).toHaveBeenCalledTimes(1);
    expect(capture.readStdout()).toContain('/projects/chess-trainer');
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
