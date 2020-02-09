const path = require('path')

module.exports = function nuxtBulma(options) {
  // Add CSS
  this.options.css.unshift('bulma/css/bulma.css')
}

module.exports.meta = require('./package.json')
