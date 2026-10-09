import type { Capability } from '@ankhorage/contracts/capability';

export const CAPABILITIES = [
  {
    id: 'templates.list',
    owner: '@ankhorage/templates',
    access: ['invoke'],
    binding: { kind: 'action', bindableAs: ['target'] },
  },
  {
    id: 'templates.inspect',
    owner: '@ankhorage/templates',
    access: ['invoke'],
    binding: { kind: 'action', bindableAs: ['target'] },
  },
  {
    id: 'templates.create',
    owner: '@ankhorage/templates',
    access: ['invoke'],
    binding: { kind: 'action', bindableAs: ['target'] },
  },
] as const satisfies readonly Capability[];
