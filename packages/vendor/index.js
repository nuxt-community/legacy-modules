const fs = require('fs-extra')
const path = require('path')

module.exports = function nuxtVendor (moduleOptions) {
  if (Array.isArray(moduleOptions)) {
    moduleOptions = {
      vendor: moduleOptions
    }
  }

  const vendorDir = path.resolve(this.options.srcDir, 'static', 'vendor')

  const vendor = [].concat(this.options.vendor, moduleOptions.vendor)
    .filter(v => v)
    .map(v => ({
      src: v.src || path.resolve(this.options.modulesDir, v),
      dst: v.dst || path.resolve(vendorDir, v)
    }))
    .filter(v => fs.existsSync(v.src))

  if (!vendor.length) {
    return
  }

  // Ensure static/vendor directory exists
  fs.ensureDirSync(vendorDir)

  // Link vendors
  vendor.forEach(({src, dst}) => {
    fs.removeSync(dst)
    fs.ensureSymlinkSync(src, dst, 'junction')
  })
}

module.exports.meta = require('./package.json')
