const path = require('path')

module.exports = function nuxtPouch (moduleOptions) {

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    moduleOptions
  })
}
