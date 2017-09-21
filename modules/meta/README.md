# Meta
[![npm](https://img.shields.io/npm/dt/@nuxtjs/meta.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/meta)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/meta/latest.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/meta)

> Easily adds common meta tags into your project with zero-config needed.
This module is compatible with [manifest](../manifest) module.

## Setup
- Add `@nuxtjs/meta` dependency using yarn or npm to your project
- Add `@nuxtjs/meta` to `modules` section of `nuxt.config.js`
```js
{
  modules: [
    '@nuxtjs/meta',
  ]
} 
````
- You can optionally override meta using `manifest` section of `nuxt.config.js`
```js
{
  manifest: {
    // ...
  }
}
``` 

## What's included ?
Meta / Link                            | Customize With       |   Default value 
---------------------------------------|----------------------|-------------------
`charset`                              | `charset`            | `utf-8`
`viewport`                             | `viewport`           | `width=device-width, initial-scale=1, minimal-ui`
`mobile-web-app-capable`               | `mobileApp`          | `true`
`apple-mobile-web-app-status-bar-style`| `appleStatusBarStyle`| `default`
`shortcut icon` + `apple-touch-icon`   | `favicon`            | options.icons[0].src
`title`                                | `name`               | npm_package_name
`description`                          | `description`        | npm_package_description
`theme-color`                          | `theme_color`        | options.loading.color
`lang`                                 | `lang`               | `en`
`og:type`                              | `ogType`             | `website`
`og:title`                             | `ogTitle`            | same as options.name
`og:description`                       | `ogDescription`      | same as options.description
