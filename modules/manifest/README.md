# Manifest
[![npm](https://img.shields.io/npm/dt/@nuxtjs/manifest.svg?style=flat-square)](https://github.com/nuxt/modules/tree/master/modules/manifest)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/manifest/latest.svg?style=flat-square)](https://github.com/nuxt/modules/tree/master/modules/manifest)

> Adds [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) with no pain!

## Setup
- Add `@nuxtjs/manifest` dependency using yarn or npm to your project
- Add `@nuxtjs/manifest` to `modules` section of `nuxt.config.js`
```js
{
  modules: [
   '@nuxtjs/manifest'
  ]
}
````
- Add additional options to `manifest` section of `nuxt.config.js` to override defaults
```js
{
  manifest: {
    name: 'My Awesome App',
    lang: 'fa'
  }
}
```
