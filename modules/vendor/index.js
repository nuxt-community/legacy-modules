const fs = require('fs-extra')
const path = require('path')

module.exports = function nuxtAxios(options) {
  if (!this.options.vendor) {
    return
  }

  const vendorDir = path.resolve(this.options.rootDir, 'static', 'vendor')
  const nodeModulesDir = path.resolve(this.options.rootDir, 'node_modules')

  // Ensure static/vendor directory exists
  fs.ensureDirSync(vendorDir)

  // Link vendors
  this.options.vendor.forEach(vendor => {
    const src = path.resolve(nodeModulesDir, vendor)
    const dst = path.resolve(vendorDir, vendor)

    /* eslint-disable no-console */
    console.log('[vendor]', src, '->', dst)
    fs.ensureSymlinkSync(src, dst, 'junction')
  })
}

module.exports.meta = require('./package.json')
