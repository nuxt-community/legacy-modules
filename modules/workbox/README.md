# Workbox

> Workbox is a collection of JavaScript libraries for Progressive Web Apps. ([Learn more](https://github.com/GoogleChrome/workbox))

This module adds full offline support using workbox.

## Setup
 
- Add `@nuxtjs/workbox` dependency using yarn or npm to your project
- Add `@nuxtjs/workbox` module to `nuxt.config.js`:

```js
modules: [
   { 
     src: '@nuxtjs/workbox',
     options: {
        // options
     } 
   }
  ]
```

- Add generated assets to `.gitignore` file:
```
static/sw.js
static/workbox-sw.*.js
```
