import type { ScreenSpec, UiNode } from '@ankhorage/contracts';

export function createScreen(args: {
  id: string;
  name: string;
  title: string;
  description: string;
  root: UiNode;
  requires?: ScreenSpec['requires'];
}): ScreenSpec {
  return {
    id: args.id,
    name: args.name,
    title: args.title,
    description: args.description,
    root: args.root,
    ...(args.requires ? { requires: args.requires } : {}),
  };
}
