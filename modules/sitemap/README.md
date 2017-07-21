# Sitemap
Generate a [sitemap.xml](https://www.sitemaps.org/protocol.html) with no pain!

Module based on the awesome [sitemap](https://github.com/ekalinin/sitemap.js) ❤️

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
    excludes: [
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

The `excludes` parameter is an array of [glob patterns](https://github.com/isaacs/minimatch#features) to exclude static routes from the generated sitemap.

The `routes` parameter follows the same way than the `generate` configuration:  https://nuxtjs.org/api/configuration-generate/

See as well the routes examples bellow.

## Routes

Dynamic routes are ignored by the sitemap module.

Example:

```
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

Only the route `/` will be added to sitemap by the module.

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
    routes: function () {
      return axios.get('https://my-api/users')
      .then((res) => {
        return res.data.map((user) => {
          return '/users/' + user.id
        })
      })
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
    routes: function (callback) {
      axios.get('https://my-api/users')
      .then((res) => {
        var routes = res.data.map((user) => {
          return '/users/' + user.id
        })
        callback(null, routes)
      })
      .catch(callback)
    }
  }
}
```
