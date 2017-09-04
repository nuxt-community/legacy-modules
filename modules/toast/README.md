# Toast
[![npm](https://img.shields.io/npm/dt/@nuxtjs/toast.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/toast)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/toast/latest.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/toast)

> 😍 Responsive Touch Compatible Toast plugin for Nuxt.js using [vue-toasted](https://github.com/shakee93/vue-toasted)

## Setup
- Add `@nuxtjs/toast` dependency using yarn or npm to your project
- Add `@nuxtjs/toast` to `modules` section of `nuxt.config.js`

```js
{
  modules: [
   '@nuxtjs/toast',
  ],

  toast: {
      position: 'center'
  }
}
```

## Usage

See [toasted official docs](https://github.com/shakee93/vue-toasted) for more usage information.

```js
export default {
   methods:{
     async login() {
         try {
             await this.$axios.$post('auth/login')
             this.$toasted.show('Welcome :)')
         } catch(e){
             this.$toasted.show('Error while authenticating')
         }
     }  
   }
}
```