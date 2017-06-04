# Prepack

> Prepack is a tool that optimizes JavaScript source code: Computations that can be done at compile-time instead of run-time get eliminated. 
> Prepack replaces the global code of a JavaScript bundle with equivalent code that is a simple sequence of assignments. 
> This gets rid of most intermediate computations and object allocations. ([more info](https://prepack.io))

## Not Working!! Contributions Welcome!!

This module adds prepack using [prepack-webpack-plugin](https://github.com/gajus/prepack-webpack-plugin)

# Setup
 
- Add `@nuxtjs/prepack` dependency using yarn or npm to your project
- Add `@nuxtjs/prepack` module to `nuxt.config.js`:

```js
modules: [
   { 
     src: '@nuxtjs/prepack',
     options: {
        // options
     } 
   }
  ]
```
