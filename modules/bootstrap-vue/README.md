# BootstrapVue
[![npm](https://img.shields.io/npm/dt/@nuxtjs/bootstrap-vue.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/bootstrap-vue)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/bootstrap-vue/latest.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/bootstrap-vue)

> With [bootstrap-vue](https://github.com/bootstrap-vue/bootstrap-vue) you can easily use standard bootstrap 4 components with your app.

## Setup
- Add `@nuxtjs/bootstrap-vue` dependency using yarn or npm to your project
- Add `@nuxtjs/bootstrap-vue` to `modules` section of `nuxt.config.js`
```js
{
  modules: [
    // Simple usage
    '@nuxtjs/bootstrap-vue',
    
    // With options
    ['@nuxtjs/bootstrap-vue', { css: false }],
  ]
}
````

## Usage
```vue
<template>
    <b-alert show>
        Hello Bootstrap!
    </b-alert>
</template>
```

## Options

### `css`
Default: `true`

Add Bootstrap 4 css files to global CSS. You may want to disable this if you have a custom bootstrap build. 
