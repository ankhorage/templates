import type { IconSpec, NavigatorSpec, RouteDefinition } from '@ankhorage/contracts';

type ManifestRoute = RouteDefinition;

export function createRoute(args: {
  name: string;
  path?: string;
  screenId?: string;
  label?: string;
  icon?: IconSpec;
  showInPrimaryNavigation?: boolean;
  navigator?: NavigatorSpec;
}): ManifestRoute {
  return {
    name: args.name,
    ...(args.path ? { path: args.path } : {}),
    ...(args.screenId ? { screenId: args.screenId } : {}),
    ...(args.label ? { label: args.label } : {}),
    ...(args.icon ? { icon: args.icon } : {}),
    ...(args.showInPrimaryNavigation === undefined
      ? {}
      : { showInPrimaryNavigation: args.showInPrimaryNavigation }),
    ...(args.navigator ? { navigator: args.navigator } : {}),
  };
}
