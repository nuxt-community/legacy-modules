const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const stringify = require('data2xml')({attrProp: '@', valProp: '#', cdataProp: '%'})

// https://msdn.microsoft.com/en-us/library/dn320426

module.exports = function nuxtBrowserConfig(options) {
  this.options.browserconfig = this.options.browserconfig || {}

  const defaults = {
    tile: {
      square150x150logo: {'@': {src: 'icon.png'}},
      TileColor: '#3f51b5'
    }
  }

  const browserConfigData = {
    browserconfig:
      {
        msapplication: _.defaultsDeep({}, this.options.browserconfig || options.browserconfig, defaults)
      }
  }

  // Write browserconfig.xml
  const browserconfigFileName = options.fileName || 'IEconfig.xml'
  const browserconfigFilePath = path.resolve(this.options.rootDir, 'static', browserconfigFileName)
  fs.writeFileSync(browserconfigFilePath, stringify(browserConfigData), 'utf8')

  // Add browserconfig meta
  if (!_.find(this.options.head.meta, {name: 'msapplication-config'})) {
    this.options.head.meta.push({name: 'msapplication-config', content: '/' + browserconfigFileName})
  }
}

module.exports.meta = require('./package.json')
