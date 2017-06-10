# Prepack
[![npm](https://img.shields.io/npm/dt/@nuxtjs/prepack.svg?style=flat-square)](https://github.com/nuxt/modules/tree/master/modules/prepack)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/prepack/latest.svg?style=flat-square)](https://github.com/nuxt/modules/tree/master/modules/prepack)

> Prepack is a tool that optimizes JavaScript source code: Computations that can be done at compile-time instead of run-time get eliminated. 
> Prepack replaces the global code of a JavaScript bundle with equivalent code that is a simple sequence of assignments. 
> This gets rid of most intermediate computations and object allocations. ([more info](https://prepack.io))

## Not Working!! Contributions Welcome!!

This module adds prepack using [prepack-webpack-plugin](https://github.com/gajus/prepack-webpack-plugin)

# Setup
 
- Add `@nuxtjs/prepack` dependency using yarn or npm to your project
- Add `@nuxtjs/prepack` to `modules` section of `nuxt.config.js`
```js
{
  modules: [
    // Simple usage
    '@nuxtjs/prepack',

    // With options
    [ '@nuxtjs/prepack', { /* options */ } ],
  ]
}
```
