const path = require('path')

module.exports = function yandexMetrika (moduleOptions) {
  // Don't include on dev mode
  if (this.options.dev && process.env.NODE_ENV !== 'production') {
    return
  }

  const options = {
    useRuntimeConfig: this.options.publicRuntimeConfig ? 'yandexMetrika' : undefined,
    ...this.options.yandexMetrika,
    ...moduleOptions
  }

  const metrikaUrl = (options.useCDN ? 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch' : 'https://mc.yandex.ru/metrika') + '/tag.js' // add https://cdn.jsdelivr.net/npm/yandex-metrica-watch/watch.js

  options.metrikaUrl = metrikaUrl

  // Script preload
  this.options.head.link.push({
    href: metrikaUrl,
    rel: 'preload',
    as: 'script'
  })

  // Register plugin
  this.addPlugin({ src: path.resolve(__dirname, 'plugin.js'), ssr: false, options })
}

module.exports.meta = require('./package.json')
