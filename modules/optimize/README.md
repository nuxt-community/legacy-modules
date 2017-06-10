# Optimize (Preset)

[![npm](https://img.shields.io/npm/dt/@nuxtjs/optimize.svg?style=flat-square)](https://github.com/nuxt/modules/tree/master/modules/optimize)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/optimize/latest.svg?style=flat-square)](https://github.com/nuxt/modules/tree/master/modules/optimize)

> Adds more optional optimizers to nuxt project.

## Setup
- Add `@nuxtjs/optimize` dependency using yarn or npm to your project
- Add `@nuxtjs/optimize` to `modules` section of `nuxt.config.js`
```js
{
  modules: [
    // Simple usage
    '@nuxtjs/optimize',
  
    // With options
    [ '@nuxtjs/optimize', { /* options */ } ],
  ]
}
````

## Modules

### [cssnano](../cssnano)
- options: use `options.cssnano` to customize it.
