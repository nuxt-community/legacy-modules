const path = require('path')
const workboxPlugin = require('workbox-webpack-plugin');

module.exports = function nuxtWorkbox(options) {
  if (this.options.dev) {
    return
  }

  const swFileName = 'sw.js'
  const publicPath = this.options.build.publicPath
  const routerBase = this.options.router.base

  // Add webpack plugin. This plugin internally uses swBuild to generate sw file
  // We set dest to static dir that is served as / to allow global sw scope
  // https://workboxjs.org/reference-docs/latest/module-workbox-build.html#.generateSW

  this.options.build.plugins.push(new workboxPlugin(Object.assign({
    swDest: path.resolve(this.options.srcDir, 'static', swFileName),
    // navigateFallback: routerBase, // BUG
    directoryIndex: '/',
    cacheId: process.env.npm_package_name,
    skipWaiting: true, // sw is being registered after onNuxtReady()
    clientsClaim: true,
    globPatterns: ['**\/*.{js,css}'],
    modifyUrlPrefix: {
      '/': publicPath
    }
  }, options)))

  // Register runtime plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    ssr: false,
    options: {
      swURL: routerBase + swFileName,
      swScope: routerBase
    }
  })
}

module.exports.meta = require('./package.json')
