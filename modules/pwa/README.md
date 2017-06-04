# PWA
> Progressive Web Apps (PWA) are reliable, fast, 
> and engaging, although there are many things that can take a PWA from a baseline to exemplary experience. 
([learn more](https://developers.google.com/web/progressive-web-apps))

This preset adds required modules for full PWA experience with Nuxt out-of-the-box!

## Modules
Use `options[module]` to customize each module or set to `false` to disable it.

### [manifest](../manifest)
> Adds [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) with no pain.

### [meta](../meta)
> Adds common HTML Meta tags.

### [workbox](../workbox)
> Adds full offline support using workbox.

### [optimize](../optimize)
> Adds more optional optimizers to nuxt project.

## Setup
- Add `@nuxtjs/pwa` dependency using yarn or npm to your project
- Add `@nuxtjs/pwa` module to `nuxt.config.js`:
```js
  modules: [
   '@nuxtjs/pwa'
  ]
````
