/*
 * This file is part of the UnoKit project.
 *
 * Copyright (c) 2025, Binary Shapes.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import nxPreset from '@nx/jest/preset';
import { deepmerge } from 'deepmerge-ts';
import { readFileSync } from 'fs';
import { type Config } from 'jest';

// We reset the transform property to avoid conflicts with the local logic transform.
nxPreset.transform = {};

const base: Config = {
  // Ref: https://github.com/nrwl/nx/blob/master/packages/jest/preset/jest-preset.ts
  ...nxPreset,
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text', 'html'],
  collectCoverageFrom: ['src/**/*.ts'],
  watchman: false,
  moduleFileExtensions: ['ts', 'js'],
  coveragePathIgnorePatterns: ['index.ts'],
  rootDir: '.',
};

// Reading the SWC compilation config for the spec files.
const swcJestConfig = JSON.parse(readFileSync(`${__dirname}/.swcrc`, 'utf-8'));

// Disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves.
swcJestConfig.swcrc = false;

/**
 * The base config overrides that can be used to override the base config.
 */
interface BaseConfig {
  /**
   * Whether to use SWC for the project.
   * @default true
   */
  useSWC?: boolean;

  /**
   * The overrides to apply to the base config.
   */
  overrides?: {
    /**
     * The module file extensions to use for the project. By default, it will use `ts` and `js`.
     */
    moduleFileExtensions?: Array<'mjs' | 'jsx' | 'tsx' | 'json' | 'html'>;

    /**
     * The test environment to use for the project. By default, it will use `node`.
     */
    testEnvironment?: 'node' | 'jsdom';

    /**
     * The reporters to use for coverage. By default, it will use `text` and `html`.
     */
    coverageReporters?: Config['coverageReporters'];

    /**
     * Paths to ignore from coverage reports. By default, it will ignore `index.ts`.
     */
    coveragePathIgnorePatterns?: Config['coveragePathIgnorePatterns'];
  };
}

/**
 * Use the base config with the given overrides.
 * @param config - The config to use for the base config.
 * @returns The merged jest config.
 */
const useBaseConfig = (config?: BaseConfig): Config => {
  const { useSWC = true, overrides } = config ?? {};

  // We need calculate the transform patterns based on the moduleFileExtensions.
  // For instance, if the moduleFileExtensions is ['ts', 'js'] the pattern should be ^.+\\.(ts|js)$
  const fileExtensions = deepmerge(base.moduleFileExtensions, overrides?.moduleFileExtensions);
  const transformPatterns = fileExtensions?.map((ext) => `${ext}`).join('|');

  // Merge the base config with the overrides.
  return deepmerge(base, overrides, {
    transform: {
      [`^.+\\.(${transformPatterns})$`]: useSWC
        ? ['@swc/jest', swcJestConfig]
        : ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
  }) as Config;
};

export { useBaseConfig };
