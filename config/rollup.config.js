import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import {join} from 'path';
import {BUILD_DIR, SRC_DIR, TSCONFIG, loadFiles} from './globals';
import resolve from '@rollup/plugin-node-resolve';

export const input = loadFiles(SRC_DIR, '.ts');

export const output = {
  dir: join(BUILD_DIR),
  format: 'esm',
};

export const plugins = [
  resolve({browser: true}),
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
