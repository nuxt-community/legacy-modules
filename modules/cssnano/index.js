const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

module.exports = function nuxtCssano (options) {
  if (!Array.isArray(this.options.build.postcss)) {
    this.options.build.postcss = [
      autoprefixer({
        browsers: ['last 3 versions']
      })
    ]
  }

  this.options.build.postcss.push(cssnano(options))
}

module.exports.meta = require('./package.json')
