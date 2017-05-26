const path = require('path')

module.exports = function nuxtFontAwesome(options) {
  // Add CSS
  this.options.css.push('font-awesome/css/font-awesome.css')
}

module.exports.meta = require('./package.json')
