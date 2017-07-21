const Minimatch = require('minimatch').Minimatch
const sm = require('sitemap')

module.exports = function nuxtSitemap (options) {
  // Defaults
  const defaults = {
    path: '/sitemap.xml',
    hostname: null,
    excludes: [],
    routes: []
  }

  // Combine sources
  const sitemap = Object.assign({}, defaults, this.options.sitemap, options)

  const nuxt = this.nuxt

  let staticRoutes = []

  // Extend build
  this.extendBuild((config, { isClient, isServer }) => {
    if (isClient) {
      staticRoutes = nuxt.routes

      // Exclude routes
      sitemap.excludes.forEach(pattern => {
        const minimatch = new Minimatch(pattern)
        minimatch.negate = true
        staticRoutes = staticRoutes.filter(route => minimatch.match(route))
      })
    }
  })

  // Server Middleware
  this.addServerMiddleware({
    path: sitemap.path,
    async handler (req, res) {
      let sitemapConfig = {}

      // Set sitemap hostname
      if (!sitemap.hostname) {
        const protocol = req.headers['x-forwarded-proto'] || (req.connection.encrypted ? 'https' : 'http')
        sitemapConfig.hostname = `${protocol}://${req.headers.host}/`
      } else {
        sitemapConfig.hostname = sitemap.hostname
      }

      // Set sitemap urls
      const generateRoutes = await nuxt.utils.promisifyRoute(sitemap.routes)
      sitemapConfig.urls = staticRoutes.concat(generateRoutes)

      // Create & Stringify sitemap
      const sitemapSource = sm.createSitemap(sitemapConfig).toString()

      res.setHeader('Content-Type', 'application/xml')
      res.end(sitemapSource)
    }
  })
}
