# Google Tag Manager
Add Google Tag Manager (GTM) to your nuxt.js application.
This plugins automatically sends first page and route change events to GTM.

**Note:** google tag manager is not enabled in dev mode.
You can set environment variable `NODE_ENV` to `production` for testing in dev mode.


## Setup
- Add `@nuxtjs/google-tag-manager` dependency using yarn or npm to your project
- Add `@nuxtjs/google-tag-manager` module to `nuxt.config.js`:
```js
  modules: [
   {
      src: '@nuxtjs/google-tag-manager',
      options: {
        id:    'GTM-XXXXXXX', // (required)
        layer: 'dataLayer',
        env: {
          gtm_auth:        '...',
          gtm_preview:     '...',
          gtm_cookies_win: '...'
        }
      }
    },
  ]
````
