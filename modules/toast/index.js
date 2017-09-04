const path = require('path')

module.exports = function nuxtToast (moduleOptions) {
  const options = Object.assign({}, this.options.toast, moduleOptions)

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    ssr: false,
    fileName: 'toast.js',
    options
  })
}

module.exports.meta = require('./package.json')
