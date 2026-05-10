import { createKnipConfig } from '@ankhorage/devtools/knip';

export default createKnipConfig({
  entry: ['src/index.ts'],
  ignoreFiles: ['eslint.config.mjs', 'prettier.config.cjs'],
});
