import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

import pkg from '../package.json';
import { dtsPlugin } from './plugins';

/**
 * The default configuration for a TypeScript library build.
 *
 * @returns A configuration object for the library build.
 *
 * @public
 */
export default defineConfig({
  plugins: [
    dtsPlugin,
    nodePolyfills(),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (f, n) => n + (f === 'es' ? '.mjs' : '.cjs'),
    },
    outDir: 'dist',
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      treeshake: true,
      // Trick to get the dependencies and devDependencies from the package.json file.
      external: [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...Object.keys((pkg as any).dependencies || {}),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...Object.keys((pkg as any).devDependencies || {}),
      ],
    },
  },
});
