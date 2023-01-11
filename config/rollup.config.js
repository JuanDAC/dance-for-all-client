import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import {join} from 'path';
import {BUILD_DIR, SRC_DIR, TSCONFIG} from './globals';
import resolve from '@rollup/plugin-node-resolve';
import {lstatSync, readdirSync} from 'fs';

const loadFiles = (dir, extension) =>
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

export const input = loadFiles(SRC_DIR, '.ts');

export const output = {
  dir: join(BUILD_DIR),
  format: 'esm',
};

export const plugins = [
  resolve(),
  commonjs(),
  babel({
    babelHelpers: 'bundled',
    exclude: /node_modules/,
    extensions: ['.tx'],
    presets: ['@babel/core', '@babel/preset-env', '@babel/preset-typescript'],
  }),
  typescript({
    tsconfig: TSCONFIG,
  }),
];

export default {};
