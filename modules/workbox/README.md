# Workbox
[![npm](https://img.shields.io/npm/dt/@nuxtjs/workbox.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/workbox)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/workbox/latest.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/workbox)

> Workbox is a collection of JavaScript libraries for Progressive Web Apps.
([Learn more](https://github.com/GoogleChrome/workbox))

This module adds full offline support using workbox.

## Setup
- Add `@nuxtjs/workbox` dependency using yarn or npm to your project
- Add `@nuxtjs/workbox` to `modules` section of `nuxt.config.js`
```js
modules: [
  // Simple usage
  '@nuxtjs/workbox',
  
  // With options
  [ '@nuxtjs/workbox', { /* options */ } ],
]
```
- Add generated assets to `.gitignore` file:
```
static/sw.js
static/workbox-sw*.js
```

## Options
For list of available options
see [generateSW](https://workboxjs.org/reference-docs/latest/module-workbox-build.html#.generateSW).
