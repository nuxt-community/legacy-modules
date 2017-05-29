## Vendor
This awesome little modules creates *junction symlinks* from `nodule_modules` into `static/vendor`
so you can directly serve node modules inside web. Useful for runtime dependencies.
  
## Usage
 
- Add `@nuxtjs/vendor` dependency using yarn or npm to your project
- Add `@nuxtjs/vendor` module to `nuxt.config.js`:
```js
  modules: [
   '@nuxtjs/vendor'
  ]
````
- Add `/static/vendor` to `.gitignore`
- Define your dependencies in `nuxt.config.json` inside `vendor` section:
```js
{
    vendor: ['ckeditor']
}
```
