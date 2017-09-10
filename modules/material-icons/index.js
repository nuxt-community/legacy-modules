const path = require('path')

module.exports = function nuxtFontAwesome(options) {
  // Add CSS
  this.options.css.push('material-design-icons/iconfont/material-icons.css')
}

module.exports.meta = require('./package.json')
