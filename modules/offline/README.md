# Offline
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
   [ '@nuxtjs/offline', { /* ... */ } ],
  ]
````
