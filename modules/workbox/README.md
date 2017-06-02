# Workbox (WIP)

# Setup
 
- Add `@nuxtjs/workbox` dependency using yarn or npm to your project
- Add `@nuxtjs/workbox` module to `nuxt.config.js`:

```js
modules: [
   { 
     src: '@nuxtjs/workbox',
     options: {
        // options
     } 
   }
  ]
```

- Add generated assets to `.gitignore` file:
```
static/sw.js
static/workbox-sw.*.js
```
