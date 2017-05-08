const cssnano = require('cssnano')

module.exports = (nuxt) => {
    // Better filenames
  if (!nuxt.build.filenames) {
    nuxt.build.filenames = {
      vendor: 'vendor.[hash].js',
      app: 'app.[chunkhash].js'
    }
  }

    // Better Public path
  if (!nuxt.build.publicPath) {
    nuxt.build.publicPath = '/assets/'
  }

    // Add cssnano
  nuxt.build.postcss.push(cssnano(nuxt.build.cssnano))
}

function extendBuild () {
    // Modernize SSR bundle with less transforms
    // TODO
}

module.exports.meta = {
  extendBuild: extendBuild
}
