const fs = require('fs-extra')
const path = require('path')
const _ = require('lodash')
const hash = require('hash-sum')

const fixUrl = url => url.replace(/\/\//g, '/').replace(':/', '://')
const isUrl = url => url.indexOf('http') === 0 || url.indexOf('//') === 0

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

  // Infer defaults based on environment
  const defaults = {
    name: process.env.npm_package_name,
    short_name: process.env.npm_package_name,
    description: process.env.npm_package_description,
    icons: [],
    start_url: routerBase,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: (this.options.loading && this.options.loading.color) || '#3f51b5',
    lang: 'en',

    // internal options
    _meta: true,
    _icons: true,
    _openGraph: false
  }

  // Combine sources
  const manifest = _.defaultsDeep({}, options, this.options.manifest, defaults)

  // Generate icons
  if (manifest._icons) {
    // TODO

    delete manifest._icons
  }

  // Head Meta Tags
  if (manifest._meta) {
    // Add favicon
    if (!_.find(this.options.head.link, {rel: 'shortcut icon'})) {
      this.options.head.link.push({rel: 'shortcut icon', href: manifest.icons[0].src})
    }

    if (!_.find(this.options.head.link, {rel: 'apple-touch-icon'})) {
      this.options.head.link.push({rel: 'apple-touch-icon', href: manifest.icons[0].src})
    }

    // Set title
    if (manifest.name && !this.options.head.title) {
      this.options.head.title = manifest.name
    }

    // Add description meta
    if (manifest.description && !_.find(this.options.head.meta, {name: 'description'})) {
      this.options.head.meta.push({hid: 'description', name: 'description', content: manifest.description})
    }

    // Add theme-color meta
    if (manifest.theme_color && !_.find(this.options.head.meta, {name: 'theme-color'})) {
      this.options.head.meta.push({name: 'theme-color', content: manifest.theme_color})
    }

    // Add lang to html tag
    if (manifest.lang && !(this.options.head.htmlAttrs && this.options.head.htmlAttrs.lang)) {
      if (!this.options.head.htmlAttrs) {
        this.options.head.htmlAttrs = {}
      }
      this.options.head.htmlAttrs.lang = manifest.lang
    }

    delete manifest._meta
  }

  // OpenGraph headers
  if (manifest._openGraph) {
    // Add og:type
    if (!_.find(this.options.head.meta, {property: 'og:type'})) {
      this.options.head.meta.push({property: 'og:type', content: manifest.type || 'website'})
    }

    // Add og:title
    if (!_.find(this.options.head.meta, {property: 'og:title'})) {
      this.options.head.meta.push({property: 'og:title', content: manifest.name})
    }

    // Add og:description
    if (!_.find(this.options.head.meta, {property: 'og:description'})) {
      this.options.head.meta.push({property: 'og:description', content: manifest.description})
    }

    delete manifest._openGraph
  }

  // Cleanup internals
  delete manifest.src

  // Stringify manifest & generate hash
  const manifestSource = JSON.stringify(manifest)
  const manifestFileName = `manifest.${hash(manifestSource)}.json`

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
  if (!_.find(this.options.head.link, {rel: 'manifest'})) {
    this.options.head.link.push({rel: 'manifest', href: fixUrl(`${publicPath}/${manifestFileName}`)})
  } else {
    console.warn('Manifest meta already provided! Skipping manifest.')
  }
}


module.exports.meta = require('./package.json')
