import {
  type AppCategory,
  type AppManifest,
  type AppNavigatorManifest,
  type ComponentDataBindingRegistry,
  type DataSourceRegistry,
  parseAppManifest,
  resolveAuthFlow,
  type ScreenSpec,
  type UiNode,
} from '@ankhorage/contracts';
import { ZORA_COMPONENT_META } from '@ankhorage/zora/metadata';

import { type CategoryDesignOverrides, compileCategoryDesign } from '../design/category-theme';
import { BASE_INFRA, BASE_SETTINGS, DEFAULT_TEMPLATE_VERSION } from '../internal/defaults';
import { createManifestShell } from './create-manifest-shell';

export type TemplateAuthoringState = 'draft' | 'release';
export type TemplateCompositionStatus = 'blocked' | 'ready';
export type TemplateCompositionDiagnosticCode =
  | 'invalid-manifest'
  | 'missing-auth-landing-route'
  | 'missing-element'
  | 'missing-initial-route'
  | 'missing-route-screen'
  | 'theme-compilation-error'
  | 'theme-intent-warning';

export interface TemplateCompositionDiagnostic {
  readonly code: TemplateCompositionDiagnosticCode;
  readonly severity: 'error' | 'warning';
  readonly path: string;
  readonly message: string;
  readonly nodeId?: string;
  readonly requestedCapability?: string;
}

export interface ComposeCategoryAppManifestInput {
  readonly category: AppCategory;
  readonly name?: string;
  readonly slug?: string;
  readonly version?: string;
  readonly navigator: AppNavigatorManifest;
  readonly screens: Readonly<Record<string, ScreenSpec>>;
  readonly dataSources?: DataSourceRegistry;
  readonly dataBindings?: ComponentDataBindingRegistry;
  readonly modules?: readonly string[];
  readonly modulesConfig?: Readonly<Record<string, unknown>>;
  readonly theme?: CategoryDesignOverrides;
  readonly authoringState?: TemplateAuthoringState;
}

export interface CategoryAppManifestComposition {
  readonly manifest: AppManifest;
  readonly diagnostics: readonly TemplateCompositionDiagnostic[];
  readonly status: TemplateCompositionStatus;
  readonly authoringState: TemplateAuthoringState;
}

/*** Validate one canonical manifest for catalog registration or release finalization. */
export function validateTemplateManifest(
  manifest: AppManifest,
  authoringState: TemplateAuthoringState = 'release',
): CategoryAppManifestComposition {
  const parsed = parseAppManifest(manifest);
  const diagnostics: TemplateCompositionDiagnostic[] = [
    ...collectRouteDiagnostics(manifest.navigator, manifest.screens),
    ...collectInitialRouteDiagnostics(manifest.navigator),
    ...collectAuthLandingRouteDiagnostics(manifest),
    ...collectMissingElementDiagnostics(manifest.screens),
    ...(parsed.ok
      ? []
      : [
          {
            code: 'invalid-manifest' as const,
            severity: 'error' as const,
            path: 'manifest',
            message: parsed.message,
          },
        ]),
  ];
  return {
    manifest,
    diagnostics,
    status: diagnostics.some((diagnostic) => diagnostic.severity === 'error') ? 'blocked' : 'ready',
    authoringState,
  };
}

/*** Normalize one configured route or generated route path for exact comparison. */
function normalizeRoutePath(value: string): string {
  const [pathname = ''] = value.trim().split(/[?#]/u, 1);
  return pathname.replace(/^\/+|\/+$/gu, '');
}

/*** Resolve one route's generated path relative to its parent navigator. */
function resolveRoutePath(
  route: AppNavigatorManifest['routes'][number],
  parentPath: string,
): string {
  const configuredPath = route.path ?? route.name;
  const segment = normalizeRoutePath(configuredPath);
  if (configuredPath.trim().startsWith('/')) return segment;
  if (segment === 'index') return parentPath;
  return [parentPath, segment].filter(Boolean).join('/');
}

/*** Collect every concrete screen path produced by a navigator tree. */
function collectScreenRoutePaths(
  navigator: AppNavigatorManifest,
  parentPath = '',
): readonly string[] {
  return navigator.routes.flatMap((route) => {
    const routePath = resolveRoutePath(route, parentPath);
    return [
      ...(route.screenId ? [routePath] : []),
      ...(route.navigator ? collectScreenRoutePaths(route.navigator, routePath) : []),
    ];
  });
}

/*** Report navigator initial-route names that do not resolve among their sibling routes. */
function collectInitialRouteDiagnostics(
  navigator: AppNavigatorManifest,
  path = 'navigator',
): TemplateCompositionDiagnostic[] {
  const { initialRouteName } = navigator;
  const own =
    initialRouteName && !navigator.routes.some((route) => route.name === initialRouteName)
      ? [
          {
            code: 'missing-initial-route' as const,
            severity: 'error' as const,
            path: `${path}.initialRouteName`,
            message: `Initial route "${initialRouteName}" does not match a sibling route.`,
          },
        ]
      : [];
  return navigator.routes.reduce<TemplateCompositionDiagnostic[]>((diagnostics, route, index) => {
    if (!route.navigator) return diagnostics;
    return [
      ...diagnostics,
      ...collectInitialRouteDiagnostics(route.navigator, `${path}.routes[${index}].navigator`),
    ];
  }, own);
}

/*** Report an authenticated landing route that has no concrete screen in the navigator tree. */
function collectAuthLandingRouteDiagnostics(
  manifest: AppManifest,
): TemplateCompositionDiagnostic[] {
  const { auth } = manifest.infra;
  if (auth?.scope !== 'global') return [];
  const { postSignInRoute } = resolveAuthFlow(auth.flow);
  const normalized = normalizeRoutePath(postSignInRoute);
  if (collectScreenRoutePaths(manifest.navigator).includes(normalized)) return [];
  return [
    {
      code: 'missing-auth-landing-route',
      severity: 'error',
      path: 'infra.auth.flow.postSignInRoute',
      message: `Auth landing route "${postSignInRoute}" does not resolve to a screen route.`,
    },
  ];
}

/*** Read a manifest string prop without treating arbitrary values as valid authoring metadata. */
function resolveStringProp(node: UiNode, key: string): string | undefined {
  const value = Reflect.get(node.props ?? {}, key);
  return typeof value === 'string' && value.trim() ? value : undefined;
}

/*** Ask ZORA metadata whether a manifest node is the canonical draft placeholder. */
function isMissingElement(node: UiNode): boolean {
  const metadata = ZORA_COMPONENT_META.MissingElement;
  if (!metadata) throw new Error('ZORA metadata does not expose MissingElement.');
  return node.type === metadata.name;
}

/*** Visit every manifest child branch, including repeat empty-state nodes. */
function visitNode(
  node: UiNode,
  path: string,
  visitor: (node: UiNode, path: string) => void,
): void {
  visitor(node, path);
  node.children?.forEach((child, index) => visitNode(child, `${path}.children[${index}]`, visitor));
  node.repeat?.empty?.forEach((child, index) =>
    visitNode(child, `${path}.repeat.empty[${index}]`, visitor),
  );
}

/*** Report every canonical ZORA MissingElement with its requested capability and location. */
function collectMissingElementDiagnostics(
  screens: Readonly<Record<string, ScreenSpec>>,
): TemplateCompositionDiagnostic[] {
  const diagnostics: TemplateCompositionDiagnostic[] = [];
  for (const [screenId, screen] of Object.entries(screens)) {
    visitNode(screen.root, `screens.${screenId}.root`, (node, path) => {
      if (!isMissingElement(node)) return;
      const requestedCapability =
        resolveStringProp(node, 'requestedCapability') ?? 'Unspecified interface capability';
      diagnostics.push({
        code: 'missing-element',
        severity: 'error',
        path,
        nodeId: node.id,
        requestedCapability,
        message: `Node "${node.id}" requires missing capability "${requestedCapability}".`,
      });
    });
  }
  return diagnostics;
}

/*** Validate every route target recursively against the canonical screen registry. */
function collectRouteDiagnostics(
  navigator: AppNavigatorManifest,
  screens: Readonly<Record<string, ScreenSpec>>,
  path = 'navigator',
): TemplateCompositionDiagnostic[] {
  return navigator.routes.flatMap((route, index) => {
    const routePath = `${path}.routes[${index}]`;
    const own =
      route.screenId && !Reflect.has(screens, route.screenId)
        ? [
            {
              code: 'missing-route-screen' as const,
              severity: 'error' as const,
              path: `${routePath}.screenId`,
              message: `Route "${route.name}" references unknown screen "${route.screenId}".`,
            },
          ]
        : [];
    return route.navigator
      ? [...own, ...collectRouteDiagnostics(route.navigator, screens, `${routePath}.navigator`)]
      : own;
  });
}

/*** Convert owner theme evidence into template composition diagnostics. */
function collectThemeDiagnostics(
  design: ReturnType<typeof compileCategoryDesign>,
): TemplateCompositionDiagnostic[] {
  const intent = design.diagnostics.map((diagnostic) => ({
    code: 'theme-intent-warning' as const,
    severity: diagnostic.severity,
    path: `theme.${diagnostic.path}`,
    message: diagnostic.message,
  }));
  const compilation = design.computedTheme.diagnostics.map((diagnostic) => ({
    code: 'theme-compilation-error' as const,
    severity: 'error' as const,
    path: `theme.${diagnostic.path}`,
    message: diagnostic.message,
  }));
  return [...intent, ...compilation];
}

/*** Compose canonical manifest inputs with a category/theme shell and explicit diagnostics. */
export function composeCategoryAppManifest(
  input: ComposeCategoryAppManifestInput,
): CategoryAppManifestComposition {
  const design = compileCategoryDesign(input.category, input.theme);
  const { preset } = design;
  const manifest: AppManifest = {
    ...createManifestShell({
      seed: {
        category: input.category,
        appName: input.name ?? preset.defaultName,
        slug: input.slug ?? preset.defaultSlug,
      },
      theme: design.themeConfig,
      version: input.version ?? DEFAULT_TEMPLATE_VERSION,
      navigator: input.navigator,
      screens: { ...input.screens },
    }),
    infra: {
      ...structuredClone(BASE_INFRA),
      modules: [...(input.modules ?? [])],
      ...(input.modulesConfig ? { modulesConfig: structuredClone(input.modulesConfig) } : {}),
    },
    settings: structuredClone(BASE_SETTINGS),
    ...(input.dataSources ? { dataSources: structuredClone(input.dataSources) } : {}),
    ...(input.dataBindings ? { dataBindings: structuredClone(input.dataBindings) } : {}),
  };
  const validation = validateTemplateManifest(manifest, input.authoringState);
  const diagnostics: TemplateCompositionDiagnostic[] = [
    ...collectThemeDiagnostics(design),
    ...validation.diagnostics,
  ];
  return {
    manifest,
    diagnostics,
    status: diagnostics.some((diagnostic) => diagnostic.severity === 'error') ? 'blocked' : 'ready',
    authoringState: validation.authoringState,
  };
}

/*** Fail catalog registration or release finalization while any blocker remains. */
export function assertTemplateManifestReady(
  composition: CategoryAppManifestComposition,
): AppManifest {
  if (composition.status === 'blocked' || composition.authoringState !== 'release') {
    const reasons = composition.diagnostics
      .filter((diagnostic) => diagnostic.severity === 'error')
      .map((diagnostic) => `${diagnostic.path}: ${diagnostic.message}`);
    throw new Error(
      `Template manifest is not release-ready.${reasons.length ? ` ${reasons.join(' ')}` : ''}`,
    );
  }
  return composition.manifest;
}
