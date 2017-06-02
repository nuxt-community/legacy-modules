const fs = require('fs-extra')
const path = require('path')
const _ = require('lodash')
const hash = require('hash-sum')

// https://developer.mozilla.org/en-US/docs/Web/Manifest

module.exports = function nuxtManifest(options) {
  this.options.manifest = this.options.manifest || {}

  /* eslint-disable camelcase */
  const default_name = this.options.manifest.name || this.options.head.title ||
    process.env.npm_package_description || process.env.npm_package_name
  const default_short_name = process.env.npm_package_name || default_name
  const defaults = {
    name: default_name,
    short_name: default_short_name,
    description: default_name,
    icons: [
      {
        src: 'icon.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: (this.options.loading && this.options.loading.color) || '#3f51b5'
  }

  // Write manifest.json
  const manifest = _.defaultsDeep({}, this.options.manifest, defaults)
  const manifestFileName = `manifest.${hash(manifest)}.json`
  const distDir = 'static' //this.options.dev ? 'static' : '.nuxt/dist'
  const manifestFilePath = path.resolve(this.options.rootDir, distDir, manifestFileName)
  fs.ensureDirSync(path.resolve(this.options.rootDir, distDir))
  fs.writeFileSync(manifestFilePath, JSON.stringify(manifest), 'utf8')

  // Add manifest meta
  if (!_.find(this.options.head.link, {rel: 'manifest'})) {
    const manifestURL = `/${manifestFileName}` //(this.options.dev ? '/' : this.options.build.publicPath ) + manifestFileName
    this.options.head.link.push({rel: 'manifest', href: manifestURL})
  }

  // Add favicon
  if (!_.find(this.options.head.link, {rel: 'shortcut icon'})) {
    this.options.head.link.push({rel: 'shortcut icon', href: '/' + manifest.icons[0].src})
  }

  if (!_.find(this.options.head.link, {rel: 'apple-touch-icon'})) {
    this.options.head.link.push({rel: 'apple-touch-icon', href: '/' + manifest.icons[0].src})
  }

  // Set title
  if (manifest.name && !this.options.head.title) {
    this.options.head.title = manifest.name
  }

  // Add description meta
  if (manifest.description && !_.find(this.options.head.meta, {name: 'description'})) {
    this.options.head.meta.push({name: 'description', content: manifest.description})
  }

  // Add theme-color meta
  if (manifest.description && !_.find(this.options.head.meta, {name: 'theme-color'})) {
    this.options.head.meta.push({name: 'theme-color', content: manifest.theme_color})
  }
}

module.exports.meta = require('./package.json')
