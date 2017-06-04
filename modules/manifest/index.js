const fs = require('fs-extra')
const path = require('path')
const _ = require('lodash')
const hash = require('hash-sum')

const fixUrl = url => url.replace(/(?!^)\/\//g, '/').replace(':/', '://')// // ~> /

module.exports = function nuxtManifest(options) {
  const routerBase = this.options.router.base
  const defaultName = options.name || this.options.manifest.name || process.env.npm_package_name
  const defaultShortName = process.env.npm_package_name || defaultName

  const defaults = {
    name: defaultName,
    short_name: defaultShortName,
    description: defaultName,
    icons: [
      {
        src: fixUrl(`${routerBase}icon.png`),
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    start_url: routerBase,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: (this.options.loading && this.options.loading.color) || '#3f51b5',
    lang: 'en'
  }

  // Write manifest.json
  const manifest = _.defaultsDeep({}, options, this.options.manifest, defaults)
  delete manifest.src
  const manifestFileName = `manifest.${hash(manifest)}.json`
  const distDir = 'static'
  const manifestFilePath = path.resolve(this.options.rootDir, distDir, manifestFileName)
  console.log(manifestFilePath)
  if (!fs.existsSync(manifestFilePath)) {
    fs.ensureDirSync(path.resolve(this.options.rootDir, distDir))
    fs.writeFileSync(manifestFilePath, JSON.stringify(manifest), 'utf8')
  }

  // Add manifest meta
  if (!_.find(this.options.head.link, {rel: 'manifest'})) {
    this.options.head.link.push({rel: 'manifest', href: fixUrl(`${routerBase}/${manifestFileName}`)})
  }

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
    this.options.head.meta.push({name: 'description', content: manifest.description})
  }

  // Add theme-color meta
  if (manifest.description && !_.find(this.options.head.meta, {name: 'theme-color'})) {
    this.options.head.meta.push({name: 'theme-color', content: manifest.theme_color})
  }

  // Add lang to html tag
  if (manifest.lang && !(this.options.head.htmlAttrs && this.options.head.htmlAttrs.lang)) {
    if (!this.options.head.htmlAttrs) {
      this.options.head.htmlAttrs = {}
    }
    this.options.head.htmlAttrs.lang = manifest.lang
  }
}

module.exports.meta = require('./package.json')
