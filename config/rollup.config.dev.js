import {input, output, plugins as defaultPlugins} from './rollup.config';
import replace from '@rollup/plugin-replace';
import dev from 'rollup-plugin-dev';
import livereload from 'rollup-plugin-livereload';
import html from '@rollup/plugin-html';
import {htmlTemplate} from './htmlTemplate';

const plugins = [
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify('development'),
    'Reflect.decorate': 'undefined',
  }),
  ...defaultPlugins,
  dev({
    dirs: ['build'],
    port: 8000,
    spa: true,
  }),
  livereload({
    watch: 'dist',
  }),
  html({
    template: ({files: {js}}) => htmlTemplate(js),
  }),
];

export default {
  input,
  output,
  plugins,
};
