import type { IconSpec, RouteDefinition } from '@ankhorage/contracts';

type ManifestRoute = RouteDefinition;

export function createRoute(args: {
  name: string;
  screenId: string;
  label: string;
  icon?: IconSpec;
  hideInTabBar?: boolean;
}): ManifestRoute {
  return {
    name: args.name,
    screenId: args.screenId,
    label: args.label,
    ...(args.icon ? { icon: args.icon } : {}),
    ...(args.hideInTabBar ? { hideInTabBar: args.hideInTabBar } : {}),
  };
}
