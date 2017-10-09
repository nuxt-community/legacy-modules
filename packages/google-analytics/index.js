const { resolve } = require('path')

module.exports = function nuxtAdSense (moduleOptions) {
  const options = this.moduleOptions['google-adsense']

  if (!options || !options[id] || typeof options[id] !== 'string') {
    console.warn('adsense client ID not specified')
    return
  }

  // If in DEV mode, place ads in 'test' state
  if (this.options.dev && process.env.NODE_ENV !== 'production')) {
    options.dev = true
  }

  // Register our plugin
  this.addPlugin({
    src: resolve(__dirname, '../plugin.js'),
    options: options
  })

  // Add the google adsense script
  this.moduleOptions.head.script.push({
    hid: 'adsbygoogle',
    async: true,
    src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
  })
}

module.exports.meta = require('./package.json')
