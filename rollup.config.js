import copy from 'rollup-plugin-copy';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: [
    'src/index.ts',
    'src/map.ts',
    'src/local.ts',
    'src/postcode.ts',
  ],
  output: [
    {
      entryFileNames: '[name].js',
      dir: 'lib',
      format: 'cjs',
    },
    {
      entryFileNames: '[name].mjs',
      dir: 'lib',
      format: 'esm',
    },
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    typescript({
      objectHashIgnoreUnknownHack: true,
    }),
    copy({
    }),
  ],
  external: [
    'load-script-once',
  ]
};
