import { readFileSync } from 'node:fs';

import { expect, test } from 'bun:test';

test('temporary: capture the Bun-resolved Utility lock entry', () => {
  const lock = readFileSync(new URL('../bun.lock', import.meta.url), 'utf8');
  const entry = /^\s+"@ankhorage\/utility": \[.*\],?$/mu.exec(lock)?.[0];
  expect(entry).toContain('@ankhorage/utility@1.10.0');
  process.stdout.write(`LOCK_PROBE_START${entry}LOCK_PROBE_END\n`);
});
