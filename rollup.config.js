import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import visualizer from 'rollup-plugin-visualizer';
import copy from 'rollup-plugin-copy';
import typescript from '@rollup/plugin-typescript';
import packageJson from './package.json';

const extensions = ['.ts', '.tsx'];

const terserOptions = { numWorkers: 1, mangle: { keep_fnames: true } };

const externalLibs = Object.keys(packageJson.peerDependencies);

const config = {
  input: './src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: false,
      plugins: [terser(terserOptions)],
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: false,
      plugins: [terser(terserOptions)],
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions,
    }),
    typescript(),
    commonjs({
      include: /node_modules/,
    }),
    copy({
      targets: [{ src: 'src/**/*.d.ts', dest: './dist/types' }],
      flatten: false,
    }),
    visualizer({ filename: 'stats/index.html' }),
  ],
  external: externalLibs,
};

export default config;
