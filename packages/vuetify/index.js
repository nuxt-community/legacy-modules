const path = require('path')

const defaults = {
  materialIcons: false
}

module.exports = function nuxtVuetify (moduleOptions) {
  const options = Object.assign({}, defaults, moduleOptions)

  // Add css
  this.options.css.push('vuetify/dist/vuetify.css')

  // Add Material Icons font
  if (options.materialIcons) {
    this.options.head.link.push({
      rel: 'stylesheet',
      type: 'text/css',
      href: '//fonts.googleapis.com/css?family=Material+Icons'
    })
  }

  // Register plugin
  this.addPlugin({ src: path.resolve(__dirname, 'plugin.js'), options })
}

module.exports.meta = require('./package.json')
