# Offline
**This module only works in production mode**

- Registers service worker
- Scopes `cacheName` to allow having multi apps in same domain.

## Setup
- Add `@nuxtjs/offline` dependency using yarn or npm to your project
- Add `@nuxtjs/offline` module to `nuxt.config.js`:
```js
  modules: [
   '@nuxtjs/offline'
  ]
````
