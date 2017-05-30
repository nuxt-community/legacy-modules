# Yandex Metrika
Add Yandex Metrika to your nuxt.js application.
This plugins automatically sends first page and route change events to yandex metrika.

[Documetation for Ya.Metrika](https://yandex.com/support/metrica/code/counter-initialize.xml), [hit method](https://yandex.com/support/metrica/objects/hit.xml)

**Note:** yandex metrika is not enabled in dev mode.
You can set environment variable `NODE_ENV` to `production` for testing in dev mode.


## Setup
- Add `@nuxtjs/yandex-metrika` dependency using yarn or npm to your project
- Add `@nuxtjs/yandex-metrika` module to `nuxt.config.js`:

```js
  modules: [
   {
      src: '@nuxtjs/yandex-metrika',
      options: {
        id: 'XXXXXX',
        // webvisor: true,
      }
    },
  ]
````
