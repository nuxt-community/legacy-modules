const path = require('path')

module.exports = (nuxt) => {
  let fa = 'node_modules/font-awesome/css/font-awesome.css'
  if (nuxt.rootDir) {
    fa = path.resolve(nuxt.rootDir, fa)
  }
  nuxt.css.push(fa)
}

module.exports.meta = {
  name: 'nuxt-font-awesome',
  vendor: ['font-awesome']
}
