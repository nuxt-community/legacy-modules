# PWA
[![npm](https://img.shields.io/npm/dt/@nuxtjs/pwa.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/pwa)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/pwa/latest.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/pwa)

> Progressive Web Apps (PWA) are reliable, fast, 
> and engaging, although there are many things that can take a PWA from a baseline to exemplary experience. 
([learn more](https://developers.google.com/web/progressive-web-apps))

This preset adds required modules for full PWA experience with Nuxt with _almost_ zero-config!

## Setup
- Add `@nuxtjs/pwa` dependency using yarn or npm to your project
- Add `@nuxtjs/pwa` to `modules` section of `nuxt.config.js`
```js
  modules: [
   // Simple usage
   '@nuxtjs/pwa',
   
   // With options
   ['@nuxtjs/pwa', { optimize: false }],
  ]
````

## Modules
Use `options[module]` to customize each module or set to `false` to disable it.

### [icon](../icon)

### [manifest](../manifest)

### [meta](../meta)

### [workbox](../workbox)

### [optimize](../optimize)
