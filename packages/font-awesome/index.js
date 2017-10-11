module.exports = function nuxtFontAwesome() {
  // Add CSS
  this.options.css.push('font-awesome/css/font-awesome.css')
}

module.exports.meta = require('./package.json')
