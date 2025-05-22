/*
 * This file is part of the UnoKit project.
 *
 * Copyright (c) 2025, Binary Shapes.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { type TestProjectConfiguration, defineConfig } from 'vitest/config';

/**
 * Options for Vitest configuration.
 */
type VitestOptions = {
  /**
   * Whether to use globals.
   * This need to set "types": ["vitest/globals"] in tsconfig.json.
   *
   * @defaultValue true
   */
  globals?: boolean;
  /**
   * Whether to watch for changes.
   *
   * @defaultValue false
   */
  watch?: boolean;
  /**
   * Whether to use UI.
   *
   * @defaultValue false
   */
  ui?: boolean;
  /**
   * The directory to run the tests.
   *
   * @defaultValue './tests'
   */
  dir?: string;
  /**
   * Whether to disable console intercept.
   *
   * @defaultValue true
   */
  disableConsoleIntercept?: boolean;
  /**
   * The thresholds for the tests.
   *
   * @defaultValue 90
   */
  thresholds?: number;
  /**
   * The projects to run the tests.
   *
   * @defaultValue undefined
   */
  projects?: { mode: 'add' | 'replace'; config: TestProjectConfiguration[] };
};

/**
 * The default configuration for Vitest.
 * Unokit team prefer to use this configuration.
 */
const defaultConfig: VitestOptions = {
  globals: true,
  watch: false,
  ui: false,
  dir: './tests',
  thresholds: 90,
  disableConsoleIntercept: true,
  projects: { mode: 'add', config: [] },
};

/**
 * Base configuration for Vitest.
 *
 * @param config - The configuration for Vitest.
 * @returns The configuration for Vitest.
 */
const defineVitestConfig = (config: VitestOptions = defaultConfig) =>
  defineConfig({
    test: {
      // This need to set "types": ["vitest/globals"] in tsconfig.json.
      globals: config.globals,
      watch: config.watch,
      ui: config.ui,
      dir: config.dir,
      environment: 'node',
      reporters: [
        [
          'verbose',
          {
            isTTY: true,
            summary: false,
          },
        ],
      ],
      disableConsoleIntercept: config.disableConsoleIntercept,
      outputFile: {
        ifNoTests: 'warn',
        ifFailed: 'error',
      },
      coverage: {
        reportsDirectory: './coverage',
        ignoreEmptyLines: true,
        enabled: false,
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
        cleanOnRerun: true,
        thresholds: {
          statements: config.thresholds,
          branches: config.thresholds,
          functions: config.thresholds,
          lines: config.thresholds,
        },
      },
      workspace:
        config.projects?.mode === 'add'
          ? [
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
                    only: true,
                    tsconfig: './tsconfig.spec.json',
                  },
                },
              },
              ...(config.projects?.config ?? []),
            ]
          : config.projects?.config,
    },
  });

export default defineVitestConfig;
