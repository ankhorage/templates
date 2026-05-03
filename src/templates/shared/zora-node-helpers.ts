import { createZoraNode, type ZoraNode, type ZoraNodePropsByType } from '../../internal/zora-nodes';

export { createZoraNode };
export type { ZoraNode, ZoraNodeType } from '../../internal/zora-nodes';

export function createPage(
  id: string,
  props: ZoraNodePropsByType['Page'],
  children: ZoraNode[],
): ZoraNode<'Page'> {
  return createZoraNode(id, 'Page', props, children);
}

export function createHeader(
  id: string,
  props: ZoraNodePropsByType['PageHeader'],
): ZoraNode<'PageHeader'> {
  return createZoraNode(id, 'PageHeader', props);
}

export function createSection(
  id: string,
  props: ZoraNodePropsByType['PageSection'],
  children: ZoraNode[],
): ZoraNode<'PageSection'> {
  return createZoraNode(id, 'PageSection', props, children);
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
): ZoraNode<'PageSection'> {
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
