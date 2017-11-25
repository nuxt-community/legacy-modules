const fs = require('fs-extra')
const path = require('path')

module.exports = function nuxtVendor (moduleOptions) {
  if (Array.isArray(moduleOptions)) {
    moduleOptions = {
      vendor: moduleOptions
    }
  }

  const vendorDir = path.resolve(this.options.srcDir, 'static', 'vendor')

  const modulesDir = Array.isArray(this.options.modulesDir) ? this.options.modulesDir : [this.options.modulesDir]

  const vendor = [].concat(this.options.vendor, moduleOptions.vendor)
    .filter(v => v)
    .map(v => {
      for (let dir of modulesDir) {
        const src = path.resolve(dir, v.src || v)
        if (fs.existsSync(src)) {
          return {
            src,
            dst: v.dst || path.resolve(vendorDir, v)
          }
        }
      }
    })
    .filter(v => v)

  if (!vendor.length) {
    return
  }

  // Ensure static/vendor directory exists
  fs.ensureDirSync(vendorDir)

  // Link vendors
  vendor.forEach(({ src, dst }) => {
    fs.removeSync(dst)
    fs.ensureSymlinkSync(src, dst, 'junction')
  })
}

module.exports.meta = require('./package.json')
