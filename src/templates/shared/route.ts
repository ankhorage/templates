import type { AppManifest, IconSpec, RouteDefinition } from '@ankhorage/contracts';

export type ManifestNavigator = AppManifest['navigator'];
export type ManifestRoute = RouteDefinition;

export function createRoute(args: {
  name: string;
  screenId: string;
  label: string;
  icon?: IconSpec;
}): ManifestRoute {
  return {
    name: args.name,
    screenId: args.screenId,
    label: args.label,
    ...(args.icon ? { icon: args.icon } : {}),
  };
}
