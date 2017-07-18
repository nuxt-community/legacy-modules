const sm = require('sitemap')

module.exports = async function nuxtSitemap (options) {

  // Defaults
  const defaults = {
    path: '/sitemap.xml',
    hostname: null,
    extendRoutes: [],
    routes: []
  }

  // Combine sources
  const sitemap = Object.assign({}, defaults, this.options.sitemap, options)

  // Extend routes
  this.extendRoutes((routes, resolve) => {
    sitemap.extendRoutes = routes.map((route) => route.path)
  })

  // Server Middleware
  this.addServerMiddleware({
    path: sitemap.path,
    handler (req, res, next) {

      let sitemapConfig = {}

      // Set sitemap hostname
      if (!sitemap.hostname) {
        const protocol = req.headers['x-forwarded-proto'] || (req.connection.encrypted ? 'https' : 'http')
        sitemapConfig.hostname = `${protocol}://${req.headers.host}/`
      } else {
        sitemapConfig.hostname = sitemap.hostname
      }

      // Set sitemap urls
      sitemapConfig.urls = sitemap.extendRoutes.concat(sitemap.routes)

      // Create & Stringify sitemap
      const sitemapSource = sm.createSitemap(sitemapConfig).toString()

      res.setHeader('Content-Type', 'application/xml')
      res.end(sitemapSource)
    }
  })
}
