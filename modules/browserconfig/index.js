const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const stringify = require('data2xml')({ attrProp: '@', valProp: '#', cdataProp: '%' })

// https://msdn.microsoft.com/en-us/library/bg183312\(v=vs.85\).aspx

module.exports = function nuxtBrowserconfig(options) {
  this.options.browserconfig = this.options.browserconfig || {}

  const defaults = {
    square150x150logo: {'@':{src:'icon.png'}},
    TileColor: '#3f51b5'
  }

  // Write browserconfig.xml
  const browserconfig = { browserconfig: { msapplication: { tile: _.defaultsDeep({}, this.options.browserconfig, defaults) } } }
  const browserconfigFileName = 'browserconfig.xml'
  const browserconfigFilePath = path.resolve(this.options.rootDir, 'static', browserconfigFileName)
  fs.writeFileSync(browserconfigFilePath, stringify(browserconfig), 'utf8')

  // Add browserconfig meta
  if (!_.find(this.options.head.meta, {name: 'msapplication-config'})) {
    this.options.head.meta.push({name: 'msapplication-config', content: '/' + browserconfigFileName})
  }
}

module.exports.meta = require('./package.json')