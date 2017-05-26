## Toast
Easy toasts for your app using [mini-toastr](https://github.com/se-panfilov/mini-toastr).

## Setup
- Add `@nuxtjs/toast` dependency using yarn or npm to your project
- Add `@nuxtjs/toast` module to `nuxt.config.js`:
```js
  modules: [
   '@nuxtjs/toast'
  ]
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
