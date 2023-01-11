import { input, output, plugins as defaultPlugins } from './rollup.config';
import replace from '@rollup/plugin-replace';

const plugins = [
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  ...defaultPlugins,
];

export default {
  input,
  output,
  plugins,
};
