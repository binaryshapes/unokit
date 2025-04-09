<h1 align="center">UnoKit Tsup</h1>

<div align="center">
  <a href="https://github.com/binaryshapes/unokit" target="_blank">
    <img src="https://shields.io/badge/version-1.0.0-brightgreen.svg" alt="Version" />
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-^5.8.2-blue.svg" alt="TypeScript version" />
  </a>
  <a href="https://github.com/egoist/tsup">
    <img src="https://img.shields.io/badge/Tsup-^8.4.0-yellow.svg" alt="Tsup version" />
  </a>
</div>

<p align="center">
Just a base configuration for <a href="https://github.com/egoist/tsup">Tsup</a> tool to build friendly CommonJS/ESModules libraries and applications using TypeScript.
</p>

## 📦 Installation

```bash
# pnpm (recommended)
pnpm add -D @unokit/tsup

# npm
npm install -D @unokit/tsup

# yarn
yarn add -D @unokit/tsup
```

## 💻 Usage

The most relevant settings are:

```json
{
  "entry": ["src/index.ts"],
  "external": [],
  "outDir": "dist",
  "format": ['esm', 'cjs'],
}
```

for more information see the [Tsup documentation](https://github.com/egoist/tsup).

### Example

You can override or add any other options to the config by passing any other options to Tsup:

```ts
import config from '@unokit/tsup';
import { defineConfig } from 'tsup';

export default defineConfig({
  ...config,
  // Any other options you want to pass to Tsup
});
```

## 📄 License

Made with ❤️ by [@binaryshapes](https://github.com/binaryshapes)

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
