# Google Analytics
[![npm](https://img.shields.io/npm/dt/@nuxtjs/google-analytics.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/google-analytics)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/google-analytics/latest.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/google-analytics)

> Add Google Analytics to your nuxt.js application.
This plugins automatically sends first page and route change events to google analytics.

**Note:** google analytics is not enabled in `dev` mode.
You can set environment variable `NODE_ENV` to `production` for testing in dev mode. 

## Setup
- Add `@nuxtjs/google-analytics` dependency using yarn or npm to your project
- Add `@nuxtjs/google-analytics` to `modules` section of `nuxt.config.js`
```js
  modules: [
    ['@nuxtjs/google-analytics', { ua: 'UA-XXXXXXXX-X' }],
  ]
````

## Options

### `ua`
- Required

Google Analytics ID. Should be in form of `UA-XXXXXXXX-X`
