import type { UiNode } from '@ankhorage/contracts';
import type {
  ButtonProps,
  CardProps,
  DisclosureSectionProps,
  GridProps,
  InputProps,
  ProductCardProps,
} from '@ankhorage/zora';
import type {
  EmptyStateProps,
  NoticeProps,
  OAuthProviderListProps,
  PanelProps,
} from '@ankhorage/zora';
import type { ScreenProps, ScreenSectionProps } from '@ankhorage/zora';
import type { SectionHeaderProps, SettingsRowProps } from '@ankhorage/zora';

type SerializableProps<T extends object> = T & Record<string, unknown>;
type SerializableScreenProps = Omit<ScreenProps, 'children' | 'footer'>;
type SerializableScreenSectionProps = Omit<
  ScreenSectionProps,
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
};
type SerializableCardProps = Omit<
  CardProps,
  'actions' | 'children' | 'description' | 'eyebrow' | 'footer' | 'title'
> & {
  title?: string;
  description?: string;
  eyebrow?: string;
};
type SerializableProductCardProps = Omit<
  ProductCardProps,
  'onPress' | 'onPrimaryAction' | 'onSecondaryAction'
>;
type SerializableDisclosureSectionProps = Omit<
  DisclosureSectionProps,
  'actions' | 'children' | 'description' | 'icon' | 'onOpenChange' | 'open' | 'title'
> & {
  title: string;
  description?: string;
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
type SerializableGridProps = SerializableProps<Omit<GridProps, 'children'>>;
type SerializableBarcodeScannerViewProps = SerializableProps<{
  permissionStatus: 'unknown' | 'requesting' | 'granted' | 'denied';
  title?: string;
  description?: string;
  overlayTitle?: string;
  overlayDescription?: string;
  cornerLabel?: string;
  requestPermissionLabel?: string;
  deniedPermissionLabel?: string;
  manualEntryLabel?: string;
  testID?: string;
}>;
interface SerializableOAuthProviderIconSpec {
  name: string;
  provider?: string;
  size?: number | string;
  color?: string;
}
interface SerializableOAuthProviderItem {
  id: string;
  label?: string;
  icon?: SerializableOAuthProviderIconSpec;
  disabled?: boolean;
  loading?: boolean;
}
type SerializableOAuthProviderListProps = Omit<
  OAuthProviderListProps,
  'onProviderPress' | 'providers'
> & {
  providers: readonly SerializableOAuthProviderItem[];
};
type SerializableChessBoardProps = SerializableProps<{
  fen: string;
  orientation?: 'white' | 'black';
  selectedSquare?: string | null;
  legalTargets?: readonly string[];
  lastMove?: {
    from: string;
    to: string;
    promotion?: 'q' | 'r' | 'b' | 'n';
  } | null;
  disabled?: boolean;
  showCoordinates?: boolean;
  validateMoves?: boolean;
  testID?: string;
}>;

export interface ZoraNodePropsByType {
  BarcodeScannerView: SerializableBarcodeScannerViewProps;
  Button: SerializableButtonProps;
  Card: SerializableCardProps;
  ChessBoard: SerializableChessBoardProps;
  DisclosureSection: SerializableDisclosureSectionProps;
  EmptyState: SerializableEmptyStateProps;
  FormField: SerializableFormFieldProps;
  Grid: SerializableGridProps;
  Input: SerializableInputProps;
  Notice: SerializableNoticeProps;
  OAuthProviderList: SerializableOAuthProviderListProps;
  Panel: SerializablePanelProps;
  ProductCard: SerializableProductCardProps;
  Screen: SerializableScreenProps;
  ScreenSection: SerializableScreenSectionProps;
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
