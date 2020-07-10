# Toast
[![npm](https://img.shields.io/npm/dt/@nuxtjs/toast.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/toast)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/toast/latest.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/toast)

> 😍 Responsive Touch Compatible Toast plugin for Nuxt.js using [vue-toasted](https://github.com/shakee93/vue-toasted)

## Setup
- Add `@nuxtjs/toast` dependency using yarn or npm to your project
- Add `@nuxtjs/toast` to `compilerOptions`/`types` section of `tsconfig.json` to add typescript support [optional]
- Add `@nuxtjs/toast` to `modules` section of `nuxt.config.js`

```js
{
  modules: [
   '@nuxtjs/toast',
  ],

  toast: {
      position: 'top-center',
      register: [ // Register custom toasts
        {
          name: 'my-error',
          message: 'Oops...Something went wrong',
          options: {
            type: 'error'
          }
        }
      ]
  }
}
```

If you need material icons, you have to manually install `material-design-icons` dependency too.

## Usage
You can use **$toast** (instead of `$toasted`) in almost any context using `app.$toast` or `this.$toast` (Including store actions).

See [toasted official docs](https://github.com/shakee93/vue-toasted) for more usage information.

```js
export default {
   methods:{
     async login() {
         try {
             this.$toast.show('Logging in...')
             await this.$axios.$post('auth/login')
             this.$toast.success('Successfully authenticated')
         } catch(e){
             this.$toast.global.my_error() //Using custom toast
             this.$toast.error('Error while authenticating')
         }
     }  
   }
}
```
