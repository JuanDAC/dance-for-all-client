import {join} from 'path';

// eslint-disable-next-line no-undef
export const ROOT_DIR = join(__dirname, '..');
export const SRC_DIR = join(ROOT_DIR, 'src');
export const DEPENDENCY_DIR = join(ROOT_DIR, 'node_modules');
export const BUILD_DIR = join(ROOT_DIR, 'build');
export const STATICS_DIR = join(ROOT_DIR, 'statics');
export const TSCONFIG = join(ROOT_DIR, './tsconfig.json');
