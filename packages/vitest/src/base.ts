/*
 * This file is part of the UnoKit project.
 *
 * Copyright (c) 2025, Binary Shapes.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { defineConfig } from 'vitest/config';

/**
 * Base configuration for Vitest.
 */
const baseConfig = defineConfig({
  test: {
    // This need to set "types": ["vitest/globals"] in tsconfig.json.
    globals: true,
    watch: false,
    ui: false,
    dir: './tests',
    environment: 'node',
    reporters: ['verbose'],
    outputFile: {
      ifNoTests: 'warn',
      ifFailed: 'error',
    },
    coverage: {
      reportsDirectory: './coverage',
      ignoreEmptyLines: true,
      enabled: true,
      provider: 'v8',
      include: [
        'src/**/*.ts',
      ],
      exclude: [
        '**/index.ts',
      ],
      reporter: [
        ['text', { skipEmpty: true }],
        ['html', { skipEmpty: true }],
      ],
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
    },
    workspace: [
      {
        test: {
          name: 'runtime',
          include: ['tests/**/*.spec.ts'],
        },
      },
      {
        test: {
          name: 'types',
          include: ['tests/**/*.spec-d.ts'],
          typecheck: {
            enabled: true,
          },
        },
      },
    ],
  },
});

export default baseConfig;
