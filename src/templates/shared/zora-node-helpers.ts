import { createZoraNode, type ZoraNode, type ZoraNodePropsByType } from '../../internal/zora-nodes';

export { createZoraNode };
export type { ZoraNode } from '../../internal/zora-nodes';

export function createScreenRoot(
  id: string,
  props: ZoraNodePropsByType['Screen'],
  children: ZoraNode[],
): ZoraNode<'Screen'> {
  return createZoraNode(id, 'Screen', props, children);
}

export function createSection(
  id: string,
  props: ZoraNodePropsByType['ScreenSection'],
  children: ZoraNode[],
): ZoraNode<'ScreenSection'> {
  return createZoraNode(id, 'ScreenSection', props, children);
}

export function createSettingsSection(
  idPrefix: string,
  title: string,
  description: string,
  rows: readonly {
    id: string;
    title: string;
    description: string;
    meta?: string;
  }[],
): ZoraNode<'ScreenSection'> {
  return createSection(
    `${idPrefix}-settings-section`,
    {
      title,
      description,
    },
    [
      createZoraNode(`${idPrefix}-settings-header-row`, 'SectionHeader', {
        title,
        description,
      }),
      ...rows.map((row) =>
        createZoraNode(`${idPrefix}-${row.id}`, 'SettingsRow', {
          title: row.title,
          description: row.description,
          ...(row.meta ? { meta: row.meta } : {}),
        }),
      ),
    ],
  );
}
