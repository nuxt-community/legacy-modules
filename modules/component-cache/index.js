const LRU = require('lru-cache')

module.exports = function nuxtWorkbox(options) {
  if (this.options.ssr === false) {
    // SSR Disabled
    return
  }

  // Create placeholder
  if (typeof this.options.ssr !== 'object') {
    this.options.ssr = {}
  }

  // Disable if cache explicitly provided in project
  if (this.options.ssr.cache) {
    return
  }

  this.options.ssr.cache = LRU(Object.assign({
    max: 10000,
    maxAge: 1000 * 60 * 15
  }, options))
}

module.exports.meta = require('./package.json')
