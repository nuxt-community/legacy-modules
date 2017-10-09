const { resolve } = require('path')

module.exports = function nuxtAdSense (moduleOptions) {
  const options = Object.assign({}, this.moduleOptions['google-adsense'] || {})

  if (this.options.dev && process.env.NODE_ENV !== 'production')) {
    // If in DEV mode, place ads in 'test' state
    options.dev = true
    options.id = 'ca-google'
  } else if (!options[id] || typeof options[id] !== 'string') {
    console.warn('Invalid adsense client ID specified')
    return
  }

  // Register our plugin
  this.addPlugin({
    src: resolve(__dirname, './plugin.js'),
    options: options
  })

  // Add the google adsense script
  this.options.head.script.push({
    async: true,
    src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
  })
  
  if (options.test) {
    // If in DEV mode, add robots meta first to comply with Adsense policies
    this.options.head.meta.unshift({
      name: 'robots',
      content: 'noindex,noarchive,nofollow'
    })
  }
}

module.exports.meta = require('./package.json')
