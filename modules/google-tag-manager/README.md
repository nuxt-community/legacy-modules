# Google Tag Manager
[![npm](https://img.shields.io/npm/dt/@nuxtjs/google-tag-manager.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/google-tag-manager)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/google-tag-manager/latest.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/google-tag-manager)

> Add Google Tag Manager (GTM) to your nuxt.js application.
This plugins automatically sends first page and route change events to GTM.

**Note:** google tag manager is not enabled in dev mode.
You can set environment variable `NODE_ENV` to `production` for testing in dev mode.

## Setup
- Add `@nuxtjs/google-tag-manager` dependency using yarn or npm to your project
- Add `@nuxtjs/google-tag-manager` to `modules` section of `nuxt.config.js`
```js
  modules: [
   ['@nuxtjs/google-tag-manager', { id: 'GTM-XXXXXXX' }],
  ]
```

## Options

### `id`
- Required
Should be in form of `GTM-XXXXXXX`

### Other options
```js
{
  layer: 'dataLayer',
  env: {
    gtm_auth:        '...',
    gtm_preview:     '...',
    gtm_cookies_win: '...'
  },
  scriptURL: '//example.com'
}
```
