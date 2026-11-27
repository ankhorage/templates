import { createKnipConfig } from '@ankhorage/devtools/knip';

export default createKnipConfig({
  entry: ['.agents/skills/**/scripts/**/*.ts', 'test/grossmeisterChromiumHarness.tsx'],
  ignoreFiles: [
    '.prettierrc.js',
    'eslint.config.mjs',
    'eslint.local.config.mjs',
    'paradox.config.ts',
    'prettier.local.config.js',
  ],
});
