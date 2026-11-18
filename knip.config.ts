import { createKnipConfig } from '@ankhorage/devtools/knip';

export default createKnipConfig({
  entry: ['.agents/skills/**/scripts/**/*.ts', 'test/grossmeisterChromiumHarness.tsx'],
  project: ['.agents/skills/**/scripts/**/*.ts', 'src/**/*.ts', 'test/**/*.ts', 'test/**/*.tsx'],
});
