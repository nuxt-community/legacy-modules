const path = require('path')
module.exports.meta = {
  name: 'nuxt-toast',
  plugin: {
    src: path.resolve(__dirname, 'plugin.js'),
    ssr: false
  },
  vendor: ['mini-toastr']
}
