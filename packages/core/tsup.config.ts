import baseConfig from '@unokit/tsup';
import { defineConfig } from 'tsup';

export default defineConfig({
  ...baseConfig,
  entry: ['src/index.ts'],
});
