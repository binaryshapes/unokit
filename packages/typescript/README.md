<h1 align="center">
  <b>📦 @nuxo/typescript</b>
</h1>

<p align="center">
    <a href="https://github.com/binaryshapes/unokit"><img src="https://shields.io/badge/version-1.0.0-brightgreen.svg" alt="Version" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-^5.8.2-blue.svg" alt="TypeScript version" /></a>
</p>

<p align="center">
   Miscellaneous TypeScript configurations for different kind of projects like Node, Jest, Vite, Tsup, Vitest, NextJS, NestJS, and more.
</p>

## 📦 Installation

```bash
pnpm add @nuxo/typescript
```

## 💻 Usage

Depending on the project type, you can extend the following configurations:

### Node

```jsonc
{
  "extends": "@nuxo/typescript/node.json",
  // Rest of your configuration.
}
```

### NestJS

For NestJS projects, you can use the `nest.app.json` for application projects or `nest.lib.json` for library projects.

```jsonc
{
  "extends": "@nuxo/typescript/nest.lib.json",
  // Rest of your configuration.
}
```

### NextJS

For NextJS projects, you can use the `nextjs.app.json` for application projects or `nextjs.lib.json` for library projects.

```jsonc
{
  "extends": "@nuxo/typescript/nextjs.app.json",
  // Rest of your configuration.
}
```

### Base config

Also, we provide a base configuration that you can extend to create your own configuration.

```jsonc
{
  "extends": "@nuxo/typescript/base.json",
  // Rest of your configuration.
}
```

> [!TIP]
> Nuxo uses this base configuration for its libraries 😎

## 📄 License

Made with ❤️ by [@binaryshapes](https://github.com/binaryshapes)

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
