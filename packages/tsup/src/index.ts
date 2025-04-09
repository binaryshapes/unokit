/*
 * This file is part of the UnoKit project.
 *
 * Copyright (c) 2025, Binary Shapes.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Options } from 'tsup';

/**
 *
 *
 * Tsup configuration for UnoKit  used to build the project using the Tsup library and supports
 * both ESM and CJS formats.
 *
 * @note
 * It is possible to extend this configuration by using the tsup `defineConfig` function.
 * Is recommended to provide the `entry` and `external` options to avoid conflicts.
 *
 * @example
 * ```ts
 * import config from '@unokit/tsup';
 * import { defineConfig } from 'tsup';
 *
 * export default defineConfig({
 *   ...config,
 *   entry: ['src/index.ts'],
 *   external: ['react'],
 *   // rest of the custom configuration.
 * });
 * ```
 */
const config: Options = {
  splitting: false,
  sourcemap: false,
  clean: true,
  format: ['esm', 'cjs'],
  outExtension: ({ format }) => ({ js: format === 'cjs' ? '.cjs' : '.mjs' }),
  tsconfig: 'tsconfig.json',
  shims: true,
  treeshake: true,
  outDir: 'dist',
  minify: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  minifyWhitespace: true,
  silent: true,
  external: [],
  entry: ['src/index.ts'],

  // This avoid the TS6307 error on composite tsconfig.json.
  // See more: https://github.com/egoist/tsup/issues/571#issuecomment-2457920686
  dts: {
    compilerOptions: {
      composite: false,
      declaration: false,
    },
  },
};

export default config;
