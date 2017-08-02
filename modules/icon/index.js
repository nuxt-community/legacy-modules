const fs = require('fs-extra')
const path = require('path')
const Jimp = require('jimp')

const fixUrl = url => url.replace(/\/\//g, '/').replace(':/', '://')
const isUrl = url => url.indexOf('http') === 0 || url.indexOf('//') === 0

module.exports = function nuxtIcon (options) {
  const iconSrc = options.iconSrc || path.resolve(this.options.srcDir, 'static', 'icon.png')
  const sizes = options.sizes || [16, 120, 144, 152, 192, 384, 512]

  // routerBase and publicPath
  const routerBase = this.options.router.base
  let publicPath = fixUrl(`${routerBase}/${this.options.build.publicPath}`)
  if (isUrl(this.options.build.publicPath)) { // CDN
    publicPath = this.options.build.publicPath
    if (publicPath.indexOf('//') === 0) {
      publicPath = '/' + publicPath // escape fixUrl
    }
  }

  // Ensure icon file exists
  if (!fs.existsSync(iconSrc)) {
    /* eslint-disable no-console */
    console.warn('[@nuxtjs/icon]', path.relative(this.options.srcDir, iconSrc), 'not found! Please create one or disable icon module.')
    return
  }

  return Jimp.read(iconSrc).then(srcIcon => {
    // get base64 phash of source image
    const hash = srcIcon.hash()
    return Promise.all(sizes.map(size => new Promise((resolve, reject) => {
      srcIcon.clone().contain(size, size).getBuffer(Jimp.MIME_PNG, (err, buff) => {
        if (err) {
          return reject(err)
        }
        let fileName = `icons/icon_${size}.${hash}.png`
        resolve({ size, buff, fileName })
      })
    }))).then(icons => {
      // Fill manifest icons
      if (!this.options.manifest) {
        this.options.manifest = {}
      }
      if (!this.options.manifest.icons) {
        this.options.manifest.icons = []
      }
      icons.forEach(icon => {
        this.options.manifest.icons.push({
          src: fixUrl(`${publicPath}/${icon.fileName}`),
          sizes: `${icon.size}x${icon.size}`,
          type: `image/png`
        })
      })
      // Register webpack plugin to emit icons
      this.options.build.plugins.push({
        apply (compiler) {
          compiler.plugin('emit', function (compilation, _cb) {
            icons.forEach(icon => {
              compilation.assets[icon.fileName] = {
                source: () => icon.buff,
                size: () => icon.buff.length
              }
            })
            _cb()
          })
        }
      })
    })
  }).catch(err => {
    console.error('[icon] unable to read', err)
  })
}

module.exports.meta = require('./package.json')
