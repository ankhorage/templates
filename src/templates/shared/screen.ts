import type { ScreenSpec, UiNode } from '@ankhorage/contracts';

export function createScreen(args: {
  id: string;
  name: string;
  title: string;
  description: string;
  root: UiNode;
}): ScreenSpec {
  return {
    id: args.id,
    name: args.name,
    title: args.title,
    description: args.description,
    root: args.root,
  };
}
