const LRU = require('lru-cache')

module.exports = function nuxtComponentCache (options) {
  if (this.options.render.ssr === false) {
    // SSR Disabled
    return
  }

  // Create empty bundleRenderer object if not defined
  if (typeof this.options.render.bundleRenderer !== 'object' || this.options.render.bundleRenderer === null) {
    this.options.render.bundleRenderer = {}
  }

  // Disable if cache explicitly provided in project
  if (this.options.render.bundleRenderer.cache) {
    return
  }

  this.options.render.bundleRenderer.cache = new LRU(Object.assign({
    max: 10000,
    maxAge: 1000 * 60 * 15
  }, options))
}

module.exports.meta = require('./package.json')
