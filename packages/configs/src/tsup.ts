import { defineConfig, type Options } from 'tsup';

export const base: Options = {
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

/**
 * Tsup configuration factory.
 *
 * @param options - Tsup options that will override base options.
 * @returns Tsup configuration.
 */
const tsupConfig = (options: Pick<Options, 'entry' | 'external' | 'onSuccess'>) =>
  ({
    ...base,
    ...options,
  }) as Options;

export default tsupConfig;
