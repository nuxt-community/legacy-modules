const fs = require('fs')
const path = require('path')
const _ = require('lodash')

// https://developer.mozilla.org/en-US/docs/Web/Manifest

module.exports = function nuxtManifest(options) {
  this.options.manifest = this.options.manifest || {}

  /* eslint-disable camelcase */
  const default_name = this.options.manifest.name || this.options.head.title ||
    process.env.npm_package_description || process.env.npm_package_name
  const defaults = {
    name: default_name,
    short_name: default_name,
    description: default_name,
    icons: [
      {
        src: 'icon.png',
        sizes: '192x192',
        type: 'image/png'
      }
    ],
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3f51b5'
  }

  // Write manifest.json
  // TODO: write into .nuxt/dist instead
  const manifest = _.defaultsDeep({}, this.options.manifest, defaults)
  const manifestFileName = 'manifest.json'
  const manifestFilePath = path.resolve(this.options.rootDir, 'static', manifestFileName)
  fs.writeFileSync(manifestFilePath, JSON.stringify(manifest), 'utf8')

  // Add manifest meta
  if (!_.find(this.options.head.link, {rel: 'manifest'})) {
    this.options.head.link.push({rel: 'manifest', href: '/' + manifestFileName})
  }

  // Add favicon
  if (!_.find(this.options.head.link, {rel: 'shortcut icon'})) {
    this.options.head.link.push({rel: 'shortcut icon', href: '/' + manifest.icons[0].src})
  }

  // Set title
  if (manifest.name && !this.options.head.title) {
    this.options.head.title = manifest.name
  }

  // Add description meta
  if (manifest.description && !_.find(this.options.head.meta, {name: 'description'})) {
    this.options.head.meta.push({name: 'description', content: manifest.description})
  }
}

module.exports.meta = require('./package.json')
