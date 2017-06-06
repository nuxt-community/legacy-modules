module.exports = function nuxtPWA (options) {
  ['icon', 'manifest', 'meta', 'workbox', 'optimize'].forEach(module => {
    if (options[module] !== false) {
      this.requireModule({
        src: `@nuxtjs/${module}`,
        options: options[module]
      })
    }
  })
}

module.exports.meta = require('./package.json')
