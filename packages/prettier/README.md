<h1 align="center">
  <b>UnoKit Prettier</b>
</h1>

<p align="center">
  Prettier configurations for TypeScript with some useful third-party optional plugins already configured.
</p>

## ⚙️ Installation

Install the dependencies using your preferred package manager.

```bash
pnpm add -D @unokit/prettier prettier
```

> [!IMPORTANT]
> The `prettier` package is a required peer dependency. Please check the [Required Dependencies](#required-dependencies) section for more information.

## 💻 Usage

The configuration is done through the `prettierConfig` function. This function allows you to define more specific formatting rules and options tailored to your project's needs. To implement this, simply include the `prettierConfig` function in your `prettier.config.mjs` file, where you can specify various settings to enhance your code formatting experience.

### Basic Usage

```javascript
import prettierConfig from '@unokit/prettier';

export default prettierConfig();
```

### Using Plugins

Depending on your project needs, you can use the `prettierConfig` function to configure the integrated plugins you need. It is important to note that each plugin has its own configuration options. For example, the `sortImports` plugin has the `importOrder` option.

```javascript
import prettierConfig from '@unokit/prettier';

export default prettierConfig({
  plugins: ['sortImports', 'multilineArrays'],
  importOrder: [
    '^@unokit',
    '^@/',
    '^[./]',
  ],
});
```

### Using Single Plugin

```javascript
import prettierConfig from '@unokit/prettier';

// Only use sortImports plugin
export default prettierConfig({
  plugins: ['sortImports'],
  importOrder: ['^[./]', '^@unokit/(.*)$']
});

// Only use multilineArrays plugin
export default prettierConfig({
  plugins: ['multilineArrays']
});
```

### Extend with Custom Rules and Plugins

If you need to extend the configuration with custom rules and plugins, you can do so by extending the base configuration.

```javascript
import type { Config } from 'prettier';
import prettierConfig from '@unokit/prettier';

const baseConfig = prettierConfig({
  plugins: ['sortImports', 'multilineArrays'],
  importOrder: ['^[./]', '^@unokit/(.*)$']
});

const config: Config = {
  ...baseConfig,
  // Add custom rules
  singleQuote: false,
  printWidth: 120,
  // Add custom plugins
  plugins: [
    ...baseConfig.plugins,
    'prettier-plugin-packagejson',
  ],
};

export default config;
```

### 🔌 Integrated optional plugins

The following third-party plugins are integrated and available by default in the `prettierConfig` function:

| Plugin Name | Description | Options | Link |
|-------------|-------------|---------|------|
| `sortImports` | Sort imports alphabetically and group them by type | `importOrder`: String with a list of groups of imports | [https://github.com/trivago/prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports) |
| `multilineArrays` | Format multiline arrays | None | [https://github.com/trivago/prettier-plugin-multiline-arrays](https://github.com/electrovir/prettier-plugin-multiline-arrays) |

> [!IMPORTANT]
> If you want to use some of the optional plugins, please check the [Optional Dev Peer Dependencies](#optional-dev-peer-dependencies) section.

## 📦 Dependencies

### Required Dependencies <a id="required-dependencies"></a>

In order to use the `prettierConfig` function and get the best experience using your favorite Code Editor, you need to install the following peer dependencies:

- `prettier`: Required as the core formatting engine.

### Optional Peer Dependencies <a id="optional-dev-peer-dependencies"></a>

> [!IMPORTANT]
> The following packages are marked as optional dev peer dependencies because they are required
> if you want to use the `sortImports` or `multilineArrays` features.

- `@trivago/prettier-plugin-sort-imports`: Required for import sorting functionality.
- `prettier-plugin-multiline-arrays`: Required for multiline arrays formatting functionality.

In order to install the optional dev peer dependencies, you can use the following command:

```bash
pnpm add -D @trivago/prettier-plugin-sort-imports prettier-plugin-multiline-arrays
```

## 📄 License

Made with ❤️ by [@binaryshapes](https://github.com/binaryshapes)

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
