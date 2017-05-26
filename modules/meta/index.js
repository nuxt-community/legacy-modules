const path = require('path')

module.exports = function nuxtMeta(options) {
  // Add some common meta tags
  // TODO: Make it more optional and flexible
  this.options.head.meta.push({charset: 'utf-8'})
  this.options.meta.push({name: 'viewport', content: 'width=device-width, initial-scale=1'})
}

module.exports.meta = require('./package.json')
