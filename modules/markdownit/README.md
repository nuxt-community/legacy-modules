# Markitdown

Using [markdownit-loader](https://github.com/BlueOakJS/markdownit-loader) and [markdown-it](https://github.com/markdown-it/markdown-it)

## Setup 
- Add `@nuxtjs/markdownit` dependency using yarn or npm to your project
- Add `@nuxtjs/markdownit` to `modules` section of `nuxt.config.js`
```js
modules: [
  // Simple usage
  '@nuxtjs/markdownit',
  
  // With options
  [ '@nuxtjs/markdownit', { linkify: true } ]
]
```

## Usage

### Using `.vue` files

`hello.vue`:
```html
<template lang="md">
  # Hello World!
</template>
```

### Using `.md` files

`hello.md`
```md
# Hello World!!
```

`hello.vue`
```html
<template>
  <div v-html="hello"></div>
</template>

<script>
  import hello from '../hello.md'

  export default {
    computed: {
      hello() {
        return hello
      }
    }
  }
</script>
```

## Options

For full options list see [official docs](https://github.com/markdown-it/markdown-it)
