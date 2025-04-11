import baseConfig from '@unokit/tsup';
import { defineConfig } from 'tsup';

export default defineConfig({
  ...baseConfig,
  entry: ['src/index.ts'],
  external: [
    'prettier',
    'prettier-plugin-multiline-arrays',
    '@trivago/prettier-plugin-sort-imports',
  ],
});
