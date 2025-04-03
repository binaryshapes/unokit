import { defineConfig } from 'tsup';
import tsupConfig from './src/tsup';

export default defineConfig(
  tsupConfig({
    entry: ['src/eslint.ts', 'src/tsup.ts'],
    external: ['@nx/eslint-plugin', 'tsup'],
    onSuccess: 'pnpm run copyfiles',
  }),
);
