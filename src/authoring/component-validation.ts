import type { ScreenSpec, UiNode } from '@ankhorage/contracts';
import { ZORA_COMPONENT_META } from '@ankhorage/zora/metadata';

import type { TemplateCompositionDiagnostic } from './compose-category-manifest';

const TEMPLATE_ZORA_COMPONENT_META = ZORA_COMPONENT_META;

/*** Ask composed ZORA metadata whether a manifest node is the canonical draft placeholder. */
export function isMissingElementNode(node: UiNode): boolean {
  const metadata = TEMPLATE_ZORA_COMPONENT_META.MissingElement;
  if (!metadata) throw new Error('ZORA metadata does not expose MissingElement.');
  return node.type === metadata.name;
}

/*** Validate component availability through canonical core ZORA metadata. */
export function collectComponentDiagnostics(
  screens: Readonly<Record<string, ScreenSpec>>,
): TemplateCompositionDiagnostic[] {
  const diagnostics: TemplateCompositionDiagnostic[] = [];
  for (const [screenId, screen] of Object.entries(screens)) {
    visitUiNode(screen.root, `screens.${screenId}.root`, (node, path) => {
      const metadata = TEMPLATE_ZORA_COMPONENT_META[node.type];
      if (!metadata) {
        diagnostics.push({
          code: 'unknown-component',
          severity: 'error',
          path,
          nodeId: node.id,
          message: `Node "${node.id}" uses unknown component "${node.type}".`,
        });
        return;
      }
    });
  }
  return diagnostics;
}

/*** Visit every manifest child branch, including repeat empty-state nodes. */
export function visitUiNode(
  node: UiNode,
  path: string,
  visitor: (node: UiNode, path: string) => void,
): void {
  visitor(node, path);
  node.children?.forEach((child, index) =>
    visitUiNode(child, `${path}.children[${index}]`, visitor),
  );
  node.repeat?.empty?.forEach((child, index) =>
    visitUiNode(child, `${path}.repeat.empty[${index}]`, visitor),
  );
}
