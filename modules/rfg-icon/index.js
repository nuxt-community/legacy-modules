const { find, defaultsDeep } = require('lodash')
const path = require('path')
const rfg = require('rfg-api').init()
const axios = require('axios')
const unzip = require('unzip2')

const defaults = {
  apiKey: '402333a17311c9aa68257b9c5fc571276090ee56',
  design: {
    ios: {
      pictureAspect: 'backgroundAndMargin',
      backgroundColor: '#ffffff',
      margin: '14%',
      assets: {
        ios6AndPriorIcons: false,
        ios7AndLaterIcons: false,
        precomposedIcons: false,
        declareOnlyDefaultIcon: true
      }
    },
    desktopBrowser: {},
    windows: {
      pictureAspect: 'whiteSilhouette',
      backgroundColor: '#00a300',
      onConflict: 'override',
      assets: {
        windows80Ie10Tile: false,
        windows10Ie11EdgeTiles: {
          small: false,
          medium: true,
          big: false,
          rectangle: false
        }
      }
    },
    androidChrome: {
      pictureAspect: 'noChange',
      themeColor: '#ffffff',
      manifest: {
        display: 'standalone',
        orientation: 'notSet',
        onConflict: 'override',
        declared: true
      },
      assets: {
        legacyIcon: false,
        lowResolutionIcons: false
      }
    },
    safariPinnedTab: {
      pictureAspect: 'silhouette',
      themeColor: '#5bbad5'
    }
  },
  settings: {
    scalingAlgorithm: 'Mitchell',
    errorOnImageTooSmall: false
  }
}

const fixUrl = url => url.replace(/\/\//g, '/').replace(':/', '://')
const isUrl = url => url.indexOf('http') === 0 || url.indexOf('//') === 0

module.exports = function nuxtRfgIcon (options) {
  let faviconDescription = defaultsDeep(this.options.rfgicon || options || {}, defaults)

  faviconDescription.masterPicture = faviconDescription.masterPicture || path.resolve(this.options.srcDir, 'static', 'icon.png')

  // routerBase and publicPath
  const routerBase = this.options.router.base
  let publicPath = fixUrl(`${routerBase}/${this.options.build.publicPath}`)
  if (isUrl(this.options.build.publicPath)) { // CDN
    publicPath = this.options.build.publicPath
    if (publicPath.indexOf('//') === 0) {
      publicPath = '/' + publicPath // escape fixUrl
    }
  }
  faviconDescription.iconsPath = fixUrl(publicPath + '/icons/')

  var request = rfg.createRequest(faviconDescription)

  return axios.post('https://realfavicongenerator.net/api/favicon', {
    favicon_generation: request
  }, {
    requestType: 'json'
  }).then(({ data }) => {
    return new Promise((resolve, reject) => {
      var headers = data.favicon_generation_result.favicon.html_code

      axios.get(data.favicon_generation_result.favicon.package_url, {
        responseType: 'stream'
      }).then(({ data }) => {
        resolve({ data, headers })
      }).catch(err => {
        reject(err)
      })
    })
  }).then(({ data, headers }) => {
    return new Promise((resolve, reject) => {
      var faviconFiles = []

      var parserStream = unzip.Parse()
      parserStream.on('close', () => {
        if (faviconFiles.length) {
          resolve({ faviconFiles, headers })
        } else {
          reject(new Error('zip file was empty'))
        }
      })

      data.pipe(parserStream).on('entry', (entry) => {
        var buffers = []

        entry.on('data', (buffer) => { buffers.push(buffer) })
        entry.on('end', () => {
          faviconFiles.push({
            fileName: entry.path,
            buff: Buffer.concat(buffers)
          })
        })
      })
    })
  }).then(({ faviconFiles, headers }) => {
    // add link and meta's to head
    if (!this.options.head) {
      this.options.head = {}
    }

    var re = /(?:\s+)([^=\s]+)(?:=?"?([^>\s"]*))/g
    headers.split('\n').forEach(header => {
      var type = /<([^\s>]+)/.exec(header)[1]

      if (type === 'link' || type === 'meta') {
        if (!(this.options.head[type] instanceof Array)) {
          this.options.head[type] = []
        }

        var attrs = {}
        var match
        while ((match = re.exec(header))) {
          if (match[1] === 'rel' && match[2] === 'manifest') {
            continue
          }
          if (match[1] === 'href' || match[1] === 'content') {
            match[2] = fixUrl(match[2])
          }
          attrs[match[1]] = match[2]
        }
        this.options.head[type].push(attrs)
      }
    })

    // apply manifest to current manifest, use defaults so you can still override values
    var manifest = find(faviconFiles, { fileName: 'manifest.json' })
    var manifestJson = JSON.parse(manifest.buff.toString('UTF-8'))
    if (!this.options.manifest) {
      this.options.manifest = {}
    }
    this.options.manifest = defaultsDeep(this.options.manifest, manifestJson)

    // Register webpack plugin to emit icons
    this.options.build.plugins.push({
      apply (compiler) {
        compiler.plugin('emit', function (compilation, _cb) {
          faviconFiles.forEach(file => {
            if (file.fileName !== 'manifest.json') {
              compilation.assets['icons/' + file.fileName] = {
                source: () => file.buff,
                size: () => file.buff.length
              }
            }
          })
          _cb()
        })
      }
    })
  }).catch(err => {
    console.error('[rfg-icon] error communicating with rfg api', err)
  })
}

module.exports.meta = require('./package.json')
