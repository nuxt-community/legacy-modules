# RealFaviconGenerator Icon
[![npm](https://img.shields.io/npm/dt/@nuxtjs/rfg-icon.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/rfg-icon)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/rfg-icon/latest.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/rfg-icon)

> Automatically generates app icons and favicon with different sizes using [rfg-api](https://github.com/RealFaviconGenerator/rfg-api).

- This module adds link and meta tags for the appropiate favicon's to `head`
- The generated manifest.json is added to `manifest`, so does not overwrite existing properties

## Setup
- Add `@nuxtjs/rfg-icon` dependency using yarn or npm to your project
- Add `@nuxtjs/rfg-icon` to `modules` section of `nuxt.config.js` _before_ `@nuxtjs/manifest`

```js
  modules: [
    // Simple usage
   '@nuxtjs/icon',
   '@nuxtjs/manifest', 
   
   // With options
   ['@nuxtjs/icon', { masterPicture: '' }],

   // or use global options
   'rfgicon': {
      masterPicture: 'static/icon.png',
   }
  ]
````
- Create `static/icon.png`. Recommended to be square png and >= `512x512px`

## Options

### masterPicture
- Default: `[srcDir]/static/icon.png`

### other options

See [realfavicongenerator.net](https://realfavicongenerator.net/) for a full list of options. Easiest is uploading your image on the website and choose your settings. Next click on `Generate favicons`, click on the tab `Node CLI` and copy the contents of the `faviconDescription.json` file to your `nuxt.config.js`

