const cssnano = require('cssnano')

module.exports = function nuxtCssano(options) {
  this.options.build.postcss.push(cssnano(options))
}

module.exports.meta = require('./package.json')
