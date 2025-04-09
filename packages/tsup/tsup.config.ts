import { defineConfig } from 'tsup';

import config from './src/index';

export default defineConfig({
  ...config,
  entry: ['src/index.ts'],
  external: ['tsup'],
});
