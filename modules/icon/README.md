# Icon
[![npm](https://img.shields.io/npm/dt/@nuxtjs/icon.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/icon)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/icon/latest.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/icon)

> Automatically generates app icons and favicon with different sizes using [jimp](https://github.com/oliver-moran/jimp).

- This module fills `manifest.icons[]` with proper paths to generated assets that is used by [manifest](../manifest) module. 
- Source icon is being resized using *cover* method. 

## Setup
- Add `@nuxtjs/icon` dependency using yarn or npm to your project
- Add `@nuxtjs/icon` to `modules` section of `nuxt.config.js`
```js
  modules: [
    // Simple usage
   '@nuxtjs/icon',
   
   // With options
   [ '@nuxtjs/icon', { iconSrc: '' } ],
  ]
````
- Create `static/icon.png`. Recommended to be square png and >= `512x512px`

## options

### `iconSrc`
- Default: `[srcDir]/static/icon.png`

### `sizes`
- Default: `[16, 120, 144, 152, 192, 384, 512]`

Array of sizes to be generated (Square). 
