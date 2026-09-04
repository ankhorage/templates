import { createKnipConfig } from '@ankhorage/devtools/knip';

export default createKnipConfig({
  entry: [
    '.agents/skills/zora-designer/scripts/audit.mjs',
    '.agents/skills/zora-designer/scripts/owner-api.mjs',
    '.agents/skills/zora-designer/scripts/scaffold-template.mjs',
  ],
  ignoreDependencies: ['@ankhorage/doctor'],
  ignoreFiles: [
    '.prettierrc.js',
    'eslint.config.mjs',
    'eslint.local.config.mjs',
    'paradox.config.ts',
    'prettier.local.config.js',
  ],
});
