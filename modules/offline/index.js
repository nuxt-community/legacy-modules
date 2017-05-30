const _ = require('lodash')
const path = require('path')

// https://github.com/NekR/offline-plugin/blob/master/docs/examples/SPA.md
// https://github.com/NekR/offline-plugin-pwa

module.exports = function nuxtOffline(options) {
  if (this.options.offline === false || this.options.dev) {
    return
  }

  // common.[chunkhash].css ~> common.*.css
  const baseName = pattern => pattern.replace(/\[\w+]/g,'*')

  // Default offline options
  const defaults = {
    safeToUseOptionalCaches: true,

    externals: [
      '/'
    ],

    AppCache: {
      events: true,
      FALLBACK: {'/': '/offline'}
    },

    caches: {
      main: [
        baseName(this.options.build.filenames.css),
        baseName(this.options.build.filenames.manifest),
        baseName(this.options.build.filenames.vendor),
        baseName(this.options.build.filenames.app),
        '/'
      ],
      additional: [
        '*.js'
      ],
      optional: [
        ':rest:'
      ]
    },

    ServiceWorker: {
      events: true,
      cacheName: process.env.npm_package_name, // Allows having multiply services in same domain
      navigateFallbackURL: '/'
    }
  }
  this.options.offline = _.defaultsDeep({}, this.options.offline, defaults)

  // Register plugin
  this.addPlugin({src: path.resolve(__dirname, 'plugin.js'), ssr: false})

}

module.exports.meta = require('./package.json')
