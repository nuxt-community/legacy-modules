# Sitemap
[![npm](https://img.shields.io/npm/dt/@nuxtjs/sitemap.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/sitemap)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/sitemap/latest.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/sitemap)

> Automatically generate or serve dynamic [sitemap.xml](https://www.sitemaps.org/protocol.html) for Nuxt.js projects!

Module based on the awesome [sitemap](https://github.com/ekalinin/sitemap.js) package ❤️

## Setup
- Add `@nuxtjs/sitemap` dependency using yarn or npm to your project
- Add `@nuxtjs/sitemap` module to `nuxt.config.js`
```js
  modules: [
   '@nuxtjs/sitemap'
  ]
````
- Add additional options to `sitemap` section of `nuxt.config.js` to override defaults
```js
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://example.com',
    cacheTime: 1000 * 60 * 15,
    generate: false, // Enable me when using nuxt generate
    exclude: [
      '/secret',
      '/admin/**'
    ]
    routes: [
      '/page/1',
      {
        url: '/page/2',
        changefreq: 'daily',
        priority: 1,
        lastmodISO: '2017-06-30T13:30:00.000Z'
      }
    ]
  }
```

## Options

### `exclude`
The `exclude` parameter is an array of [glob patterns](https://github.com/isaacs/minimatch#features) to exclude static routes from the generated sitemap.

### `routes`
The `routes` parameter follows the same way than the `generate` [configuration](https://nuxtjs.org/api/configuration-generate).
   
See as well the [routes](#routes-1) examples below.

### `path`
- Default: `/sitemap.xml`

Where serve/generate sitemap file

### `hostname`
- Default: 
  - `hostname()` for generate mode
  - Dynamically based on request url for middleware mode

This values is **mondatory** for generation sitemap file, and you should explicitly provide it for generate mode.

### `generate`
- Default: `false`

Generates static sitemap file during build/generate instead of serving using middleware.

### `cacheTime`
- Default: `1000 * 60 * 15` (15 Minutes)

Defines how friequently should sitemap **routes** being updated.
This option is only effective when `generate` is `false`.
Pleae note that after each invalidation, `routes` will be evalouated again. (See [routes](#routes-1) section)

## Routes

Dynamic routes are ignored by the sitemap module.

Example:

```
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

If you want the module to add routes with dynamic params, you need to set an array of dynamic routes.

We add routes for `/users/:id` in `nuxt.config.js`:

```js
  sitemap: {
    routes: [
      '/users/1',
      '/users/2',
      '/users/3'
    ]
  }
```

### Function which returns a Promise

`nuxt.config.js`
```js
const axios = require('axios')

module.exports = {
  sitemap: {
    routes () {
      return axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => res.data.map(user =>  '/users/' + user.username))
    }
  }
}
```

### Function with a callback

`nuxt.config.js`
```js
const axios = require('axios')

module.exports = {
  sitemap: {
    routes (callback) {
      axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        let routes = res.data.map(user => '/users/' + user.username)
        callback(null, routes)
      })
      .catch(callback)
    }
  }
}
```

### Contributors
- [Nicolas PENNEC](https://github.com/NicoPennec)
- [Pooya Parsa](https://github.com/pi0)