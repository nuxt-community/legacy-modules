const fs = require('fs')
const path = require('path')
const _ = require('lodash')

// https://developer.mozilla.org/en-US/docs/Web/Manifest

module.exports = (nuxt) => {
  nuxt.manifest = nuxt.manifest || {}

  /* eslint-disable camelcase */
  const default_name = nuxt.manifest.name || nuxt.head.title ||
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
  const manifest = _.defaultsDeep({}, nuxt.manifest, defaults)
  const manifestFileName = 'manifest.json'
  const manifestFilePath = path.resolve(nuxt.rootDir, 'static', manifestFileName)
  fs.writeFileSync(manifestFilePath, JSON.stringify(manifest), 'utf8')

  // Add manifest meta
  if (!_.find(nuxt.head.link, {rel: 'manifest'})) {
    nuxt.head.link.push({rel: 'manifest', href: '/' + manifestFileName})
  }

  // Add favicon
  if (!_.find(nuxt.head.link, {rel: 'shortcut icon'})) {
    nuxt.head.link.push({rel: 'shortcut icon', href: '/' + manifest.icons[0].src})
  }

  // Set title
  if (manifest.name && !nuxt.head.title) {
    nuxt.head.title = manifest.name
  }

  // Add description meta
  if (manifest.description && !_.find(nuxt.head.meta, {name: 'description'})) {
    nuxt.head.meta.push({name: 'description', content: manifest.description})
  }

  // Add theme-color meta
  if (manifest.theme_color && !_.find(nuxt.head.meta, {name: 'theme-color'})) {
    nuxt.head.meta.push({name: 'theme-color', content: manifest.theme_color})
  }
}

module.exports.meta = {
  name: 'nuxt-manifest'
}
