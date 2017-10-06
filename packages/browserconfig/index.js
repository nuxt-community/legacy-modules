const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const stringify = require('data2xml')({attrProp: '@'})

// https://msdn.microsoft.com/en-us/library/dn320426

const defaults = {
  tile: {
    square150x150logo: {'@': {src: 'icon.png'}},
    TileColor: '#3f51b5'
  }
}

module.exports = function nuxtBrowserConfig (options) {
  let browserConfigData = {
    msapplication: _.defaultsDeep(this.options.browserconfig || options.browserconfig || {}, defaults)
  }

  // Write browserconfig.xml
  let browserconfigFileName = options.fileName || 'browserconfig.xml'
  let browserconfigFilePath = path.resolve(this.options.srcDir, 'static', browserconfigFileName)
  fs.writeFileSync(browserconfigFilePath, stringify('browserconfig', browserConfigData), 'utf8')

  // Add browserconfig meta
  if (!_.find(this.options.head.meta, {name: 'msapplication-config'})) {
    this.options.head.meta.push({name: 'msapplication-config', content: '/' + browserconfigFileName})
  }
}

module.exports.meta = require('./package.json')
