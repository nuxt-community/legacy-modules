const fs = require('fs-extra')
const path = require('path')

module.exports = function nuxtAnalytics(options) {
  // Don't include on dev mode
  if (this.options.dev && process.env.NODE_ENV !== 'production') {
    return
  }

  // Add google analytics script to head
  this.options.head.script.push({
    src: options.analyticsURL || 'https://www.google-analytics.com/analytics.js',
    async: true
  })

  // Register plugin
  this.addPlugin({src: path.resolve(__dirname, 'plugin.js'), ssr: false, options})
}

module.exports.meta = require('./package.json')
