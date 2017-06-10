const path = require('path')

module.exports = function nuxtBootstrapVue (moduleOtions) {
  // Conditionally require bootstrap original css too if not explicitly disabled
  if (moduleOtions.css !== false) {
    this.options.css.unshift('bootstrap/dist/css/bootstrap.css')
  }

  // Register plugin
  this.addPlugin({ src: path.resolve(__dirname, 'plugin.js'), options })

  // Add library styles
  this.options.css.push('bootstrap-vue/dist/bootstrap-vue.css')
}

module.exports.meta = require('./package.json')
