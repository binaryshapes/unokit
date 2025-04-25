import baseConfig from '@unokit/tsup';
import { defineConfig } from 'tsup';

export default defineConfig({
  ...baseConfig,
  entry: ['src/index.ts'],
  external: [
    '@nx/eslint-plugin',
    'typescript-eslint',
    'eslint',
  ],
});
