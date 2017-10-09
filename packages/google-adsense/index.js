const { resolve } = require('path')

module.exports = function nuxtAdSense (moduleOptions) {
  const options = Object.assign({}, this.moduleOptions || {})

  if (this.options.dev && process.env.NODE_ENV !== 'production') {
    // If in DEV mode, place ads in 'test' state
    // https://www.thedev.blog/3087/test-adsense-ads-safely-without-violating-adsense-tos/
    options.test = 'true'
    options.id = 'ca-google'
  } else if (!options[id] || typeof options[id] !== 'string') {
    console.warn('Invalid adsense client ID specified')
    return
  } else {
    options.test = 'false'
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
  
  if (options.test === 'true') {
    // If in DEV mode, add robots meta first to comply with Adsense policies
    this.options.head.meta.unshift({
      name: 'robots',
      content: 'noindex,noarchive,nofollow'
    })
  }
}

module.exports.meta = require('./package.json')
