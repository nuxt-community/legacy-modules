# BootstrapVue
With [bootstrap-vue](https://github.com/bootstrap-vue/bootstrap-vue) you can easily use standard bootstrap 4 components with your app.
(you need to add bootstrap package in your package.json too)

## Setup
- Add `@nuxtjs/bootstrap-vue` dependency using yarn or npm to your project
- Add `@nuxtjs/bootstrap-vue` module to `nuxt.config.js`:
```js
  modules: [
    '@nuxtjs/bootstrap-vue'
  ]
````

## Usage
```vue
<template>
    <b-alert show>
        Hello Bootstrap!
    </b-alert>
</template>
```
