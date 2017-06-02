# Component Cache
> vue-server-renderer has built-in support for [component-level caching](http://ssr.vuejs.org/en/caching.html#component-level-caching).
> This module automatically adds a LRU cache to project.

# Setup
 
- Add `@nuxtjs/component-cache` dependency using yarn or npm to your project
- Add `@nuxtjs/component-cache` module to `nuxt.config.js`:

```js
modules: [
   { 
     src: '@nuxtjs/component-cache',
     options: {
        // max: 10000
        // maxAge: 1000 * 60 * 15
     } 
   }
  ]
```
