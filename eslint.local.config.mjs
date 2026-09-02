import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createConfig } from '@ankhorage/devtools/eslint';

const configDir = path.dirname(fileURLToPath(import.meta.url));

function legacyRuleExceptions(rule, files) {
  return { files, rules: { [rule]: 'off' } };
}

export default [
  ...createConfig({
    tsconfigRootDir: configDir,
    project: ['./tsconfig.eslint.json'],
    files: ['src/**/*.ts', 'test/**/*.ts'],
  }),
  legacyRuleExceptions('complexity', ['test/create-food-drink-nutrition-catalog-scan-api.test.ts']),
  legacyRuleExceptions('max-lines', [
    'src/commands.ts',
    'src/design/category-source.ts',
    'test/create-category-app.test.ts',
  ]),
  legacyRuleExceptions('max-lines-per-function', [
    'test/ankh.provider.test.ts',
    'test/commands.test.ts',
    'test/create-business-productivity-urban-water-monitor-template.test.ts',
    'test/create-category-app.test.ts',
    'test/create-food-drink-nutrition-catalog-scan-api.test.ts',
    'test/create-food-drink-nutrition-catalog-scan-template.test.ts',
    'test/oauth-auth-templates.test.ts',
    'test/poker-template.test.ts',
  ]),
  legacyRuleExceptions('security/detect-object-injection', [
    'src/fixtures/oauth.ts',
    'src/generators/create-category-app.ts',
    'src/internal/merge.ts',
    'test/create-category-app.test.ts',
    'test/oauth-auth-templates.test.ts',
  ]),
];
