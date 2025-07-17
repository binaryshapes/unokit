import { readFileSync } from 'node:fs';
import { builtinModules } from 'node:module';
import { join } from 'node:path';
import { defineConfig } from 'vite';

import { dtsPlugin } from './dts';

const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));

// Get the dependencies and devDependencies from the package.json file, and the core Node modules.
const external = [
  ...builtinModules,
  ...builtinModules.map((m) => `node:${m}`),
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
];

/**
 * Node library build configuration.
 *
 * @returns A Vite configuration for a Node library.
 *
 * @public
 */
const nodeLibraryConfig = defineConfig({
  plugins: [
    dtsPlugin,
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (f, n) => n + (f === 'es' ? '.mjs' : '.cjs'),
    },
    rollupOptions: {
      treeshake: true,
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined,
        interop: 'auto',
        compact: true,
      },
      external,
    },
    outDir: 'dist',
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    emptyOutDir: true,
  },
});

export { nodeLibraryConfig };
