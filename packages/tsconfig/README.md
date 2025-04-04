<h1 align="center">
  <b>UnoKit Typescript</b>
</h1>

<p align="center">
    <a href=""><img src="https://shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white" alt="Typescript" /></a>
    <a href=""><img src="https://shields.io/badge/-NestJs-ea2845?logo=nestjs&logoColor=white" alt="Next.js" /></a>
    <a href=""><img src="https://shields.io/badge/-Next.js-000000?logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
</p>

<p align="center">
  Contains typescript presets used across <b>UnoKit</b> for different project types like Node, NestJS, NextJS, etc.
</p>

## Installation

```bash
pnpm add @unokit/tsconfig
```

## Usage

Depending on the project type, you can extend the following configurations:

### Node

```json
{
  "extends": "@unokit/tsconfig/node.json",
  // Rest of your configuration.
}
```

### NestJS

For NestJS projects, you can use the `nest.app.json` for application projects or `nest.lib.json` for library projects.

```json
{
  "extends": "@unokit/tsconfig/nest.json",
  // Rest of your configuration.
}
```

### NextJS

For NextJS projects, you can use the `nextjs.app.json` for application projects or `nextjs.lib.json` for library projects.

```json
{
  "extends": "@unokit/tsconfig/nextjs.app.json",
  // Rest of your configuration.
}
```
