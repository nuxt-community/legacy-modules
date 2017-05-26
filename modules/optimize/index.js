const cssnano = require('cssnano')

const path = require('path')

module.exports = function nuxtOptimize(options) {
  // Register plugin
  this.addPlugin({src: path.resolve(__dirname, 'plugin.js'), options})

}

module.exports.meta = require('./package.json')


module.exports = (nuxt) => {
  // TODO
  // Add cssnano
  nuxt.build.postcss.push(cssnano(nuxt.build.cssnano))
}

function extendBuild() {
  // Modernize SSR bundle with less transforms
  // TODO
}

module.exports.meta = {
  name: 'nuxt-optimize',
  extendBuild: extendBuild
}
