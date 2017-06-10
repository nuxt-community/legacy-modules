# Toast
[![npm](https://img.shields.io/npm/dt/@nuxtjs/toast.svg?style=flat-square)](https://github.com/nuxt/modules/tree/master/modules/toast)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/toast/latest.svg?style=flat-square)](https://github.com/nuxt/modules/tree/master/modules/toast)

> Easy toasts for your app using [mini-toastr](https://github.com/se-panfilov/mini-toastr).

## Setup
- Add `@nuxtjs/toast` dependency using yarn or npm to your project
- Add `@nuxtjs/toast` to `modules` section of `nuxt.config.js`
```js
{
  modules: [
   '@nuxtjs/toast',
  ]
}
````

## Usage
```js
export default {
   methods:{
     async login() {
         try {
             await this.$post('auth/login');
             this.$success('Welcome :)');
         } catch(e){
             this.$error('Error while authenticating');
         }
     }  
   }
}
```
