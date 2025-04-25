/*
 * This file is part of the UnoKit project.
 *
 * Copyright (c) 2025, Binary Shapes.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Config } from 'jest';

import { useBaseConfig } from './base';

/**
 * A jest configuration for the Node CLI applications.
 */
const jestNodeCli: Config = {
  ...useBaseConfig(),

  // CLI output almost always contains a lot of noise, so we'll silence it.
  silent: true,
};

export default jestNodeCli;
