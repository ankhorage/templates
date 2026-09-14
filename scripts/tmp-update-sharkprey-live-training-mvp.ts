import { readFile, writeFile } from 'node:fs/promises';

async function replaceExact(path: string, from: string, to: string): Promise<void> {
  const source = await readFile(path, 'utf8');
  if (!source.includes(from)) throw new Error(`Missing replacement target in ${path}`);
  await writeFile(path, source.replace(from, to));
}

const manifestPath = 'src/templates/categories/education-learning/sharkprey/createAppManifest.ts';
const testPath = 'test/sharkprey-api.test.ts';

await replaceExact(manifestPath, "            path: 'task.previousAction',", "            path: 'task.historyText',");
await replaceExact(testPath, "    path: 'task.previousAction',", "    path: 'task.historyText',");

const currentLoader = "          input: { limit: { kind: 'literal', value: 1 } },";
const liveLoader = `          input: {
            gameCategory: { kind: 'literal', value: 'mtt' },
            tableSize: { kind: 'literal', value: '9max' },
            street: { kind: 'literal', value: 'preflop' },
            limit: { kind: 'literal', value: 1 },
          },`;
await replaceExact(manifestPath, currentLoader, liveLoader);
await replaceExact(testPath, "    input: { limit: { kind: 'literal', value: 1 } },", `    input: {
      gameCategory: { kind: 'literal', value: 'mtt' },
      tableSize: { kind: 'literal', value: '9max' },
      street: { kind: 'literal', value: 'preflop' },
      limit: { kind: 'literal', value: 1 },
    },`);

await replaceExact(
  manifestPath,
  `                    {
                      name: 'limit',
                      location: 'query',
                      schema: { type: 'integer' },
                    },`,
  `                    {
                      name: 'gameCategory',
                      location: 'query',
                      schema: { type: 'string' },
                    },
                    {
                      name: 'tableSize',
                      location: 'query',
                      schema: { type: 'string' },
                    },
                    {
                      name: 'street',
                      location: 'query',
                      schema: { type: 'string' },
                    },
                    {
                      name: 'limit',
                      location: 'query',
                      schema: { type: 'integer' },
                    },`,
);

await replaceExact(
  manifestPath,
  `                        {
                          value: 'ring',
                          label: 'Ring Game',
                          iconSource: {
                            mediaId: 'sharkprey-chip-icon',
                          },
                        },`,
  `                        {
                          value: 'cash',
                          label: 'Cash Game',
                          iconSource: {
                            mediaId: 'sharkprey-chip-icon',
                          },
                          disabled: true,
                        },`,
);
await replaceExact(
  manifestPath,
  `                        {
                          value: 'sng',
                          label: 'Sit’n’Go',
                          iconSource: {
                            mediaId: 'sharkprey-timer-icon',
                          },
                        },`,
  `                        {
                          value: 'sng',
                          label: 'Sit’n’Go',
                          iconSource: {
                            mediaId: 'sharkprey-timer-icon',
                          },
                          disabled: true,
                        },`,
);
await replaceExact(manifestPath, "                          value: 'six',", "                          value: '6max',");
await replaceExact(manifestPath, "                          value: 'nine',", "                          value: '9max',");
await replaceExact(
  manifestPath,
  `                          iconSource: {
                            mediaId: 'sharkprey-players-two-icon',
                          },
                        },
                        {
                          value: '9max',`,
  `                          iconSource: {
                            mediaId: 'sharkprey-players-two-icon',
                          },
                          disabled: true,
                        },
                        {
                          value: '9max',`,
);
await replaceExact(manifestPath, "                      defaultValue: 'nine',", "                      defaultValue: '9max',");

await replaceExact(
  manifestPath,
  `                        {
                          value: 'adaptive',
                          label: 'Adaptive mix',
                          description: 'Targets the spots that will improve your game fastest.',
                          iconSource: {
                            mediaId: 'sharkprey-target-icon',
                          },
                        },`,
  `                        {
                          value: 'preflop',
                          label: 'Preflop fundamentals',
                          description: 'Curated 9-max MTT spots before the flop.',
                          iconSource: {
                            mediaId: 'sharkprey-target-icon',
                          },
                        },`,
);
await replaceExact(manifestPath, "                      defaultValue: 'adaptive',", "                      defaultValue: 'preflop',");
await replaceExact(
  manifestPath,
  `                        {
                          value: 'ten',
                          label: '10 hands',
                          description: 'About 5 minutes',
                          iconSource: {
                            mediaId: 'sharkprey-history-icon',
                          },
                        },`,
  `                        {
                          value: 'one',
                          label: '1 hand',
                          description: 'Quick practice',
                          iconSource: {
                            mediaId: 'sharkprey-history-icon',
                          },
                        },`,
);
await replaceExact(manifestPath, "                      defaultValue: 'ten',", "                      defaultValue: 'one',");

const testAnchor = `  const screen = requireScreen(manifest, 'training-setup');
  expect(findNode(screen.root, 'setup-start').props).not.toHaveProperty('onPress');
});`;
const testReplacement = `  const screen = requireScreen(manifest, 'training-setup');
  expect(findNode(screen.root, 'setup-start').props).not.toHaveProperty('onPress');
  expect(findNode(screen.root, 'setup-game').props).toMatchObject({
    defaultValue: 'mtt',
    options: [
      { value: 'cash', disabled: true },
      { value: 'sng', disabled: true },
      { value: 'mtt' },
    ],
  });
  expect(findNode(screen.root, 'setup-table').props).toMatchObject({
    defaultValue: '9max',
    options: [
      { value: '6max', disabled: true },
      { value: '9max' },
    ],
  });
  expect(findNode(screen.root, 'setup-focus').props).toMatchObject({
    defaultValue: 'preflop',
    options: [{ value: 'preflop', label: 'Preflop fundamentals' }],
  });
  expect(findNode(screen.root, 'setup-session').props).toMatchObject({
    defaultValue: 'one',
    options: [{ value: 'one', label: '1 hand' }],
  });
});`;
await replaceExact(testPath, testAnchor, testReplacement);

const apiAnchor = `  expect(endpoint).toMatchObject({ id: 'tasks', path: '/training/tasks' });`;
const apiReplacement = `  expect(endpoint).toMatchObject({ id: 'tasks', path: '/training/tasks' });
  expect(endpoint?.operations.listPokerTrainingTasks?.request?.parameters).toEqual([
    { name: 'gameCategory', location: 'query', schema: { type: 'string' } },
    { name: 'tableSize', location: 'query', schema: { type: 'string' } },
    { name: 'street', location: 'query', schema: { type: 'string' } },
    { name: 'limit', location: 'query', schema: { type: 'integer' } },
  ]);`;
await replaceExact(testPath, apiAnchor, apiReplacement);
