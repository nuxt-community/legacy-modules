module.exports = function nuxtOptimize(options) {
  this.requireModule({
    src: '@nuxtjs/cssnano',
    options: options.cssnano
  })
}

module.exports.meta = require('./package.json')
