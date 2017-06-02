const LRU = require('lru-cache')

module.exports = function nuxtComponentCache(options) {
  if (this.options.build.ssr === false) {
    // SSR Disabled
    return
  }

  // Create placeholder
  if (typeof this.options.build.ssr !== 'object' || this.options.build.ssr === null) {
    this.options.build.ssr = {}
  }

  // Disable if cache explicitly provided in project
  if (this.options.build.ssr.cache) {
    return
  }

  this.options.build.ssr.cache = LRU(Object.assign({
    max: 10000,
    maxAge: 1000 * 60 * 15
  }, options))
}

module.exports.meta = require('./package.json')
