const fs = require('fs-extra')
const path = require('path')

module.exports = function nuxtTagManager(options) {
  // Don't include on dev mode
  if(this.options.dev && process.env.NODE_ENV !== 'production') {
    return
  }

  // Register plugin
  this.addPlugin({src: path.resolve(__dirname, 'plugin.js'), ssr: false, options})

  // Add GTM container ID to process env
  process.env.GTM_ID = options.id
}

module.exports.meta = require('./package.json')