import type { UiNode } from '@ankhorage/contracts';
import type { ButtonProps, CardProps, InputProps } from '@ankhorage/zora';
import type {
  AuthLayoutProps,
  PageHeaderProps,
  PageProps,
  PageSectionProps,
} from '@ankhorage/zora';
import type { EmptyStateProps, NoticeProps, PanelProps } from '@ankhorage/zora';
import type { SectionHeaderProps, SettingsRowProps } from '@ankhorage/zora';

type SerializableProps<T extends object> = T & Record<string, unknown>;
type SerializablePageProps = Omit<PageProps, 'children' | 'footer' | 'header'>;
type SerializablePageHeaderProps = Omit<
  PageHeaderProps,
  'actions' | 'meta' | 'title' | 'description' | 'eyebrow'
> & {
  title: string;
  description?: string;
  eyebrow?: string;
};
type SerializablePageSectionProps = Omit<
  PageSectionProps,
  'actions' | 'children' | 'title' | 'description'
> & {
  title?: string;
  description?: string;
};
type SerializablePanelProps = Omit<
  PanelProps,
  'actions' | 'children' | 'description' | 'eyebrow' | 'footer' | 'title'
> & {
  title?: string;
  description?: string;
  eyebrow?: string;
  footer?: string;
};
type SerializableCardProps = Omit<
  CardProps,
  'actions' | 'children' | 'description' | 'eyebrow' | 'footer' | 'title'
> & {
  title?: string;
  description?: string;
  eyebrow?: string;
  footer?: string;
};
type SerializableAuthLayoutProps = Omit<
  AuthLayoutProps,
  'children' | 'description' | 'eyebrow' | 'footer' | 'title'
> & {
  title?: string;
  description?: string;
  eyebrow?: string;
  footer?: string;
};
type SerializableSectionHeaderProps = Omit<
  SectionHeaderProps,
  'actions' | 'description' | 'eyebrow' | 'title'
> & {
  title: string;
  description?: string;
  eyebrow?: string;
};
type SerializableFormFieldProps = SerializableProps<{
  label: string;
  description?: string;
  errorText?: string;
  helperText?: string;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  testID?: string;
}>;
type SerializableInputProps = SerializableProps<
  Pick<
    InputProps,
    | 'autoCapitalize'
    | 'autoComplete'
    | 'disabled'
    | 'invalid'
    | 'keyboardType'
    | 'maxLength'
    | 'placeholder'
    | 'readOnly'
    | 'secureTextEntry'
    | 'size'
    | 'testID'
    | 'textContentType'
  >
>;
type SerializableButtonProps = Omit<ButtonProps, 'children'> & {
  children?: string;
};
type SerializableNoticeProps = Omit<
  NoticeProps,
  'actions' | 'children' | 'description' | 'title'
> & {
  title: string;
  description?: string;
};
type SerializableSettingsRowProps = Omit<
  SettingsRowProps,
  'control' | 'description' | 'meta' | 'onPress' | 'title'
> & {
  title: string;
  description?: string;
  meta?: string;
};
type SerializableEmptyStateProps = Omit<
  EmptyStateProps,
  'description' | 'eyebrow' | 'footer' | 'primaryAction' | 'secondaryAction' | 'title'
> & {
  title: string;
  description?: string;
  eyebrow?: string;
  footer?: string;
};

export interface ZoraNodePropsByType {
  AuthLayout: SerializableAuthLayoutProps;
  Button: SerializableButtonProps;
  Card: SerializableCardProps;
  EmptyState: SerializableEmptyStateProps;
  FormField: SerializableFormFieldProps;
  Input: SerializableInputProps;
  Notice: SerializableNoticeProps;
  Page: SerializablePageProps;
  PageHeader: SerializablePageHeaderProps;
  PageSection: SerializablePageSectionProps;
  Panel: SerializablePanelProps;
  SectionHeader: SerializableSectionHeaderProps;
  SettingsRow: SerializableSettingsRowProps;
}

export type ZoraNodeType = keyof ZoraNodePropsByType;

export type ZoraNode<TType extends ZoraNodeType = ZoraNodeType> = Omit<
  UiNode,
  'children' | 'props' | 'type'
> & {
  type: TType;
  props?: ZoraNodePropsByType[TType];
  children?: ZoraNode[];
};

export function createZoraNode<TType extends ZoraNodeType>(
  id: string,
  type: TType,
  props?: ZoraNodePropsByType[TType],
  children?: ZoraNode[],
): ZoraNode<TType> {
  return {
    id,
    type,
    ...(props ? { props } : {}),
    ...(children && children.length > 0 ? { children } : {}),
  };
}
