# Component Cache
> vue-server-renderer has built-in support for [component-level caching](http://ssr.vuejs.org/en/caching.html#component-level-caching).
> This module automatically adds a LRU cache to project.

## Setup
- Add `@nuxtjs/component-cache` dependency using yarn or npm to your project
- Add `@nuxtjs/component-cache` to `modules` section of `nuxt.config.js`
```js
{
  modules: [
    // Simple usage
    '@nuxtjs/component-cache',
    
    // With options
    [ '@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 } ],
  ]
}
```

## Options
See [component-level caching](http://ssr.vuejs.org/en/caching.html#component-level-caching) for mor information.

### `max`
- default: `10000`

### `maxAge`
- default: `1000 * 60 * 15` (15 minutes)
