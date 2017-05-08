## Toast
Easy toasts for your app using [mini-toastr](https://github.com/se-panfilov/mini-toastr).

#### 💡 Usage

- Add `toast` module

Then you can define notification in your routes or components:

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