import { type Options } from 'tsup';

export const baseConfig: Options = {
  splitting: false,
  sourcemap: false,
  clean: true,
  format: ['esm', 'cjs'],
  outExtension: ({ format }) => ({ js: format === 'cjs' ? '.cjs' : '.mjs' }),
  dts: true,
  tsconfig: './tsconfig.json',
  shims: true,
  treeshake: true,
  outDir: 'dist',
  minify: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  minifyWhitespace: true,
};

export default baseConfig;
