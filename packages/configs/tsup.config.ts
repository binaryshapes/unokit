import { defineConfig } from 'tsup';

import baseConfig from './src/tsup';

export default defineConfig({
  ...baseConfig,
  entry: ['src/eslint.ts', 'src/tsup.ts'],
  external: ['@nx/eslint-plugin', 'tsup'],
  onSuccess: 'pnpm run copyfiles',
});
