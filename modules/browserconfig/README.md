# BrowserConfig
[![npm](https://img.shields.io/npm/dt/@nuxtjs/browserconfig.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/browserconfig)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/browserconfig/latest.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/browserconfig)

Adds [XML browser configuration](https://msdn.microsoft.com/en-us/library/bg183312\(v=vs.85\).aspx) support.
(Useful for internet explorer and Edge)

> Browser configuration files (also known as browserconfig) can be used to define pinned site customizations,
> such as tile backgrounds, badge updates, and tile notifications. Browser configuration files let you set
> these customizations using external XML files rather than metadata within the HTML markup of a webpage.

- Creates `static/browserconfig.xml`
- Adds `<meta name=msapplication-config>` to pages if not exits.

## Setup
- Add `@nuxtjs/browserconfig` dependency using yarn or npm to your project
- Add `@nuxtjs/browserconfig` to `modules` section of `nuxt.config.js`
```js
{
  modules: [
    // Simple usage
    '@nuxtjs/browserconfig',
    
    // With options
    [ '@nuxtjs/browserconfig', { TileColor: '#3f51b5' } ],
  ],

  // You can optionally use global options instead of inline form
  browserconfig: {
    TileColor: '#3f51b5',
    square150x150logo: {'@':{src:'icon.png'}}
  }
}
````
