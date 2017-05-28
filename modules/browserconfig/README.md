# Manifest
Adds [XML browser configuration](https://msdn.microsoft.com/en-us/library/bg183312\(v=vs.85\).aspx) with no pain.

- Creates `static/browserconfig.xml`
- Adds `<meta name=msapplication-config>` to pages if not exits.

## Setup
- Add `@nuxtjs/browserconfig` dependency using yarn or npm to your project
- Add `@nuxtjs/browserconfig` module to `nuxt.config.js`:
```js
  modules: [
   '@nuxtjs/browserconfig'
  ]
````
- Add `static/icon.png` for your app icon.
- Add additional options to `nuxt.browserconfig` to override defaults:
```js
  browserconfig: {
    square150x150logo: {'@':{src:'icon.png'}},
    TileColor: '#3f51b5'
  }
```