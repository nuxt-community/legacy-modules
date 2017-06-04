# Manifest
Adds [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) with no pain.

- Creates `static/manifest.json`
- Adds `<link rel=manifest>` to pages if not exits.
- Adds `<link rel=favicon>` to pages if not exits.
- Adds `<meta name=description>` to pages if not exits.
- Adds `<meta name=theme-color>` to pages if not exits.
- Adds `<html lang=>` lang to pages if not exits.
- Adds title to pages if not exits.

## Setup
- Add `@nuxtjs/manifest` dependency using yarn or npm to your project
- Add `@nuxtjs/manifest` module to `nuxt.config.js`:
```js
  modules: [
   '@nuxtjs/manifest'
  ]
````
- Add `static/icon.png` for your app icon.
- Add additional options to `nuxt.manifest` to override defaults:
```js
  manifest: {
      name: 'My Awesome App',
      dir: 'rtl'
  }
```
- Add `static/manifest*.json` to `.gitignore` file.
