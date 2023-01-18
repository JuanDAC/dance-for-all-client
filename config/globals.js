import {lstatSync, readdirSync} from 'fs';
import {join, relative} from 'path';

// eslint-disable-next-line no-undef
export const ROOT_DIR = join(__dirname, '..');
export const SRC_DIR = join(ROOT_DIR, 'src');
export const DEPENDENCY_DIR = join(ROOT_DIR, 'node_modules');
export const BUILD_DIR = join(ROOT_DIR, 'build');
export const STATICS_DIR = join(ROOT_DIR, 'statics');
export const TSCONFIG = join(ROOT_DIR, './tsconfig.json');

export const loadFiles = (dir, extension) =>
  readdirSync(dir)
    .map((name) => {
      const path = join(dir, name);
      const stats = lstatSync(path);
      if (stats.isFile() && new RegExp(extension).test(name)) {
        return path;
      }

      if (stats.isDirectory()) {
        return loadFiles(path, extension);
      }

      return [];
    })
    .flat();
