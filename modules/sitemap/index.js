const sm = require('sitemap')
const { hostname } = require('os').hostname

const port = process.env.PORT || process.env.npm_package_config_nuxt_port || 3000
let host = process.env.HOST || process.env.npm_package_config_nuxt_host || 'localhost'
if (host === '0.0.0.0') {
  host = hostname()
}

module.exports = async function nuxtSitemap (options) {
  // Defaults
  const defaults = {
    hostname: `http://${host}:${port}/`,
    routes: []
  }

  // Combine sources
  const sitemap = Object.assign({}, defaults, this.options.sitemap, options)

  // Extend routes
  this.extendRoutes((routes, resolve) => {
    // Set sitemap urls
    sitemap.urls = routes.map((route) => route.path)
    if (sitemap.routes) {
      sitemap.urls.push(...sitemap.routes)
    }

    // Create & Stringify sitemap
    const sitemapSource = sm.createSitemap(sitemap).toString()
    const sourcemapFileName = `sitemap.xml`

    // Merge final sitemap into options.sitemap for other modules
    if (!this.options.sitemap) {
      this.options.sitemap = {}
    }
    Object.assign(this.options.sitemap, sitemap)

    // Register webpack plugin to emit sitemap
    this.options.build.plugins.push({
      apply (compiler) {
        compiler.plugin('emit', function (compilation, cb) {
          compilation.assets[sourcemapFileName] = {
            source: () => sitemapSource,
            size: () => sitemapSource.length
          }
          cb()
        })
      }
    })
  })
}
