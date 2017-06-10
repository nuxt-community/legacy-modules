# Optimize Preset
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
