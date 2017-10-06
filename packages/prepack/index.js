const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;

module.exports = function nuxtPrepack(options) {
  // Add webpack plugin
  this.options.build.plugins.push(new PrepackWebpackPlugin(Object.assign({
    // https://prepack.io/getting-started.html#options
    // TODO
  }, options)))
}

module.exports.meta = require('./package.json')
