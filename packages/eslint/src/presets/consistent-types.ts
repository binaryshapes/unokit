/*
 * This file is part of the UnoKit project.
 *
 * Copyright (c) 2025, Binary Shapes.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { type ConfigArray, config } from 'typescript-eslint';

/**
 * Forcing consistent type imports and exports.
 */
const consistentTypes: ConfigArray = config({
  files: [
    '**/*.ts',
    '**/*.tsx',
  ],
  ignores: [
    '**/*.mdx/**.ts',
    '**/*.mdx/**.tsx',
  ],
  languageOptions: {
    parserOptions: {
      projectService: true,
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
    },
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/consistent-type-exports': 'error',
  },
});

export default consistentTypes;
