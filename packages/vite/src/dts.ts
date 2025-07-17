import { exec } from 'child_process';
import { existsSync } from 'fs';
import { type Plugin } from 'vite';

/**
 * Get the path to the tsconfig file.
 *
 * @returns The path to the tsconfig file.
 *
 * @internal
 */
function getTsConfigPath(): string {
  // Check either the tsconfig is a path or a file name.
  const possiblePaths = [
    'tsconfig.lib.json',
    'tsconfig.app.json',
    'tsconfig.json',
  ];

  const tsconfigPath = possiblePaths.find((path) => existsSync(process.cwd() + '/' + path));

  if (!tsconfigPath) {
    throw new Error('No tsconfig file found. Please create a tsconfig file.');
  }

  console.log('Using tsconfig file:', tsconfigPath);

  return tsconfigPath;
}

/**
 * A plugin to generate types for a library using tsc.
 *
 * @returns A Vite plugin to generate types for a library.
 *
 * @public
 */
const dtsPlugin: Plugin = {
  name: 'vite:dts-generator',
  async closeBundle() {
    try {
      // exec(`tsc --build --force --verbose ${getTsConfigPath()}`);
      exec(`tsc --project ${getTsConfigPath()}`);
      console.log('✓ types generated successfully!');
    } catch (error) {
      console.error('Error generating types');
      console.error(error);
    }
  },
};

export { dtsPlugin };
