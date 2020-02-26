// https://github.com/BlueOakJS/markdownit-loader
// https://github.com/markdown-it/markdown-it
const path = require('path')

module.exports = function nuxtMarkdownit (options) {
  const _options = Object.assign({}, options, this.options.markdownit)

  const markDownItLoader = {
    loader: '@nuxtjs/markdownit-loader',
    options: _options
  }

  const version = this.nuxt.constructor.version
  const [major, minor, patch] = version.split('.')

  this.extendBuild(config => {
    if (major === '1') {
      // Vue template support
      const vueLoader = config.module.rules.find(rule => rule.test.toString() === '/\\.vue$/')
      // Checks for query loaders first (<= rc5)
      if (vueLoader.query && vueLoader.query.loaders) {
        vueLoader.query.loaders['md'] = markDownItLoader
      } else {
        // Sets options loaders (>= rc6)
        if (!vueLoader.options.loaders) {
          vueLoader.options.loaders = {}
        }
        vueLoader.options.loaders['md'] = markDownItLoader
      }
      // .md Loader
      config.module.rules.push({
        test: /\.md$/,
        use: [
          'raw-loader',
          markDownItLoader
        ]
      })
    } else {
      config.module.rules.push({
        test: /\.md$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: [markDownItLoader]
          },
          {
            use: [
              'raw-loader',
              markDownItLoader
            ]
          }
        ]
      })
    }
  })

  if (_options.injected === true) {
    delete _options.injected
    // Register plugin
    this.addPlugin({
      src: path.resolve(__dirname, 'plugin.js'),
      fileName: 'markdown-it.js',
      options: Object.assign({}, _options)
    })
  }
}

module.exports.meta = require('./package.json')
