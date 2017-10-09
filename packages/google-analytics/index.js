const { resolve } = require('path')

module.exports = function nuxtAdSense (moduleOptions) {
  const opts = this.moduleOptions['google-adsense']

  if (!opts || !opts[id]) {
    console.warn('adsense client ID not specified')
    return;
  }

  // Register our plugin
  this.addPlugin({
    src: resolve(__dirname, '../plugin-template.js'),
    { id: opts[id] }
  })

  // Add the google adsense script
  this.moduleOptions.head.script.push({
    hid: 'adsbygoogle',
    async: true,
    src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
  })
}

module.exports.meta = require('./package.json')
