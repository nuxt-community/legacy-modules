const path = require('path')
const workboxPlugin = require('workbox-webpack-plugin')

const fixUrl = url => url.replace(/\/\//g, '/').replace(':/', '://')
const isUrl = url => url.indexOf('http') === 0 || url.indexOf('//') === 0

module.exports = function nuxtWorkbox (options) {
  if (this.options.dev) {
    return
  }

  // routerBase and publicPath
  const routerBase = this.options.router.base
  let publicPath = fixUrl(`${routerBase}/${this.options.build.publicPath}`)
  if (isUrl(this.options.build.publicPath)) { // CDN
    publicPath = this.options.build.publicPath
    if (publicPath.indexOf('//') === 0) {
      publicPath = '/' + publicPath // escape fixUrl
    }
  }

  const swFileName = 'sw.js'

  // Add webpack plugin. This plugin internally uses swBuild to generate sw file
  // We set dest to static dir that is served as / to allow global sw scope
  // https://workboxjs.org/reference-docs/latest/module-workbox-build.html#.generateSW

  this.options.build.plugins.push(new workboxPlugin(Object.assign({
    swDest: path.resolve(this.options.srcDir, 'static', swFileName),
    directoryIndex: '/',
    cacheId: process.env.npm_package_name + '_' + process.env.npm_package_version,
    clientsClaim: true,
    globPatterns: ['**\/*.{js,css,html,json}'],
    globIgnores: '**/server-bundle.json',
    modifyUrlPrefix: {
      '': fixUrl(publicPath)
    },
    runtimeCaching: [
      // Cache routes if offline
      {
        urlPattern: fixUrl(routerBase + '/**'),
        handler: 'networkFirst'
      },
      // Cache other _nuxt resources runtime
      // They are hashed by webpack so are safe to loaded by cacheFirst handler
      {
        urlPattern: fixUrl(publicPath + '/**'),
        handler: 'cacheFirst'
      },
    ]
  }, options)))

  // Register runtime plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    ssr: false,
    options: {
      swURL: fixUrl(`${routerBase}/${swFileName}`),
      swScope: fixUrl(`${routerBase}/`)
    }
  })
}

module.exports.meta = require('./package.json')
