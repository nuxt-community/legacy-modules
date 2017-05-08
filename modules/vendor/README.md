## Vendor
This awesome little modules creates *junction symlinks* from `nodule_modules` into `static/vendor`
so you can directly serve node modules inside web. Useful for runtime dependencies.
  
#### 💡 Usage
 
- Add `vendor` module
- Add `/static/vendor` to `.gitignore`
- Define your dependencies in `nuxt.config.json` inside `vendor` section:
```js
{
    vendor: ['ckeditor']
}
```