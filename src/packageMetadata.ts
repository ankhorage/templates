import type { AnkhCommandCategory } from '@ankhorage/contracts/cli';

import packageJson from '../package.json';
import { CAPABILITIES } from './capabilities/index.js';

export const TEMPLATES_PACKAGE_NAME = packageJson.name;
export const TEMPLATES_PACKAGE_VERSION = packageJson.version;
export const TEMPLATES_COMMAND_CATEGORY = 'templates' as const satisfies AnkhCommandCategory;
export const TEMPLATES_CAPABILITIES = CAPABILITIES;
