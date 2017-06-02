const path = require('path')

module.exports = function nuxtMeta(options) {
  // Add some common meta tags
  // Borrowed from Vue HN!
  // TODO: Make it more optional and flexible

  this.options.head.meta.push({charset: 'utf-8'})
  this.options.head.meta.push({name: 'viewport', content: 'width=device-width, initial-scale=1, minimal-ui'})
  this.options.head.meta.push({name: 'mobile-web-app-capable', content: 'yes'})
  this.options.head.meta.push({name: 'apple-mobile-web-app-capable', content: 'yes'})
  this.options.head.meta.push({name: 'apple-mobile-web-app-status-bar-style', content: 'default'})
}

module.exports.meta = require('./package.json')
