const path = require('path')

const defaults = {
  css: true,
  materialIcons: false
}

module.exports = function (moduleOptions) {
  const options = Object.assign({}, defaults, this.options.vuetify, moduleOptions)

  // Add css
  if (options.css) {
    this.options.css.unshift('vuetify/dist/vuetify.css')
  }

  // Add Material Icons font
  if (options.materialIcons) {
    this.options.head.link.push({
      rel: 'stylesheet',
      type: 'text/css',
      href: '//fonts.googleapis.com/css?family=Material+Icons'
    })
  }

  // Remove module options
  const vuetifyOptions = Object.assign({}, options)
  delete vuetifyOptions.css
  delete vuetifyOptions.materialIcons

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'vuetify.js',
    options: {
      vuetifyOptions
    }
  })
}

module.exports.meta = require('./package.json')
