# Auth Store (WIP)

## Setup
- Add `@nuxtjs/auth` dependency using yarn or npm to your project
- Add `@nuxtjs/auth` module to `nuxt.config.js`
```js
  modules: [
    '@nuxtjs/auth'
  ]
````

## Options
- **default_user** : Default fields for `state.auth.user`. (overrides using Object.assign when logged-in).
- **token_cookie** : Token cookie opts. (see [js-cookie docs](https://github.com/js-cookie/js-cookie) for more info)
