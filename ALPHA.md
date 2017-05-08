## Alpha Testing

Nuxt.js modules system is not released yet. So until then you can use a wrapper to preview nuxt modules.

1- Install `nuxt-modules` package:
```bash
# YARN
yarn add nuxt-modules

# NPM
npm install nuxt-modules

```

2- Change your `nuxt.config.js`:

```js
const NuxtModules = require('nuxt-modules');

module.exports = NuxtModules({
    // ...
    // Your nuxt config
    // ...
    modules: [
      // Modules to be used (they can be package name or imported module)
      // You have to install modules package first
      '@nuxtjs/axios',
      '@nuxtjs/offline'
    ]
})
```
