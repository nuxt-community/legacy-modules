const cssnano = require('cssnano')

module.exports = function nuxtPrepack(options) {
  this.options.build.postcss.push(cssnano(options))
}

module.exports.meta = require('./package.json')
