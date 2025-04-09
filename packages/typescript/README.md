<h1 align="center">
  <b>UnoKit TypeScript</b>
</h1>

<p align="center">
    <a href="https://github.com/binaryshapes/unokit" target="_blank">
      <img src="https://shields.io/badge/version-1.0.0-brightgreen.svg" alt="Version" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="https://img.shields.io/badge/TypeScript-^5.8.2-blue.svg" alt="TypeScript version" />
    </a>
    <a href="https://github.com/binaryshapes/unokit" target="_blank">
      <img src="https://shields.io/badge/NestJs-11.0.13-ea2845?logo=nestjs&logoColor=white" alt="NestJS" />
    </a>
    <a href="https://github.com/binaryshapes/unokit" target="_blank">
      <img src="https://shields.io/badge/Next.js-15.2.5-282828?logo=nextdotjs&logoColor=white" alt="Next.js" />
    </a>
</p>

<p align="center">
   Miscellaneous TypeScript configurations for different kind of projects like Node, NestJS, NextJS, and more.
</p>

## 📦 Installation

```bash
pnpm add @unokit/typescript
```

## 💻 Usage

Depending on the project type, you can extend the following configurations:

### Node

```jsonc
{
  "extends": "@unokit/typescript/node.json",
  // Rest of your configuration.
}
```

### NestJS

For NestJS projects, you can use the `nest.app.json` for application projects or `nest.lib.json` for library projects.

```jsonc
{
  "extends": "@unokit/typescript/nest.lib.json",
  // Rest of your configuration.
}
```

### NextJS

For NextJS projects, you can use the `nextjs.app.json` for application projects or `nextjs.lib.json` for library projects.

```jsonc
{
  "extends": "@unokit/typescript/nextjs.app.json",
  // Rest of your configuration.
}
```

### Base config

Also, we provide a base configuration that you can extend to create your own configuration.

```jsonc
{
  "extends": "@unokit/typescript/base.json",
  // Rest of your configuration.
}
```

> [!TIP]
> UnoKit uses this base configuration for its libraries 😎

## 📄 License

Made with ❤️ by [@binaryshapes](https://github.com/binaryshapes)

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
