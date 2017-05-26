# Google Analytics
Add Google Analytics to your nuxt.js application.
This plugins automatically sends first page and route change events to google analytics.

**Note:** google analytics is not enabled in dev mode.

## Setup
- Add `@nuxtjs/google-analytics` dependency using yarn or npm to your project
- Add `@nuxtjs/google-analytics` module to `nuxt.config.js`:
```js
  modules: [
   {
      src: '@nuxtjs/google-analytics',
      options: {
        ua: 'UA-XXXXXXXX-X'
      }
    },
  ]
````

