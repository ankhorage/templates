import { readFile, writeFile } from 'node:fs/promises';

const path = 'test/sharkprey-api.test.ts';
const source = await readFile(path, 'utf8');
const from = `  const screen = requireScreen(manifest, 'training-setup');
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
const to = `  const screen = requireScreen(manifest, 'training-setup');
  expect(findNode(screen.root, 'setup-start').props).not.toHaveProperty('onPress');
});

test('SharkPrey exposes only the currently published training curriculum', () => {
  const screen = requireScreen(createAppManifest(), 'training-setup');

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
    options: [{ value: '6max', disabled: true }, { value: '9max' }],
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

if (!source.includes(from)) throw new Error('Missing expanded SharkPrey setup assertions.');
await writeFile(path, source.replace(from, to));
