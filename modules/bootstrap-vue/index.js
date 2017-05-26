const path = require('path')

module.exports = function nuxtBootstrapVue(options) {
  // Register plugin
  this.addPlugin({src: path.resolve(__dirname, 'plugin.js'), options})

  // Conditionally require bootstrap original css too if not explicitly disabled
  if (options.bootstrapCSS !== false) {
    this.options.css.unshift('bootstrap/dist/css/bootstrap.css')
  }

  // Add library styles
  this.options.css.push('bootstrap-vue/dist/bootstrap-vue.css')
}

module.exports.meta = require('./package.json')
