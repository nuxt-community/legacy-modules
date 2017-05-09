const path = require('path')

module.exports.meta = {
  name: 'nuxt-auth',
  vendor: ['cookie', 'js-cookie'],
  plugin: {
    src: path.resolve(__dirname, 'store.js'),
    copyOnly: true
  }
}
