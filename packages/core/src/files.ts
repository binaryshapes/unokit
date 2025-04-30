/*
 * This file is part of the UnoKit project.
 *
 * Copyright (c) 2025, Binary Shapes.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { deepmerge } from 'deepmerge-ts';
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import handlebars from 'handlebars';
import { join } from 'path';
import yaml from 'yaml';

import { CoreError } from './errors';

/**
 * @packageDocumentation
 *
 * This module provides a comprehensive set of utilities for file operations including:
 * - Reading and writing files in various formats (JSON, YAML, text)
 * - File path manipulation
 * - File copying and template rendering
 * - File system queries
 *
 * Dependencies:
 * - deepmerge-ts: For deep merging objects
 * - fs: Node.js file system module
 * - handlebars: For template rendering
 * - path: For path manipulation
 * - yaml: For YAML parsing and stringification
 */

/**
 * Represents a record of data that can be written to a file.
 * This type is used for structured data that can be serialized to JSON or YAML.
 */
type FileDataRecord = Record<string, unknown>;

/**
 * Options for copying files from one location to another.
 */
interface CopyFileOptions {
  /**
   * The source path of the file to copy.
   */
  filePath: string;
  /**
   * The destination path where the file will be copied to.
   * If not provided, the file will be copied with the same name in the destination directory.
   */
  destinyPath?: string;
}

/**
 * Supported file formats for parsing and writing operations.
 *
 * @remarks
 * - 'json': JavaScript Object Notation format
 * - 'yaml': YAML Ain't Markup Language format
 * - 'text': Plain text format
 */
type FileType = 'json' | 'yaml' | 'text';

/**
 * Represents the content of a file with type information for type safety.
 *
 * @typeParam T - The file type ('json', 'yaml', or 'text')
 * @typeParam R - The record type for structured data (not used for 'text' type)
 *
 * @example
 * ```ts
 * type Config = {
 *   name: string;
 *   version: string;
 * };
 *
 * type ConfigFile = FileContent<'yaml', Config>;
 * const config: ConfigFile = {
 *   type: 'yaml',
 *   data: { name: 'my-app', version: '1.0.0' }
 * };
 * ```
 */
type FileContent<T extends FileType, R extends FileDataRecord = never> = {
  type: T;
} & (T extends 'text'
  ? {
      data: string;
    }
  : {
      data: R;
    });

/**
 * Options for setting file data with various configuration options.
 */
type SetFileDataOptions = {
  /**
   * The operation mode for setting file data.
   * - 'replace': Completely replaces the file content
   * - 'merge': Merges the new data with existing content
   */
  mode: 'replace' | 'merge';
  /**
   * The file format to use for the operation.
   * @see {@link FileType}
   */
  format: FileType;
  /**
   * Whether to remove duplicate values from arrays during merge operations.
   * @default true
   */
  removeDuplicatesInArrays?: boolean;
  /**
   * Whether to replace entire arrays instead of merging them.
   * @default false
   */
  replaceArrays?: boolean;
};

/**
 * Enumeration of possible file operation error origins.
 * @internal
 */
type FileErrorOrigin =
  | 'FILE_NOT_FOUND'
  | 'FILE_IS_DIRECTORY'
  | 'FILE_READ_ERROR'
  | 'FILE_WRITE_ERROR'
  | 'FILE_PARSE_ERROR'
  | 'INVALID_FIND_UP_PATH'
  | 'FILE_IS_NOT_A_TEMPLATE';

/**
 * Represents an error that occurs during file operations.
 * @public
 */
class FilesError extends CoreError<FileErrorOrigin> {
  /**
   * Creates a new FilesError instance.
   *
   * @param message - A descriptive error message
   * @param origin - The origin of the error
   */
  constructor(message: string, origin: FileErrorOrigin) {
    super(message, origin);
  }
}

/**
 * Provides a comprehensive set of utilities for file operations.
 *
 * @remarks
 * This class offers static methods for various file operations including:
 * - Reading and writing files in different formats
 * - Path manipulation
 * - File copying and template rendering
 * - File system queries
 *
 * @public
 */
class Files {
  /**
   * The current working directory path.
   * @public
   */
  public static CURRENT_WORKDIR = process.cwd();

  /**
   * The user's home directory path.
   * @public
   */
  public static USER_HOME = process.env.HOME ?? '$HOME';

  // *********************************************************************************************
  // Private static methods
  // *********************************************************************************************

  /**
   * Removes duplicate values from arrays within the data object.
   *
   * @param data - The data object containing arrays
   * @returns The data object with duplicate values removed from arrays
   * @private
   */
  private static removeDuplicatesInArrays(data: FileDataRecord) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, Array.from(new Set(value))];
        }
        return [key, value];
      }),
    );
  }

  /**
   * Replaces array values in the original data with values from new data.
   *
   * @param originalData - The original data object
   * @param newData - The new data object containing replacement values
   * @returns The data object with arrays replaced
   * @private
   */
  private static replaceArraysValues(originalData: FileDataRecord, newData: FileDataRecord) {
    return Object.fromEntries(
      Object.entries(originalData).map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, newData[key]];
        }
        return [key, value];
      }),
    );
  }

  // *********************************************************************************************
  // Public static methods
  // *********************************************************************************************

  /**
   * Creates a path by joining multiple path segments.
   *
   * @param args - The path segments to join
   * @returns The joined path
   *
   * @public
   * @example
   * ```ts
   * const path = Files.makePath('path', 'to', 'file.txt');
   * // Result: 'path/to/file.txt'
   * ```
   */
  public static makePath(...args: string[]) {
    return join(...args);
  }

  /**
   * Creates a path relative to the current working directory.
   *
   * @param args - The path segments to join
   * @returns The joined path relative to the current working directory
   *
   * @public
   * @example
   * ```ts
   * const path = Files.makePathFromCwd('src', 'index.ts');
   * // Result: '/current/working/directory/src/index.ts'
   * ```
   */
  public static makePathFromCwd(...args: string[]) {
    return Files.makePath(Files.CURRENT_WORKDIR, ...args);
  }

  /**
   * Reads and parses the content of a file.
   *
   * @typeParam T - The expected content type
   * @param filePath - The path to the file
   * @param format - The format of the file
   * @returns The parsed content of the file
   * @throws {FilesError} If the file cannot be read or parsed
   *
   * @public
   * @example
   * ```ts
   * type Config = FileContent<'yaml', { name: string }>;
   * const config = Files.getContent<Config>('config.yaml', 'yaml');
   * doSomethingWithConfig(config.name); // Type-safe access
   * ```
   */
  public static getContent<T extends FileContent<FileType, FileDataRecord>>(
    filePath: string,
    format: T['type'],
  ): T['data'] {
    let parsedContent: T['data'];
    let content: string;

    try {
      content = readFileSync(filePath, 'utf8');
    } catch (error) {
      throw new FilesError(`Failed to read file ${filePath}: ${error}`, 'FILE_READ_ERROR');
    }

    switch (format) {
      case 'json':
        parsedContent = JSON.parse(content);
        break;
      case 'yaml':
        parsedContent = yaml.parse(content);
        break;
      case 'text':
        parsedContent = content;
        break;
      default:
        throw new FilesError(`Unsupported format: ${format}`, 'FILE_PARSE_ERROR');
    }

    return parsedContent;
  }

  /**
   * Writes data to a file with various configuration options.
   *
   * @param filePath - The path where the file will be written
   * @param data - The data to write (can be a string or a record)
   * @param options - Configuration options for the write operation
   * @throws {FilesError} If the file cannot be written
   *
   * @public
   * @example
   * ```ts
   * // Write JSON data
   * Files.setFileData('config.json', { name: 'test' }, {
   *   format: 'json',
   *   mode: 'replace'
   * });
   *
   * // Append text
   * Files.setFileData('log.txt', 'New log entry', {
   *   format: 'text',
   *   mode: 'merge'
   * });
   * ```
   */
  public static setFileData(
    filePath: string,
    data: FileDataRecord | string,
    { format, mode, removeDuplicatesInArrays = true, replaceArrays = false }: SetFileDataOptions,
  ) {
    function convertDataToString(data: FileDataRecord) {
      if (format === 'yaml') {
        return yaml.stringify(typeof data === 'string' ? yaml.parse(data, { merge: true }) : data, {
          singleQuote: true,
          indent: 2,
          merge: true,
        });
      }
      return JSON.stringify(data, null, 2);
    }

    // Create the destination directory if it doesn't exist.
    const destinationDir = filePath.split('/').slice(0, -1).join('/');
    if (!existsSync(destinationDir)) {
      mkdirSync(destinationDir, { recursive: true });
    }

    let dataToWrite: string;

    // If the mode is 'replace', write the data as is.
    if (mode === 'replace') {
      dataToWrite = typeof data === 'string' ? data : convertDataToString(data);
    } else {
      let existingData: string;

      if (!existsSync(filePath)) {
        existingData = '';
      } else {
        existingData = readFileSync(filePath, 'utf8');
      }

      // In text mode, we just append the new data to the file.
      if (typeof data === 'string') {
        dataToWrite = existingData + '\n' + data;
      }
      // For yaml and json, we merge the data.
      else {
        const passedExistingData = existingData.length > 0 ? yaml.parse(existingData) : {};
        let updatedData = deepmerge(passedExistingData, data);

        if (replaceArrays) {
          updatedData = this.replaceArraysValues(updatedData, data);
        }

        if (removeDuplicatesInArrays) {
          updatedData = this.removeDuplicatesInArrays(updatedData);
        }

        dataToWrite = convertDataToString(updatedData);
      }
    }

    writeFileSync(filePath, dataToWrite.trim());
  }

  /**
   * Copies one or more files to a destination directory.
   *
   * @param files - Array of files to copy with their source and destination paths
   * @param destination - The destination directory (defaults to current working directory)
   * @throws {FilesError} If a source file is not found or is a directory
   *
   * @public
   * @example
   * ```ts
   * Files.copyFiles([
   *   { filePath: 'src/file1.txt', destinyPath: 'dist/file1.txt' },
   *   { filePath: 'src/file2.txt' } // Will use same filename in destination
   * ], 'dist');
   * ```
   */
  public static copyFiles(files: CopyFileOptions[], destination: string = process.cwd()) {
    files.forEach(({ filePath, destinyPath }) => {
      destinyPath = (destinyPath ?? filePath.split('/').pop()) as string;

      if (!existsSync(filePath)) {
        throw new FilesError(`File not found: ${filePath}`, 'FILE_NOT_FOUND');
      }

      if (existsSync(filePath) && statSync(filePath).isDirectory()) {
        throw new FilesError(`File is a directory: ${filePath}`, 'FILE_IS_DIRECTORY');
      }

      if (!existsSync(destination)) {
        mkdirSync(destination, { recursive: true });
      }

      copyFileSync(filePath, join(destination, destinyPath));
    });
  }

  /**
   * Renders a Handlebars template file with the given values.
   *
   * @param file - The path to the template file (must have .hbs extension)
   * @param values - The values to use for template rendering
   * @returns The rendered template content
   * @throws {FilesError} If the template file is not found or is invalid
   *
   * @public
   * @example
   * ```ts
   * const rendered = Files.renderFile('template.hbs', {
   *   name: 'John',
   *   age: 30
   * });
   * ```
   */
  public static renderFile(file: string, values: FileDataRecord) {
    if (!this.existsFile(file)) {
      throw new FilesError(`File not found: ${file}`, 'FILE_NOT_FOUND');
    }

    if (this.existsDirectory(file)) {
      throw new FilesError(`File is a directory: ${file}`, 'FILE_IS_DIRECTORY');
    }

    const fileFormat = file.split('.').pop();
    if (fileFormat !== 'hbs') {
      throw new FilesError(`File is not a template: ${file}`, 'FILE_IS_NOT_A_TEMPLATE');
    }

    const content = readFileSync(file, 'utf8');
    const template = handlebars.compile(content);
    return template(values);
  }

  /**
   * Searches for a file by traversing up the directory tree.
   *
   * @param file - The name of the file to find
   * @param startPath - The path to start searching from (defaults to current working directory)
   * @param stopPath - The path to stop searching at (defaults to user home directory)
   * @returns The path to the found file or null if not found
   * @throws {FilesError} If the start path is invalid
   *
   * @public
   * @example
   * ```ts
   * // Find package.json in parent directories
   * const packagePath = Files.findUp('package.json');
   *
   * // Find specific file starting from a custom path
   * const configPath = Files.findUp('config.yaml', '/custom/path');
   * ```
   */
  public static findUp(
    file: string,
    startPath: string = Files.CURRENT_WORKDIR,
    stopPath: string = Files.USER_HOME,
  ): string | null {
    if (existsSync(startPath) && !statSync(startPath).isDirectory()) {
      throw new FilesError(`Start path is a directory: ${startPath}`, 'INVALID_FIND_UP_PATH');
    }

    const path = join(startPath, file);

    if (existsSync(path)) {
      return path;
    }

    if (startPath === stopPath) {
      return null;
    }

    return Files.findUp(file, join(startPath, '..'), stopPath);
  }

  /**
   * Checks if a path exists and is a directory.
   *
   * @param path - The path to check
   * @returns True if the path exists and is a directory, false otherwise
   *
   * @public
   * @example
   * ```ts
   * if (Files.existsDirectory('src')) {
   *   // Do something
   * }
   * ```
   */
  public static existsDirectory(path: string) {
    return existsSync(path) && statSync(path).isDirectory();
  }

  /**
   * Checks if a path exists and is a file.
   *
   * @param path - The path to check
   * @returns True if the path exists and is a file, false otherwise
   *
   * @public
   * @example
   * ```ts
   * if (Files.existsFile('package.json')) {
   *   // Do something
   * }
   * ```
   */
  public static existsFile(path: string) {
    return existsSync(path) && !statSync(path).isDirectory();
  }
}

export { Files, FilesError };
export type { FileType, FileContent };
