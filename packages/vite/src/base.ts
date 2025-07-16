/*
 * This file is part of the UnoKit project.
 *
 * Copyright (c) 2025, Binary Shapes.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { UserConfig } from 'vite';

const viteBaseConfig: UserConfig = {
  build: {
    target: 'esnext',
    sourcemap: false,
    minify: true,
  },
};

export default viteBaseConfig;
