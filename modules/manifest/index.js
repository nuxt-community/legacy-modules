const fs = require('fs-extra')
const path = require('path')
const hash = require('hash-sum')

const fixUrl = url => url.replace(/\/\//g, '/').replace(':/', '://')
const isUrl = url => url.indexOf('http') === 0 || url.indexOf('//') === 0
const find = (arr, key, val) => arr.find(obj => val ? obj[key] === val : obj[key])

module.exports = function nuxtManifest (options) {
  // routerBase and publicPath
  const routerBase = this.options.router.base
  let publicPath = fixUrl(`${routerBase}/${this.options.build.publicPath}`)
  if (isUrl(this.options.build.publicPath)) { // CDN
    publicPath = this.options.build.publicPath
    if (publicPath.indexOf('//') === 0) {
      publicPath = '/' + publicPath // escape fixUrl
    }
  }

  // Defaults
  const defaults = {
    name: process.env.npm_package_name,
    short_name: process.env.npm_package_name,
    description: process.env.npm_package_description,
    icons: [],
    start_url: routerBase,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: this.options.loading && this.options.loading.color,
    lang: 'en'
  }

  // Combine sources
  const manifest = Object.assign({}, defaults, this.options.manifest, options)
  delete manifest.src

  // Stringify manifest & generate hash
  const manifestSource = JSON.stringify(manifest)
  const manifestFileName = `manifest.${hash(manifestSource)}.json`

  // Merge final manifest into options.manifest for other modules
  if (!this.options.manifest) {
    this.options.manifest = {}
  }
  Object.assign(this.options.manifest, manifest)

  // Register webpack plugin to emit manifest
  this.options.build.plugins.push({
    apply (compiler) {
      compiler.plugin('emit', function (compilation, cb) {
        compilation.assets[manifestFileName] = {
          source: () => manifestSource,
          size: () => manifestSource.length
        }
        cb()
      })
    }
  })

  // Add manifest meta
  if (!find(this.options.head.link, 'rel', 'manifest')) {
    this.options.head.link.push({ rel: 'manifest', href: fixUrl(`${publicPath}/${manifestFileName}`) })
  } else {
    console.warn('Manifest meta already provided!')
  }
}


module.exports.meta = require('./package.json')
