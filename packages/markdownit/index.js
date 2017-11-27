// https://github.com/BlueOakJS/markdownit-loader
// https://github.com/markdown-it/markdown-it
const path = require('path')

module.exports = function nuxtMarkdownit (options) {
  const _options = Object.assign({}, options, this.options.markdownit)

  const markDownItLoader = {
    loader: '@nuxtjs/markdownit-loader',
    options: _options
  }

  this.extendBuild(config => {
    // Vue template support
    const vueLoader = config.module.rules.find(rule => rule.test.toString() === '/\\.vue$/')
    // Checks for query loaders first (<= rc5)
    if (vueLoader.query && vueLoader.query.loaders) {
      vueLoader.query.loaders['md'] = markDownItLoader
    } else {
       // Sets options loaders (>= rc6)
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
  })

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'markdown-it.js',
    options: _options
  })
}

module.exports.meta = require('./package.json')
