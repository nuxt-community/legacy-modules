const path = require('path')

module.exports = function nuxtBootstrapVue (moduleOptions) {
  // Conditionally require bootstrap original css too if not explicitly disabled
  if (moduleOptions.css !== false) {
    this.options.css.unshift('bootstrap/dist/css/bootstrap.css')
  }

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'bootstrap-vue.js',
    moduleOptions
  })

  // Add library styles
  this.options.css.push('bootstrap-vue/dist/bootstrap-vue.css')
}

module.exports.meta = require('./package.json')
