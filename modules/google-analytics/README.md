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

### Setting Analytics.js Fields at runtime
You can add additional [fields](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference)
to GA (```ga('set', field, value)```) at runtime by adding analytics object
the ```route.meta.analytics``` in the middleware or to the selected pages.

Middleware example:
```javascript
export default function ({ route, store }) {
  route.meta.analytics = {
    anonymizeIp: true,
    userId: store.state.userId
  }
}

```

### Setting Analytics.js Fields at runtime for selected pages
Adding analytics fields to the selected pages it is really useful for example for the 
[Google Analytics Content Experiments](https://developers.google.com/analytics/solutions/experiments-client-side).
Let's say we want to split audience 50/50. On half will see original page, the other one new version.
Then we can check which one has lower bounce rate

```
<template>
  <div>
    <h1 v-if="expVarId === 1">New Content</h1>
    <h1 v-else>Original Content</h1>
  </div>
</template>
<script>
  export default {

    analytics (from, to, store) {
      return { expId: '1234567890', expVar: store.getters.expVarId }
    },
    [...]
  }
</script>
``` 
