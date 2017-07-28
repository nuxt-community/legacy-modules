const path = require('path')

module.exports = function nuxtVuetify (options) {
  // Add assets
  this.options.head.link.push({
    rel: 'stylesheet',
    type: 'text/css',
    href: '//fonts.googleapis.com/css?family=Material+Icons'
  })
  this.options.css.push('vuetify/dist/vuetify.min.css')

  // Register plugin
  this.addPlugin({ src: path.resolve(__dirname, 'plugin.js'), options })
}

module.exports.meta = require('./package.json')
