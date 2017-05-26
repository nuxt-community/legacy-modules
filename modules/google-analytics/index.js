const fs = require('fs-extra')
const path = require('path')

module.exports = function nuxtAxios(options) {
  // Don't include on dev mode
  if(this.options.dev && process.env.NODE_ENV !== 'production') {
    return
  }

  // Register plugin
  this.addPlugin({src: path.resolve(__dirname, 'plugin.js'), ssr: false, options})

  // Add tracking-code to process env
  process.env.GA_UA = options.ua
}

module.exports.meta = require('./package.json')
