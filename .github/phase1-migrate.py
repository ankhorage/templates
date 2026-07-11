from pathlib import Path
from textwrap import dedent


def replace(path: str, old: str, new: str) -> None:
    file = Path(path)
    content = file.read_text()
    updated = content.replace(old, new)
    file.write_text(updated)
    print(f'{path}: {content.count(old)} replacement(s)')


replace(
    'src/templates/starter/categories/food-drink/nutrition-catalog-scan/template.ts',
    "        authorization: {\n          kind: 'RBAC',\n          engine: 'native',\n        },\n",
    '',
)
replace(
    'src/templates/starter/categories/food-drink/nutrition-catalog-scan/template.ts',
    "    },\n    settings: {\n      ...manifest.settings,\n      authFlow: {\n        signInRoute: 'sign-in',\n        signUpRoute: 'sign-up',\n        signOutRoute: 'sign-out',\n        postSignInRoute: '/products',\n        unauthorizedRoute: 'sign-in',\n      },\n    },\n",
    "    },\n",
)
replace(
    'src/templates/starter/categories/business-productivity/urban-water-monitor/template.ts',
    "  return {\n    ...manifest,\n    settings: {\n      ...manifest.settings,\n      authFlow: {\n        ...manifest.settings.authFlow,\n        postSignInRoute: 'index',\n      },\n    },\n  };",
    "  const auth = manifest.infra.auth;\n  if (auth === undefined) {\n    return manifest;\n  }\n\n  return {\n    ...manifest,\n    infra: {\n      ...manifest.infra,\n      auth: {\n        ...auth,\n        flow: {\n          ...auth.flow,\n          postSignInRoute: 'index',\n        },\n      },\n    },\n  };",
)
replace(
    'test/create-category-app.test.ts',
    "      expect(manifest.settings.authFlow.signInRoute).toBe('sign-in');\n      expect(manifest.settings.authFlow.signUpRoute).toBe('sign-up');\n      expect(manifest.settings.authFlow.signOutRoute).toBe('sign-out');\n      expect(manifest.settings.authFlow.postSignInRoute).toBe('index');\n      expect(manifest.infra.auth?.scope).toBe('global');",
    "      expect(manifest.infra.auth?.flow).toMatchObject({\n        signInRoute: 'sign-in',\n        signUpRoute: 'sign-up',\n        signOutRoute: 'sign-out',\n        postSignInRoute: 'index',\n      });\n      expect(manifest.infra.auth?.authorization).toBeUndefined();\n      expect(manifest.settings).not.toHaveProperty('authFlow');\n      expect(manifest.infra.auth?.scope).toBe('global');",
)
replace(
    'test/oauth-auth-templates.test.ts',
    "import type { AppManifest, UiNode } from '@ankhorage/contracts';\n",
    "import type { AppManifest, UiNode } from '@ankhorage/contracts';\nimport { resolveAuthFlow } from '@ankhorage/contracts/auth';\n",
)
replace(
    'test/oauth-auth-templates.test.ts',
    "    const { signInRoute } = manifest.settings.authFlow;",
    "    const { signInRoute } = resolveAuthFlow(manifest.infra.auth?.flow);",
)
replace(
    'test/oauth-auth-templates.test.ts',
    "    expect(manifest.screens[manifest.settings.authFlow.signInRoute]).toBeUndefined();",
    "    const { signInRoute } = resolveAuthFlow(manifest.infra.auth?.flow);\n    expect(manifest.screens[signInRoute]).toBeUndefined();",
)
replace(
    'test/create-food-drink-nutrition-catalog-scan-template.test.ts',
    "      authorization: {\n        kind: 'RBAC',\n        engine: 'native',\n      },\n",
    '',
)
replace(
    'test/create-food-drink-nutrition-catalog-scan-template.test.ts',
    "    expect(manifest.settings.authFlow.postSignInRoute).toBe('/products');\n    expect(manifest.settings.authFlow.postSignInRoute).not.toContain('products/products');",
    "    expect(manifest.infra.auth?.flow?.postSignInRoute).toBe('/products');\n    expect(manifest.infra.auth?.flow?.postSignInRoute).not.toContain('products/products');\n    expect(manifest.infra.auth?.authorization).toBeUndefined();\n    expect(manifest.settings).not.toHaveProperty('authFlow');",
)
replace(
    'test/create-business-productivity-urban-water-monitor-template.test.ts',
    "    expect(manifest.settings.authFlow.postSignInRoute).toBe('index');",
    "    expect(manifest.infra.auth?.flow?.postSignInRoute).toBe('index');\n    expect(manifest.settings).not.toHaveProperty('authFlow');",
)
replace(
    'README.md',
    "Auth behavior is not modeled as a visible navigation route in category templates. It remains\ncontrolled by the manifest `infra` and `settings.authFlow` configuration. The original generic\nstarter remains available as the fallback template and preserves its existing sign-in screen.",
    "Auth behavior is not modeled as a visible navigation route in category templates. It is\nconfigured only through `infra.auth.flow`; `settings` contains no authentication configuration.\nThe original generic starter remains available as the fallback template and preserves its existing sign-in screen.",
)
replace(
    'README.md',
    "- `food_drink/nutrition-catalog-scan`: Products · Scan · Stats · Profile. This restricted product\n  barcode nutrition scanner starter uses `infra.auth.scope = \"global\"`, Supabase auth, native\n  RBAC, and an app-facing `profiles` table. Generated apps should keep identity in Supabase Auth,",
    "- `food_drink/nutrition-catalog-scan`: Products · Scan · Stats · Profile. This restricted product\n  barcode nutrition scanner starter uses `infra.auth.scope = \"global\"`, Supabase authentication\n  without implicit authorization, and an app-facing `profiles` table. Generated apps should keep identity in Supabase Auth,",
)

Path('test/canonical-auth-flow-contract.test.ts').write_text(
    dedent(
        """
        import { readdir, readFile } from 'node:fs/promises';
        import path from 'node:path';

        import { describe, expect, test } from 'bun:test';

        import { APP_CATEGORIES, createCategoryAppManifest } from '../src/index';

        async function listFiles(root: string): Promise<string[]> {
          const entries = await readdir(root, { withFileTypes: true });
          const files = await Promise.all(
            entries.map(async (entry) => {
              const entryPath = path.join(root, entry.name);
              return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
            }),
          );
          return files.flat();
        }

        describe('canonical auth flow contract', () => {
          test('generates first-party manifests with only infra.auth.flow', () => {
            for (const category of APP_CATEGORIES) {
              const manifest = createCategoryAppManifest(category);
              expect(manifest.infra.auth?.flow).toBeDefined();
              expect(manifest.infra.auth?.authorization).toBeUndefined();
              expect(manifest.settings).not.toHaveProperty('authFlow');
            }
          });

          test('does not reintroduce the removed settings auth-flow property', async () => {
            const removedPath = ['settings', 'authFlow'].join('.');
            const removedKey = ['auth', 'Flow'].join('');
            const files = [
              ...(await listFiles('src')),
              ...(await listFiles('test')),
              'README.md',
            ].filter((file) => !file.endsWith('canonical-auth-flow-contract.test.ts'));

            for (const file of files) {
              const content = await readFile(file, 'utf8');
              expect(content, file).not.toContain(removedPath);
              expect(content, file).not.toMatch(new RegExp(`${removedKey}\\s*:`));
            }
          });
        });
        """
    ).lstrip()
)

Path('.changeset/canonical-auth-flow.md').write_text(
    dedent(
        """
        ---
        '@ankhorage/templates': major
        ---

        Generate authentication flow only under `infra.auth.flow`, remove implicit authorization from first-party templates, and reject reintroduction of `settings.authFlow`.
        """
    ).lstrip()
)
