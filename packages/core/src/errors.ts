/*
 * This file is part of the UnoKit project.
 *
 * Copyright (c) 2025, Binary Shapes.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import pc from 'picocolors';

/**
 * The scope of the error. Internally used to format the error message.
 * @private
 */
type ErrorScope = 'core' | 'tool' | 'template';

/**
 * Mandatory origin for errors that are not handled.
 * @private
 */
type UnhandledErrorOrigin = 'UNHANDLED_ERROR';

/**
 * Format the error message with the correct color.
 * @param message - The message of the error.
 * @param scope - The scope of the error.
 * @returns The formatted error message.
 *
 * @private
 */
function formatError(message: string, scope: ErrorScope) {
  const icon = scope === 'core' ? '🚨' : scope === 'tool' ? '🔧' : '🧩';
  const prefix = pc.bgRedBright(`${icon} ${scope}:`);
  const msg = pc.red(message);
  return `${prefix} ${msg}`;
}

/**
 * The fatal error represents an error in the platform functionality that causes the
 * program to stop. All known error should be extended from this class.
 *
 * @private
 */
class FatalError<T> extends Error {
  constructor(
    message: string,
    public origin: T | UnhandledErrorOrigin,
    public scope: ErrorScope,
  ) {
    super(message);
  }
}

/**
 * The core error represents a fatal error produced by some core functionality.
 * The error will be debugged and fixed by the core team.
 *
 * @public
 */
class CoreError<T> extends FatalError<T> {
  constructor(message: string, origin: T) {
    super(formatError(message, 'core'), origin, 'core');
  }
}

/**
 * The tool error represents a warning produced by some tool implementation.
 * The error will be debugged and fixed by the tool author.
 *
 * @public
 */
class ToolError<T> extends FatalError<T> {
  constructor(message: string, origin: T) {
    super(formatError(message, 'tool'), origin, 'tool');
  }
}

/**
 * The template error represents a warning produced by some template implementation.
 * The error will be debugged and fixed by the template author.
 *
 * @public
 */
class TemplateError<T> extends FatalError<T> {
  constructor(message: string, origin: T) {
    super(formatError(message, 'template'), origin, 'template');
  }
}

export { CoreError, ToolError, TemplateError };
