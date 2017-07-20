const path = require('path')

const find = (arr, key, val) => arr.find(obj => val ? obj[key] === val : obj[key])

module.exports = function nuxtMeta (_options) {
  // Defaults
  const defaults = {
    name: process.env.npm_package_name,
    description: process.env.npm_package_description,
    charset: 'utf-8',
    viewport: 'width=device-width, initial-scale=1, minimal-ui',
    mobileApp: true,
    favicon: true,
    appleStatusBarStyle: 'default',
    theme_color: this.options.loading && this.options.loading.color,
    lang: 'en',
    ogType: 'website',
    ogTitle: true,
    ogDescription: true
  }

  // Combine sources
  const options = Object.assign({}, defaults, this.options.manifest, _options)

  // Charset
  if (options.charset && !find(this.options.head.meta, 'charset')) {
    this.options.head.meta.push({ charset: options.charset })
  }

  // Viewport
  if (options.viewport && !find(this.options.head.meta, 'name', 'viewport')) {
    this.options.head.meta.push({ name: 'viewport', content: options.viewport })
  }

  // mobileApp
  if (options.mobileApp && !find(this.options.head.meta, 'name', 'mobile-web-app-capable')) {
    this.options.head.meta.push({ name: 'mobile-web-app-capable', content: 'yes' })
  }

  // statusBarStyle
  if (options.appleStatusBarStyle && !find(this.options.head.meta, 'name', 'apple-mobile-web-app-status-bar-style')) {
    this.options.head.meta.push({ name: 'apple-mobile-web-app-status-bar-style', content: options.appleStatusBarStyle })
  }

  // Favicon
  if (options.favicon === true) {
    options.favicon = options.icons && options.icons.length > 0 && options.icons[0].src
    options.applefavicon = options.icons && options.icons.length > 0 && options.icons[3].src
  }
  if (options.favicon) {
    if (!find(this.options.head.link, 'rel', 'shortcut icon')) {
      this.options.head.link.push({ rel: 'shortcut icon', href: options.favicon })
    }

    if (!find(this.options.head.link, 'rel', 'apple-touch-icon')) {
      this.options.head.link.push({ rel: 'apple-touch-icon', href: options.applefavicon })
    }
  }

  // Title
  if (options.name && !this.options.head.title) {
    this.options.head.title = options.name
  }

  // description meta
  if (options.description && !find(this.options.head.meta, 'name', 'description')) {
    this.options.head.meta.push({ hid: 'description', name: 'description', content: options.description })
  }

  // theme-color meta
  if (options.theme_color && !find(this.options.head.meta, 'name', 'theme-color')) {
    this.options.head.meta.push({ name: 'theme-color', content: options.theme_color })
  }

  // Add lang to html tag
  if (options.lang && !(this.options.head.htmlAttrs && this.options.head.htmlAttrs.lang)) {
    if (!this.options.head.htmlAttrs) {
      this.options.head.htmlAttrs = {}
    }
    this.options.head.htmlAttrs.lang = options.lang
  }

  // og:type
  if (options.ogType && !find(this.options.head.meta, 'property', 'og:type')) {
    this.options.head.meta.push({ property: 'og:type', content: options.ogType })
  }

  // og:title
  if (options.ogTitle === true) {
    options.ogTitle = options.name
  }
  if (options.ogTitle && !find(this.options.head.meta, 'property', 'og:title')) {
    this.options.head.meta.push({ property: 'og:title', content: options.ogTitle })
  }

  // og:description
  if (options.ogDescription === true) {
    options.ogDescription = options.description
  }
  if (options.ogDescription && !find(this.options.head.meta, 'property', 'og:description')) {
    this.options.head.meta.push({ property: 'og:description', content: options.ogDescription })
  }

}

module.exports.meta = require('./package.json')
