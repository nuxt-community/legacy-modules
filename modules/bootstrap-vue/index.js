const path = require('path')

module.exports.meta = {
  name: 'nuxt-bootstrap-vue',
  plugin: path.resolve(__dirname, 'plugin.js'),
  vendor: ['bootstrap-vue']
}
