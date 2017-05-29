# BrowserConfig
Adds [XML browser configuration](https://msdn.microsoft.com/en-us/library/bg183312\(v=vs.85\).aspx) support.
(Useful for internet explorer and Edge)

> Browser configuration files (also known as browserconfig) can be used to define pinned site customizations,
> such as tile backgrounds, badge updates, and tile notifications. Browser configuration files let you set
> these customizations using external XML files rather than metadata within the HTML markup of a webpage.

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
    tile: {
      square150x150logo: {'@':{src:'icon.png'}},
      TileColor: '#3f51b5'
    }
  }
```
