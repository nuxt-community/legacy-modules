const { resolve } = require('path')

export default async function module (moduleOptions) {
  const options = this.options['google-adsense'] || moduleOptions

  this.addPlugin({
    src: resolve(__dirname, '../templates/plugin.js'),
    options
  })
}
