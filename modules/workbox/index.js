const path = require('path')
const workboxPlugin = require('workbox-webpack-plugin');

module.exports = function nuxtWorkbox(options) {
  if(this.options.dev) {
    return
  }

  const swFileName = 'sw.js'

  // Add webpack plugin. This plugin internally uses swBuild to generate sw file
  // We set dest to static dir that is served as / to allow global sw scope
  this.options.build.plugins.push(new workboxPlugin(Object.assign({
    swDest: path.resolve(this.options.srcDir, 'static', swFileName),
    modifyUrlPrefix: {
      '/': this.options.build.publicPath
    }
  }, options)))

  // Register runtime plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    ssr: false,
    options: {
      swURL: this.options.router.base + swFileName,
      swScope: this.options.router.base
    }
  })
}

module.exports.meta = require('./package.json')
