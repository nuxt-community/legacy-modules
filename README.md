# Nuxt Modules

⚡️ Under Heavy improvements, Please use [old](https://github.com/fandogh/nuxt-modules/tree/old) branch for now.

Amazing things coming soon :) 

## Getting started

1- Install nuxt-modules package:
```bash
# YARN
yarn add nuxt-modules

# NPM
npm install nuxt-modules

```

2- Change your `nuxt.config.js`:

```js
const NuxtModules = require('nuxt-modules');

module.exports = NuxtModules([
    /* modules here */
], {
    // Your nuxt config
})
```

**3- Add `.nuxt-modules` to your `.gitignore` file**

## Available modules
- [axios](modules/axios)
- [bootstrap](modules/bootstrap-vue)
- [toast](modules/toast)
- [auth](modules/auth-store)
- [font-awesome](modules/font-awesome)
- [meta](modules/meta)
- [optimize](modules/optimize)
- [offline](modules/offline)
- [manifest](modules/manifest)
- [vendor](modules/vendor)


# Modules Development Guide [WIP]
Nuxt has powerful SDK which allows you write your own modules and share them with community.

See [MODULES](MODULES.md) 




