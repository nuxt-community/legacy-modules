## Manifest
**This module is not stable yet.**

Adds [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) with no pain.

- Creates `static/manifest.json`
- Adds `<link rel=manifest>` to pages if not exits.
- Adds `<link rel=favicon>` to pages if not exits.
- Adds `<meta name=description>` to pages if not exits.
- Adds `<meta name=theme-color>` to pages if not exits.
- Adds title to pages if not exits.

#### 💡 Usage
 
- Add `manifest` module
- Add `static/icon.png` for your app icon.
- Add additional options to `nuxt.manifest` to override defaults:

```js
manifest:{
    name:'My Awesome App',
    dir:'rtl'
}
```