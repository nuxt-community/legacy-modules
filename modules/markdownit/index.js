// https://github.com/BlueOakJS/markdownit-loader
// https://github.com/markdown-it/markdown-it

module.exports = function nuxtMarkdownit(options) {
  const markDownItLoader = {
    loader: 'markdownit-loader',
    options
  }

  this.options.build.loaders.push({
    test: /\.md$/,
    use: [
      'raw-loader',
      markDownItLoader
    ]
  })

  this.extendBuild((config) => {
    const vueLoader = config.module.rules.find(rule => rule.loader === 'vue-loader')
    vueLoader.query.loaders['md'] = markDownItLoader
  })
}

module.exports.meta = require('./package.json')
