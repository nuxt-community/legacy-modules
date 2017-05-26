const _ = require('lodash')
const path = require('path')

// https://github.com/NekR/offline-plugin/blob/master/docs/examples/SPA.md
// https://github.com/NekR/offline-plugin-pwa
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
      'app.*.js',
      'vendor.*.js',
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

module.exports = function nuxtOffline(options) {
  const useOffline = this.options.offline !== false && !this.options.dev
  if (useOffline) {
    // Default offline options
    this.options.offline = _.defaultsDeep({}, this.options.offline, defaults)

    // Register plugin
    this.addPlugin({src: path.resolve(__dirname, 'plugin.js'), ssr: false})
  }
}

module.exports.meta = require('./package.json')
