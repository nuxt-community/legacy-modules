const _ = require('lodash')
const path = require('path')

// https://github.com/NekR/offline-plugin/blob/master/docs/examples/SPA.md
// https://github.com/NekR/offline-plugin-pwa

module.exports = (nuxt) => {
  if (useOffline(nuxt)) {
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

    nuxt.offline = _.defaultsDeep({}, nuxt.offline, defaults)
  }
}

function useOffline (nuxt) {
  return nuxt.offline !== false && !nuxt.dev
}

module.exports.meta = {
  name: 'nuxt-offline',
  plugin: nuxt => {
    if (!useOffline(nuxt)) {
      return
    }

    return {
      src: path.resolve(__dirname, 'plugin.js'),
      ssr: false
    }
  }
}
