import type {
  AnkhCapabilityId,
  AnkhCommandCategory,
  AnkhPackageMetadata,
} from '@ankhorage/contracts/cli';

import packageJson from '../package.json';

export const TEMPLATES_PACKAGE_NAME = packageJson.name;
export const TEMPLATES_PACKAGE_VERSION = packageJson.version;
export const TEMPLATES_COMMAND_CATEGORY = 'templates' as const satisfies AnkhCommandCategory;
export const TEMPLATES_CAPABILITIES = [
  'templates.list',
  'templates.inspect',
  'templates.create',
] as const satisfies readonly AnkhCapabilityId[];

export const TEMPLATES_PACKAGE_METADATA = {
  category: TEMPLATES_COMMAND_CATEGORY,
  provider: './dist/ankh.provider.js',
  capabilities: TEMPLATES_CAPABILITIES,
} as const satisfies AnkhPackageMetadata;
