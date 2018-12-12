# Vuetify
[![npm](https://img.shields.io/npm/dt/@nuxtjs/vuetify.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/vuetify)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/vuetify/latest.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/vuetify)

> Add [Vuetify](https://github.com/vuetifyjs/vuetify) Material Component Framework.

## Setup
- Add `@nuxtjs/vuetify` dependency using yarn or npm to your project
- Add `@nuxtjs/vuetify` to `modules` section of `nuxt.config.js`
```js
{
  modules: [
    '@nuxtjs/vuetify'
  ],

  vuetify: {
    // Vuetify options
    //  theme: { }
  }
}
```

## Module options

### `materialIcons`
- Default: `true`
Adds **Material Icons** from google fonts api.

### `css`
- Default: `true`
Adds `vuetify.css` to the start of `options.css[]`

### `treeShake`
- Default: `false`
Uses [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) to enable automatic [tree-shaking](https://vuetifyjs.com/en/guides/a-la-carte).
Make sure you add the `vuetify-loader` dependency using yarn or npm to your project first.

# License 

MIT
