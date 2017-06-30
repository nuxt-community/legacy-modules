# Offline
[![npm](https://img.shields.io/npm/dt/@nuxtjs/offline.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/offline)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/offline/latest.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/offline)

**This module only works in production mode**

## Note: Please prefer using [workbox](../workbox) module instead for full offline support.

- Registers service worker
- Scopes `cacheName` to allow having multi apps in same domain.

## Setup
- Add `@nuxtjs/offline` dependency using yarn or npm to your project
- Add `@nuxtjs/offline` to `modules` section of `nuxt.config.js`
```js
  modules: [
    // Simple usage
   '@nuxtjs/offline',

   // With options
   ['@nuxtjs/offline', { /* ... */ }],
  ]
````
