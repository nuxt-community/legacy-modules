# plugin-utils
[![npm](https://img.shields.io/npm/dt/@nuxtjs/plugin-utils.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/plugin-utils)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/plugin-utils/latest.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/plugin-utils)

> A helper package for nuxt plugins

### Available features:

## Logging

If your nuxt plugin writes output (during build) you should import the `log` and/or `error` methods. Errors are printed in red and normal logs in purple. It is recommended to use your plugin's package name as the log identifier so users will know from which plugin the message originated.

These log methods are replaced with noop handlers for production builds.

#### Usage
```js
module.exports.meta = require('./package.json')
const log = require('@nuxtjs/plugin-utils').log(module.exports.meta.name)
const error = require('@nuxtjs/plugin-utils').error(module.exports.meta.name)

log('information about what the plugin is doing during build') // printed in purple
error('oops, something went wrong') // printed in red
```
