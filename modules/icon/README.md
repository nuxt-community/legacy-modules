# Icon
> Automatically generates app icons and favicon with different sizes using [jimp](https://github.com/oliver-moran/jimp).

- This module fills `manifest.icons[]` with proper paths to generated assets that is used by [manifest](../manifest) module. 
- Source icon is being resized using *cover* method. 

## Setup
- Add `@nuxtjs/icon` dependency using yarn or npm to your project
- Add `@nuxtjs/icon` module to `nuxt.config.js`:
```js
  modules: [
   '@nuxtjs/icon'
  ]
````
- Create `static/icon.png`
  - Recommended to be square png and >= `512x512px`
  - To customize path you can use `iconSrc` option (can be relative/absolute path or URL).
